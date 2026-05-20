import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function ClockDigitalWidget({ hours, minutes, dateString, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
  };

  const formattedTime = `${hours}:${minutes}`;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 100,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TextWidget
        text={formattedTime}
        style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: currentTheme.primary,
          fontFamily: 'Roboto',
        }}
      />
      <TextWidget
        text={dateString || 'Wednesday, 20 May'}
        style={{
          fontSize: 12,
          color: currentTheme.onSurfaceVariant,
          fontFamily: 'Google Sans',
          marginTop: 2,
        }}
      />
    </FlexWidget>
  );
}
