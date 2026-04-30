export const languages = {
  en: "English",
  es: "Español",
  "pt-BR": "Português",
};

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.members": "Members",
    "nav.events": "Events",

    "nav.projects": "Projects",
    Profesor: "Professor",
    "PhD student": "PhD Student",
    "PhD candidate": "PhD Candidate",
    Colaborador: "Adjunct researcher",
    url: "Personal website",
    publications: "Latest publications",
    duration: "Duration",
    funding: "Funding",
    "associated events": "Associated events",
    "past events": "Past events",
    "upcoming events": "Upcoming events",
    Oportunidades: "Opportunities",
    coresearcher: "Co-researcher",
    PI: "PI",
    "PI-full": "Principal investigator",

    talk: "Talk",
    workshop: "Workshop",
    course: "Course",
  },
  es: {
    "nav.home": "Inicio",
    "nav.members": "Miembros",
    "nav.events": "Eventos",
    "nav.reading-group": "Grupo de lectura",
    "nav.wip": "Coloquio WIP",
    "nav.projects": "Proyectos",
    Profesor: "Académico",
    "PhD student": "Estudiante de doctorado",
    "PhD candidate": { m: "Candidato doctoral", w: "Candidata doctoral" },
    Colaborador: "Académico colaborador",
    url: "Sitio web personal",
    publications: "Últimas publicaciones",
    duration: "Duración",
    funding: "Financiación",
    "associated events": "Eventos asociados",
    "past events": "Eventos pasados",
    "upcoming events": "Próximos eventos",
    Oportunidades: "Oportunidades",
    coresearcher: "Coinvestigador",
    PI: "IR",
    "PI-full": "Investigador principal",
    "RG.previousgroups": "Grupos de lectura anteriores",
    "RG.currentgroup": "Grupo de lectura actual",
    talk: "Charla",
    workshop: "Workshop",
    course: "Curso",
  },
} as const;

export const countries = {
  en: {
    uk: "United Kingdom",
    co: "Colombia",
    de: "Germany",
    ar: "Argentina",
    us: "United States",
    at: "Austria",
    mx: "Mexico",
  },
  es: {
    uk: "Reino Unido",
    co: "Colombia",
    de: "Alemania",
    ar: "Argentina",
    us: "Estados Unidos",
    at: "Austria",
    mx: "México",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  return lang as keyof typeof languages;
}

export function getAvailableLanguages() {
  return Object.keys(languages) as [keyof typeof languages];
}
