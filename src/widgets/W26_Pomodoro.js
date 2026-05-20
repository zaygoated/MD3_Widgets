import React from 'react';
import { FlexWidget, SvgWidget, TextWidget } from 'react-native-android-widget';

export function PomodoroWidget({ minutes, seconds, state, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
    error: '#F2B8B5',
  };

  const mins = minutes !== undefined ? minutes : 18;
  const secs = seconds !== undefined ? seconds : 45;
  const status = state || 'FOCUS'; // 'FOCUS' or 'BREAK'

  // Calculate percentage: total focus is 25 mins (1500 secs)
  const totalSecs = status === 'FOCUS' ? 1500 : 300;
  const elapsedSecs = mins * 60 + secs;
  const percent = Math.min(100, Math.max(0, (elapsedSecs / totalSecs) * 100));

  const circ = 226.2;
  const dashoffset = circ - (circ * percent) / 100;

  const ringColor = status === 'FOCUS' ? currentTheme.primary : '#85E3FF';

  const timerSvg = `
    <svg viewBox="0 0 100 100" width="80" height="80">
      <!-- Background track -->
      <circle cx="50" cy="50" r="36" fill="none" stroke="${currentTheme.surfaceVariant}" stroke-width="6" />
      <!-- Active level -->
      <circle cx="50" cy="50" r="36" fill="none" stroke="${ringColor}" stroke-width="6" 
              stroke-dasharray="${circ}" stroke-dashoffset="${dashoffset}" stroke-linecap="round" transform="rotate(-90 50 50)" />
    </svg>
  `;

  const padSec = secs.toString().padStart(2, '0');
  const padMin = mins.toString().padStart(2, '0');

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
      <FlexWidget style={{ position: 'relative', width: 64, height: 64, justifyContent: 'center', alignItems: 'center' }}>
        <SvgWidget
          svg={timerSvg}
          style={{
            width: 64,
            height: 64,
          }}
        />
        <FlexWidget
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <TextWidget
            text={`${padMin}:${padSec}`}
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: currentTheme.onSurface,
              fontFamily: 'Roboto',
            }}
          />
          <TextWidget
            text={status}
            style={{
              fontSize: 8,
              fontWeight: 'bold',
              color: ringColor,
              fontFamily: 'Google Sans',
              letterSpacing: 1.0,
              marginTop: 1,
            }}
          />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
