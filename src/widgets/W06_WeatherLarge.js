import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function WeatherLargeWidget({ temp, condition, city, hourly, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    surfaceVariant: '#49454F',
    outline: '#938F99',
  };

  const currentTemp = temp !== undefined ? temp : 22;
  const currentCondition = condition || 'Sunny';
  const currentCity = city || 'San Francisco';

  const hourlyForecast = hourly || [
    { time: '12 PM', temp: 22, cond: 'Sunny' },
    { time: '3 PM', temp: 24, cond: 'Sunny' },
    { time: '6 PM', temp: 21, cond: 'Cloudy' },
    { time: '9 PM', temp: 18, cond: 'Rainy' },
  ];

  // Weather SVGs generator helper
  const getIconSvg = (cond, size = 48) => {
    if (cond.toLowerCase().includes('sun') || cond.toLowerCase().includes('clear')) {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}">
          <circle cx="50" cy="50" r="18" fill="#F9D266" />
          <g stroke="#F9D266" stroke-width="4" stroke-linecap="round">
            <line x1="50" y1="12" x2="50" y2="22" />
            <line x1="50" y1="78" x2="50" y2="88" />
            <line x1="12" y1="50" x2="22" y2="50" />
            <line x1="78" y1="50" x2="88" y2="50" />
          </g>
        </svg>
      `;
    } else if (cond.toLowerCase().includes('rain') || cond.toLowerCase().includes('shower')) {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}">
          <path d="M30 65 A 15 15 0 0 1 40 38 A 20 20 0 0 1 75 42 A 15 15 0 0 1 75 65 Z" fill="#90A4AE" />
          <g stroke="#80DEEA" stroke-width="3" stroke-linecap="round">
            <line x1="40" y1="72" x2="38" y2="78" />
            <line x1="50" y1="75" x2="48" y2="81" />
          </g>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}">
          <circle cx="35" cy="45" r="14" fill="#F9D266" />
          <path d="M30 65 A 15 15 0 0 1 42 38 A 20 20 0 0 1 75 42 A 15 15 0 0 1 75 65 Z" fill="#ECEFF1" />
        </svg>
      `;
    }
  };

  return (
    <FlexWidget
      clickAction="REFRESH_WEATHER"
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 28,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Section */}
      <FlexWidget
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <FlexWidget style={{ flexDirection: 'column' }}>
          <TextWidget
            text={currentCity}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: currentTheme.onSurface,
              fontFamily: 'Google Sans',
            }}
          />
          <TextWidget
            text={`${currentTemp}°`}
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: currentTheme.primary,
              fontFamily: 'Roboto',
              marginTop: 4,
            }}
          />
          <TextWidget
            text={currentCondition}
            style={{
              fontSize: 12,
              color: currentTheme.onSurfaceVariant,
              fontFamily: 'Google Sans',
            }}
          />
        </FlexWidget>

        <SvgWidget
          svg={getIconSvg(currentCondition, 56)}
          style={{
            width: 56,
            height: 56,
          }}
        />
      </FlexWidget>

      {/* Divider */}
      <FlexWidget
        style={{
          height: 1,
          backgroundColor: currentTheme.outline,
          opacity: 0.2,
          marginTop: 8,
          marginBottom: 8,
        }}
      />

      {/* Hourly Forecast */}
      <FlexWidget
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {hourlyForecast.map((hour, idx) => (
          <FlexWidget
            key={idx}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <TextWidget
              text={hour.time}
              style={{
                fontSize: 10,
                color: currentTheme.onSurfaceVariant,
                fontFamily: 'Google Sans',
              }}
            />
            <SvgWidget
              svg={getIconSvg(hour.cond, 24)}
              style={{
                width: 24,
                height: 24,
                marginTop: 4,
                marginBottom: 4,
              }}
            />
            <TextWidget
              text={`${hour.temp}°`}
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: currentTheme.onSurface,
                fontFamily: 'Roboto',
              }}
            />
          </FlexWidget>
        ))}
      </FlexWidget>
    </FlexWidget>
  );
}
