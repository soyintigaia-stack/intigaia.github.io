# Estado del proyecto — Intigaia / soyintigaia@gmail.com
Fecha: 4 de agosto de 2026

## Quién es la usuaria
- **Veronica Lorena Nuñez** — desarrolladora/agencia, Ushuaia, Argentina
- Email: soyintigaia@gmail.com
- GitHub: soyintigaia-stack
- Vercel propio: team_KkdWho03nuT01xZv9TnPpmHT (soyintigaia-4152s-projects)

## Filosofía de trabajo
- Vero crea y es dueña de todo el código
- Los clientes tienen su propio Vercel, pero el repo GitHub sigue siendo de soyintigaia-stack
- Flujo: trabaja el código acá → push a GitHub → Vercel del cliente se actualiza solo
- No cede código a clientes

---

## TRES DECO (cliente: Dante)

### Ecosistema — 3 componentes separados pero conectados

#### 1. tresdecoweb — La vidriera pública
- Web pública que ven los clientes (catálogo, marca, captación)
- Repo: soyintigaia-stack/tresdecoweb
- URL: tresdecoweb.vercel.app
- Estado: en desarrollo/mejora, con errores de deploy, SIN dominio propio asignado
- NO eliminar — está pendiente de terminar

#### 2. TresDeco-sistema-v2 — El sistema operativo interno
- CRM kanban, gestión de órdenes estándar y a medida, taller, operarios, entregas, postventa, remarketing, cotizador, generador de contenido IA
- Repo: soyintigaia-stack/TresDeco-sistema-v2 (Next.js + TypeScript)
- Vercel: cuenta de Dante (slug: tresdeco), proyecto tres-deco-sistema-v2-f1mh
- DB: Neon Postgres
- Dominios activos (migrados el 4 ago 2026):
  - tresdecoamoblamientos.com
  - www.tresdecoamoblamientos.com
  - app.tresdecoamoblamientos.com (acceso principal)
- Estado: en producción ✅

#### 3. Tyche / Ángela — La plataforma de comunicación IA
- Plataforma propia donde vive Ángela (la vendedora IA de WhatsApp)
- Ángela califica leads, informa precios desde Google Sheets en tiempo real, deriva al Closer
- Conectada al CRM vía webhooks (Supabase)
- URL: tyche-xi.vercel.app
- Repo: soyintigaia-stack/tyche
- IMPORTANTE: Tyche es un sistema SEPARADO del sistema interno, no está integrado dentro de TresDeco-sistema-v2. Se comunican por webhook.

### Flujos de venta
- **Estándar:** Meta Ads → WhatsApp → Ángela califica → CRM → Orden de taller → Entrega
- **A medida / personalizado:** detección por bot → Dante toma el lead → visita técnica → presupuesto → relevamiento → código TR-AÑO-NNN → producción por etapas → instalación
- El 90% de los proyectos de Dante son personalizados (adaptar estándar a espacio real)

### Roles del equipo Tres Deco
- Ángela: atención automática WhatsApp 24/7
- Closer (Pablo): cierre de ventas, llama al cliente para confirmar detalles
- Dante: leads premium y a medida, gerencia
- Operario (Claudio): ejecución en taller

### Catálogo de precios
- Google Sheets ID: 1TaaG04ZHAKara64_1XmyIM8NABWX78uZvgkp7phQntE
- Ángela consulta en tiempo real

### Cómo trabajar en Tres Deco
- Sistema interno: push a TresDeco-sistema-v2 → deploya en Vercel de Dante
- Tyche: push a tyche → deploya en Vercel de Vero (tyche-xi.vercel.app)
- Panel de Dante: Vero lo maneja desde Edge (navegador)

### Visión a futuro de Dante
- Construir un sistema replicable para franquiciar/licenciar
- Procesos documentados, tecnología conectada, psicología de ventas codificada

---

## Repositorios en GitHub (soyintigaia-stack)

| Repo | Descripción | Vercel |
|---|---|---|
| TresDeco-sistema-v2 | Sistema interno Tres Deco (CRM, taller, etc.) | Vercel de Dante |
| tyche | Plataforma IA / Ángela (WhatsApp bot) | Vercel de Vero |
| tresdecoweb | Web pública Tres Deco (en desarrollo) | Vercel de Vero (con errores) |
| intigaia.github.io | Proyectos propios (diagnostico.html, turno.html, etc.) | Vercel de Vero |
| don-valentino-eventos | Sistema Don Valentino | Vercel de Vero (pendiente migrar) |
| don-valentino-case-study | Case study Don Valentino | — |
| app_de_contrase-as | App de contraseñas | — |
| TresDeco-sistema-v1.0 | Versión anterior Tres Deco | — |
| skill-intelligence-v7/v8d | Proyectos anteriores | — |
| habilidades-app | Proyecto anterior | — |

---

## Proyectos en Vercel de Vero (a limpiar)

| Proyecto | Estado | Acción |
|---|---|---|
| tres-deco-sistema-v2-892v | Dominios eliminados, proyecto vacío | ELIMINAR |
| tresdecoweb | Error en deploy, sin dominio propio | NO eliminar — web pública pendiente |
| tresdecoweb-khcg | Error en deploy, sin dominio | ELIMINAR (duplicado de tresdecoweb) |
| don-valentino-eventos | donvalentinoeventos.com | Pendiente migrar a Vercel de Valentino |
| accesos-vero | Sin repo conectado | Pendiente revisar |
| accesos-demo | Sin repo conectado | Pendiente revisar |
| accesos-dante | Sin repo conectado | Pendiente revisar |
| accesos-gustavo | Sin repo conectado | Pendiente revisar |
| cosmia-v1 | Sin repo conectado | Pendiente revisar |
| tyche | Sin deploy en producción aún | Activo, en desarrollo |
| pulsoia | pulsoia-woad.vercel.app | Activo |

---

## Don Valentino (cliente)
- Repo: don-valentino-eventos
- Dominio: donvalentinoeventos.com
- Estado: aún en Vercel de Vero, pendiente migrar a Vercel propio de Valentino

---

## Pendiente
- [ ] Eliminar tres-deco-sistema-v2-892v del Vercel de Vero
- [ ] Eliminar tresdecoweb-khcg del Vercel de Vero
- [ ] Retomar y terminar tresdecoweb (web pública Tres Deco)
- [ ] Migrar Don Valentino a su propio Vercel
- [ ] Revisar proyectos accesos-* (sin repo conectado)
- [ ] Limpiar proyectos viejos del Vercel de Vero

---

## Texto corregido para Workana

TresDeco Amoblamientos — Ecosistema digital integral de ventas, producción y comunicación con IA

Desarrollé el ecosistema digital completo de TresDeco Amoblamientos, compuesto por tres sistemas conectados que reemplazan WhatsApp manual, planillas de Excel y seguimiento por nota de voz.

**Tyche — Plataforma de comunicación IA**
Plataforma propia donde opera Ángela, la asesora de IA que atiende clientes por WhatsApp 24/7, informa precios en tiempo real desde el catálogo, califica leads (Curioso / Tibio / Caliente) y deriva automáticamente al equipo de ventas cuando el cliente está listo para comprar. Desarrollada para eliminar la dependencia de servicios de WhatsApp de terceros.

**Sistema operativo interno**
Cubre todo el ciclo del negocio:
- Ventas: CRM kanban con pipeline en tiempo real, módulo de remarketing automático por segmento, generador de contenido IA para Instagram, Facebook y WhatsApp.
- Taller: Órdenes estándar con estados (Pendiente → En producción → Listo → Entregado). Trabajos a medida con flujo numerado (TR-2026-XXX) desde el relevamiento hasta el control de calidad.
- Operaciones: panel de entregas, seguimiento post-venta, gestión de operarios, alertas automáticas y roles diferenciados (Ventas, Taller, Administración).
- Cotizador centralizado conectado al catálogo de precios.
- Integrado con Tienda Nube y Meta Ads.

**Web pública**
Vidriera digital de la marca: catálogo, estilo e captación de interesados, en desarrollo continuo.

Los tres sistemas se comunican entre sí vía webhooks sobre Supabase. 13 módulos en producción. Un equipo completo operando el negocio desde un solo ecosistema.
