# Ascent — starter Expo

Base de la app en React Native + Expo, con navegación por pestañas y las 4
pantallas del concepto: **Hoy**, **Recorrido**, **Feed**, **Perfil**. Mismos
tokens de diseño que el mockup (fondo grafito, acento ámbar, mono para
estadísticas).

## Requisitos

- Node.js 20 o superior (SDK 57 lo recomienda; 18 puede dar problemas)
- La app **Expo Go** en tu móvil (iOS/Android), actualizada a la versión que
  soporta SDK 57 — o un emulador/simulador si prefieres
- `package.json` ya está en **Expo SDK 57** (`expo ~57.0.21`, React Native
  0.86, React 19.2, React Navigation v7)

## Arrancar desde cero (recomendado)

Aunque `package.json` ya pide las versiones de SDK 57, es mejor dejar que el
propio Expo resuelva las versiones exactas de cada paquete en lugar de fiarte
solo de los números que hay escritos:

```bash
rm -rf node_modules package-lock.json
npm install
npx expo install --fix
npx expo-doctor
```

- `npm install` instala lo que hay en `package.json`.
- `npx expo install --fix` corrige cualquier paquete (react-native-screens,
  safe-area-context, gesture-handler, etc.) a la versión exacta que esa
  versión de Expo espera — esto es lo que de verdad resuelve la mayoría de
  errores al saltar de SDK.
- `npx expo-doctor` te dice si queda algo desalineado.

Luego arranca normal:

```bash
npx expo start
```

Si el error que te daba SDK 51 era muy específico (pégame el mensaje exacto
de la terminal o de la app) puedo mirarlo más a fondo — muchas veces el
`expo install --fix` no lo arregla del todo si hay una librería de terceros
de por medio.

Esto abre un panel en el navegador con un código QR:

- **Con el móvil**: abre la cámara (iOS) o la app Expo Go (Android) y escanea
  el QR. La app carga directamente en tu teléfono.
- **Emulador/simulador**: pulsa `a` (Android) o `i` (iOS) en la terminal donde
  corre `expo start`.
- **Web** (solo para previsualizar rápido, no es el target final): `npx expo
  start --web`.

## Estructura

```
App.js                 → navegación (tabs) + tema de navegación
theme.js                → colores y fuentes compartidas
screens/
  HomeScreen.js         → pantalla "Hoy"
  JourneyScreen.js      → pantalla "Recorrido" (objetivos + progreso)
  FeedScreen.js         → pantalla "Feed" (Entrené / Pienso / Aprendí)
  ProfileScreen.js      → pantalla "Perfil" (Athlete DNA + línea de tiempo)
```

## Qué es real y qué es de mentira todavía

Todo el contenido (plan de hoy, posts del feed, estadísticas del objetivo) es
**data de ejemplo escrita a mano** dentro de cada pantalla (arrays `PLAN_ITEMS`,
`POSTS`, etc.). No hay backend, ni login, ni conexión con Garmin/Strava/Apple
Health todavía — es la capa visual y de navegación sobre la que construir.

## Próximos pasos lógicos

1. **Backend**: Supabase o Firebase para usuarios, posts y objetivos.
2. **Integraciones de wearables**: Garmin Connect API / Apple HealthKit para
   traer sesiones reales en vez de la data de ejemplo.
3. **Estado global**: cuando haya datos reales, mover de arrays locales a
   algo como Zustand o React Query.
4. **Tipografía custom**: si quieres las fuentes exactas del mockup web
   (Instrument Sans + IBM Plex Mono), instala `expo-font` y
   `@expo-google-fonts/instrument-sans` / `@expo-google-fonts/ibm-plex-mono`,
   cárgalas en `App.js` con `useFonts`, y sustituye `fonts.mono` en
   `theme.js`. Por ahora usa las fuentes de sistema para que el starter
   funcione sin fricción.
