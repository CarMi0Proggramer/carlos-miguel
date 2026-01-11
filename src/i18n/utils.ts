import { translations, languages } from "./ui";

export const defaultLang = "es";

export function getLangFromUrl(url: URL): "es" | "br" {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as keyof typeof languages;

  return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
  return translations[lang];
}
