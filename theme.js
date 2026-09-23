import { Platform } from 'react-native';

export const colors = {
  bg: '#14161A',
  bgRaised: '#1B1E23',
  line: 'rgba(237,237,232,0.10)',
  lineStrong: 'rgba(237,237,232,0.18)',
  ink: '#EDEDE8',
  inkDim: '#9A9C9F',
  inkFaint: '#65676B',
  amber: '#E2A33D',
  amberDim: '#7A5A24',
  teal: '#4FD1AE',
  tealDim: '#245B4C',
};

// Fuente monoespaciada para estadísticas (estilo dorsal/cronómetro de carrera).
// Fuente de sistema por defecto para el resto: cámbiala aquí si añades
// una tipografía custom con expo-font o @expo-google-fonts.
export const fonts = {
  mono: Platform.select({
    ios: 'Courier',
    android: 'monospace',
    default: 'monospace',
  }),
};
