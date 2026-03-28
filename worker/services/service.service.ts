import type { Service } from '../types/models';
import type { CreateServiceInput, UpdateServiceInput } from '../validation/service.schema';

export class ServiceService {
  constructor(private db: D1Database) {}

  async listPublished(): Promise<Service[]> {
    const result = await this.db
      .prepare('SELECT * FROM services WHERE is_published = 1 ORDER BY sort_order ASC')
      .all<Service>();
    return result.results || [];
  }

  async listAll(page: number, limit: number): Promise<{ data: Service[]; total: number }> {
    const offset = (page - 1) * limit;
    const [items, countResult] = await Promise.all([
      this.db
        .prepare('SELECT * FROM services ORDER BY sort_order ASC LIMIT ? OFFSET ?')
        .bind(limit, offset)
        .all<Service>(),
      this.db.prepare('SELECT COUNT(*) as total FROM services').first<{ total: number }>(),
    ]);
    return { data: items.results || [], total: countResult?.total || 0 };
  }

  async getById(id: number): Promise<Service | null> {
    return (await this.db.prepare('SELECT * FROM services WHERE id = ?').bind(id).first<Service>()) || null;
  }

  async create(input: CreateServiceInput): Promise<Service> {
    const result = await this.db
      .prepare(
        `INSERT INTO services (title_es, title_en, description_es, description_en, icon_name, is_published, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(input.title_es, input.title_en, input.description_es, input.description_en, input.icon_name, input.is_published ? 1 : 0, input.sort_order)
      .run();
    return (await this.getById(result.meta.last_row_id as number))!;
  }

  async update(id: number, input: UpdateServiceInput): Promise<Service | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const fields: string[] = [];
    const values: any[] = [];

    if (input.title_es !== undefined) { fields.push('title_es = ?'); values.push(input.title_es); }
    if (input.title_en !== undefined) { fields.push('title_en = ?'); values.push(input.title_en); }
    if (input.description_es !== undefined) { fields.push('description_es = ?'); values.push(input.description_es); }
    if (input.description_en !== undefined) { fields.push('description_en = ?'); values.push(input.description_en); }
    if (input.icon_name !== undefined) { fields.push('icon_name = ?'); values.push(input.icon_name); }
    if (input.is_published !== undefined) { fields.push('is_published = ?'); values.push(input.is_published ? 1 : 0); }
    if (input.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(input.sort_order); }

    if (fields.length === 0) return existing;

    fields.push("updated_at = datetime('now')");
    values.push(id);

    await this.db.prepare(`UPDATE services SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.prepare('DELETE FROM services WHERE id = ?').bind(id).run();
    return (result.meta.changes || 0) > 0;
  }
}
