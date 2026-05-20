import React from 'react';
import { FlexWidget, SvgWidget, TextWidget } from 'react-native-android-widget';

export function StorageRingWidget({ freeGb, totalGb, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const free = freeGb !== undefined ? freeGb : 12;
  const total = totalGb !== undefined ? totalGb : 128;

  // Render a multi-segment SVG donut ring
  // Circumference = 2 * Math.PI * 34 = 213.6
  // System: 40% (Primary)
  // Apps: 30% (Secondary/Muted Primary)
  // Free: 30% (surfaceVariant track)
  
  const circ = 213.6;
  const sysOffset = 0;
  const appOffset = -(circ * 0.40);
  const freeOffset = -(circ * 0.70);

  const ringSvg = `
    <svg viewBox="0 0 100 100" width="80" height="80">
      <!-- Track (Free Space) -->
      <circle cx="50" cy="50" r="34" fill="none" stroke="${currentTheme.surfaceVariant}" stroke-width="9" />
      
      <!-- System (40%) -->
      <circle cx="50" cy="50" r="34" fill="none" stroke="${currentTheme.primary}" stroke-width="9"
              stroke-dasharray="${circ * 0.4} ${circ}" stroke-dashoffset="${sysOffset}" transform="rotate(-90 50 50)" />
      
      <!-- Apps (30%) -->
      <circle cx="50" cy="50" r="34" fill="none" stroke="#85E3FF" stroke-width="9"
              stroke-dasharray="${circ * 0.3} ${circ}" stroke-dashoffset="${appOffset}" transform="rotate(-90 50 50)" />
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
        svg={ringSvg}
        style={{
          width: 56,
          height: 56,
        }}
      />
      <TextWidget
        text={`${free}GB FREE`}
        style={{
          fontSize: 10,
          fontWeight: 'bold',
          color: currentTheme.onSurface,
          fontFamily: 'Google Sans',
          marginTop: 4,
        }}
      />
    </FlexWidget>
  );
}
