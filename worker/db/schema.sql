-- Azeta Homes Database Schema (Cloudflare D1 / SQLite)

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK(role IN ('admin', 'super_admin')),
    is_active INTEGER NOT NULL DEFAULT 1,
    last_login_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Refresh tokens (for JWT rotation)
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    is_revoked INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Testimonials (bilingual)
CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_name TEXT NOT NULL,
    author_location TEXT NOT NULL,
    content_es TEXT NOT NULL,
    content_en TEXT NOT NULL,
    image_url TEXT,
    is_published INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- FAQ items (bilingual)
CREATE TABLE IF NOT EXISTS faq_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_es TEXT NOT NULL,
    question_en TEXT NOT NULL,
    answer_es TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    is_published INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Services (bilingual)
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_es TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_es TEXT NOT NULL,
    description_en TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Home',
    is_published INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Contact form submissions / leads
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'website',
    status TEXT NOT NULL DEFAULT 'new'
        CHECK(status IN ('new','contacted','qualified','converted','closed')),
    language TEXT NOT NULL DEFAULT 'es' CHECK(language IN ('es', 'en')),
    ip_hash TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    event_data TEXT,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_hash TEXT,
    session_id TEXT,
    language TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Performance Indexes ──

CREATE INDEX IF NOT EXISTS idx_testimonials_published
    ON testimonials(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_faq_published
    ON faq_items(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_services_published
    ON services(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_contact_status
    ON contact_submissions(status, created_at);
CREATE INDEX IF NOT EXISTS idx_contact_created
    ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_type
    ON analytics_events(event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_created
    ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_session
    ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_hash
    ON refresh_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user
    ON refresh_tokens(user_id);
