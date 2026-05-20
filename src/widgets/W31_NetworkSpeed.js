import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function NetworkSpeedWidget({ downloadSpeed, uploadSpeed, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const down = downloadSpeed !== undefined ? downloadSpeed : 84.5;
  const up = uploadSpeed !== undefined ? uploadSpeed : 18.2;

  const downArrowSvg = `
    <svg viewBox="0 0 100 100" width="20" height="20">
      <path d="M50 15 v55 M25 45 L50 75 L75 45" fill="none" stroke="#4CAF50" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  const upArrowSvg = `
    <svg viewBox="0 0 100 100" width="20" height="20">
      <path d="M50 85 v-55 M25 55 L50 25 L75 55" fill="none" stroke="${currentTheme.primary}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
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
      {/* Download Column */}
      <FlexWidget
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: currentTheme.surfaceVariant,
          borderRadius: 16,
          padding: 10,
          marginRight: 6,
        }}
      >
        <SvgWidget svg={downArrowSvg} style={{ width: 20, height: 20 }} />
        <FlexWidget style={{ flexDirection: 'column', marginLeft: 8 }}>
          <TextWidget text="DOWNLOAD" style={{ fontSize: 8, fontWeight: 'bold', color: currentTheme.onSurfaceVariant, fontFamily: 'Google Sans' }} />
          <TextWidget text={`${down}`} style={{ fontSize: 13, fontWeight: 'bold', color: currentTheme.onSurface, fontFamily: 'Roboto' }} />
          <TextWidget text="Mbps" style={{ fontSize: 8, color: currentTheme.onSurfaceVariant, fontFamily: 'Google Sans' }} />
        </FlexWidget>
      </FlexWidget>

      {/* Upload Column */}
      <FlexWidget
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: currentTheme.surfaceVariant,
          borderRadius: 16,
          padding: 10,
        }}
      >
        <SvgWidget svg={upArrowSvg} style={{ width: 20, height: 20 }} />
        <FlexWidget style={{ flexDirection: 'column', marginLeft: 8 }}>
          <TextWidget text="UPLOAD" style={{ fontSize: 8, fontWeight: 'bold', color: currentTheme.onSurfaceVariant, fontFamily: 'Google Sans' }} />
          <TextWidget text={`${up}`} style={{ fontSize: 13, fontWeight: 'bold', color: currentTheme.onSurface, fontFamily: 'Roboto' }} />
          <TextWidget text="Mbps" style={{ fontSize: 8, color: currentTheme.onSurfaceVariant, fontFamily: 'Google Sans' }} />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
