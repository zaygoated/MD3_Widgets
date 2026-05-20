import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function WeatherSmallWidget({ temp, condition, city, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
  };

  const currentTemp = temp !== undefined ? temp : 22;
  const currentCondition = condition || 'Sunny';
  const currentCity = city || 'New York';

  // SVG representation for weather icons
  let weatherSvg = '';
  if (currentCondition.toLowerCase().includes('sun') || currentCondition.toLowerCase().includes('clear')) {
    weatherSvg = `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="18" fill="#F9D266" />
        <g stroke="#F9D266" stroke-width="4" stroke-linecap="round">
          <line x1="50" y1="12" x2="50" y2="22" />
          <line x1="50" y1="78" x2="50" y2="88" />
          <line x1="12" y1="50" x2="22" y2="50" />
          <line x1="78" y1="50" x2="88" y2="50" />
          <line x1="23" y1="23" x2="30" y2="30" />
          <line x1="70" y1="70" x2="77" y2="77" />
          <line x1="70" y1="30" x2="77" y2="23" />
          <line x1="23" y1="77" x2="30" y2="70" />
        </g>
      </svg>
    `;
  } else if (currentCondition.toLowerCase().includes('rain') || currentCondition.toLowerCase().includes('shower')) {
    weatherSvg = `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <!-- Cloud base -->
        <path d="M30 65 A 15 15 0 0 1 40 38 A 20 20 0 0 1 75 42 A 15 15 0 0 1 75 65 Z" fill="#90A4AE" />
        <!-- Rain Drops -->
        <g stroke="#80DEEA" stroke-width="3" stroke-linecap="round">
          <line x1="40" y1="72" x2="38" y2="78" />
          <line x1="50" y1="75" x2="48" y2="81" />
          <line x1="60" y1="72" x2="58" y2="78" />
        </g>
      </svg>
    `;
  } else {
    // Cloud/Default
    weatherSvg = `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <!-- Cloud outline and fill -->
        <path d="M30 60 A 15 15 0 0 1 40 32 A 22 22 0 0 1 76 38 A 16 16 0 0 1 74 60 Z" fill="#B0BEC5" />
      </svg>
    `;
  }

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextWidget
        text={currentCity}
        style={{
          fontSize: 10,
          color: currentTheme.onSurfaceVariant,
          fontFamily: 'Google Sans',
          fontWeight: 'bold',
        }}
      />
      <SvgWidget
        svg={weatherSvg}
        style={{
          width: 36,
          height: 36,
        }}
      />
      <TextWidget
        text={`${currentTemp}°`}
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: currentTheme.onSurface,
          fontFamily: 'Roboto',
        }}
      />
    </FlexWidget>
  );
}
