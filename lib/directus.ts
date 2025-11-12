import { createDirectus, readItems, rest } from '@directus/sdk';


// TODO: Change the URL to env variables
const directus = createDirectus('https://directus.snow-torino.ts.net').with(rest());

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