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

## What's Been Implemented (Jan 8, 2026)

### Iteration 2 Updates
- ✅ **Equipo Real** - 6 profesionales con datos reales:
  1. Marcelo Sandoval Zambrano - Socio Fundador
  2. Juan Ignacio Sandoval Oyaneder - Socio Director
  3. David Ignacio Salinas Rehbein - Socio (Penal)
  4. Joaquín Ignacio Ferrada Loaiza - Socio (Laboral/Familia)
  5. José Miguel Sandoval Oyaneder - Socio (Corporativo)
  6. Matías Cristian Oróstica Riquelme - Procurador Jurídico

- ✅ **Blogs Funcionales** - 3 artículos completos con navegación:
  1. ¿Qué hacer ante un despido injustificado?
  2. Guía completa sobre pensión de alimentos
  3. Posesión efectiva: pasos y requisitos

- ✅ **Reseñas Reales** - Incluyendo la de Francisco Burgos García de Google

### Frontend (React + Tailwind + React Router)
- ✅ Header sticky con navegación responsive
- ✅ Hero section con imagen jurídica y trust bar (Desde 1982, Trato Directo, 6 Profesionales)
- ✅ Segmentación por tipo de cliente (3 cards)
- ✅ Grid de servicios (8 áreas legales)
- ✅ Sección "Por qué elegirnos" con estadísticas
- ✅ Sección equipo (6 miembros reales)
- ✅ Proceso de atención (4 pasos)
- ✅ Testimonios (4, incluyendo reseña real de Google)
- ✅ Blog funcional con 3 artículos y páginas individuales
- ✅ FAQ acordeón (6 preguntas)
- ✅ CTA final
- ✅ Formulario de contacto con validación
- ✅ Footer con enlaces
- ✅ WhatsApp floating button
- ✅ Mobile responsive
- ✅ SEO meta tags y Schema.org

### Backend (FastAPI)
- ✅ API /api/contact para envío de emails
- ✅ Integración con Resend (requiere verificación de dominio)

### Design System
- Colores: Navy (#0A192F), Gold (#C5A059), Alabaster (#F9F9F7)
- Fonts: Playfair Display, Lato, Montserrat
- Estilo: Premium, sobrio, jurídico

## Configuration Notes
### Resend Email (Requires Domain Verification)
Para producción: verificar dominio sandovalabogados.cl en resend.com/domains

## Prioritized Backlog

### P0 - Critical (Pre-launch)
- [ ] Verificar dominio en Resend para emails de contacto
- [ ] Reemplazar fotos placeholder con fotos reales del equipo

### P1 - High Priority
- [ ] Crear páginas individuales por servicio
- [ ] Agregar más artículos al blog

### P2 - Medium Priority
- [ ] Analytics (Google Analytics)
- [ ] Política de privacidad y términos

## Tech Stack
- Frontend: React 19, Tailwind CSS, Lucide React, React Router
- Backend: FastAPI, Resend
- Deployment: Compatible con GitHub Pages
