# Sandoval Abogados - Website Redesign PRD

## Original Problem Statement
Rediseño completo de la web de Sandoval Abogados, estudio jurídico integral en Concepción Chile desde 1982. 
- Sitio estático, premium, moderno, sobrio
- Orientado a conversión y captación de clientes
- Compatible con GitHub Pages
- Sin branding de Emergent
- Formulario de contacto con Resend
- WhatsApp: +56 9 8434 5350

## User Personas
1. **Personas y Familias**: Divorcios, pensiones, herencias, conflictos civiles
2. **Trabajadores**: Despidos, indemnizaciones, acoso laboral
3. **Empresas**: Sociedades, contratos, tributario, arbitraje

## Core Requirements (Static)
- Header sticky con navegación
- Hero con CTAs (Agendar Consulta, WhatsApp)
- Barra de confianza (desde 1982, atención directa, Concepción)
- Segmentación por tipo de cliente
- 8 áreas de práctica legal
- Sección equipo (4 abogados)
- Proceso de atención (4 pasos)
- Testimoniales y blog
- FAQ acordeón
- Formulario de contacto con email (Resend)
- SEO local optimizado
- Mobile-first design

## What's Been Implemented (Jan 8, 2026)
### Frontend (React + Tailwind)
- ✅ Header sticky con navegación responsive
- ✅ Hero section con imagen, título, CTAs y trust bar
- ✅ Segmentación por tipo de cliente (3 cards)
- ✅ Grid de servicios (8 áreas legales)
- ✅ Sección "Por qué elegirnos" con estadísticas
- ✅ Sección equipo (4 miembros)
- ✅ Proceso de atención (4 pasos)
- ✅ Testimonios (3)
- ✅ Blog/Actualidad (3 artículos)
- ✅ FAQ acordeón (6 preguntas)
- ✅ CTA final
- ✅ Formulario de contacto con validación
- ✅ Footer con enlaces y redes
- ✅ WhatsApp floating button
- ✅ Mobile responsive
- ✅ SEO meta tags y Schema.org

### Backend (FastAPI)
- ✅ API /api/contact para envío de emails
- ✅ Integración con Resend

### Design System
- Colores: Navy (#0A192F), Gold (#C5A059), Alabaster (#F9F9F7)
- Fonts: Playfair Display, Lato, Montserrat
- Estilo: Premium, sobrio, jurídico

## Configuration Notes
### Resend Email (Requires Domain Verification)
- API Key configurada en backend/.env
- Para producción: verificar dominio sandovalabogados.cl en resend.com/domains
- Cambiar SENDER_EMAIL a email@sandovalabogados.cl verificado

## Prioritized Backlog

### P0 - Critical (Pre-launch)
- [ ] Verificar dominio en Resend para emails de contacto
- [ ] Agregar fotos reales del equipo

### P1 - High Priority
- [ ] Crear páginas individuales por servicio
- [ ] Expandir blog con artículos reales
- [ ] Agregar testimonios reales de clientes

### P2 - Medium Priority
- [ ] Analytics (Google Analytics/Tag Manager)
- [ ] Optimización de imágenes (lazy loading)
- [ ] Página de política de privacidad
- [ ] Página de términos de uso

### P3 - Future Enhancements
- [ ] Chat en vivo
- [ ] Sistema de citas online
- [ ] Portal de clientes
- [ ] Blog con CMS

## Tech Stack
- Frontend: React 19, Tailwind CSS 3.4, Lucide React
- Backend: FastAPI, Resend (email)
- Deployment: Compatible con GitHub Pages (build estático)

## Files Structure
```
/app/
├── backend/
│   ├── server.py          # FastAPI + Resend integration
│   └── .env               # RESEND_API_KEY, MONGO_URL
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main app (todas las secciones)
│   │   ├── index.css      # Estilos globales + fonts
│   │   └── components/ui/ # Shadcn components
│   ├── public/
│   │   └── index.html     # SEO meta tags + Schema.org
│   └── tailwind.config.js # Colores custom
└── design_guidelines.json # Directrices de diseño
```
