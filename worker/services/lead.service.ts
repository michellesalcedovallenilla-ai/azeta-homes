import type { ContactSubmission } from '../types/models';
import type { ContactFormInput } from '../validation/contact.schema';

export class LeadService {
  constructor(private db: D1Database) {}

  async create(input: ContactFormInput, ipHash: string | null): Promise<ContactSubmission> {
    const result = await this.db
      .prepare(
        `INSERT INTO contact_submissions (name, email, phone, message, source, language, ip_hash)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(input.name, input.email, input.phone || null, input.message, input.source, input.language, ipHash)
      .run();

    return (await this.getById(result.meta.last_row_id as number))!;
  }

  async getById(id: number): Promise<ContactSubmission | null> {
    return (
      (await this.db
        .prepare('SELECT * FROM contact_submissions WHERE id = ?')
        .bind(id)
        .first<ContactSubmission>()) || null
    );
  }

  async list(
    page: number,
    limit: number,
    status?: string,
  ): Promise<{ data: ContactSubmission[]; total: number }> {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM contact_submissions';
    let countQuery = 'SELECT COUNT(*) as total FROM contact_submissions';
    const binds: any[] = [];
    const countBinds: any[] = [];

    if (status) {
      query += ' WHERE status = ?';
      countQuery += ' WHERE status = ?';
      binds.push(status);
      countBinds.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    binds.push(limit, offset);

    const [items, countResult] = await Promise.all([
      this.db.prepare(query).bind(...binds).all<ContactSubmission>(),
      this.db.prepare(countQuery).bind(...countBinds).first<{ total: number }>(),
    ]);

    return { data: items.results || [], total: countResult?.total || 0 };
  }

  async updateStatus(id: number, status: string): Promise<ContactSubmission | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    await this.db
      .prepare('UPDATE contact_submissions SET status = ? WHERE id = ?')
      .bind(status, id)
      .run();

    return this.getById(id);
  }
}
