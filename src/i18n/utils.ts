import { getPageIDFromSlug, getTranslatedSlugs } from "../../lib/directus";
import { getAvailableLanguages } from "./ui";


export async function getStaticPathsWithMultilanguageSlug(pageID: string, pageAstroID: string) {
    const slugsRaw = await getTranslatedSlugs(pageID);
    const slugs = Object.fromEntries(
        slugsRaw.map((item) => [item.languages_code, item.slug]),
    );

    const getPaths = () => {
        return getAvailableLanguages().map((lang) => {
            return { params: { [pageAstroID]: slugs[lang], lang: lang.toLowerCase() }, props: { lang } };
        });
    }
    return getPaths;
}

export async function getStaticPathsDefault() {
    return getAvailableLanguages().map((lang: string) => {
        const lowercaseLang = lang.toLowerCase()
        return { params: { lang: lowercaseLang }, props: { lang: lowercaseLang } };
    });
}

export async function getPageFromUrlSlug(url: URL) {
    const [, lang, slug] = url.pathname.split('/');
    if (slug == "") return "about"

    const pageID = await getPageIDFromSlug(slug, lang)
    if (pageID !== undefined) return pageID

    throw new Error(`No page found for slug: ${slug}`)
}