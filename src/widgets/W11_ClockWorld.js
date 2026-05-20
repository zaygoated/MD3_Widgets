import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function ClockWorldWidget({ times, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    surfaceVariant: '#49454F',
    onSurfaceVariant: '#CAC4D0',
  };

  // Get current times if not provided
  const getTimeString = (offset) => {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * offset));
    const h = nd.getHours().toString().padStart(2, '0');
    const m = nd.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const cities = times || [
    { name: 'New York', time: getTimeString(-4) },
    { name: 'London', time: getTimeString(1) },
    { name: 'Tokyo', time: getTimeString(9) }
  ];

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 20,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {cities.map((city, idx) => (
        <FlexWidget
          key={idx}
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: currentTheme.surfaceVariant,
            borderRadius: 14,
            marginLeft: idx > 0 ? 4 : 0,
            padding: 8,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextWidget
            text={city.name}
            style={{
              fontSize: 10,
              color: currentTheme.onSurfaceVariant,
              fontFamily: 'Google Sans',
              fontWeight: 'bold',
            }}
          />
          <TextWidget
            text={city.time}
            style={{
              fontSize: 18,
              color: currentTheme.primary,
              fontWeight: 'bold',
              fontFamily: 'Roboto',
              marginTop: 4,
            }}
          />
        </FlexWidget>
      ))}
    </FlexWidget>
  );
}
