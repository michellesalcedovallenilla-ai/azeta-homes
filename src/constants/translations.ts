export type Language = 'es' | 'en';

export interface Translation {
  nav: {
    testimonials: string;
    about: string;
    calculator: string;
    faq: string;
    book: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  services: {
    badge: string;
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  about: {
    badge: string;
    title: string;
    desc: string;
    points: string[];
    cta: string;
    years: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    propertyValue: string;
    downPayment: string;
    interestRate: string;
    monthlyPayment: string;
    cta: string;
  };
  faq: {
    title: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  footer: {
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
  };
}

export const translations: Record<Language, Translation> = {
  es: {
    nav: {
      testimonials: "Testimonios",
      about: "Sobre Mí",
      calculator: "Calculadora",
      faq: "FAQ",
      book: "Agenda tu Asesoría"
    },
    hero: {
      badge: "+500 Familias Felices",
      title: "Ayudo a personas a encontrar más que una casa.",
      subtitle: "Estratega inmobiliario con 6 años de experiencia en el mercado de Houston, TX. Transformando transacciones en legados familiares.",
      cta1: "Agenda tu Asesoría Gratuita",
      cta2: "Calcula tu Hipoteca"
    },
    services: {
      badge: "Nuestros Servicios",
      title: "¿Cómo podemos ayudarte hoy?",
      items: [
        { title: "Comprar Primera Casa", desc: "Guía experta paso a paso para que logres el sueño de tu hogar propio sin estrés." },
        { title: "Vender Propiedad", desc: "Estrategias de marketing digital de alto impacto para vender al mejor precio en tiempo récord." },
        { title: "Inversión Estratégica", desc: "Portafolios inmobiliarios diseñados para generar flujo de caja y plusvalía a largo plazo." },
        { title: "Asesor de Confianza", desc: "Transparencia absoluta en cada negociación. Tu éxito es nuestra prioridad #1." },
        { title: "Cerca del Paso", desc: "¿Ya tienes algo en mente? Te ayudamos a cerrar el trato con las mejores condiciones." },
        { title: "Guía Local Houston", desc: "Conocimiento profundo de cada vecindario, escuelas y proyecciones de crecimiento." }
      ]
    },
    about: {
      badge: "¿Quién soy?",
      title: "Argenis Zabala",
      desc: "Soy realtor en Houston, Texas, especializado en ayudar a familias a comprar, vender e invertir con claridad y confianza. Entiendo que comprar una casa es una de las decisiones más importantes de tu vida, por eso mi misión es guiarte paso a paso y darte las herramientas para tomar decisiones inteligentes.",
      points: [
        "Asesoría personalizada para evitar errores costosos.",
        "Especialista en primeros compradores, inversionistas y reubicación.",
        "Conocimiento del mercado y contenido educativo a tu disposición."
      ],
      cta: "Agenda tu Asesoría",
      years: "Años de Experiencia"
    },
    calculator: {
      title: "Calculadora Hipotecaria",
      subtitle: "Visualiza tu futuro financiero hoy mismo.",
      propertyValue: "Valor de la propiedad",
      downPayment: "Cuota Inicial (20%)",
      interestRate: "Tasa de Interés (%)",
      monthlyPayment: "Pago Mensual Estimado",
      cta: "Habla con Argenis"
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        { q: "¿La asesoría tiene algún costo?", a: "No, la asesoría es completamente gratuita. La idea es que puedas conversar con tranquilidad, resolver tus dudas y entender mejor tus opciones antes de tomar cualquier decisión. Sin compromiso." },
        { q: "¿Cuánto dura la asesoría?", a: "Generalmente entre 20 y 30 minutos. Es tiempo suficiente para entender tu situación, responder tus preguntas y orientarte sobre los próximos pasos para comprar o vender tu propiedad." },
        { q: "¿También puedo vender mi casa contigo?", a: "Claro que sí. Si estás pensando en vender tu propiedad, puedo ayudarte a definir una estrategia para posicionarla en el mercado y lograr el mejor precio posible, acompañándote durante todo el proceso." },
        { q: "¿Trabajas solo en Houston?", a: "Mi enfoque principal es Houston y sus alrededores, donde conozco bien el mercado, las oportunidades y las zonas que pueden ser más convenientes según cada cliente." },
        { q: "¿Debo estar listo para comprar ahora?", a: "No necesariamente. Muchas personas que hablan conmigo aún están evaluando sus opciones o quieren entender mejor el proceso antes de dar el paso. La asesoría también está pensada para eso: darte claridad y ayudarte a tomar decisiones con confianza." }
      ]
    },
    footer: {
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      contact: "Contacto",
      rights: "© 2026 Azeta Homes. Curado por Argenis Zabala."
    }
  },
  en: {
    nav: {
      testimonials: "Testimonials",
      about: "About",
      calculator: "Calculator",
      faq: "FAQ",
      book: "Schedule Consultation"
    },
    hero: {
      badge: "+500 Happy Families",
      title: "I help people find more than just a house.",
      subtitle: "Real estate strategist with 6 years of experience in the Houston, TX market. Transforming transactions into family legacies.",
      cta1: "Book Your Free Consultation",
      cta2: "Calculate Your Mortgage"
    },
    services: {
      badge: "Our Services",
      title: "How can we help you today?",
      items: [
        { title: "Buy First Home", desc: "Expert step-by-step guide to achieving your dream of homeownership stress-free." },
        { title: "Sell Property", desc: "High-impact digital marketing strategies to sell at the best price in record time." },
        { title: "Strategic Investment", desc: "Real estate portfolios designed to generate cash flow and long-term appreciation." },
        { title: "Trusted Advisor", desc: "Absolute transparency in every negotiation. Your success is our #1 priority." },
        { title: "Close to the Deal", desc: "Already have something in mind? We help you close the deal with the best conditions." },
        { title: "Houston Local Guide", desc: "Deep knowledge of every neighborhood, schools, and growth projections." }
      ]
    },
    about: {
      badge: "Who am I?",
      title: "Argenis Zabala",
      desc: "I am a realtor in Houston, Texas, specializing in helping families buy, sell, and invest with clarity and confidence. I understand that buying a home is one of the most important decisions of your life, which is why my mission is to guide you step-by-step and give you the tools to make smart decisions.",
      points: [
        "Personalized advice to help you avoid costly mistakes.",
        "Specialist in first-time buyers, investors, and relocation.",
        "Market knowledge and educational content at your disposal."
      ],
      cta: "Schedule Your Consultation",
      years: "Years of Experience"
    },
    calculator: {
      title: "Mortgage Calculator",
      subtitle: "Visualize your financial future today.",
      propertyValue: "Property Value",
      downPayment: "Down Payment (20%)",
      interestRate: "Interest Rate (%)",
      monthlyPayment: "Estimated Monthly Payment",
      cta: "Talk to Argenis"
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Does the consultation have any cost?", a: "No, the consultation is completely free. The idea is for you to converse with peace of mind, resolve your doubts, and better understand your options before making any decision. No strings attached." },
        { q: "How long does the consultation last?", a: "Generally between 20 and 30 minutes. It's enough time to understand your situation, answer your questions, and guide you on the next steps to buy or sell your property." },
        { q: "Can I also sell my house with you?", a: "Of course. If you are thinking of selling your property, I can help you define a strategy to position it in the market and achieve the best possible price, accompanying you throughout the process." },
        { q: "Do you only work in Houston?", a: "My main focus is Houston and its surroundings, where I know the market well, the opportunities, and the areas that may be most convenient for each client." },
        { q: "Do I need to be ready to buy now?", a: "Not necessarily. Many people who talk to me are still evaluating their options or want to better understand the process before taking the step. The consultation is also designed for that: to give you clarity and help you make decisions with confidence." }
      ]
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
      rights: "© 2026 Azeta Homes. Curated by Argenis Zabala."
    }
  }
};
