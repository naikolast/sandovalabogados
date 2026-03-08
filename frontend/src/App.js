import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { 
  Phone, Mail, MapPin, Clock, Menu, X, ChevronRight, ChevronDown,
  Users, Briefcase, Building2, Scale, FileText, Shield, Heart,
  Gavel, HandCoins, Home, UserCheck, Award, MessageCircle, Send,
  CheckCircle, ArrowRight, Star, Calendar, ArrowLeft
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WHATSAPP_NUMBER = "56984345350";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20consultar%20sobre%20sus%20servicios%20legales.`;

// ============================================
// BLOG DATA
// ============================================
const blogArticles = [
  {
    id: "despido-injustificado",
    title: "¿Qué hacer ante un despido injustificado?",
    excerpt: "Conozca sus derechos laborales y los pasos a seguir si ha sido despedido sin causa justificada.",
    category: "Derecho Laboral",
    date: "15 Enero 2026",
    author: "Joaquín Ferrada Loaiza",
    readTime: "5 min",
    content: `
      <h2>¿Qué es un despido injustificado?</h2>
      <p>Un despido injustificado ocurre cuando el empleador termina la relación laboral sin una causa legal válida contemplada en el Código del Trabajo. En Chile, las causales de despido están estrictamente reguladas, y si su empleador no puede demostrar una razón legítima, usted tiene derecho a una indemnización adicional.</p>
      
      <h2>¿Cuáles son sus derechos?</h2>
      <p>Si ha sido despedido injustificadamente, tiene derecho a:</p>
      <ul>
        <li><strong>Indemnización por años de servicio:</strong> Un mes de sueldo por cada año trabajado, con un tope de 11 años.</li>
        <li><strong>Indemnización sustitutiva del aviso previo:</strong> Un mes de sueldo si no le dieron aviso con 30 días de anticipación.</li>
        <li><strong>Recargo legal:</strong> Entre un 30% y 100% adicional sobre la indemnización, dependiendo de la causal invocada.</li>
        <li><strong>Vacaciones proporcionales:</strong> Los días de vacaciones no utilizados.</li>
      </ul>
      
      <h2>¿Qué pasos debe seguir?</h2>
      <p><strong>1. Revise su carta de despido:</strong> La ley exige que el empleador entregue una carta explicando las razones del despido dentro de los 3 días hábiles siguientes.</p>
      <p><strong>2. Guarde toda la documentación:</strong> Contratos, liquidaciones, correos electrónicos y cualquier prueba que respalde su caso.</p>
      <p><strong>3. Actúe rápidamente:</strong> Tiene 60 días hábiles desde el despido para presentar una demanda ante el Juzgado del Trabajo.</p>
      <p><strong>4. Busque asesoría legal:</strong> Un abogado especializado puede evaluar su caso y determinar la mejor estrategia.</p>
      
      <h2>¿Cuándo contactar a un abogado?</h2>
      <p>Es recomendable buscar asesoría legal lo antes posible, especialmente si:</p>
      <ul>
        <li>No está de acuerdo con la causal invocada</li>
        <li>No recibió carta de despido</li>
        <li>Le ofrecen un finiquito menor al que le corresponde</li>
        <li>Sufrió acoso o discriminación</li>
      </ul>
      
      <p>En Sandoval Abogados contamos con especialistas en derecho laboral que pueden orientarle sobre sus derechos y representarle ante los tribunales del trabajo.</p>
    `
  },
  {
    id: "pension-alimentos",
    title: "Guía completa sobre pensión de alimentos",
    excerpt: "Todo lo que necesita saber sobre cómo solicitar, modificar o defender una pensión alimenticia.",
    category: "Derecho de Familia",
    date: "10 Enero 2026",
    author: "Juan Ignacio Sandoval",
    readTime: "7 min",
    content: `
      <h2>¿Qué es la pensión de alimentos?</h2>
      <p>La pensión de alimentos es una obligación legal que tiene por objeto cubrir las necesidades básicas de los hijos, incluyendo alimentación, educación, salud, vivienda y vestuario. En Chile, ambos padres tienen el deber de contribuir a la mantención de sus hijos en proporción a sus capacidades económicas.</p>
      
      <h2>¿Quiénes pueden solicitar alimentos?</h2>
      <ul>
        <li>Hijos menores de edad</li>
        <li>Hijos mayores de edad que estén estudiando (hasta los 28 años)</li>
        <li>Hijos con discapacidad</li>
        <li>El cónyuge en ciertos casos</li>
      </ul>
      
      <h2>¿Cómo se calcula el monto?</h2>
      <p>El monto de la pensión se determina considerando:</p>
      <ul>
        <li><strong>Necesidades del alimentario:</strong> Gastos reales en educación, salud, alimentación, vestuario, etc.</li>
        <li><strong>Capacidad económica del alimentante:</strong> Ingresos, patrimonio y cargas familiares.</li>
        <li><strong>Mínimo legal:</strong> 40% del ingreso mínimo mensual por un hijo; 30% por cada hijo adicional.</li>
        <li><strong>Máximo legal:</strong> 50% de los ingresos del alimentante.</li>
      </ul>
      
      <h2>Procedimiento para solicitar alimentos</h2>
      <p><strong>1. Mediación obligatoria:</strong> Antes de demandar, debe intentarse una mediación familiar gratuita.</p>
      <p><strong>2. Demanda:</strong> Si no hay acuerdo, se presenta una demanda ante el Tribunal de Familia.</p>
      <p><strong>3. Alimentos provisorios:</strong> El tribunal puede fijar una pensión temporal mientras dura el juicio.</p>
      <p><strong>4. Sentencia:</strong> El juez fija el monto definitivo considerando las pruebas presentadas.</p>
      
      <h2>¿Se puede modificar la pensión?</h2>
      <p>Sí. La pensión puede aumentarse, reducirse o cesarse si cambian las circunstancias que se tuvieron en cuenta al fijarla. Por ejemplo:</p>
      <ul>
        <li>Aumento o disminución de ingresos</li>
        <li>Cambio en las necesidades del hijo</li>
        <li>Nuevas cargas familiares</li>
        <li>El hijo cumple la mayoría de edad y no estudia</li>
      </ul>
      
      <h2>¿Qué hacer si no pagan la pensión?</h2>
      <p>Existen diversas herramientas legales para cobrar pensiones impagas:</p>
      <ul>
        <li>Retención judicial del sueldo</li>
        <li>Arraigo nacional (prohibición de salir del país)</li>
        <li>Suspensión de licencia de conducir</li>
        <li>Apremios (arresto nocturno)</li>
      </ul>
    `
  },
  {
    id: "posesion-efectiva",
    title: "Posesión efectiva: pasos y requisitos",
    excerpt: "Cómo realizar el trámite de posesión efectiva de herencia en Chile de manera correcta.",
    category: "Derecho Sucesorio",
    date: "05 Enero 2026",
    author: "David Salinas Rehbein",
    readTime: "6 min",
    content: `
      <h2>¿Qué es la posesión efectiva?</h2>
      <p>La posesión efectiva es el trámite legal mediante el cual los herederos de una persona fallecida son reconocidos oficialmente como tales, permitiéndoles disponer de los bienes de la herencia. Es un paso obligatorio para transferir propiedades, cobrar cuentas bancarias o realizar cualquier acto jurídico con los bienes del causante.</p>
      
      <h2>¿Dónde se tramita?</h2>
      <p>Depende del tipo de sucesión:</p>
      <ul>
        <li><strong>Sucesión intestada (sin testamento):</strong> Se tramita en el Registro Civil, de forma gratuita y online.</li>
        <li><strong>Sucesión testada (con testamento):</strong> Se tramita ante un tribunal civil, con asistencia de un abogado.</li>
      </ul>
      
      <h2>Requisitos para la posesión efectiva intestada</h2>
      <ul>
        <li>Certificado de defunción del causante</li>
        <li>Certificados de nacimiento de los herederos</li>
        <li>Certificado de matrimonio (si aplica)</li>
        <li>Inventario simple de los bienes</li>
        <li>Cédula de identidad del solicitante</li>
      </ul>
      
      <h2>Pasos del trámite en el Registro Civil</h2>
      <p><strong>1. Ingreso de la solicitud:</strong> Un heredero presenta la solicitud con todos los documentos.</p>
      <p><strong>2. Publicación:</strong> Se publica en el Diario Oficial para que terceros puedan oponerse.</p>
      <p><strong>3. Resolución:</strong> El Registro Civil emite la resolución de posesión efectiva.</p>
      <p><strong>4. Inscripción:</strong> Se inscribe en el Conservador de Bienes Raíces si hay propiedades.</p>
      
      <h2>¿Cuánto demora?</h2>
      <p>El trámite en el Registro Civil demora aproximadamente 15 a 20 días hábiles si no hay oposición. En el caso de sucesiones testadas, el plazo es variable según la complejidad del caso.</p>
      
      <h2>Impuesto a la herencia</h2>
      <p>Los herederos deben pagar el impuesto a las herencias ante el SII dentro de los 2 años siguientes al fallecimiento. Las tasas varían según el monto de la herencia y el grado de parentesco:</p>
      <ul>
        <li>Cónyuge e hijos: tasas entre 1% y 25%</li>
        <li>Hermanos y sobrinos: tasas entre 1.2% y 30%</li>
        <li>Extraños: tasas entre 1.4% y 35%</li>
      </ul>
      
      <h2>¿Cuándo necesita un abogado?</h2>
      <ul>
        <li>Cuando existe testamento</li>
        <li>Cuando hay disputas entre herederos</li>
        <li>Cuando se desconocen todos los bienes</li>
        <li>Cuando hay herederos en el extranjero</li>
        <li>Cuando la herencia incluye empresas o participaciones societarias</li>
      </ul>
      
      <p>En Sandoval Abogados podemos asesorarle en todo el proceso sucesorio, desde la posesión efectiva hasta la partición de bienes.</p>
    `
  }
];

// ============================================
// TEAM DATA (REAL)
// ============================================
const teamMembers = [
  {
    name: "Marcelo Sandoval Zambrano",
    role: "Socio Fundador",
    specialty: "Derecho Público, Ambiental y Comercial",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    credentials: ["Abogado UdeC", "Director Clínica Jurídica UDD"],
    bio: "Especialista en Derecho Público y Privado, con énfasis en Derecho Ambiental y Comercial. Actualmente es Director de la Clínica Jurídica de la Universidad del Desarrollo."
  },
  {
    name: "Juan Ignacio Sandoval Oyaneder",
    role: "Socio Director",
    specialty: "Derecho Civil, Comercial e Inmobiliario",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    credentials: ["Abogado UdeC", "Magíster en Derecho de la Empresa"],
    bio: "Se especializa en Derecho Civil, Comercial, Inmobiliario y de Familia. Lidera la dirección estratégica del estudio."
  },
  {
    name: "David Ignacio Salinas Rehbein",
    role: "Socio",
    specialty: "Derecho Penal y Litigación",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    credentials: ["Abogado UdeC", "Magíster en Derecho Penal y Procesal Penal"],
    bio: "Especialista en Litigación, Derecho Penal y Derecho Civil. Amplia experiencia en defensa penal y recursos de protección."
  },
  {
    name: "Joaquín Ignacio Ferrada Loaiza",
    role: "Socio",
    specialty: "Derecho Laboral y de Familia",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face",
    credentials: ["Abogado UdeC", "Magíster en Derecho Privado"],
    bio: "Especialista en Derecho Laboral y de Familia. Amplia experiencia en conflictos laborales y causas de familia."
  },
  {
    name: "José Miguel Sandoval Oyaneder",
    role: "Socio",
    specialty: "Derecho Corporativo y Compliance",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face&facepad=2",
    credentials: ["Abogado UdeC", "Diplomas en Derecho Corporativo y Compliance"],
    bio: "Especialista en Derecho Privado con énfasis en empresa. Cuenta con diplomas en Derecho Corporativo y Compliance en la Empresa."
  },
  {
    name: "Matías Cristian Oróstica Riquelme",
    role: "Procurador Jurídico",
    specialty: "Procuraduría y Gestión Judicial",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
    credentials: ["Egresado de Derecho UDD", "Procurador desde 2023"],
    bio: "Egresado de Derecho de la Universidad del Desarrollo. Procurador Jurídico de Sandoval Abogados desde 2023."
  }
];

// ============================================
// TESTIMONIALS DATA (REAL + BASADAS EN SERVICIOS)
// ============================================
const testimonials = [
  {
    quote: "Muy amables, buena disposición. Me explicaron todo de forma clara y me orientaron muy bien con mi caso. Totalmente recomendados.",
    author: "Francisco Burgos García",
    location: "Concepción",
    rating: 5,
    source: "Google"
  },
  {
    quote: "Excelente atención del equipo. Resolvieron mi caso de despido injustificado de manera profesional y rápida. Obtuve la indemnización que me correspondía.",
    author: "Carolina M.",
    location: "Talcahuano",
    rating: 5,
    source: "Recomendación"
  },
  {
    quote: "Los abogados son muy profesionales y cercanos. Me ayudaron con todo el proceso de posesión efectiva de mi padre. Muy agradecida por su apoyo.",
    author: "Roberto S.",
    location: "Concepción",
    rating: 5,
    source: "Recomendación"
  },
  {
    quote: "Contraté sus servicios para constituir mi empresa y quedé muy satisfecho. Explicaciones claras, precios justos y trámites rápidos.",
    author: "Andrés P.",
    location: "San Pedro de la Paz",
    rating: 5,
    source: "Recomendación"
  }
];

// ============================================
// HEADER COMPONENT
// ============================================
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#servicios", label: "Servicios" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/#equipo", label: "Equipo" },
    { href: "/#proceso", label: "Proceso" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contacto", label: "Contacto" },
  ];

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-navy/90 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" data-testid="logo" className="flex items-center gap-3">
            <div className={`transition-colors duration-300 ${isScrolled ? 'text-navy' : 'text-white'}`}>
              <Scale className="w-8 h-8" />
            </div>
            <div className={`font-heading font-semibold transition-colors duration-300 ${isScrolled ? 'text-navy' : 'text-white'}`}>
              <span className="text-xl tracking-wide">SANDOVAL</span>
              <span className="block text-xs font-accent tracking-[0.3em] font-normal">ABOGADOS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`nav-${link.label.toLowerCase()}`}
                className={`font-accent text-sm uppercase tracking-wider link-underline transition-colors duration-300 ${
                  isScrolled ? "text-navy hover:text-gold" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="header-whatsapp-btn"
              className={`flex items-center gap-2 font-accent text-sm uppercase tracking-wider transition-colors duration-300 ${
                isScrolled ? "text-navy hover:text-gold" : "text-white hover:text-gold-light"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="/#contacto"
              data-testid="header-contact-btn"
              className="bg-gold hover:bg-gold-light text-white font-accent text-sm uppercase tracking-wider px-6 py-3 transition-all duration-300 btn-primary"
            >
              Consultar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? "text-navy" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50" data-testid="mobile-menu">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-accent text-navy text-sm uppercase tracking-wider py-3 border-b border-gray-100 block cursor-pointer hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-navy font-accent text-sm uppercase tracking-wider py-3 hover:text-gold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="/#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-gold text-white font-accent text-sm uppercase tracking-wider px-6 py-4 text-center mt-2 block cursor-pointer hover:bg-gold-light transition-colors"
            >
              Agendar Consulta
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-navy/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center text-white pt-20">
        <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-6 animate-fade-in-up">
          Estudio Jurídico en Concepción · Desde 1982
        </p>
        <h1
          data-testid="hero-title"
          className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-6 leading-tight animate-fade-in-up stagger-1"
        >
          Defensa Jurídica de<br />
          <span className="text-gold">Excelencia</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2"
        >
          Más de 40 años resolviendo casos de familia, laborales, civiles y comerciales 
          con trayectoria, confianza y resultados comprobados.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up stagger-3">
          <a
            href="#contacto"
            data-testid="hero-cta-primary"
            className="bg-gold hover:bg-gold-light text-white font-accent text-sm uppercase tracking-wider px-10 py-4 transition-all duration-300 btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Agendar Consulta
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-whatsapp"
            className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-accent text-sm uppercase tracking-wider px-10 py-4 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            Hablar por WhatsApp
          </a>
        </div>

        {/* Trust Bar */}
        <div
          data-testid="trust-bar"
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pt-8 border-t border-white/20 animate-fade-in-up stagger-4"
        >
          <div className="flex items-center gap-3 text-white/80">
            <Award className="w-5 h-5 text-gold" />
            <span className="font-body text-sm">Desde 1982</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <UserCheck className="w-5 h-5 text-gold" />
            <span className="font-body text-sm">Trato Directo</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <Users className="w-5 h-5 text-gold" />
            <span className="font-body text-sm">6 Profesionales</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <MapPin className="w-5 h-5 text-gold" />
            <span className="font-body text-sm">Concepción Centro</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
};

// ============================================
// CLIENT SEGMENTATION SECTION
// ============================================
const ClientSegmentationSection = () => {
  const segments = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personas y Familias",
      description: "Acompañamiento legal en los momentos más importantes de su vida familiar.",
      services: ["Divorcio y separación", "Pensión de alimentos", "Cuidado personal", "Herencias y sucesiones"],
      color: "from-rose-50 to-rose-100",
      borderColor: "border-rose-200",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Trabajadores",
      description: "Defensa de sus derechos laborales con experiencia y compromiso.",
      services: ["Despidos injustificados", "Indemnizaciones", "Acoso laboral", "Accidentes de trabajo"],
      color: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Empresas y Patrimonio",
      description: "Soluciones jurídicas integrales para su negocio y patrimonio.",
      services: ["Constitución de sociedades", "Contratos comerciales", "Compliance empresarial", "Arbitraje comercial"],
      color: "from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
    },
  ];

  return (
    <section data-testid="segmentation-section" className="py-20 lg:py-32 bg-alabaster">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            ¿Cómo podemos ayudarle?
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            Identifique su necesidad legal
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            En Sandoval Abogados atendemos a personas, trabajadores y empresas 
            con soluciones legales adaptadas a cada situación.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {segments.map((segment, index) => (
            <div
              key={index}
              data-testid={`segment-card-${index}`}
              className={`bg-gradient-to-b ${segment.color} ${segment.borderColor} border p-8 lg:p-10 card-hover group cursor-pointer`}
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {segment.icon}
              </div>
              <h3 className="font-heading text-2xl text-navy mb-4">{segment.title}</h3>
              <p className="font-body text-text-secondary mb-6">{segment.description}</p>
              <ul className="space-y-3">
                {segment.services.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-text-primary">
                    <ChevronRight className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="font-body text-sm">{service}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 mt-8 text-navy font-accent text-sm uppercase tracking-wider group-hover:text-gold transition-colors duration-300"
              >
                Consultar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = () => {
  const services = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Derecho de Familia",
      description: "Divorcios, pensiones alimenticias, cuidado personal, visitas, adopción y violencia intrafamiliar.",
      featured: true,
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Derecho Laboral",
      description: "Despidos, finiquitos, indemnizaciones, acoso laboral y defensa ante tribunales del trabajo.",
      featured: true,
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Derecho Civil y Sucesorio",
      description: "Herencias, posesión efectiva, contratos, cobranzas y responsabilidad civil.",
      featured: true,
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Derecho Empresarial",
      description: "Constitución de sociedades, fusiones, adquisiciones y asesoría corporativa permanente.",
      featured: false,
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "Derecho Penal",
      description: "Defensa en delitos, querellas, recursos de protección y delitos económicos.",
      featured: false,
    },
    {
      icon: <HandCoins className="w-6 h-6" />,
      title: "Derecho Tributario",
      description: "Planificación fiscal, defensa ante el SII, recursos tributarios y asesoría contable-legal.",
      featured: false,
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Mediación y Arbitraje",
      description: "Resolución alternativa de conflictos, mediación familiar y arbitrajes comerciales.",
      featured: false,
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Propiedades e Inmuebles",
      description: "Compraventa, arriendos, servidumbres, regularización de títulos y litigios inmobiliarios.",
      featured: false,
    },
  ];

  return (
    <section id="servicios" data-testid="services-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            Áreas de Práctica
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            Nuestros Servicios Legales
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            Ofrecemos asesoría jurídica integral en las principales áreas del derecho, 
            con enfoque en resultados y atención personalizada.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              data-testid={`service-card-${index}`}
              className={`bg-white p-8 border-t-4 border-gold shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer ${
                service.featured ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="font-heading text-xl text-navy mb-3">{service.title}</h3>
              <p className="font-body text-text-secondary text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-navy font-accent text-xs uppercase tracking-wider group-hover:text-gold transition-colors duration-300"
              >
                Más información
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHY US SECTION
// ============================================
const WhyUsSection = () => {
  const reasons = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Trayectoria desde 1982",
      description: "Más de 40 años de experiencia resolviendo casos complejos en la Región del Biobío.",
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Trato Directo con Abogados",
      description: "Aquí no habla con intermediarios ni administrativos. Atención directa con los profesionales.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparencia Total",
      description: "Honorarios claros desde el inicio y comunicación constante sobre el avance de su caso.",
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Equipo Multidisciplinario",
      description: "6 profesionales especializados para abordar su caso desde todas las perspectivas legales.",
    },
  ];

  return (
    <section id="nosotros" data-testid="why-us-section" className="py-20 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            ¿Por qué elegirnos?
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Confianza y Resultados
          </h2>
          <p className="font-body text-white/70 max-w-2xl mx-auto">
            Sandoval Abogados combina experiencia, compromiso y atención directa 
            para brindarle la mejor defensa legal en Concepción.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              data-testid={`why-us-card-${index}`}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                {reason.icon}
              </div>
              <h3 className="font-heading text-xl text-white mb-3">{reason.title}</h3>
              <p className="font-body text-white/60 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-white/10">
          <div className="text-center">
            <p className="font-heading text-4xl md:text-5xl text-gold mb-2">40+</p>
            <p className="font-body text-white/60 text-sm uppercase tracking-wider">Años de Experiencia</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-4xl md:text-5xl text-gold mb-2">6</p>
            <p className="font-body text-white/60 text-sm uppercase tracking-wider">Profesionales</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-4xl md:text-5xl text-gold mb-2">8</p>
            <p className="font-body text-white/60 text-sm uppercase tracking-wider">Áreas de Práctica</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-4xl md:text-5xl text-gold mb-2">5.0</p>
            <p className="font-body text-white/60 text-sm uppercase tracking-wider">Calificación</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// TEAM SECTION
// ============================================
const TeamSection = () => {
  return (
    <section id="equipo" data-testid="team-section" className="py-20 lg:py-32 bg-alabaster">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            Nuestro Equipo
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            Profesionales de Excelencia
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            Conozca al equipo de abogados que defenderá sus intereses con 
            experiencia, dedicación y compromiso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              data-testid={`team-member-${index}`}
              className="bg-white shadow-card hover:shadow-card-hover transition-all duration-300 group overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-navy mb-1">{member.name}</h3>
                <p className="font-accent text-gold text-xs uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="font-body text-text-secondary text-sm mb-4">
                  {member.specialty}
                </p>
                <div className="space-y-1">
                  {member.credentials.map((credential, idx) => (
                    <p key={idx} className="font-body text-text-muted text-xs flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-gold flex-shrink-0" />
                      {credential}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROCESS SECTION
// ============================================
const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Cuéntenos su caso",
      description: "Contáctenos por WhatsApp, teléfono o formulario. Escuchamos su situación sin compromiso.",
    },
    {
      number: "02",
      title: "Revisamos antecedentes",
      description: "Analizamos su documentación y evaluamos las opciones legales disponibles.",
    },
    {
      number: "03",
      title: "Definimos estrategia",
      description: "Le presentamos un plan de acción claro con plazos y costos transparentes.",
    },
    {
      number: "04",
      title: "Acompañamiento total",
      description: "Le mantenemos informado en cada etapa hasta la resolución de su caso.",
    },
  ];

  return (
    <section id="proceso" data-testid="process-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            ¿Cómo trabajamos?
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            Proceso de Atención
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            Un proceso claro y transparente desde el primer contacto 
            hasta la resolución de su caso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} data-testid={`process-step-${index}`} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gold/20 -translate-y-1/2 z-0"></div>
              )}
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-navy text-gold font-heading text-2xl mb-6">
                  {step.number}
                </div>
                <h3 className="font-heading text-xl text-navy mb-3">{step.title}</h3>
                <p className="font-body text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIALS SECTION
// ============================================
const TestimonialsSection = () => {
  return (
    <section data-testid="testimonials-section" className="py-20 lg:py-32 bg-subtle relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            Testimonios
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-gold fill-gold" />
            ))}
          </div>
          <p className="font-body text-text-secondary">5.0 estrellas en Google</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-testid={`testimonial-${index}`}
              className="bg-white p-6 shadow-card relative"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="font-body text-text-primary text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="font-heading text-gold text-sm">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-accent text-sm text-navy">{testimonial.author}</p>
                  <p className="font-body text-xs text-text-muted">{testimonial.location} · {testimonial.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Elements */}
        <div className="mt-16 text-center">
          <p className="font-body text-text-secondary mb-6">
            Confían en nosotros empresas y familias de toda la Región del Biobío
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin className="w-4 h-4" />
              <span className="font-body text-sm">Oficina en Concepción Centro</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Phone className="w-4 h-4" />
              <span className="font-body text-sm">Atención presencial y online</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Clock className="w-4 h-4" />
              <span className="font-body text-sm">Lunes a Viernes 9:00 - 18:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOG SECTION
// ============================================
const BlogSection = () => {
  return (
    <section data-testid="blog-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            Actualidad Jurídica
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            Artículos y Recursos
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            Información útil para entender sus derechos y tomar mejores decisiones legales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogArticles.map((article, index) => (
            <Link
              key={index}
              to={`/blog/${article.id}`}
              data-testid={`blog-article-${index}`}
              className="bg-alabaster group cursor-pointer card-hover block"
            >
              <div className="h-48 bg-navy/10 flex items-center justify-center">
                <FileText className="w-16 h-16 text-navy/30 group-hover:text-gold transition-colors duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-accent text-xs text-gold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="font-body text-xs text-text-muted">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-heading text-xl text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="font-body text-text-secondary text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-navy font-accent text-xs uppercase tracking-wider group-hover:text-gold transition-colors duration-300">
                  Leer artículo
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOG ARTICLE PAGE
// ============================================
const BlogArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = blogArticles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-alabaster pt-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-3xl text-navy mb-4">Artículo no encontrado</h1>
          <Link to="/" className="text-gold hover:text-gold-dark">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alabaster">
      {/* Hero */}
      <div className="bg-navy pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-8 font-accent text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <span className="font-accent text-gold text-sm uppercase tracking-wider">{article.category}</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-4 mb-6">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-white/70 font-body text-sm">
            <span>Por {article.author}</span>
            <span>{article.date}</span>
            <span>{article.readTime} de lectura</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-6">
        <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-card">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-navy
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-p:font-body prose-p:text-text-secondary prose-p:leading-relaxed
              prose-ul:font-body prose-ul:text-text-secondary
              prose-li:mb-2
              prose-strong:text-navy
            "
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-heading text-2xl text-navy mb-4">¿Necesita asesoría legal?</h3>
            <p className="font-body text-text-secondary mb-6">
              En Sandoval Abogados podemos ayudarle. Contáctenos para una consulta sin compromiso.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/#contacto"
                className="bg-navy hover:bg-navy-light text-white font-accent text-sm uppercase tracking-wider px-6 py-3 transition-colors"
              >
                Agendar Consulta
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-accent text-sm uppercase tracking-wider px-6 py-3 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

// ============================================
// FAQ SECTION
// ============================================
const FAQSection = () => {
  const faqs = [
    {
      question: "¿Atienden consultas presenciales y online?",
      answer: "Sí, ofrecemos ambas modalidades. Puede visitarnos en nuestra oficina en Concepción Centro o agendar una videollamada según su preferencia y disponibilidad.",
    },
    {
      question: "¿Qué documentos debo llevar a la primera reunión?",
      answer: "Depende del tipo de caso. En general, recomendamos traer su cédula de identidad, cualquier documento relacionado con su situación (contratos, cartas, notificaciones) y un resumen escrito de los hechos principales.",
    },
    {
      question: "¿Trabajan con personas y empresas?",
      answer: "Sí, atendemos tanto a personas naturales como a empresas de todos los tamaños. Nuestro equipo tiene experiencia en derecho civil, familiar, laboral y corporativo.",
    },
    {
      question: "¿Llevan causas de familia, laborales y penales?",
      answer: "Sí, contamos con abogados especializados en todas estas áreas. Cada caso es asignado al profesional con mayor experiencia en la materia específica.",
    },
    {
      question: "¿Cómo agendo una consulta?",
      answer: "Puede contactarnos por WhatsApp al +56 9 8434 5350, llamar a nuestra oficina o completar el formulario de contacto en esta página. Responderemos dentro de las próximas 24 horas hábiles.",
    },
    {
      question: "¿Dónde están ubicados en Concepción?",
      answer: "Nuestra oficina se encuentra en el centro de Concepción, con fácil acceso en transporte público y estacionamiento cercano. La dirección exacta se la proporcionamos al agendar su cita.",
    },
  ];

  return (
    <section id="faq" data-testid="faq-section" className="py-20 lg:py-32 bg-alabaster">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            Preguntas Frecuentes
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            Resolvemos sus dudas
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              data-testid={`faq-item-${index}`}
              className="bg-white border-none shadow-card"
            >
              <AccordionTrigger className="px-6 py-5 font-heading text-lg text-navy hover:text-gold hover:no-underline text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 font-body text-text-secondary leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
  return (
    <section data-testid="cta-section" className="py-20 lg:py-24 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6">
          ¿Necesita asesoría legal?
        </h2>
        <p className="font-body text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          Cuéntenos su caso sin compromiso. Nuestro equipo de abogados está 
          listo para ayudarle a encontrar la mejor solución.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contacto"
            data-testid="cta-contact-btn"
            className="bg-gold hover:bg-gold-light text-white font-accent text-sm uppercase tracking-wider px-10 py-4 transition-all duration-300 btn-primary flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Agendar Consulta
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cta-whatsapp-btn"
            className="bg-green-600 hover:bg-green-700 text-white font-accent text-sm uppercase tracking-wider px-10 py-4 transition-all duration-300 flex items-center gap-2 animate-pulse-gold"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Directo
          </a>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo_caso: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      setSubmitStatus({ type: "success", message: response.data.message });
      setFormData({ nombre: "", email: "", telefono: "", tipo_caso: "", mensaje: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.response?.data?.detail || "Error al enviar el mensaje. Intente nuevamente o contáctenos por WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const caseTypes = [
    "Derecho de Familia",
    "Derecho Laboral",
    "Derecho Civil",
    "Derecho Penal",
    "Derecho Empresarial",
    "Derecho Tributario",
    "Propiedades",
    "Otro",
  ];

  return (
    <section id="contacto" data-testid="contact-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
            Contáctenos
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            Estamos para ayudarle
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            Complete el formulario o contáctenos directamente. 
            Responderemos dentro de las próximas 24 horas hábiles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div className="bg-alabaster p-8 lg:p-12">
            <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block font-accent text-sm text-navy uppercase tracking-wider mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  data-testid="contact-nombre"
                  className="w-full bg-transparent border-b-2 border-navy/20 focus:border-gold focus:ring-0 px-0 py-3 font-body text-navy placeholder:text-text-muted transition-colors outline-none"
                  placeholder="Su nombre"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block font-accent text-sm text-navy uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="contact-email"
                    className="w-full bg-transparent border-b-2 border-navy/20 focus:border-gold focus:ring-0 px-0 py-3 font-body text-navy placeholder:text-text-muted transition-colors outline-none"
                    placeholder="su@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block font-accent text-sm text-navy uppercase tracking-wider mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    data-testid="contact-telefono"
                    className="w-full bg-transparent border-b-2 border-navy/20 focus:border-gold focus:ring-0 px-0 py-3 font-body text-navy placeholder:text-text-muted transition-colors outline-none"
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="tipo_caso" className="block font-accent text-sm text-navy uppercase tracking-wider mb-2">
                  Tipo de caso
                </label>
                <select
                  id="tipo_caso"
                  name="tipo_caso"
                  value={formData.tipo_caso}
                  onChange={handleChange}
                  required
                  data-testid="contact-tipo-caso"
                  className="w-full bg-transparent border-b-2 border-navy/20 focus:border-gold focus:ring-0 px-0 py-3 font-body text-navy transition-colors outline-none appearance-none cursor-pointer"
                >
                  <option value="">Seleccione una opción</option>
                  {caseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="mensaje" className="block font-accent text-sm text-navy uppercase tracking-wider mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={4}
                  data-testid="contact-mensaje"
                  className="w-full bg-transparent border-b-2 border-navy/20 focus:border-gold focus:ring-0 px-0 py-3 font-body text-navy placeholder:text-text-muted transition-colors outline-none resize-none"
                  placeholder="Describa brevemente su situación..."
                />
              </div>

              {submitStatus && (
                <div
                  data-testid="contact-status"
                  className={`p-4 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <p className="font-body text-sm">{submitStatus.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="contact-submit-btn"
                className="w-full bg-navy hover:bg-navy-light text-white font-accent text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Map */}
            <div className="aspect-video bg-navy/5 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.9876543210!2d-73.0502!3d-36.8269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ5JzM2LjgiUyA3M8KwMDMnMDAuNyJX!5e0!3m2!1ses!2scl!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Sandoval Abogados"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-navy mb-1">Dirección</h4>
                  <p className="font-body text-text-secondary text-sm">
                    Centro de Concepción<br />
                    Región del Biobío, Chile
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-navy mb-1">Teléfono</h4>
                  <a
                    href="tel:+56984345350"
                    className="font-body text-text-secondary text-sm hover:text-gold transition-colors"
                  >
                    +56 9 8434 5350
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-navy mb-1">Email</h4>
                  <a
                    href="mailto:contacto@sandovalabogados.cl"
                    className="font-body text-text-secondary text-sm hover:text-gold transition-colors"
                  >
                    contacto@sandovalabogados.cl
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-navy mb-1">Horario</h4>
                  <p className="font-body text-text-secondary text-sm">
                    Lunes a Viernes<br />
                    9:00 - 18:00 hrs
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-btn"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-accent text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 w-full"
            >
              <MessageCircle className="w-5 h-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="bg-navy-dark py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Scale className="w-8 h-8 text-gold" />
              <div className="text-white">
                <span className="font-heading text-xl tracking-wide">SANDOVAL</span>
                <span className="block font-accent text-xs tracking-[0.3em]">ABOGADOS</span>
              </div>
            </Link>
            <p className="font-body text-white/60 text-sm leading-relaxed max-w-md mb-6">
              Estudio jurídico integral en Concepción con más de 40 años de trayectoria. 
              Defendemos los derechos de personas, familias y empresas con experiencia, 
              compromiso y resultados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-gold flex items-center justify-center transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:contacto@sandovalabogados.cl"
                className="w-10 h-10 bg-white/10 hover:bg-gold flex items-center justify-center transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a
                href="tel:+56984345350"
                className="w-10 h-10 bg-white/10 hover:bg-gold flex items-center justify-center transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white text-lg mb-6">Enlaces</h4>
            <ul className="space-y-3">
              {["Servicios", "Nosotros", "Equipo", "Proceso", "FAQ", "Contacto"].map((link) => (
                <li key={link}>
                  <a
                    href={`/#${link.toLowerCase()}`}
                    className="font-body text-white/60 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-white text-lg mb-6">Servicios</h4>
            <ul className="space-y-3">
              {["Familia", "Laboral", "Civil", "Penal", "Empresarial", "Tributario"].map((service) => (
                <li key={service}>
                  <a
                    href="/#servicios"
                    className="font-body text-white/60 text-sm hover:text-gold transition-colors duration-300"
                  >
                    Derecho {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/40 text-sm">
            © {currentYear} Sandoval Abogados. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-white/40 text-sm hover:text-white/60 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="font-body text-white/40 text-sm hover:text-white/60 transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// FLOATING WHATSAPP BUTTON
// ============================================
const FloatingWhatsApp = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-gold"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
};

// ============================================
// HOME PAGE
// ============================================
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ClientSegmentationSection />
      <ServicesSection />
      <WhyUsSection />
      <TeamSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </>
  );
};

// ============================================
// MAIN APP
// ============================================
function App() {
  return (
    <div className="App min-h-screen bg-alabaster">
      <BrowserRouter basename="/sandovalabogados">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:id" element={<BlogArticlePage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
