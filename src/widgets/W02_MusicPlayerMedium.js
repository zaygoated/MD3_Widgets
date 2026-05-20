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

  const prevSvg = `<svg viewBox="0 0 20 20" width="16" height="16"><path d="M4 10v8l8-8z" fill="${currentTheme.onSurfaceVariant}" /></svg>`;
  const nextSvg = `<svg viewBox="0 0 20 20" width="16" height="16"><path d="M16 10v8l-8-8z" fill="${currentTheme.onSurfaceVariant}" /></svg>`;

  return (
    <FlexWidget
      clickAction="OPEN_APP"
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

      <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
        <FlexWidget clickAction="PREV_TRACK" style={{ padding: 8 }}>
           <SvgWidget svg={prevSvg} style={{ width: 16, height: 16 }} />
        </FlexWidget>
        <FlexWidget clickAction="TOGGLE_PLAY" style={{ padding: 8, marginHorizontal: 12 }}>
           <SvgWidget
             svg={`<svg viewBox="0 0 32 32" width="28" height="28">${playing ? `<path d="M8 4h6v24h-6zM18 4h6v24h-6z" fill="${currentTheme.onSurface}" />` : `<path d="M10 4l16 12-16 12z" fill="${currentTheme.onSurface}" />`}</svg>`}
             style={{ width: 28, height: 28 }}
           />
        </FlexWidget>
        <FlexWidget clickAction="NEXT_TRACK" style={{ padding: 8 }}>
           <SvgWidget svg={nextSvg} style={{ width: 16, height: 16 }} />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
