import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  Menu, X, Home, Image as ImageIcon, User, Calculator, 
  HelpCircle, Calendar, Play, ArrowRight, CheckCircle2,
  TrendingUp, Tag, BadgeCheck, Map as MapIcon, ChevronDown,
  Instagram, Linkedin, MessageCircle, Sun, Moon, Compass
} from 'lucide-react';
import { cn } from './lib/utils';
import { translations, Language } from './constants/translations';
import { PopupModal } from 'react-calendly';

// --- Hooks ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// --- Components ---

const SkylineBackground = () => {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springMouseX = useSpring(mouseX, { stiffness: 15, damping: 40 });
  const springMouseY = useSpring(mouseY, { stiffness: 15, damping: 40 });

  // Scroll Parallax - Moving UP as you scroll down
  const scrollY1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -15]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -30]);
  const scrollY3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -45]);

  // Mouse Parallax
  const mouseX1 = useTransform(springMouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-5, 5]);
  const mouseX2 = useTransform(springMouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-10, 10]);
  const mouseX3 = useTransform(springMouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-15, 15]);

  const mouseY1 = useTransform(springMouseY, [-0.5, 0.5], isMobile ? [0, 0] : [-2, 2]);
  const mouseY2 = useTransform(springMouseY, [-0.5, 0.5], isMobile ? [0, 0] : [-5, 5]);
  const mouseY3 = useTransform(springMouseY, [-0.5, 0.5], isMobile ? [0, 0] : [-8, 8]);

  const springY1 = useSpring(scrollY1, { stiffness: 10, damping: 40 });
  const springY2 = useSpring(scrollY2, { stiffness: 10, damping: 40 });
  const springY3 = useSpring(scrollY3, { stiffness: 10, damping: 40 });

  const atmosphereColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgba(231, 195, 83, 0.03)', 'rgba(30, 58, 138, 0.05)', 'rgba(231, 195, 83, 0.03)']
  );

  // Explicit Building Configurations
  const buildingsLayer1 = useRef([
    { h: 75, w: 8, r: '2px', type: 'office' }, { h: 95, w: 12, r: '4px', type: 'residential' }, 
    { h: 85, w: 10, r: '2px', type: 'tower' }, { h: 105, w: 14, r: '6px', type: 'office' }, 
    { h: 70, w: 9, r: '2px', type: 'residential' }, { h: 90, w: 11, r: '4px', type: 'tower' },
    { h: 80, w: 10, r: '2px', type: 'office' }, { h: 100, w: 15, r: '6px', type: 'residential' },
  ]).current;
  
  const buildingsLayer2 = useRef([
    { h: 55, w: 12, r: '3px', type: 'residential' }, { h: 80, w: 16, r: '6px', type: 'office' }, 
    { h: 65, w: 14, r: '4px', type: 'tower' }, { h: 90, w: 20, r: '8px', type: 'residential' },
    { h: 60, w: 13, r: '4px', type: 'office' }, { h: 85, w: 18, r: '6px', type: 'tower' }
  ]).current;

  const buildingsLayer3 = useRef([
    { h: 35, w: 18, r: '4px', type: 'office' }, { h: 60, w: 25, r: '8px', type: 'residential' }, 
    { h: 45, w: 20, r: '6px', type: 'tower' }, { h: 70, w: 28, r: '10px', type: 'office' },
    { h: 40, w: 22, r: '6px', type: 'residential' }
  ]).current;

  const Building: React.FC<{ b: any, i: number, layer: number }> = ({ b, i, layer }) => {
    const isOffice = b.type === 'office';
    const isRes = b.type === 'residential';
    const isTower = b.type === 'tower';
    
    // Vary opacity based on layer for depth
    const baseOpacity = layer === 1 ? 0.25 : layer === 2 ? 0.4 : 0.6;
    
    return (
      <div 
        className="relative border-t border-x border-white/10 flex flex-col items-center justify-end overflow-hidden"
        style={{ 
          height: `${b.h}%`, 
          width: `${b.w}%`, 
          borderRadius: `${b.r} ${b.r} 0 0`,
          backgroundColor: `rgba(var(--building-rgb), ${baseOpacity * 0.12})`,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        {/* Windows Grid */}
        {isOffice && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:12px_12px] mt-4 mx-1" />
        )}
        {isRes && (
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08)_2px,transparent_2px)] bg-[size:100%_16px] mt-2 mx-2" />
        )}
        {isTower && (
          <>
            <div className="absolute top-0 w-[2px] h-16 bg-white/20 -translate-y-full" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:8px_100%] mx-2" />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-surface transition-colors duration-500">
      {/* Cinematic Grain Texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-50 dark:opacity-[0.04] opacity-[0.02]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Dynamic Atmosphere / Glow */}
      <motion.div 
        style={{ backgroundColor: atmosphereColor, opacity: 0.4 }}
        className="absolute inset-0 mix-blend-screen"
      />

      {/* Subtle Ambient Light */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-tertiary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[90%] h-[90%] bg-tertiary/5 rounded-full blur-[200px]" />

      {/* Layer 1: Far Skyline */}
      <motion.div 
        className="absolute bottom-[-20vh] left-[-5%] w-[110%] h-[90vh] flex items-end justify-around px-4 blur-[6px]"
      >
        {buildingsLayer1.map((b, i) => <Building key={i} b={b} i={i} layer={1} />)}
      </motion.div>

      {/* Layer 2: Mid Skyline */}
      <motion.div 
        className="absolute bottom-[-25vh] left-[-5%] w-[110%] h-[80vh] flex items-end justify-between px-12 blur-[4px]"
      >
        {buildingsLayer2.map((b, i) => <Building key={i} b={b} i={i} layer={2} />)}
      </motion.div>

      {/* Layer 3: Close Skyline */}
      <motion.div 
        className="absolute bottom-[-30vh] left-[-5%] w-[110%] h-[70vh] flex items-end justify-around px-2 blur-[2px]"
      >
        {buildingsLayer3.map((b, i) => <Building key={i} b={b} i={i} layer={3} />)}
      </motion.div>

      {/* Top Gradient for text legibility */}
      <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-surface to-transparent transition-colors duration-500" />
      
      {/* Bottom Gradient for blending */}
      <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-gradient-to-t from-surface to-transparent transition-colors duration-500" />
    </div>
  );
};

const Navbar = ({ lang, setLang, onOpenCalendly }: { lang: Language, setLang: (l: Language) => void, onOpenCalendly: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 px-4 py-3 md:py-4 md:px-12",
      isScrolled ? "bg-surface/80 backdrop-blur-xl py-2 md:py-3 shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="h-7 sm:h-8 md:h-12 lg:h-14 flex items-center shrink-0 transition-transform hover:scale-105">
          <svg viewBox="0 0 550 120" className="h-full w-auto fill-current text-on-surface" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(60, 60) scale(1.2)">
              <path d="M -35 20 L -5 20 L 25 -30 L -5 -30 Z" />
              <path d="M 12 -5 L 42 -5 L 57 20 L 27 20 Z" />
            </g>
            <text x="140" y="70" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="52" textAnchor="start" letterSpacing="-1">
              Λzeta Homes.
            </text>
            <text x="145" y="100" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="400" fontSize="22" textAnchor="start" letterSpacing="0.5">
              Real Estate Group
            </text>
          </svg>
        </a>
        
        <div className="hidden md:flex gap-8 items-center">
          {[
            { name: t.testimonials, href: "#testimonials" },
            { name: t.about, href: "#about" },
            { name: t.calculator, href: "#calculator" },
            { name: t.faq, href: "#faq" },
          ].map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-on-surface-variant hover:text-on-surface font-label text-xs uppercase tracking-widest transition-all duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-1"
          >
            {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
          </button>
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="text-on-surface-variant hover:text-on-surface font-label text-[10px] md:text-xs uppercase tracking-widest p-1"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button 
            onClick={onOpenCalendly}
            className="bg-tertiary text-on-tertiary-fixed font-bold px-3 py-2 md:px-5 md:py-2 rounded-lg md:rounded-xl hover:scale-95 transition-all duration-200 text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
          >
            {t.book}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ lang, onOpenCalendly }: { lang: Language, onOpenCalendly: () => void }) => {
  const t = translations[lang].hero;
  const isMobile = useIsMobile();
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 md:pt-32 pb-8">
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl space-y-6 md:space-y-8 flex-1 flex flex-col justify-center items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="inline-flex items-center gap-3 bg-surface-container-high/40 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20 mb-4"
        >
          <div className="flex -space-x-2">
            <img className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="https://i.imgur.com/6d9Yalu.png" alt="Avatar" />
            <img className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="https://i.imgur.com/9XldcF4.png" alt="Avatar" />
            <img className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="https://i.imgur.com/TLkAKtr.png" alt="Avatar" />
          </div>
          <span className="text-xs font-label uppercase tracking-widest text-tertiary">{t.badge}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight tracking-tight max-w-4xl"
        >
          {t.title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-on-surface-variant text-base md:text-lg font-light leading-relaxed whitespace-pre-wrap"
        >
          {t.subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto mt-8 relative aspect-video rounded-3xl overflow-hidden group cursor-pointer shadow-2xl border border-white/10"
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920" 
            alt="Video Thumbnail" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:opacity-60">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-tertiary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(231,195,83,0.5)] transition-transform duration-500 group-hover:scale-110">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-on-tertiary-fixed fill-current" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full sm:w-auto px-4 sm:px-0"
        >
          <button 
            onClick={onOpenCalendly}
            className="w-full sm:w-auto bg-tertiary text-on-tertiary-fixed font-bold px-8 py-4 md:px-12 md:py-5 rounded-xl text-base md:text-lg hover:scale-[1.02] transition-all duration-1000 shadow-2xl shadow-tertiary/20"
          >
            {t.cta1}
          </button>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2 opacity-50 mt-12">
        <span className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface">Scroll</span>
        <div 
          className="w-[1px] h-12 bg-gradient-to-b from-tertiary to-transparent" 
        />
      </div>
    </section>
  );
};

const Services = ({ lang }: { lang: Language }) => {
  const t = translations[lang].services;
  const icons = [Home, Tag, TrendingUp, BadgeCheck, MapIcon, Compass];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <span className="text-tertiary font-label uppercase tracking-[0.3em] text-sm">{t.badge}</span>
        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl mt-4 text-on-surface">{t.title}</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {t.items.map((item, idx) => {
          const Icon = icons[idx] || Home;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.15, ease: "easeOut" }}
              className="bg-surface-container-low/80 backdrop-blur-sm p-6 md:p-10 rounded-3xl group hover:bg-surface-container-high transition-all duration-1000 border border-outline-variant/5"
            >
              <Icon className="w-10 h-10 text-tertiary mb-6 transition-transform duration-1000" />
              <h3 className="text-xl font-bold mb-4 text-on-surface">{item.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
const SuccessStories = ({ lang }: { lang: Language }) => {
  const testimonials = [
    {
      url: "https://i.imgur.com/YYpugoc.png",
      text: lang === 'es' 
        ? "Construir nuestra casa desde cero era algo que nos emocionaba, pero también nos daba un poco de miedo por todo lo que implica. Argenis nos acompañó en cada paso del proceso, desde elegir el builder hasta diseñar cada detalle de la casa a nuestro gusto."
        : "Building our house from scratch was something that excited us, but also gave us a bit of fear because of all that it implies. Argenis accompanied us in every step of the process, from choosing the builder to designing every detail of the house to our liking.",
      author: "Diego Craik & Maria Fermin – Katy, TX (Nueva Construcción)"
    },
    {
      url: "https://i.imgur.com/6hgCRQU.png",
      text: lang === 'es'
        ? "Me mudé desde New Jersey sin conocer mucho Houston, y Argenis fue clave en todo el proceso. Me orientó con las zonas, me mostró opciones y me ayudó a tomar la mejor decisión sin sentir presión. Gracias a él hoy tengo mi casa en Conroe y no podría estar más contento."
        : "I moved from New Jersey without knowing much about Houston, and Argenis was key in the whole process. He guided me with the areas, showed me options and helped me make the best decision without feeling pressure. Thanks to him today I have my house in Conroe and I couldn't be happier.",
      author: "Ruben Bello – Conroe, TX (desde New Jersey)"
    },
    {
      url: "https://i.imgur.com/oJTVUDH.png",
      text: lang === 'es'
        ? "Trabajar con Argenis fue una experiencia increíble. Desde el primer día nos explicó todo el proceso paso a paso y siempre estuvo disponible para responder nuestras dudas. Nos ayudó a encontrar una casa perfecta para nuestra familia en Spring."
        : "Working with Argenis was an incredible experience. From the first day he explained the whole process step by step and was always available to answer our questions. He helped us find a perfect home for our family in Spring.",
      author: "Javier Fuentes & Perla Fuentes – Spring, TX"
    },
    {
      url: "https://i.imgur.com/PFLRWAR.png",
      text: lang === 'es'
        ? "Argenis hizo que todo el proceso fuera mucho más fácil de lo que esperábamos. Nos ayudó a entender nuestras opciones y a tomar decisiones con confianza. Siempre estuvo pendiente de nosotros y negociando para conseguirnos lo mejor. Lo recomendamos 100%."
        : "Argenis made the whole process much easier than we expected. He helped us understand our options and make decisions with confidence. He was always looking out for us and negotiating to get us the best. We recommend him 100%.",
      author: "Cesar Mendoza & Arlene Acosta – Katy, TX"
    },
    {
      url: "https://i.imgur.com/gVoZjU9.png",
      text: lang === 'es'
        ? "Trabajar con Argenis fue una de las mejores decisiones que tomamos durante el proceso de compra. Desde el inicio nos hizo sentir seguros, nos explicó cada paso con claridad y siempre estuvo disponible para cualquier duda."
        : "Working with Argenis was one of the best decisions we made during the buying process. From the beginning he made us feel secure, explained each step clearly and was always available for any questions.",
      author: "Gabriel Tellez & Catherine Alcubilla – Katy, TX"
    },
    {
      url: "https://i.imgur.com/MWAcKKk.png",
      text: lang === 'es'
        ? "Desde el primer momento sentimos confianza trabajando con Argenis. Nos guió durante todo el proceso de compra de nuestra casa nueva y se aseguró de que todo saliera bien."
        : "From the first moment we felt confident working with Argenis. He guided us throughout the process of buying our new home and made sure everything went well.",
      author: "Omar Ali & Alicia – Katy, TX"
    },
    {
      url: "https://i.imgur.com/EicQfjn.png",
      text: lang === 'es'
        ? "Argenis nos ayudó durante todo el proceso de construir nuestra casa y fue clave para evitar errores. Nos orientó con el builder, los incentivos y cada decisión importante."
        : "Argenis helped us throughout the process of building our house and was key to avoiding mistakes. He guided us with the builder, the incentives and every important decision.",
      author: "Amarilys & Carlos – Katy, TX (Nueva Construcción)"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-transparent relative z-10 overflow-hidden w-full">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-tertiary font-label uppercase tracking-[0.3em] text-sm">
            {lang === 'es' ? 'Testimonios' : 'Testimonials'}
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl mt-4 text-on-surface">
            {lang === 'es' ? 'Historias que inspiran' : 'Stories that inspire'}
          </h2>
        </motion.div>

        <div className="relative flex items-center justify-center h-[450px] md:h-[600px]">
          <div className="relative w-full max-w-4xl flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {testimonials.map((item, idx) => {
                  let offset = idx - activeIndex;
                  if (offset > 2) offset -= testimonials.length;
                  if (offset < -2) offset += testimonials.length;
                  
                  const isCenter = offset === 0;
                  const isLeft = offset === -1;
                  const isRight = offset === 1;
                  
                  const isVisible = isCenter || isLeft || isRight;

                  return (
                    <motion.div
                      key={item.url}
                      initial={false}
                      animate={{ 
                        opacity: isCenter ? 1 : isVisible ? 0.4 : 0, 
                        scale: isCenter ? 1 : isVisible ? 0.85 : 0.7,
                        x: offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 250),
                        zIndex: isCenter ? 10 : isVisible ? 5 : 0,
                        filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                        pointerEvents: isCenter ? 'auto' : 'none'
                      }}
                      transition={{ type: 'spring', stiffness: 40, damping: 30, mass: 1 }}
                      className="absolute w-[280px] md:w-[380px] aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-white/10 group"
                      onClick={() => {
                        if (isVisible) setActiveIndex(idx);
                      }}
                  >
                    <img 
                      src={item.url} 
                      alt={`Success Story ${idx}`} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className={cn(
                      "absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6",
                      isCenter ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="transition-transform duration-500">
                        <p className="text-white font-serif italic text-xs md:text-sm leading-relaxed mb-2 md:mb-3 overflow-y-auto max-h-[120px] md:max-h-[160px] custom-scrollbar pr-2">
                          {item.text}
                        </p>
                        <p className="text-tertiary font-label uppercase tracking-widest text-[9px] md:text-[10px]">
                          — {item.author}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls & Dots */}
        <div className="flex flex-col items-center gap-8 mt-8">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary-fixed transition-all"
            >
              <ArrowRight className="rotate-180 w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary-fixed transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  activeIndex === i ? "w-8 bg-tertiary" : "w-2 bg-outline-variant/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = ({ lang, onOpenCalendly }: { lang: Language, onOpenCalendly: () => void }) => {
  const t = translations[lang].about;
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10">
            <img 
              className="w-full transition-all duration-700 cursor-pointer" 
              src="https://i.imgur.com/PrWEgtn.jpeg" 
              alt="Argenis Zabala" 
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-surface-container-high p-8 rounded-2xl border border-outline-variant/20 z-20 hidden md:block">
            <p className="font-headline text-3xl text-tertiary">6+</p>
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">{t.years}</p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="text-tertiary font-label uppercase tracking-[0.3em] text-sm">{t.badge}</span>
          <h2 className="font-headline text-4xl md:text-5xl leading-tight text-on-surface">{t.title}</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">{t.desc}</p>
          <div className="space-y-4">
            {t.points.map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-tertiary rounded-full" />
                <p className="text-on-surface">{p}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={onOpenCalendly}
            className="w-full md:w-auto bg-tertiary text-on-tertiary-fixed font-bold px-6 py-4 md:px-8 md:py-4 rounded-xl hover:scale-[1.02] transition-all duration-1000 shadow-xl shadow-tertiary/10"
          >
            {t.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const MortgageCalculator = ({ lang, onOpenCalendly }: { lang: Language, onOpenCalendly: () => void }) => {
  const t = translations[lang].calculator;
  const [value, setValue] = useState(450000);
  const [down, setDown] = useState(90000);
  const [rate, setRate] = useState(6.5);
  const [taxRate, setTaxRate] = useState(1.2);
  const [insurance, setInsurance] = useState(1200);
  const [hoa, setHoa] = useState(0);

  const principalAndInterest = ((value - down) * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -360));
  const monthlyTax = (value * (taxRate / 100)) / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyHoa = hoa;

  const monthly = Math.round(principalAndInterest + monthlyTax + monthlyInsurance + monthlyHoa);

  return (
    <section id="calculator" className="py-16 md:py-24 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="bg-surface-container-lowest/40 backdrop-blur-md p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl"
        >
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl mb-2 text-on-surface">{t.title}</h2>
            <p className="text-on-surface-variant">{t.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">{t.propertyValue}</label>
                <div className="relative">
                  <span className="absolute left-0 bottom-2 text-tertiary">$</span>
                  <input 
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-tertiary focus:ring-0 pl-6 pb-2 text-xl font-bold" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">{t.downPayment}</label>
                <div className="relative">
                  <span className="absolute left-0 bottom-2 text-tertiary">$</span>
                  <input 
                    type="number"
                    value={down}
                    onChange={(e) => setDown(Number(e.target.value))}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-tertiary focus:ring-0 pl-6 pb-2 text-xl font-bold" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">{t.interestRate}</label>
                  <div className="relative">
                    <input 
                      type="number"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-tertiary focus:ring-0 pb-2 text-xl font-bold" 
                    />
                    <span className="absolute right-0 bottom-2 text-on-surface-variant">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">{t.taxRate}</label>
                  <div className="relative">
                    <input 
                      type="number"
                      step="0.1"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-tertiary focus:ring-0 pb-2 text-xl font-bold" 
                    />
                    <span className="absolute right-0 bottom-2 text-on-surface-variant">%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">{t.insurance} /yr</label>
                  <div className="relative">
                    <span className="absolute left-0 bottom-2 text-tertiary">$</span>
                    <input 
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(Number(e.target.value))}
                      className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-tertiary focus:ring-0 pl-6 pb-2 text-xl font-bold" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">{t.hoa} /mo</label>
                  <div className="relative">
                    <span className="absolute left-0 bottom-2 text-tertiary">$</span>
                    <input 
                      type="number"
                      value={hoa}
                      onChange={(e) => setHoa(Number(e.target.value))}
                      className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-tertiary focus:ring-0 pl-6 pb-2 text-xl font-bold" 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-high rounded-3xl p-6 md:p-10 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant mb-4">{t.monthlyPayment}</p>
              <p className="text-4xl md:text-6xl font-headline text-tertiary mb-8">${monthly.toLocaleString()}</p>
              <button 
                onClick={onOpenCalendly}
                className="w-full bg-tertiary text-on-tertiary-fixed font-bold py-3 md:py-4 rounded-xl hover:bg-tertiary/90 hover:scale-[1.02] transition-all duration-1000 text-sm md:text-base"
              >
                {t.cta}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = ({ lang }: { lang: Language }) => {
  const t = translations[lang].faq;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight">{t.title}</h2>
        <div className="w-12 h-0.5 bg-tertiary/30 mx-auto mt-6" />
      </motion.div>
      <div className="max-w-3xl mx-auto space-y-4">
        {t.items.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-surface-container-low/40 backdrop-blur-md rounded-2xl border border-outline-variant/5 overflow-hidden hover:border-tertiary/20 transition-colors"
          >
            <button 
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-surface-container-high/30 transition-colors"
            >
              <span className="font-bold text-on-surface/90">{item.q}</span>
              <motion.div 
                animate={{ rotate: openIdx === i ? 180 : 0 }}
                className="text-tertiary/60"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-6 text-on-surface-variant/80 leading-relaxed"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;
  return (
    <footer className="bg-transparent w-full py-12 px-4 md:px-8 border-t border-white/10 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 550 120" className="h-8 md:h-10 w-auto fill-current text-on-surface" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(60, 60) scale(1.2)">
              <path d="M -35 20 L -5 20 L 25 -30 L -5 -30 Z" />
              <path d="M 12 -5 L 42 -5 L 57 20 L 27 20 Z" />
            </g>
            <text x="140" y="70" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="52" textAnchor="start" letterSpacing="-1">
              Λzeta Homes.
            </text>
            <text x="145" y="100" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="400" fontSize="22" textAnchor="start" letterSpacing="0.5">
              Real Estate Group
            </text>
          </svg>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body text-sm uppercase tracking-widest" href="#">{t.privacy}</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body text-sm uppercase tracking-widest" href="#">{t.terms}</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body text-sm uppercase tracking-widest" href="#">{t.contact}</a>
          </div>
          <div className="flex items-center gap-6">
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#"><Instagram className="w-5 h-5" /></a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.14-2.98 5.39-1.84 1.27-4.1 1.55-6.08.81-1.99-.75-3.53-2.38-4.1-4.38-.58-2.01-.11-4.24 1.1-5.88 1.21-1.65 3.12-2.65 5.11-2.77V14.1c-1.4.05-2.65.8-3.32 2.01-.66 1.2-.66 2.72.02 3.91.68 1.18 1.95 1.91 3.32 1.91 1.37 0 2.64-.73 3.32-1.91.68-1.19.68-2.71 0-3.91-.01-.01-.01-.02-.02-.03V.02z"/>
              </svg>
            </a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
        <p className="text-on-surface-variant font-body text-sm text-center md:text-right max-w-xs md:pr-20">
          {t.rights}
        </p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden w-full flex flex-col">
      <SkylineBackground />
      <Navbar lang={lang} setLang={setLang} onOpenCalendly={() => setIsCalendlyOpen(true)} />
      <Hero lang={lang} onOpenCalendly={() => setIsCalendlyOpen(true)} />
      
      <Services lang={lang} />
      <SuccessStories lang={lang} />
      <About lang={lang} onOpenCalendly={() => setIsCalendlyOpen(true)} />
      <MortgageCalculator lang={lang} onOpenCalendly={() => setIsCalendlyOpen(true)} />
      <FAQ lang={lang} />

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto bg-surface-container-lowest/40 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 relative overflow-hidden text-center border border-white/10 shadow-2xl"
        >
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-tertiary/10 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8 md:space-y-10">
            <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl text-on-surface">
              {lang === 'es' ? '¿Estás listo para dar el siguiente paso?' : 'Are you ready to take the next step?'}
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl">
              {lang === 'es' ? 'Houston te espera. Hagamos que tu visión se convierta en tu dirección.' : 'Houston awaits you. Let\'s turn your vision into your address.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4 md:pt-6">
              <button 
                onClick={() => setIsCalendlyOpen(true)}
                className="w-full sm:w-auto bg-tertiary text-on-tertiary-fixed font-bold px-8 py-4 md:px-12 md:py-5 rounded-2xl text-base md:text-lg hover:scale-[1.02] transition-all duration-1000 shadow-2xl shadow-tertiary/20"
              >
                {lang === 'es' ? 'Agenda tu Cita Ahora' : 'Schedule Your Appointment Now'}
              </button>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-surface-container-high border border-outline-variant/20 text-on-surface font-bold px-8 py-4 md:px-12 md:py-5 rounded-2xl text-base md:text-lg hover:bg-surface-container-highest transition-all duration-1000 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {lang === 'es' ? 'Escríbenos por WhatsApp' : 'Message on WhatsApp'}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer lang={lang} />

      {/* Floating WhatsApp */}
      <a 
        href="#" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-1000 z-[100] group"
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:scale-105 transition-transform duration-1000" />
      </a>

      {/* Calendly Modal */}
      {typeof window !== 'undefined' && (
        <PopupModal
          url="https://calendly.com/argeniszabala"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={document.getElementById('root') as HTMLElement}
        />
      )}
    </div>
  );
}
