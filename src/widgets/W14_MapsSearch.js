import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function MapsSearchWidget({ theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const searchIconSvg = `
    <svg viewBox="0 0 100 100" width="24" height="24">
      <circle cx="45" cy="45" r="25" fill="none" stroke="${currentTheme.onSurfaceVariant}" stroke-width="6" />
      <line x1="63" y1="63" x2="85" y2="85" stroke="${currentTheme.onSurfaceVariant}" stroke-width="8" stroke-linecap="round" />
    </svg>
  `;

  const micIconSvg = `
    <svg viewBox="0 0 100 100" width="24" height="24">
      <rect x="35" y="15" width="30" height="45" rx="15" fill="${currentTheme.primary}" />
      <path d="M20 45 A 30 30 0 0 0 80 45" fill="none" stroke="${currentTheme.onSurfaceVariant}" stroke-width="6" stroke-linecap="round" />
      <line x1="50" y1="75" x2="50" y2="90" stroke="${currentTheme.onSurfaceVariant}" stroke-width="6" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surfaceVariant,
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
      <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <SvgWidget
          svg={searchIconSvg}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <TextWidget
          text="Search here..."
          style={{
            fontSize: 14,
            color: currentTheme.onSurfaceVariant,
            fontFamily: 'Google Sans',
            marginLeft: 12,
          }}
        />
      </FlexWidget>

      <SvgWidget
        svg={micIconSvg}
        style={{
          width: 24,
          height: 24,
        }}
      />
    </FlexWidget>
  );
}
