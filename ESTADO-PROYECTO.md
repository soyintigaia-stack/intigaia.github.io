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

### Arquitectura
- **Sistema principal:** TresDeco-sistema-v2 (Next.js + TypeScript)
- **Repo GitHub:** soyintigaia-stack/TresDeco-sistema-v2 (de Vero, no de Dante)
- **Vercel:** cuenta de Dante (slug: tresdeco), proyecto tres-deco-sistema-v2-f1mh
- **Dominio registrado en:** Vercel de Vero (ella pagó y sigue siendo registrante)
- **DB:** Neon Postgres (DATABASE_URL en variables de entorno del Vercel de Dante)
- **Tyche:** sistema de turnos integrado DENTRO del sistema Tres Deco (no es externo)

### Dominios activos (migrados el 4 ago 2026)
- tresdecoamoblamientos.com ✅
- www.tresdecoamoblamientos.com ✅
- app.tresdecoamoblamientos.com ✅ (acceso principal al sistema)

### Cómo trabajar en Tres Deco
1. Hacer cambios en el repo TresDeco-sistema-v2
2. Push a rama main
3. Vercel de Dante deploya automáticamente
4. Vero maneja el panel de Dante desde Edge (navegador)

### Estado al 4 ago 2026
- Sistema funcionando en producción ✅
- Migrado al Vercel de Dante ✅
- Proyecto viejo (tres-deco-sistema-v2-892v) en Vercel de Vero: ELIMINAR
- tresdecoweb y tresdecoweb-khcg en Vercel de Vero: revisar y probable eliminar

---

## Repositorios en GitHub (soyintigaia-stack)

| Repo | Descripción | Vercel conectado |
|---|---|---|
| TresDeco-sistema-v2 | Sistema completo Tres Deco (incluye Tyche integrado) | Vercel de Dante |
| tyche | Motor de turnos/agenda (también usado independiente) | Vercel de Vero |
| tresdecoweb | Web pública/landing Tres Deco — con errores, sin dominio activo | A revisar/eliminar |
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
| tresdecoweb | Error en deploy, sin dominio | Revisar repo antes de eliminar |
| tresdecoweb-khcg | Error en deploy, sin dominio | Probable ELIMINAR (duplicado) |
| don-valentino-eventos | donvalentinoeventos.com | Pendiente migrar a Vercel de Valentino |
| accesos-vero | Sin repo conectado | Pendiente revisar |
| accesos-demo | Sin repo conectado | Pendiente revisar |
| accesos-dante | Sin repo conectado | Pendiente revisar |
| accesos-gustavo | Sin repo conectado | Pendiente revisar |
| cosmia-v1 | Sin repo conectado | Pendiente revisar |
| tyche | Sin deploy en producción | Activo, en desarrollo |
| pulsoia | pulsoia-woad.vercel.app | Activo |

---

## Don Valentino (cliente)
- Repo: don-valentino-eventos
- Dominio: donvalentinoeventos.com
- Estado: aún en Vercel de Vero, pendiente migrar a Vercel propio de Valentino

---

## Pendiente
- [ ] Eliminar tres-deco-sistema-v2-892v del Vercel de Vero
- [ ] Revisar repo tresdecoweb antes de eliminar
- [ ] Decidir qué hacer con tresdecoweb-khcg
- [ ] Migrar Don Valentino a su propio Vercel
- [ ] Revisar proyectos accesos-* (sin repo conectado)
- [ ] Limpiar proyectos viejos del Vercel de Vero para liberar recursos
