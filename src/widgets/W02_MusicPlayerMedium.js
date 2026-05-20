import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function MusicPlayerMediumWidget({ trackName, artistName, isPlaying, progressPercent, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    surfaceVariant: '#49454F',
    primaryContainer: '#4F378B',
  };

  const title = trackName || 'After Hours';
  const artist = artistName || 'The Weeknd';
  const playing = isPlaying !== undefined ? isPlaying : false;
  const progress = progressPercent !== undefined ? progressPercent : 60;

  const progressWidth = (140 * progress) / 100;

  // Medium size album art with musical note
  const artSvg = `
    <svg viewBox="0 0 120 120" width="80" height="80">
      <rect width="120" height="120" rx="16" fill="${currentTheme.primary}" />
      <path d="M50 80 A 12 12 0 0 1 38 68 A 12 12 0 0 1 50 56 A 12 12 0 0 1 62 68 V 35 H 85 V 50 H 68 V 68 A 12 12 0 0 1 56 80" fill="${currentTheme.onPrimary}" />
    </svg>
  `;

  // Straight progress line
  const progressLineSvg = `
    <svg viewBox="0 0 140 8" width="140" height="8">
      <rect width="140" height="6" rx="3" fill="${currentTheme.surfaceVariant}" />
      <rect width="${progressWidth}" height="6" rx="3" fill="${currentTheme.primary}" />
    </svg>
  `;

  // Buttons SVG
  const playPausePath = playing
    ? `<path d="M16 12h4v16h-4zM24 12h4v16h-4z" fill="${currentTheme.onSurface}" />`
    : `<path d="M16 12l12 8-12 8z" fill="${currentTheme.onSurface}" />`;

  const playPauseSvg = `
    <svg viewBox="0 0 44 40" width="36" height="32">
      <!-- Back -->
      <path d="M8 12v16l8-8z" fill="${currentTheme.onSurfaceVariant}" />
      <!-- Center -->
      ${playPausePath}
      <!-- Next -->
      <path d="M36 12v16l-8-8z" fill="${currentTheme.onSurfaceVariant}" />
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
        alignItems: 'center',
      }}
    >
      <SvgWidget
        svg={artSvg}
        style={{
          width: 80,
          height: 80,
        }}
      />

      <FlexWidget
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 6,
          width: 'match_parent',
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
      </FlexWidget>

      <SvgWidget
        svg={progressLineSvg}
        style={{
          width: 130,
          height: 8,
          marginTop: 6,
        }}
      />

      <SvgWidget
        svg={playPauseSvg}
        style={{
          width: 100,
          height: 32,
          marginTop: 4,
        }}
      />
    </FlexWidget>
  );
}
