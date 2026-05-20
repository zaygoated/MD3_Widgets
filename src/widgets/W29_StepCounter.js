import React from 'react';
import { FlexWidget, SvgWidget, TextWidget } from 'react-native-android-widget';

export function StepCounterWidget({ steps, goal, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const currentSteps = steps !== undefined ? steps : 7420;
  const currentGoal = goal !== undefined ? goal : 10000;
  const percent = Math.min(100, Math.max(0, (currentSteps / currentGoal) * 100));

  const circ = 226.2;
  const dashoffset = circ - (circ * percent) / 100;

  // Running shoe SVG / Icon in center + progress ring
  const stepsSvg = `
    <svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="36" fill="none" stroke="${currentTheme.surfaceVariant}" stroke-width="7" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="${currentTheme.primary}" stroke-width="7" 
              stroke-dasharray="${circ}" stroke-dashoffset="${dashoffset}" stroke-linecap="round" transform="rotate(-90 50 50)" />
      <!-- Small sneaker representation inside -->
      <path d="M35 55 h12 l8 -14 h14 v6 h-10 l-4 8 h-20 Z" fill="${currentTheme.primary}" opacity="0.6" />
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
        svg={stepsSvg}
        style={{
          width: 56,
          height: 56,
        }}
      />
      <TextWidget
        text={currentSteps.toLocaleString()}
        style={{
          fontSize: 13,
          fontWeight: 'bold',
          color: currentTheme.onSurface,
          fontFamily: 'Roboto',
          marginTop: 4,
        }}
      />
      <TextWidget
        text="STEPS"
        style={{
          fontSize: 8,
          fontWeight: 'bold',
          color: currentTheme.onSurfaceVariant,
          fontFamily: 'Google Sans',
        }}
      />
    </FlexWidget>
  );
}
