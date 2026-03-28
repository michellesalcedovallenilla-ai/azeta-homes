// ── Database Models ──

export interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
  salt: string;
  role: 'admin' | 'super_admin';
  is_active: number;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RefreshToken {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: string;
  is_revoked: number;
  created_at: string;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_location: string;
  content_es: string;
  content_en: string;
  image_url: string | null;
  is_published: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FaqItem {
  id: number;
  question_es: string;
  question_en: string;
  answer_es: string;
  answer_en: string;
  is_published: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  icon_name: string;
  is_published: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  language: 'es' | 'en';
  ip_hash: string | null;
  created_at: string;
}

export interface AnalyticsEvent {
  id: number;
  event_type: string;
  event_data: string | null;
  page_url: string | null;
  referrer: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  session_id: string | null;
  language: string | null;
  created_at: string;
}

// ── API Response Types ──

export interface ApiResponse<T> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  ok: false;
  error: string;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  ok: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ── Auth Types ──

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
