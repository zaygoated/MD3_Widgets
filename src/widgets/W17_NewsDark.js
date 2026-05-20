import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function NewsDarkWidget({ article, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
    outline: '#938F99',
  };

  const defaultArticle = article || {
    source: 'Google News • World',
    title: 'New Android Design Standards Released for RemoteViews',
    time: '45 mins ago'
  };

  const newsIconSvg = `
    <svg viewBox="0 0 120 120" width="40" height="40">
      <rect width="120" height="120" rx="14" fill="${currentTheme.primaryContainer}" />
      <path d="M30 40 h60 v10 h-60 zM30 60 h40 v8 h-40 zM30 76 h50 v8 h-50 z" fill="${currentTheme.primary}" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 24,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextWidget
          text={defaultArticle.source}
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: currentTheme.primary,
            fontFamily: 'Google Sans',
          }}
        />
        <SvgWidget svg={newsIconSvg} style={{ width: 32, height: 32 }} />
      </FlexWidget>

      <TextWidget
        text={defaultArticle.title}
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: currentTheme.onSurface,
          fontFamily: 'Roboto',
          marginTop: 8,
          flex: 1,
        }}
      />

      <TextWidget
        text={defaultArticle.time}
        style={{
          fontSize: 10,
          color: currentTheme.onSurfaceVariant,
          fontFamily: 'Google Sans',
          marginTop: 6,
        }}
      />
    </FlexWidget>
  );
}
