import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function HeartRateWidget({ bpm, status, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
    error: '#F2B8B5',
  };

  const currentBpm = bpm !== undefined ? bpm : 72;
  const currentStatus = status || 'Resting';

  // Heartbeat wave pulse line SVG
  const wavePath = "M 0 20 H 30 L 36 8 L 42 32 L 48 2 L 54 38 L 60 20 H 120";

  const heartIconSvg = `
    <svg viewBox="0 0 100 100" width="24" height="24">
      <path d="M12 35 C12 20, 35 15, 50 35 C65 15, 88 20, 88 35 C88 55, 50 85, 50 85 C50 85, 12 55, 12 35 Z" fill="${currentTheme.error}" />
    </svg>
  `;

  const pulseSvg = `
    <svg viewBox="0 0 120 40" width="100" height="36">
      <path d="${wavePath}" stroke="${currentTheme.error}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 24,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <SvgWidget svg={heartIconSvg} style={{ width: 24, height: 24 }} />
        
        <FlexWidget style={{ flexDirection: 'column', marginLeft: 10 }}>
          <FlexWidget style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <TextWidget
              text={currentBpm.toString()}
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: currentTheme.onSurface,
                fontFamily: 'Roboto',
              }}
            />
            <TextWidget
              text="BPM"
              style={{
                fontSize: 10,
                color: currentTheme.onSurfaceVariant,
                fontFamily: 'Google Sans',
                marginLeft: 4,
                fontWeight: 'bold',
              }}
            />
          </FlexWidget>
          <TextWidget
            text={currentStatus}
            style={{
              fontSize: 11,
              color: currentTheme.onSurfaceVariant,
              fontFamily: 'Google Sans',
            }}
          />
        </FlexWidget>
      </FlexWidget>

      <SvgWidget svg={pulseSvg} style={{ width: 90, height: 36 }} />
    </FlexWidget>
  );
}
