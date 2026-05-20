import React from 'react';
import { FlexWidget, SvgWidget, TextWidget } from 'react-native-android-widget';

export function BatteryWidget({ level, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const charge = level !== undefined ? level : 82;
  
  // Circle circumference with r=36 is 2 * Math.PI * 36 = 226.2
  const circ = 226.2;
  const dashoffset = circ - (circ * charge) / 100;

  const batterySvg = `
    <svg viewBox="0 0 100 100" width="80" height="80">
      <!-- Background track -->
      <circle cx="50" cy="50" r="36" fill="none" stroke="${currentTheme.surfaceVariant}" stroke-width="8" />
      <!-- Active level -->
      <circle cx="50" cy="50" r="36" fill="none" stroke="${currentTheme.primary}" stroke-width="8" 
              stroke-dasharray="${circ}" stroke-dashoffset="${dashoffset}" stroke-linecap="round" transform="rotate(-90 50 50)" />
      <!-- Bolt icon in center or battery label -->
      <path d="M50 30 L40 50 H50 L48 70 L60 48 H50 Z" fill="${currentTheme.primary}" opacity="0.8" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SvgWidget
        svg={batterySvg}
        style={{
          width: 56,
          height: 56,
        }}
      />
      <TextWidget
        text={`${charge}%`}
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: currentTheme.onSurface,
          fontFamily: 'Roboto',
          marginTop: 4,
        }}
      />
    </FlexWidget>
  );
}
