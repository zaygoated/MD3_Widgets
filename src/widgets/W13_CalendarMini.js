import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function CalendarMiniWidget({ event, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    onPrimaryContainer: '#EADDFF',
  };

  const nextEvent = event || {
    title: 'Design Review',
    time: '10:00 AM'
  };

  const calendarIconSvg = `
    <svg viewBox="0 0 100 100" width="32" height="32">
      <rect x="15" y="20" width="70" height="65" rx="10" fill="none" stroke="${currentTheme.primary}" stroke-width="6" />
      <line x1="15" y1="42" x2="85" y2="42" stroke="${currentTheme.primary}" stroke-width="6" />
      <circle cx="35" cy="58" r="6" fill="${currentTheme.primary}" />
      <circle cx="65" cy="58" r="6" fill="${currentTheme.primary}" />
      <line x1="35" y1="12" x2="35" y2="22" stroke="${currentTheme.primary}" stroke-width="6" stroke-linecap="round" />
      <line x1="65" y1="12" x2="65" y2="22" stroke="${currentTheme.primary}" stroke-width="6" stroke-linecap="round" />
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
      <SvgWidget
        svg={calendarIconSvg}
        style={{
          width: 32,
          height: 32,
        }}
      />
      <FlexWidget
        style={{
          flexDirection: 'column',
          flex: 1,
          marginLeft: 12,
        }}
      >
        <TextWidget
          text="NEXT EVENT"
          style={{
            fontSize: 9,
            fontWeight: 'bold',
            color: currentTheme.primary,
            fontFamily: 'Google Sans',
          }}
        />
        <TextWidget
          text={nextEvent.title}
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: currentTheme.onSurface,
            fontFamily: 'Google Sans',
            marginTop: 1,
          }}
        />
      </FlexWidget>
      <TextWidget
        text={nextEvent.time}
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: currentTheme.onSurfaceVariant,
          fontFamily: 'Roboto',
        }}
      />
    </FlexWidget>
  );
}
