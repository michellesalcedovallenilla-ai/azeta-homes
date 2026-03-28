import type { AnalyticsEvent } from '../types/models';
import type { AnalyticsEventInput } from '../validation/analytics.schema';

export class AnalyticsService {
  constructor(private db: D1Database) {}

  async trackEvent(
    input: AnalyticsEventInput,
    ipHash: string | null,
    userAgent: string | null,
  ): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO analytics_events (event_type, event_data, page_url, referrer, user_agent, ip_hash, session_id, language)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        input.event_type,
        input.event_data || null,
        input.page_url || null,
        input.referrer || null,
        userAgent ? userAgent.substring(0, 500) : null,
        ipHash,
        input.session_id || null,
        input.language || null,
      )
      .run();
  }

  async getAggregated(startDate: string, endDate: string, eventType?: string, groupBy = 'day') {
    // Total events by type
    let typeQuery = `SELECT event_type, COUNT(*) as count FROM analytics_events
      WHERE created_at >= ? AND created_at < ?`;
    const typeBinds: any[] = [startDate, endDate + 'T23:59:59'];

    if (eventType) {
      typeQuery += ' AND event_type = ?';
      typeBinds.push(eventType);
    }
    typeQuery += ' GROUP BY event_type ORDER BY count DESC';

    // Events over time
    let timeFormat: string;
    switch (groupBy) {
      case 'hour':
        timeFormat = "strftime('%Y-%m-%d %H:00', created_at)";
        break;
      case 'event_type':
        timeFormat = 'event_type';
        break;
      default:
        timeFormat = "strftime('%Y-%m-%d', created_at)";
    }

    let timeQuery = `SELECT ${timeFormat} as period, COUNT(*) as count FROM analytics_events
      WHERE created_at >= ? AND created_at < ?`;
    const timeBinds: any[] = [startDate, endDate + 'T23:59:59'];

    if (eventType) {
      timeQuery += ' AND event_type = ?';
      timeBinds.push(eventType);
    }
    timeQuery += ` GROUP BY period ORDER BY period ASC`;

    // Unique sessions
    let sessionQuery = `SELECT COUNT(DISTINCT session_id) as unique_sessions FROM analytics_events
      WHERE created_at >= ? AND created_at < ? AND session_id IS NOT NULL`;
    const sessionBinds: any[] = [startDate, endDate + 'T23:59:59'];

    const [byType, overTime, sessions] = await Promise.all([
      this.db.prepare(typeQuery).bind(...typeBinds).all(),
      this.db.prepare(timeQuery).bind(...timeBinds).all(),
      this.db.prepare(sessionQuery).bind(...sessionBinds).first<{ unique_sessions: number }>(),
    ]);

    return {
      byType: byType.results || [],
      overTime: overTime.results || [],
      uniqueSessions: sessions?.unique_sessions || 0,
    };
  }
}
