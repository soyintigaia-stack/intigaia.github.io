# Estado del proyecto — Intigaia / soyintigaia@gmail.com
Fecha: 4 de agosto de 2026

## Quién es la usuaria
- **Veronica Lorena Nuñez** — desarrolladora/agencia, Ushuaia, Argentina
- Email: soyintigaia@gmail.com
- GitHub: soyintigaia-stack
- Vercel propio: team_KkdWho03nuT01xZv9TnPpmHT (soyintigaia-4152s-projects)

## Filosofía de trabajo
- Ella crea y es dueña de todo el código
- Los clientes tienen su propio Vercel, pero el repo GitHub sigue siendo de soyintigaia-stack
- Flujo: trabaja el código acá → push a GitHub → Vercel del cliente se actualiza solo
- No cede código a clientes

---

## Repositorios en GitHub (soyintigaia-stack)

| Repo | Descripción | Vercel conectado |
|---|---|---|
| TresDeco-sistema-v2 | Sistema completo Tres Deco (incluye Tyche integrado) | Vercel de Dante |
| tyche | Motor de turnos/agenda (también usado independiente) | Vercel propio |
| tresdecoweb | Web pública/landing Tres Deco — con errores, sin dominio activo | Su Vercel (a revisar/eliminar) |
| intigaia.github.io | Proyectos propios (diagnostico.html, turno.html, etc.) | Su Vercel |
| don-valentino-eventos | Sistema Don Valentino | Su Vercel (pendiente migrar) |
| don-valentino-case-study | Case study Don Valentino | — |
| app_de_contrase-as | App de contraseñas | — |
| TresDeco-sistema-v1.0 | Versión anterior Tres Deco | — |
| skill-intelligence-v7/v8d | Proyectos anteriores | — |
| habilidades-app | Proyecto anterior | — |

---

## Proyectos en su Vercel (a limpiar)

| Proyecto | Estado | Acción |
|---|---|---|
| tres-deco-sistema-v2-892v | Dominios eliminados, proyecto vacío | ELIMINAR |
| tresdecoweb | Error en deploy, sin dominio | A revisar (ver contenido repo) |
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

## Clientes activos

### Dante (Tres Deco — amoblamientos)
- Sistema: TresDeco-sistema-v2 (Next.js + TypeScript)
- Vercel: tresdeco / tres-deco-sistema-v2-f1mh
- Dominios migrados el 4 ago 2026 ✅:
  - tresdecoamoblamientos.com
  - www.tresdecoamoblamientos.com
  - app.tresdecoamoblamientos.com
- DB: Neon (DATABASE_URL en variables de entorno de Dante)
- Tyche integrado adentro del sistema

### Don Valentino (eventos)
- Repo: don-valentino-eventos
- Dominio: donvalentinoeventos.com
- Estado: aún en Vercel de Vero, pendiente migrar a Vercel propio de Valentino

### Vero / Gustavo / otros
- Proyectos "accesos-*" sin repo conectado — pendiente revisar qué son

---

## Lo que hicimos el 4 de agosto de 2026
1. Revisamos los 12 proyectos del Vercel de Vero → estaba saturada (CPU y RAM al doble del límite)
2. Migramos los dominios de Tres Deco del Vercel de Vero al Vercel de Dante:
   - Eliminamos los 3 dominios de tres-deco-sistema-v2-892v en su Vercel
   - Los agregamos en el proyecto f1mh del Vercel de Dante
   - Agregamos 3 registros TXT en el DNS de tresdecoamoblamientos.com para verificación
   - Los 4 dominios quedaron en verde ✅
3. Confirmamos que app.tresdecoamoblamientos.com carga correctamente desde Vercel de Dante

## Pendiente
- Eliminar tres-deco-sistema-v2-892v del Vercel de Vero
- Revisar repo tresdecoweb antes de eliminar
- Decidir qué hacer con tresdecoweb-khcg
- Migrar Don Valentino a su propio Vercel
- Revisar proyectos accesos-* (sin repo conectado)
- Limpiar proyectos viejos de su Vercel para liberar recursos

---

## Contexto técnico importante
- Tyche es el sistema de turnos integrado en Tres Deco (no es un servicio externo)
- Los repos siguen siendo de soyintigaia-stack aunque el cliente tenga su propio Vercel
- El dominio tresdecoamoblamientos.com está registrado en el Vercel de Vero (ella es la registrante)
- Vercel de Dante: cuenta tresdeco (manejada por Vero desde Edge)
