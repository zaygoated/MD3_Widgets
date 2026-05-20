import React from 'react';
import { FlexWidget, SvgWidget } from 'react-native-android-widget';

export function ClockAnalogWidget({ hours, minutes, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    outline: '#938F99',
    surfaceVariant: '#49454F'
  };

  const hrs = hours !== undefined ? hours : new Date().getHours();
  const mins = minutes !== undefined ? minutes : new Date().getMinutes();

  const hourAngle = ((hrs % 12) + mins / 60) * 30;
  const minuteAngle = mins * 6;

  // Render clock face, hour markers, and hour/minute hands
  const svgString = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <!-- Background Circle -->
      <circle cx="50" cy="50" r="46" fill="${currentTheme.surface}" stroke="${currentTheme.outline}" stroke-width="1.5" />
      
      <!-- Hour Ticks -->
      <line x1="50" y1="8" x2="50" y2="12" stroke="${currentTheme.outline}" stroke-width="2" />
      <line x1="92" y1="50" x2="88" y2="50" stroke="${currentTheme.outline}" stroke-width="2" />
      <line x1="50" y1="92" x2="50" y2="88" stroke="${currentTheme.outline}" stroke-width="2" />
      <line x1="8" y1="50" x2="12" y2="50" stroke="${currentTheme.outline}" stroke-width="2" />
      
      <line x1="71" y1="14" x2="69" y2="17" stroke="${currentTheme.outline}" stroke-width="1" />
      <line x1="86" y1="29" x2="83" y2="31" stroke="${currentTheme.outline}" stroke-width="1" />
      <line x1="86" y1="71" x2="83" y2="69" stroke="${currentTheme.outline}" stroke-width="1" />
      <line x1="71" y1="86" x2="69" y2="83" stroke="${currentTheme.outline}" stroke-width="1" />
      <line x1="29" y1="86" x2="31" y2="83" stroke="${currentTheme.outline}" stroke-width="1" />
      <line x1="14" y1="71" x2="17" y2="69" stroke="${currentTheme.outline}" stroke-width="1" />
      <line x1="14" y1="29" x2="17" y2="31" stroke="${currentTheme.outline}" stroke-width="1" />
      <line x1="29" y1="14" x2="31" y2="17" stroke="${currentTheme.outline}" stroke-width="1" />

      <!-- Hour Hand -->
      <g transform="rotate(${hourAngle} 50 50)">
        <line x1="50" y1="50" x2="50" y2="24" stroke="${currentTheme.primary}" stroke-width="4.5" stroke-linecap="round" />
      </g>

      <!-- Minute Hand -->
      <g transform="rotate(${minuteAngle} 50 50)">
        <line x1="50" y1="50" x2="50" y2="14" stroke="${currentTheme.onSurface}" stroke-width="2.5" stroke-linecap="round" />
      </g>

      <!-- Center Dot -->
      <circle cx="50" cy="50" r="4" fill="${currentTheme.primary}" />
      <circle cx="50" cy="50" r="1.5" fill="${currentTheme.surface}" />
    </svg>
  `;

  return (
    <FlexWidget
      clickAction="OPEN_CLOCK_APP"
      style={{
        width: 'match_parent',
        height: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000000'
      }}
    >
      <SvgWidget
        svg={svgString}
        style={{
          width: 80,
          height: 80,
        }}
      />
    </FlexWidget>
  );
}
