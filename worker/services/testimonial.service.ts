import type { Testimonial } from '../types/models';
import type { CreateTestimonialInput, UpdateTestimonialInput } from '../validation/testimonial.schema';

export class TestimonialService {
  constructor(private db: D1Database) {}

  async listPublished(): Promise<Testimonial[]> {
    const result = await this.db
      .prepare('SELECT * FROM testimonials WHERE is_published = 1 ORDER BY sort_order ASC')
      .all<Testimonial>();
    return result.results || [];
  }

  async listAll(page: number, limit: number): Promise<{ data: Testimonial[]; total: number }> {
    const offset = (page - 1) * limit;
    const [items, countResult] = await Promise.all([
      this.db
        .prepare('SELECT * FROM testimonials ORDER BY sort_order ASC LIMIT ? OFFSET ?')
        .bind(limit, offset)
        .all<Testimonial>(),
      this.db.prepare('SELECT COUNT(*) as total FROM testimonials').first<{ total: number }>(),
    ]);
    return { data: items.results || [], total: countResult?.total || 0 };
  }

  async getById(id: number): Promise<Testimonial | null> {
    return (
      (await this.db.prepare('SELECT * FROM testimonials WHERE id = ?').bind(id).first<Testimonial>()) || null
    );
  }

  async create(input: CreateTestimonialInput): Promise<Testimonial> {
    const result = await this.db
      .prepare(
        `INSERT INTO testimonials (author_name, author_location, content_es, content_en, image_url, is_published, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        input.author_name,
        input.author_location,
        input.content_es,
        input.content_en,
        input.image_url || null,
        input.is_published ? 1 : 0,
        input.sort_order,
      )
      .run();

    return (await this.getById(result.meta.last_row_id as number))!;
  }

  async update(id: number, input: UpdateTestimonialInput): Promise<Testimonial | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const fields: string[] = [];
    const values: any[] = [];

    if (input.author_name !== undefined) { fields.push('author_name = ?'); values.push(input.author_name); }
    if (input.author_location !== undefined) { fields.push('author_location = ?'); values.push(input.author_location); }
    if (input.content_es !== undefined) { fields.push('content_es = ?'); values.push(input.content_es); }
    if (input.content_en !== undefined) { fields.push('content_en = ?'); values.push(input.content_en); }
    if (input.image_url !== undefined) { fields.push('image_url = ?'); values.push(input.image_url || null); }
    if (input.is_published !== undefined) { fields.push('is_published = ?'); values.push(input.is_published ? 1 : 0); }
    if (input.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(input.sort_order); }

    if (fields.length === 0) return existing;

    fields.push("updated_at = datetime('now')");
    values.push(id);

    await this.db
      .prepare(`UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.prepare('DELETE FROM testimonials WHERE id = ?').bind(id).run();
    return (result.meta.changes || 0) > 0;
  }
}
