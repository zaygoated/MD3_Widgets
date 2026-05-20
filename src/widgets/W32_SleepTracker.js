import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function SleepTrackerWidget({ sleepHours, sleepMinutes, qualityScore, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const hrs = sleepHours !== undefined ? sleepHours : 7;
  const mins = sleepMinutes !== undefined ? sleepMinutes : 45;
  const score = qualityScore !== undefined ? qualityScore : 84;

  // Sleep cycles graph: width 130, height 40.
  // Stepped chart path representing Wake (y=5), REM (y=15), Light (y=25), Deep (y=35)
  const graphPath = "M 5 35 H 20 V 25 H 35 V 15 H 50 V 35 H 70 V 25 H 85 V 15 H 100 V 5 H 115 V 35 H 135";

  const moonIconSvg = `
    <svg viewBox="0 0 100 100" width="24" height="24">
      <path d="M30 20 A 35 35 0 1 1 70 80 A 30 30 0 1 0 30 20 Z" fill="${currentTheme.primary}" />
    </svg>
  `;

  const graphSvg = `
    <svg viewBox="0 0 140 40" width="130" height="36">
      <!-- Grid lines -->
      <line x1="5" y1="5" x2="135" y2="5" stroke="${currentTheme.surfaceVariant}" stroke-width="0.5" stroke-dasharray="2 2" />
      <line x1="5" y1="15" x2="135" y2="15" stroke="${currentTheme.surfaceVariant}" stroke-width="0.5" stroke-dasharray="2 2" />
      <line x1="5" y1="25" x2="135" y2="25" stroke="${currentTheme.surfaceVariant}" stroke-width="0.5" stroke-dasharray="2 2" />
      <line x1="5" y1="35" x2="135" y2="35" stroke="${currentTheme.surfaceVariant}" stroke-width="0.5" stroke-dasharray="2 2" />
      
      <!-- Stepped line -->
      <path d="${graphPath}" fill="none" stroke="${currentTheme.primary}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
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
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <FlexWidget style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgWidget svg={moonIconSvg} style={{ width: 20, height: 20 }} />
          <TextWidget
            text="SLEEP SESSION"
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: currentTheme.primary,
              fontFamily: 'Google Sans',
              letterSpacing: 1.2,
              marginLeft: 6,
            }}
          />
        </FlexWidget>
        <FlexWidget
          style={{
            backgroundColor: currentTheme.primaryContainer,
            borderRadius: 12,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 3,
            paddingBottom: 3,
          }}
        >
          <TextWidget
            text={`Score ${score}`}
            style={{
              fontSize: 9,
              fontWeight: 'bold',
              color: currentTheme.primary,
              fontFamily: 'Google Sans',
            }}
          />
        </FlexWidget>
      </FlexWidget>

      {/* Main Stats */}
      <FlexWidget style={{ flexDirection: 'column', marginTop: 8 }}>
        <TextWidget
          text={`${hrs}h ${mins}m`}
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: currentTheme.onSurface,
            fontFamily: 'Roboto',
          }}
        />
        <TextWidget
          text="Deep sleep: 2h 15m"
          style={{
            fontSize: 10,
            color: currentTheme.onSurfaceVariant,
            fontFamily: 'Google Sans',
            marginTop: 1,
          }}
        />
      </FlexWidget>

      {/* Sleep Stages Graph */}
      <FlexWidget style={{ marginTop: 8 }}>
        <SvgWidget svg={graphSvg} style={{ width: 130, height: 36 }} />
      </FlexWidget>
    </FlexWidget>
  );
}
