import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function MusicPlayerMiniWidget({ trackName, isPlaying, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
  };

  const title = trackName || 'Blinding Lights';
  const playing = isPlaying !== undefined ? isPlaying : true;

  // Mini Album Art
  const artSvg = `
    <svg viewBox="0 0 100 100" width="36" height="36">
      <rect width="100" height="100" rx="10" fill="${currentTheme.primary}" />
      <path d="M40 70 A 10 10 0 0 1 30 60 V 30 H 70 V 45 H 55 V 60 A 10 10 0 0 1 45 70" fill="${currentTheme.onPrimary}" />
    </svg>
  `;

  // Mini Play/Pause button
  const playPauseSvg = `
    <svg viewBox="0 0 100 100" width="32" height="32">
      <circle cx="50" cy="50" r="46" fill="${currentTheme.primaryContainer}" />
      ${playing 
        ? `<path d="M35 30h8v40h-8zM57 30h8v40h-8z" fill="${currentTheme.onPrimaryContainer}" />`
        : `<path d="M38 30l32 20-32 20z" fill="${currentTheme.onPrimaryContainer}" />`
      }
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 100,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <SvgWidget
        svg={artSvg}
        style={{
          width: 32,
          height: 32,
        }}
      />

      <FlexWidget
        style={{
          flexDirection: 'column',
          flex: 1,
          marginLeft: 8,
          marginRight: 8,
        }}
      >
        <TextWidget
          text={title}
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: currentTheme.onSurface,
            fontFamily: 'Google Sans',
          }}
        />
        <TextWidget
          text="Now Playing"
          style={{
            fontSize: 9,
            color: currentTheme.onSurfaceVariant,
            fontFamily: 'Google Sans',
          }}
        />
      </FlexWidget>

      <FlexWidget clickAction="TOGGLE_PLAY" style={{ padding: 4 }}>
        <SvgWidget
          svg={playPauseSvg}
          style={{
            width: 28,
            height: 28,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}
