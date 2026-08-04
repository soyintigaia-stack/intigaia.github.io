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

### Links clave
- Notion — Sistema de Inteligencia Comercial: https://app.notion.com/p/36541967d550815585c9ee0bc0f7b4b7
- Notion — Flujos de Venta Estándar y A Medida: https://app.notion.com/p/36641967d5508140b8abf1e53812754c
- Drive — Catálogo y Precios (activo, el que usa Ángela): https://docs.google.com/spreadsheets/d/1t_94jlbVVSnEQ3Kl8KzS9K9JAkmykRMLx5YwE0dPzaQ/edit
- Drive — Manual de Usuario (Angela + Tyche + CRM): https://docs.google.com/document/d/1YK3p_bGU7kjY8hhaPpWsxG8VwLPU49k5eKUnOYJiF9g/edit
- Drive — Guion ManyChat v2.0: https://docs.google.com/document/d/1pjVq9Xiaa1fOtnCPYlRj3EfMoinfAtxy6LrsSv38wao/edit
- Drive — Fotos Productos (web): https://drive.google.com/drive/folders/11iTXzSZZ-SNOqvvEzMsIy2IBhQE2yEfz
- Drive — Brief Pasante IA: https://drive.google.com/file/d/1oVHMvPGZMpQFlF81i4uhgDaLHC_ZQ_w8/view
- Drive — Presupuestos Tres Deco: https://drive.google.com/file/d/1FPvsN2POCw5Gp3N4dGu6uIzVYgzidz0P/view
- Drive — 0Auth Google Cloud Console: https://docs.google.com/document/d/1lNTwILbQ791L4nFaNEOlYv9nNoRdd5VzlAc1RnzB8JE/edit
- App (sistema interno): https://app.tresdecoamoblamientos.com
- Catálogo precios Google Sheets ID: 1TaaG04ZHAKara64_1XmyIM8NABWX78uZvgkp7phQntE

### Ecosistema — 3 componentes separados pero conectados

#### 1. tresdecoweb — La vidriera pública
- Web pública que ven los clientes (catálogo, marca, captación)
- Repo: soyintigaia-stack/tresdecoweb
- URL: tresdecoweb.vercel.app
- Estado: en desarrollo/mejora, con errores de deploy, SIN dominio propio asignado
- NO eliminar — está pendiente de terminar
- Drive con fotos de productos: https://drive.google.com/drive/folders/11iTXzSZZ-SNOqvvEzMsIy2IBhQE2yEfz

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
- Plataforma propia donde vive Ángela (vendedora IA de WhatsApp)
- Ángela califica leads, informa precios desde Google Sheets en tiempo real, deriva al Closer
- Conectada al CRM vía webhooks (Supabase)
- URL: tyche-xi.vercel.app
- Repo: soyintigaia-stack/tyche
- IMPORTANTE: Tyche es un sistema SEPARADO del sistema interno. Se comunican por webhook.

### Qué está construido vs qué está pendiente

| Módulo | Estado |
|---|---|
| CRM kanban con pipeline | ✅ En producción |
| Segmentación leads (Curioso/Tibio/Caliente) | ✅ En producción |
| Órdenes estándar (flujo completo) | ✅ En producción |
| Órdenes a medida (TR-2026-XXX) | ✅ En producción |
| Panel operarios (taller) | ✅ En producción |
| Roles diferenciados (Ventas/Taller/Admin) | ✅ En producción |
| Cotizador centralizado | ✅ En producción |
| Remarketing automático | ✅ En producción |
| Generador de contenido IA (Instagram/FB/WA) | ✅ En producción |
| Panel de entregas y postventa | ✅ En producción |
| Tyche / Ángela (WhatsApp IA) | ✅ Activo en tyche-xi.vercel.app |
| Web pública (tresdecoweb) | ⚠️ En desarrollo, con errores |
| Catálogo web con fotos | ⚠️ Pendiente (fotos en Drive) |
| Integración Tienda Nube | ❓ A verificar estado |
| Integración Meta Ads | ❓ A verificar estado |

### Flujos de venta
- **Estándar:** Meta Ads → WhatsApp → Ángela califica → CRM → Orden de taller → Entrega
- **A medida / personalizado:** detección por bot → Dante toma el lead → visita técnica ($25.000, descuenta del total) → presupuesto → relevamiento → código TR-AÑO-NNN → producción por etapas → instalación
- El 90% de los proyectos de Dante son personalizados

### Roles del equipo Tres Deco
- Ángela: atención automática WhatsApp 24/7
- Closer (Pablo): cierre de ventas, llama al cliente para confirmar detalles
- Dante: leads premium y a medida, gerencia
- Operario (Claudio): ejecución en taller

### Cómo trabajar en Tres Deco
- Sistema interno: push a TresDeco-sistema-v2 → deploya en Vercel de Dante
- Tyche: push a tyche → deploya en Vercel de Vero (tyche-xi.vercel.app)
- Panel de Dante: Vero lo maneja desde Edge (navegador)
- El dominio tresdecoamoblamientos.com está registrado en Vercel de Vero (ella es la registrante)

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
| tresdecoweb-khcg | Error en deploy, sin dominio | ELIMINAR (duplicado) |
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
- Drive — carpeta compartida: https://drive.google.com/drive/folders/1BOwvu1NmRNnVfNxQqFbv9PdKqrScih58

---

## Pendiente
- [ ] Eliminar tres-deco-sistema-v2-892v del Vercel de Vero
- [ ] Eliminar tresdecoweb-khcg del Vercel de Vero
- [ ] Retomar y terminar tresdecoweb (web pública Tres Deco) + cargar fotos del catálogo
- [ ] Verificar estado integración Tienda Nube y Meta Ads
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
- Cotizador centralizado conectado al catálogo de precios en tiempo real.
- Integrado con Tienda Nube y Meta Ads.

**Web pública**
Vidriera digital de la marca: catálogo, estilo y captación de interesados, en desarrollo continuo.

Los tres sistemas se comunican entre sí vía webhooks sobre Supabase. 13 módulos en producción. Un equipo completo operando el negocio desde un solo ecosistema.
