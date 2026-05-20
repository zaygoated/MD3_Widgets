import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function ClockDateWidget({ dayNumber, dayName, monthName, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    primaryContainer: '#4F378B',
    onPrimaryContainer: '#EADDFF',
  };

  const day = dayNumber || new Date().getDate().toString();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dName = dayName || daysOfWeek[new Date().getDay()];
  const mName = monthName || months[new Date().getMonth()];

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 24,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <FlexWidget
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <TextWidget
          text={day}
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: currentTheme.primary,
            fontFamily: 'Montserrat Black',
          }}
        />
        <TextWidget
          text={dName}
          style={{
            fontSize: 14,
            color: currentTheme.onSurface,
            fontFamily: 'Google Sans',
          }}
        />
      </FlexWidget>

      <FlexWidget
        style={{
          backgroundColor: currentTheme.primaryContainer,
          borderRadius: 16,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextWidget
          text={mName.toUpperCase()}
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: currentTheme.onPrimaryContainer,
            fontFamily: 'Roboto',
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}
