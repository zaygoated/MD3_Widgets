import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function NewsLightWidget({ article, theme }) {
  const currentTheme = theme || {
    surface: '#FEF7FF',
    primary: '#6750A4',
    onSurface: '#1D1B20',
    onSurfaceVariant: '#49454F',
    primaryContainer: '#EADDFF',
    surfaceVariant: '#E7E0EC',
    outline: '#79747E',
  };

  const defaultArticle = article || {
    source: 'Google News • Tech',
    title: 'The Future of AI and Mobile Widgets in Android 15',
    time: '2 hours ago'
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
        borderWidth: 1,
        borderColor: currentTheme.surfaceVariant,
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
