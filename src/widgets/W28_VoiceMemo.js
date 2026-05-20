import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function VoiceMemoWidget({ isRecording, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
    error: '#F2B8B5',
  };

  const recording = isRecording !== undefined ? isRecording : false;

  // Waveform heights
  const bars = [10, 18, 12, 28, 22, 14, 25, 32, 18, 12, 22, 36, 26, 14, 18, 10];
  const barWidth = 3;
  const gap = 2;
  const startX = 10;

  const waveformSvg = `
    <svg viewBox="0 0 120 40" width="120" height="40">
      ${bars.map((h, idx) => {
        const x = startX + idx * (barWidth + gap);
        const y = 20 - h / 2;
        const color = recording ? currentTheme.error : currentTheme.primary;
        return `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="1.5" fill="${color}" />`;
      }).join('')}
    </svg>
  `;

  const micIconSvg = `
    <svg viewBox="0 0 100 100" width="24" height="24">
      <rect x="35" y="15" width="30" height="45" rx="15" fill="${currentTheme.onSurface}" />
      <path d="M20 45 A 30 30 0 0 0 80 45" fill="none" stroke="${currentTheme.onSurface}" stroke-width="6" stroke-linecap="round" />
      <line x1="50" y1="75" x2="50" y2="90" stroke="${currentTheme.onSurface}" stroke-width="6" />
    </svg>
  `;

  const recordBtnSvg = `
    <svg viewBox="0 0 100 100" width="36" height="36">
      <circle cx="50" cy="50" r="44" fill="${currentTheme.surfaceVariant}" />
      <circle cx="50" cy="50" r="${recording ? 16 : 22}" fill="#F44336" rx="${recording ? 4 : 22}" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 100,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <SvgWidget svg={micIconSvg} style={{ width: 24, height: 24 }} />
      
      <FlexWidget style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
        <TextWidget
          text={recording ? "Recording voice memo..." : "Tap to record memo"}
          style={{
            fontSize: 11,
            color: recording ? currentTheme.error : currentTheme.onSurfaceVariant,
            fontFamily: 'Google Sans',
            fontWeight: 'bold',
          }}
        />
        <SvgWidget svg={waveformSvg} style={{ width: 100, height: 20, marginTop: 2 }} />
      </FlexWidget>

      <SvgWidget svg={recordBtnSvg} style={{ width: 32, height: 32 }} />
    </FlexWidget>
  );
}
