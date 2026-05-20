import React from 'react';
import { FlexWidget, SvgWidget, TextWidget } from 'react-native-android-widget';

export function ClockAnalogLargeWidget({ hours, minutes, dateString, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    outline: '#938F99',
  };

  const hrs = hours !== undefined ? hours : new Date().getHours();
  const mins = minutes !== undefined ? minutes : new Date().getMinutes();

  const hourAngle = ((hrs % 12) + mins / 60) * 30;
  const minuteAngle = mins * 6;

  const svgString = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="46" fill="${currentTheme.surface}" stroke="${currentTheme.outline}" stroke-width="1.5" />
      <line x1="50" y1="6" x2="50" y2="12" stroke="${currentTheme.outline}" stroke-width="2.5" />
      <line x1="94" y1="50" x2="88" y2="50" stroke="${currentTheme.outline}" stroke-width="2.5" />
      <line x1="50" y1="94" x2="50" y2="88" stroke="${currentTheme.outline}" stroke-width="2.5" />
      <line x1="6" y1="50" x2="12" y2="50" stroke="${currentTheme.outline}" stroke-width="2.5" />
      <g transform="rotate(${hourAngle} 50 50)">
        <line x1="50" y1="50" x2="50" y2="24" stroke="${currentTheme.primary}" stroke-width="4.5" stroke-linecap="round" />
      </g>
      <g transform="rotate(${minuteAngle} 50 50)">
        <line x1="50" y1="50" x2="50" y2="14" stroke="${currentTheme.onSurface}" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <circle cx="50" cy="50" r="4" fill="${currentTheme.primary}" />
      <circle cx="50" cy="50" r="1.5" fill="${currentTheme.surface}" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 28,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <SvgWidget
        svg={svgString}
        style={{
          width: 90,
          height: 90,
        }}
      />
      <TextWidget
        text={dateString || 'Wednesday, 20 May'}
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: currentTheme.primary,
          fontFamily: 'Google Sans',
          marginTop: 10,
        }}
      />
    </FlexWidget>
  );
}
