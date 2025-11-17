import { getTranslatedSlugs } from "../../lib/directus";
import { getAvailableLanguages } from "./ui";


export async function getStaticPathsWithMultilanguageSlug(page: string) {
    const slugsRaw = await getTranslatedSlugs(page);
    const slugs = Object.fromEntries(
        slugsRaw.map((item) => [item.languages_code, item.slug]),
    );

    const routes = getAvailableLanguages().map((lang) => {
        return { params: { about: slugs[lang], lang }, props: { lang } };
    });
    return routes;
}

export async function getStaticPathsDefault() {
    const routes = getAvailableLanguages().map((lang: string) => {
        const lowercaseLang = lang.toLowerCase()
        return { params: { lang: lowercaseLang }, props: { lang: lowercaseLang } };
    });
    return routes;
}

export function getPageFromUrl(url: URL) {
    const [, lang, ...page] = url.pathname.split('/');
    return page.join('/')
}