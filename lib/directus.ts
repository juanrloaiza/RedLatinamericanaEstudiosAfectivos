import { createDirectus, readItems, rest } from '@directus/sdk';


// TODO: Change the URL to env variables
export const directus = createDirectus('https://directus.snow-torino.ts.net').with(rest());

export async function getLanguages() {
    return await directus.request(
        readItems("languages", {
            fields: ["code", "name"],
        }),
    );
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
                            _eq: language,
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

export async function getTranslatedPage(
    page: string,
    language: string,
) {
    const content = await directus.request<[{
        id: string;
        translations: [Record<string, any>];
    }]>(
        readItems("pages", {
            filter: { page_id: { _eq: page } },
            deep: {
                translations: {
                    _filter: {
                        languages_code: {
                            _eq: language,
                        },
                    },
                },
            },
            fields: ["translations.slug", "translations.content", "translations.title"],
            limit: 1,
        }),
    );

    return content[0].translations[0];
}


export async function getTranslatedSlugs(
    page: string,
) {
    const content = await directus.request<[{
        id: string;
        translations: [Record<string, any>];
    }]>(
        readItems("pages", {
            filter: { page_id: { _eq: page } },
            fields: ["translations.slug", "translations.languages_code", "translations.title"],
            limit: 1,
        }),
    );

    return content[0].translations;
}

export async function getPagesTitlesForLanguage(
    language: string
) {
    const content = await directus.request<[{
        page_id: string;
        translations: [Record<string, any>];
    }]>(
        readItems("pages", {
            fields: ["page_id", "translations.slug", "translations.languages_code", "translations.title"],
            deep: {
                translations: {
                    _filter: {
                        languages_code: {
                            _eq: language,
                        },
                    },
                },
            },
            limit: 1,
        }),
    );

    return content[0];
}