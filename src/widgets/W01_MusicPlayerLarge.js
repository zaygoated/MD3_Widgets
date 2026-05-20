import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function MusicPlayerLargeWidget({ trackName, artistName, isPlaying, progressPercent, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    surfaceVariant: '#49454F',
    primaryContainer: '#4F378B',
  };

  const title = trackName || 'Starlight';
  const artist = artistName || 'Muse';
  const playing = isPlaying !== undefined ? isPlaying : true;
  const progress = progressPercent !== undefined ? progressPercent : 45;

  // Squiggly progress bar:
  // Wave path: width 160, height 20. Midpoint at y=10.
  const wavePath = "M 0 10 Q 10 4, 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 T 140 10 T 160 10";
  const clipWidth = (160 * progress) / 100;

  // Render music control buttons as SVGs
  const playPauseIcon = playing
    ? `<path d="M35 30h8v40h-8zM57 30h8v40h-8z" fill="${currentTheme.primary}" />`
    : `<path d="M35 30l30 20-30 20z" fill="${currentTheme.primary}" />`;

  const controlButtonsSvg = `
    <svg viewBox="0 0 160 100" width="80" height="50">
      <!-- Prev -->
      <path d="M25 40v20l15-10zm20 0v20l15-10z" fill="${currentTheme.onSurface}" />
      <!-- Play/Pause -->
      <circle cx="80" cy="50" r="28" fill="${currentTheme.primaryContainer}" />
      ${playPauseIcon}
      <!-- Next -->
      <path d="M120 40v20l-15-10zm-20 0v20l-15-10z" transform="rotate(180 110 50)" fill="${currentTheme.onSurface}" />
    </svg>
  `;

  // Album art note icon
  const albumArtSvg = `
    <svg viewBox="0 0 100 100" width="48" height="48">
      <rect width="100" height="100" rx="12" fill="${currentTheme.primary}" />
      <path d="M40 70 A 10 10 0 0 1 30 60 A 10 10 0 0 1 40 50 A 10 10 0 0 1 50 60 V 30 H 70 V 45 H 55 V 60 A 10 10 0 0 1 45 70" fill="${currentTheme.onPrimary}" />
    </svg>
  `;

  const squigglySvg = `
    <svg viewBox="0 0 160 20" width="160" height="20">
      <defs>
        <clipPath id="progress-clip">
          <rect x="0" y="0" width="${clipWidth}" height="20" />
        </clipPath>
      </defs>
      <!-- Background Wave (Unfilled) -->
      <path d="${wavePath}" stroke="${currentTheme.surfaceVariant}" stroke-width="3" fill="none" stroke-linecap="round" />
      <!-- Foreground Wave (Filled) -->
      <path d="${wavePath}" stroke="${currentTheme.primary}" stroke-width="3.5" fill="none" stroke-linecap="round" clip-path="url(#progress-clip)" />
      <!-- Handle/Thumb indicator -->
      <circle cx="${clipWidth}" cy="10" r="5" fill="${currentTheme.primary}" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 24,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Album Art */}
      <SvgWidget
        svg={albumArtSvg}
        style={{
          width: 48,
          height: 48,
        }}
      />

      {/* Info and Progress */}
      <FlexWidget
        style={{
          flexDirection: 'column',
          marginLeft: 12,
          flex: 1.5,
        }}
      >
        <TextWidget
          text={title}
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: currentTheme.onSurface,
            fontFamily: 'Google Sans',
          }}
        />
        <TextWidget
          text={artist}
          style={{
            fontSize: 11,
            color: currentTheme.onSurfaceVariant,
            fontFamily: 'Google Sans',
            marginTop: 2,
          }}
        />
        <FlexWidget style={{ marginTop: 6 }}>
          <SvgWidget
            svg={squigglySvg}
            style={{
              width: 140,
              height: 16,
            }}
          />
        </FlexWidget>
      </FlexWidget>

      {/* Controls */}
      <FlexWidget
        style={{
          flex: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SvgWidget
          svg={controlButtonsSvg}
          style={{
            width: 76,
            height: 48,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}
