import type { FaqItem } from '../types/models';
import type { CreateFaqInput, UpdateFaqInput } from '../validation/faq.schema';

export class FaqService {
  constructor(private db: D1Database) {}

  async listPublished(): Promise<FaqItem[]> {
    const result = await this.db
      .prepare('SELECT * FROM faq_items WHERE is_published = 1 ORDER BY sort_order ASC')
      .all<FaqItem>();
    return result.results || [];
  }

  async listAll(page: number, limit: number): Promise<{ data: FaqItem[]; total: number }> {
    const offset = (page - 1) * limit;
    const [items, countResult] = await Promise.all([
      this.db
        .prepare('SELECT * FROM faq_items ORDER BY sort_order ASC LIMIT ? OFFSET ?')
        .bind(limit, offset)
        .all<FaqItem>(),
      this.db.prepare('SELECT COUNT(*) as total FROM faq_items').first<{ total: number }>(),
    ]);
    return { data: items.results || [], total: countResult?.total || 0 };
  }

  async getById(id: number): Promise<FaqItem | null> {
    return (await this.db.prepare('SELECT * FROM faq_items WHERE id = ?').bind(id).first<FaqItem>()) || null;
  }

  async create(input: CreateFaqInput): Promise<FaqItem> {
    const result = await this.db
      .prepare(
        `INSERT INTO faq_items (question_es, question_en, answer_es, answer_en, is_published, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(input.question_es, input.question_en, input.answer_es, input.answer_en, input.is_published ? 1 : 0, input.sort_order)
      .run();
    return (await this.getById(result.meta.last_row_id as number))!;
  }

  async update(id: number, input: UpdateFaqInput): Promise<FaqItem | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const fields: string[] = [];
    const values: any[] = [];

    if (input.question_es !== undefined) { fields.push('question_es = ?'); values.push(input.question_es); }
    if (input.question_en !== undefined) { fields.push('question_en = ?'); values.push(input.question_en); }
    if (input.answer_es !== undefined) { fields.push('answer_es = ?'); values.push(input.answer_es); }
    if (input.answer_en !== undefined) { fields.push('answer_en = ?'); values.push(input.answer_en); }
    if (input.is_published !== undefined) { fields.push('is_published = ?'); values.push(input.is_published ? 1 : 0); }
    if (input.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(input.sort_order); }

    if (fields.length === 0) return existing;

    fields.push("updated_at = datetime('now')");
    values.push(id);

    await this.db.prepare(`UPDATE faq_items SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.prepare('DELETE FROM faq_items WHERE id = ?').bind(id).run();
    return (result.meta.changes || 0) > 0;
  }
}
