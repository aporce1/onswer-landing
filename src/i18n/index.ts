import en from './en';
import pt from './pt';

export type Locale = 'en' | 'pt';

const dictionaries = { en, pt } as const;

export type Dictionary = typeof en;

export function t(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export const locales: Locale[] = ['en', 'pt'];

export function localeFromPath(pathname: string): Locale {
  if (pathname.startsWith('/pt')) return 'pt';
  return 'en';
}
