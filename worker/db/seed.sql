-- Azeta Homes Seed Data
-- Run after schema.sql to populate initial content

-- ══════════════════════════════════════════════════════════
-- TESTIMONIALS (7 items, bilingual)
-- ══════════════════════════════════════════════════════════

INSERT INTO testimonials (author_name, author_location, content_es, content_en, image_url, is_published, sort_order)
VALUES (
    'Diego Craik & Maria Fermin',
    'Katy, TX (Nueva Construcción)',
    'Construir nuestra casa desde cero era algo que nos emocionaba, pero también nos daba un poco de miedo por todo lo que implica. Argenis nos acompañó en cada paso del proceso, desde elegir el builder hasta diseñar cada detalle de la casa a nuestro gusto.',
    'Building our house from scratch was something that excited us, but also gave us a bit of fear because of all that it implies. Argenis accompanied us in every step of the process, from choosing the builder to designing every detail of the house to our liking.',
    'https://i.imgur.com/YYpugoc.png',
    1, 1
);

INSERT INTO testimonials (author_name, author_location, content_es, content_en, image_url, is_published, sort_order)
VALUES (
    'Ruben Bello',
    'Conroe, TX (desde New Jersey)',
    'Me mudé desde New Jersey sin conocer mucho Houston, y Argenis fue clave en todo el proceso. Me orientó con las zonas, me mostró opciones y me ayudó a tomar la mejor decisión sin sentir presión. Gracias a él hoy tengo mi casa en Conroe y no podría estar más contento.',
    'I moved from New Jersey without knowing much about Houston, and Argenis was key in the whole process. He guided me with the areas, showed me options and helped me make the best decision without feeling pressure. Thanks to him today I have my house in Conroe and I couldn''t be happier.',
    'https://i.imgur.com/6hgCRQU.png',
    1, 2
);

INSERT INTO testimonials (author_name, author_location, content_es, content_en, image_url, is_published, sort_order)
VALUES (
    'Javier Fuentes & Perla Fuentes',
    'Spring, TX',
    'Trabajar con Argenis fue una experiencia increíble. Desde el primer día nos explicó todo el proceso paso a paso y siempre estuvo disponible para responder nuestras dudas. Nos ayudó a encontrar una casa perfecta para nuestra familia en Spring.',
    'Working with Argenis was an incredible experience. From the first day he explained the whole process step by step and was always available to answer our questions. He helped us find a perfect home for our family in Spring.',
    'https://i.imgur.com/oJTVUDH.png',
    1, 3
);

INSERT INTO testimonials (author_name, author_location, content_es, content_en, image_url, is_published, sort_order)
VALUES (
    'Cesar Mendoza & Arlene Acosta',
    'Katy, TX',
    'Argenis hizo que todo el proceso fuera mucho más fácil de lo que esperábamos. Nos ayudó a entender nuestras opciones y a tomar decisiones con confianza. Siempre estuvo pendiente de nosotros y negociando para conseguirnos lo mejor. Lo recomendamos 100%.',
    'Argenis made the whole process much easier than we expected. He helped us understand our options and make decisions with confidence. He was always looking out for us and negotiating to get us the best. We recommend him 100%.',
    'https://i.imgur.com/PFLRWAR.png',
    1, 4
);

INSERT INTO testimonials (author_name, author_location, content_es, content_en, image_url, is_published, sort_order)
VALUES (
    'Gabriel Tellez & Catherine Alcubilla',
    'Katy, TX',
    'Trabajar con Argenis fue una de las mejores decisiones que tomamos durante el proceso de compra. Desde el inicio nos hizo sentir seguros, nos explicó cada paso con claridad y siempre estuvo disponible para cualquier duda.',
    'Working with Argenis was one of the best decisions we made during the buying process. From the beginning he made us feel secure, explained each step clearly and was always available for any questions.',
    'https://i.imgur.com/gVoZjU9.png',
    1, 5
);

INSERT INTO testimonials (author_name, author_location, content_es, content_en, image_url, is_published, sort_order)
VALUES (
    'Omar Ali & Alicia',
    'Katy, TX',
    'Desde el primer momento sentimos confianza trabajando con Argenis. Nos guió durante todo el proceso de compra de nuestra casa nueva y se aseguró de que todo saliera bien.',
    'From the first moment we felt confident working with Argenis. He guided us throughout the process of buying our new home and made sure everything went well.',
    'https://i.imgur.com/MWAcKKk.png',
    1, 6
);

INSERT INTO testimonials (author_name, author_location, content_es, content_en, image_url, is_published, sort_order)
VALUES (
    'Amarilys & Carlos',
    'Katy, TX (Nueva Construcción)',
    'Argenis nos ayudó durante todo el proceso de construir nuestra casa y fue clave para evitar errores. Nos orientó con el builder, los incentivos y cada decisión importante.',
    'Argenis helped us throughout the process of building our house and was key to avoiding mistakes. He guided us with the builder, the incentives and every important decision.',
    'https://i.imgur.com/EicQfjn.png',
    1, 7
);

-- ══════════════════════════════════════════════════════════
-- FAQ ITEMS (5 items, bilingual)
-- ══════════════════════════════════════════════════════════

INSERT INTO faq_items (question_es, question_en, answer_es, answer_en, is_published, sort_order)
VALUES (
    '¿La asesoría tiene algún costo?',
    'Does the consultation have any cost?',
    'No, la asesoría es completamente gratuita. La idea es que puedas conversar con tranquilidad, resolver tus dudas y entender mejor tus opciones antes de tomar cualquier decisión. Sin compromiso.',
    'No, the consultation is completely free. The idea is for you to converse with peace of mind, resolve your doubts, and better understand your options before making any decision. No strings attached.',
    1, 1
);

INSERT INTO faq_items (question_es, question_en, answer_es, answer_en, is_published, sort_order)
VALUES (
    '¿Cuánto dura la asesoría?',
    'How long does the consultation last?',
    'Generalmente entre 20 y 30 minutos. Es tiempo suficiente para entender tu situación, responder tus preguntas y orientarte sobre los próximos pasos para comprar o vender tu propiedad.',
    'Generally between 20 and 30 minutes. It''s enough time to understand your situation, answer your questions, and guide you on the next steps to buy or sell your property.',
    1, 2
);

INSERT INTO faq_items (question_es, question_en, answer_es, answer_en, is_published, sort_order)
VALUES (
    '¿También puedo vender mi casa contigo?',
    'Can I also sell my house with you?',
    'Claro que sí. Si estás pensando en vender tu propiedad, puedo ayudarte a definir una estrategia para posicionarla en el mercado y lograr el mejor precio posible, acompañándote durante todo el proceso.',
    'Of course. If you are thinking of selling your property, I can help you define a strategy to position it in the market and achieve the best possible price, accompanying you throughout the process.',
    1, 3
);

INSERT INTO faq_items (question_es, question_en, answer_es, answer_en, is_published, sort_order)
VALUES (
    '¿Trabajas solo en Houston?',
    'Do you only work in Houston?',
    'Mi enfoque principal es Houston y sus alrededores, donde conozco bien el mercado, las oportunidades y las zonas que pueden ser más convenientes según cada cliente.',
    'My main focus is Houston and its surroundings, where I know the market well, the opportunities, and the areas that may be most convenient for each client.',
    1, 4
);

INSERT INTO faq_items (question_es, question_en, answer_es, answer_en, is_published, sort_order)
VALUES (
    '¿Debo estar listo para comprar ahora?',
    'Do I need to be ready to buy now?',
    'No necesariamente. Muchas personas que hablan conmigo aún están evaluando sus opciones o quieren entender mejor el proceso antes de dar el paso. La asesoría también está pensada para eso: darte claridad y ayudarte a tomar decisiones con confianza.',
    'Not necessarily. Many people who talk to me are still evaluating their options or want to better understand the process before taking the step. The consultation is also designed for that: to give you clarity and help you make decisions with confidence.',
    1, 5
);

-- ══════════════════════════════════════════════════════════
-- SERVICES (6 items, bilingual, with Lucide icon names)
-- ══════════════════════════════════════════════════════════

INSERT INTO services (title_es, title_en, description_es, description_en, icon_name, is_published, sort_order)
VALUES (
    'Comprar mi primera casa',
    'Buy my first home',
    'Te guío paso a paso para que compres con claridad, evites errores y tomes decisiones seguras.',
    'I guide you step by step so you buy with clarity, avoid mistakes, and make safe decisions.',
    'Home',
    1, 1
);

INSERT INTO services (title_es, title_en, description_es, description_en, icon_name, is_published, sort_order)
VALUES (
    'Vender mi propiedad',
    'Sell my property',
    'Creamos una estrategia para atraer compradores reales y ayudarte a vender más rápido y al mejor precio posible.',
    'We create a strategy to attract real buyers and help you sell faster and at the best possible price.',
    'Tag',
    1, 2
);

INSERT INTO services (title_es, title_en, description_es, description_en, icon_name, is_published, sort_order)
VALUES (
    'Invertir en bienes raíces',
    'Invest in real estate',
    'Te ayudo a encontrar oportunidades inteligentes en Houston para generar ingresos y crecer tu patrimonio.',
    'I help you find smart opportunities in Houston to generate income and grow your wealth.',
    'TrendingUp',
    1, 3
);

INSERT INTO services (title_es, title_en, description_es, description_en, icon_name, is_published, sort_order)
VALUES (
    'Alquilar una casa',
    'Rent a house',
    'Te acompaño en todo el proceso para encontrar una propiedad que se adapte a ti y asegurar una experiencia sin complicaciones.',
    'I accompany you throughout the process to find a property that suits you and ensure a hassle-free experience.',
    'BadgeCheck',
    1, 4
);

INSERT INTO services (title_es, title_en, description_es, description_en, icon_name, is_published, sort_order)
VALUES (
    'Ver casas disponibles',
    'View available homes',
    '¿Viste una casa en internet o quieres explorar opciones? Te ayudo a encontrar, analizar y visitar las mejores oportunidades.',
    'Did you see a house online or want to explore options? I help you find, analyze, and visit the best opportunities.',
    'Map',
    1, 5
);

INSERT INTO services (title_es, title_en, description_es, description_en, icon_name, is_published, sort_order)
VALUES (
    'Asesoría y guía local',
    'Local advice and guide',
    'Si tienes dudas o no sabes por dónde empezar, te explico todo el proceso y te ayudo a tomar las mejores decisiones en Houston.',
    'If you have doubts or don''t know where to start, I explain the whole process and help you make the best decisions in Houston.',
    'Compass',
    1, 6
);

-- ══════════════════════════════════════════════════════════
-- ADMIN USER
-- ══════════════════════════════════════════════════════════
-- NOTE: The password_hash and salt below are PLACEHOLDERS.
-- Run `npx tsx scripts/seed-admin.ts` to generate real values
-- using Web Crypto API (PBKDF2 with SHA-256).

INSERT INTO admin_users (email, password_hash, salt, role, is_active)
VALUES (
    'admin@azetahomes.com',
    'PLACEHOLDER_HASH_RUN_SEED_ADMIN_SCRIPT',
    'PLACEHOLDER_SALT_RUN_SEED_ADMIN_SCRIPT',
    'super_admin',
    1
);
