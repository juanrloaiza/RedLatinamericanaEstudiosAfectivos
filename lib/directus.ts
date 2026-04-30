import { createDirectus, readItems, rest } from "@directus/sdk";

// TODO: Change the URL to env variables
export const directus = createDirectus("https://api.redeaf.org").with(rest());

export async function getLanguages() {
  return await directus.request(
    readItems("languages", {
      fields: ["code", "name"],
    }),
  );
}

export function getDirectusLocaleCode(locale: string) {
  const directusCodes: Record<string, string> = {
    es: "es",
    en: "en",
    "pt-br": "pt-BR",
  };

  if (locale in directusCodes) return directusCodes[locale];
  else return locale;
}

export async function getTranslatedContent(
  collection: string,
  language: string,
) {
  const content = await directus.request<{
    id: string;
    translations: [Record<string, any>];
  }>(
    readItems(collection, {
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: getDirectusLocaleCode(language),
            },
          },
        },
      },
      fields: ["*", "translations.*"],
      limit: 1,
    }),
  );

  return content.translations[0];
}

export async function getTranslatedPage(pageID: string, language: string) {
  const content = await directus.request<
    [
      {
        id: string;
        translations: [Record<string, any>];
      },
    ]
  >(
    readItems("pages", {
      filter: { page_id: { _eq: pageID } },
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: getDirectusLocaleCode(language),
            },
          },
        },
      },
      fields: [
        "translations.slug",
        "translations.content",
        "translations.title",
      ],
      limit: 1,
    }),
  );
  return content[0].translations[0];
}

export async function getTranslatedSlugs(pageID: string) {
  const content = await directus.request<
    [
      {
        id: string;
        translations: [Record<string, any>];
      },
    ]
  >(
    readItems("pages", {
      filter: { page_id: { _eq: pageID } },
      fields: [
        "translations.slug",
        "translations.languages_code",
        "translations.title",
      ],
      limit: 1,
    }),
  );
  return content[0].translations;
}

export async function getPagesTitlesForLanguage(language: string) {
  const content = await directus.request<
    [
      {
        page_id: string;
        translations: [Record<string, any>];
      },
    ]
  >(
    readItems("pages", {
      fields: [
        "page_id",
        "translations.slug",
        "translations.languages_code",
        "translations.title",
      ],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: getDirectusLocaleCode(language),
            },
          },
        },
      },
    }),
  );
  return content.map((page) => page.translations[0]);
}

export async function getPageIDFromSlug(slug: string, language: string) {
  const content = await directus.request<
    [
      {
        page_id: string;
        translations: [Record<string, any>];
      },
    ]
  >(
    readItems("pages", {
      fields: ["page_id", "translations.slug"],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: getDirectusLocaleCode(language),
            },
            slug: {
              _eq: slug,
            },
          },
        },
      },
    }),
  );
  const page_id =
    content.filter((c) => c.translations.length > 0)[0].page_id || "about";
  return page_id;
}
