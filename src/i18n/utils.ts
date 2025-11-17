import { getTranslatedSlugs } from "../../lib/directus";
import { languages } from "./ui";


export async function getStaticPathsWithMultilanguageSlug(page: string) {
    const slugsRaw = await getTranslatedSlugs(page);
    const slugs = Object.fromEntries(
        slugsRaw.map((item) => [item.languages_code, item.slug]),
    );

    const routes = Object.keys(languages).map((lang) => {
        return { params: { about: slugs[lang], lang }, props: { lang } };
    });
    return routes;
}

export async function getStaticPathsDefault() {
    const routes = Object.keys(languages).map((lang) => {
        return { params: { lang }, props: { lang } };
    });
    return routes;
}