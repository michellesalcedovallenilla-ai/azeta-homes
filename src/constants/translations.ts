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
    titleSuffix: string;
    subtitle: string;
    cta1: string;
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
    taxRate: string;
    insurance: string;
    hoa: string;
    pmi: string;
    zipCode: string;
    principalAndInterest?: string;
    propertyTax?: string;
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
      badge: "+100 Familias Felices",
      title: "Estás un paso más cerca de comprar tu casa en Houston",
      titleSuffix: "(hazlo de la forma correcta)",
      subtitle: "¿Viste una casa en internet y quieres más información?\n\nEstoy aquí para ayudarte y guiarte paso a paso para que tomes la mejor decisión.",
      cta1: "Agenda tu Asesoría Gratuita"
    },
    services: {
      badge: "Nuestros Servicios",
      title: "¿Cómo podemos ayudarte hoy?",
      items: [
        { title: "Comprar mi primera casa", desc: "Te guío paso a paso para que compres con claridad, evites errores y tomes decisiones seguras." },
        { title: "Vender mi propiedad", desc: "Creamos una estrategia para atraer compradores reales y ayudarte a vender más rápido y al mejor precio posible." },
        { title: "Invertir en bienes raíces", desc: "Te ayudo a encontrar oportunidades inteligentes en Houston para generar ingresos y crecer tu patrimonio." },
        { title: "Alquilar una casa", desc: "Te acompaño en todo el proceso para encontrar una propiedad que se adapte a ti y asegurar una experiencia sin complicaciones." },
        { title: "Ver casas disponibles", desc: "¿Viste una casa en internet o quieres explorar opciones? Te ayudo a encontrar, analizar y visitar las mejores oportunidades." },
        { title: "Asesoría y guía local", desc: "Si tienes dudas o no sabes por dónde empezar, te explico todo el proceso y te ayudo a tomar las mejores decisiones en Houston." }
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
      downPayment: "Cuota Inicial",
      interestRate: "Tasa de Interés (%)",
      taxRate: "Impuestos (Tax Rate %)",
      insurance: "Seguro Anual ($)",
      hoa: "HOA Mensual ($)",
      pmi: "PMI Mensual ($)",
      zipCode: "Código Postal",
      principalAndInterest: "Principal e Interés",
      propertyTax: "Impuestos",
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
      rights: "© 2026 Azeta Homes."
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
      badge: "+100 Happy Families",
      title: "You are one step closer to buying your home in Houston",
      titleSuffix: "(do it the right way)",
      subtitle: "Did you see a house online and want more information?\n\nI am here to help and guide you step by step so you can make the best decision.",
      cta1: "Book Your Free Consultation"
    },
    services: {
      badge: "Our Services",
      title: "How can we help you today?",
      items: [
        { title: "Buy my first home", desc: "I guide you step by step so you buy with clarity, avoid mistakes, and make safe decisions." },
        { title: "Sell my property", desc: "We create a strategy to attract real buyers and help you sell faster and at the best possible price." },
        { title: "Invest in real estate", desc: "I help you find smart opportunities in Houston to generate income and grow your wealth." },
        { title: "Rent a house", desc: "I accompany you throughout the process to find a property that suits you and ensure a hassle-free experience." },
        { title: "View available homes", desc: "Did you see a house online or want to explore options? I help you find, analyze, and visit the best opportunities." },
        { title: "Local advice and guide", desc: "If you have doubts or don't know where to start, I explain the whole process and help you make the best decisions in Houston." }
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
      downPayment: "Down Payment",
      interestRate: "Interest Rate (%)",
      taxRate: "Property Tax Rate (%)",
      insurance: "Annual Insurance ($)",
      hoa: "Monthly HOA ($)",
      pmi: "Monthly PMI ($)",
      zipCode: "Zip Code",
      principalAndInterest: "Principal & Interest",
      propertyTax: "Property Taxes",
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
      rights: "© 2026 Azeta Homes."
    }
  }
};
