import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function CPUMonitorWidget({ cpuPercent, ramPercent, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const cpu = cpuPercent !== undefined ? cpuPercent : 42;
  const ram = ramPercent !== undefined ? ramPercent : 68;

  const barWidth = 140;
  const cpuFillWidth = (barWidth * cpu) / 100;
  const ramFillWidth = (barWidth * ram) / 100;

  const cpuBarSvg = `
    <svg viewBox="0 0 140 8" width="140" height="8">
      <rect width="140" height="6" rx="3" fill="${currentTheme.surfaceVariant}" />
      <rect width="${cpuFillWidth}" height="6" rx="3" fill="${currentTheme.primary}" />
    </svg>
  `;

  const ramBarSvg = `
    <svg viewBox="0 0 140 8" width="140" height="8">
      <rect width="140" height="6" rx="3" fill="${currentTheme.surfaceVariant}" />
      <rect width="${ramFillWidth}" height="6" rx="3" fill="#85E3FF" />
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
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <TextWidget
        text="SYSTEM PERFORMANCE"
        style={{
          fontSize: 10,
          fontWeight: 'bold',
          color: currentTheme.primary,
          fontFamily: 'Google Sans',
          letterSpacing: 1.2,
        }}
      />

      {/* CPU section */}
      <FlexWidget style={{ flexDirection: 'column', marginTop: 8 }}>
        <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <TextWidget text="CPU" style={{ fontSize: 12, fontWeight: 'bold', color: currentTheme.onSurface, fontFamily: 'Google Sans' }} />
          <TextWidget text={`${cpu}%`} style={{ fontSize: 12, fontWeight: 'bold', color: currentTheme.primary, fontFamily: 'Roboto' }} />
        </FlexWidget>
        <SvgWidget svg={cpuBarSvg} style={{ width: 140, height: 8 }} />
      </FlexWidget>

      {/* RAM section */}
      <FlexWidget style={{ flexDirection: 'column', marginTop: 8 }}>
        <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <TextWidget text="RAM" style={{ fontSize: 12, fontWeight: 'bold', color: currentTheme.onSurface, fontFamily: 'Google Sans' }} />
          <TextWidget text={`${ram}%`} style={{ fontSize: 12, fontWeight: 'bold', color: '#85E3FF', fontFamily: 'Roboto' }} />
        </FlexWidget>
        <SvgWidget svg={ramBarSvg} style={{ width: 140, height: 8 }} />
      </FlexWidget>
    </FlexWidget>
  );
}
