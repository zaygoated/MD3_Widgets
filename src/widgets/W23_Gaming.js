import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function GamingWidget({ friendName, gameName, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const name = friendName || 'Alex';
  const game = gameName || 'Minecraft';

  const controllerSvg = `
    <svg viewBox="0 0 100 100" width="36" height="36">
      <rect width="100" height="100" rx="12" fill="${currentTheme.primaryContainer}" />
      <!-- Controller D-pad and buttons -->
      <path d="M25 50 H45 M35 40 V60" fill="none" stroke="${currentTheme.primary}" stroke-width="6" stroke-linecap="round" />
      <circle cx="65" cy="45" r="5" fill="${currentTheme.primary}" />
      <circle cx="75" cy="55" r="5" fill="${currentTheme.primary}" />
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
      <SvgWidget svg={controllerSvg} style={{ width: 36, height: 36 }} />

      <FlexWidget
        style={{
          flexDirection: 'column',
          flex: 1,
          marginLeft: 10,
        }}
      >
        <TextWidget
          text={name}
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            color: currentTheme.onSurface,
            fontFamily: 'Google Sans',
          }}
        />
        <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
          <FlexWidget
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: '#4CAF50', // Green online dot
              marginRight: 4,
            }}
          />
          <TextWidget
            text={`Playing ${game}`}
            style={{
              fontSize: 10,
              color: currentTheme.onSurfaceVariant,
              fontFamily: 'Google Sans',
            }}
          />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
