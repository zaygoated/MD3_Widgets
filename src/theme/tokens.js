import { generateMD3Palette } from './md3Palette';

export const DEFAULT_SEED = '#6750A4';

export function getThemeTokens(palette, isDark) {
  if (isDark) {
    return {
      primary: palette.primary[80],
      onPrimary: palette.primary[20],
      primaryContainer: palette.primary[30],
      onPrimaryContainer: palette.primary[90],

      secondary: palette.secondary[80],
      onSecondary: palette.secondary[20],
      secondaryContainer: palette.secondary[30],
      onSecondaryContainer: palette.secondary[90],

      tertiary: palette.tertiary[80],
      onTertiary: palette.tertiary[20],
      tertiaryContainer: palette.tertiary[30],
      onTertiaryContainer: palette.tertiary[90],

      surface: palette.neutral[10],
      surfaceDim: palette.neutral[6],
      surfaceBright: palette.neutral[24],
      surfaceVariant: palette.neutralVariant[30],
      onSurface: palette.neutral[90],
      onSurfaceVariant: palette.neutralVariant[80],

      outline: palette.neutralVariant[60],
      outlineVariant: palette.neutralVariant[30],

      background: palette.neutral[10],
      onBackground: palette.neutral[90],

      error: '#F2B8B5',
      onError: '#601410',
      errorContainer: '#8C1D18',
      onErrorContainer: '#F9DEDC',

      scrim: '#000000',
      inverseSurface: palette.neutral[90],
      inverseOnSurface: palette.neutral[20],
      inversePrimary: palette.primary[40]
    };
  } else {
    return {
      primary: palette.primary[40],
      onPrimary: palette.primary[100],
      primaryContainer: palette.primary[90],
      onPrimaryContainer: palette.primary[10],

      secondary: palette.secondary[40],
      onSecondary: palette.secondary[100],
      secondaryContainer: palette.secondary[90],
      onSecondaryContainer: palette.secondary[10],

      tertiary: palette.tertiary[40],
      onTertiary: palette.tertiary[100],
      tertiaryContainer: palette.tertiary[90],
      onTertiaryContainer: palette.tertiary[10],

      surface: palette.neutral[98],
      surfaceDim: palette.neutral[90],
      surfaceBright: palette.neutral[99],
      surfaceVariant: palette.neutralVariant[90],
      onSurface: palette.neutral[10],
      onSurfaceVariant: palette.neutralVariant[30],

      outline: palette.neutralVariant[50],
      outlineVariant: palette.neutralVariant[80],

      background: palette.neutral[98],
      onBackground: palette.neutral[10],

      error: '#B3261E',
      onError: '#FFFFFF',
      errorContainer: '#F9DEDC',
      onErrorContainer: '#410E0B',

      scrim: '#000000',
      inverseSurface: palette.neutral[20],
      inverseOnSurface: palette.neutral[95],
      inversePrimary: palette.primary[80]
    };
  }
}

export const defaultPalette = generateMD3Palette(DEFAULT_SEED);
export const defaultLightTheme = getThemeTokens(defaultPalette, false);
export const defaultDarkTheme = getThemeTokens(defaultPalette, true);
