import { getLocales } from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enBackpackers from "./locals/en/en-backpackers.json";
import enCommon from "./locals/en/en-common.json";
import enExplore from "./locals/en/en-explore.json";
import enMissions from "./locals/en/en-missions.json";
import enMyoffer from "./locals/en/en-myoffer.json";
import enProfil from "./locals/en/en-profil.json";
import enRoadtrip from "./locals/en/en-roadtrip.json";
import enSaved from "./locals/en/en-saved.json";
import enWoofshare from "./locals/en/en-woofshare.json";
import frBackpackers from "./locals/fr/fr-backpackers.json";
import frCommon from "./locals/fr/fr-common.json";
import frExplore from "./locals/fr/fr-explore.json";
import frMissions from "./locals/fr/fr-missions.json";
import frMyoffer from "./locals/fr/fr-myoffer.json";
import frProfil from "./locals/fr/fr-profil.json";
import frRoadtrip from "./locals/fr/fr-roadtrip.json";
import frSaved from "./locals/fr/fr-saved.json";
import frWoofshare from "./locals/fr/fr-woofshare.json";

const resources = {
  en: {
    common: enCommon,
    profil: enProfil,
    explore: enExplore,
    woofshare: enWoofshare,
    saved: enSaved,
    missions: enMissions,
    myoffer: enMyoffer,
    backpackers: enBackpackers,
    roadtrip: enRoadtrip,
  },
  fr: {
    common: frCommon,
    profil: frProfil,
    explore: frExplore,
    woofshare: frWoofshare,
    saved: frSaved,
    missions: frMissions,
    myoffer: frMyoffer,
    backpackers: frBackpackers,
    roadtrip: frRoadtrip,
  },
};

const lng = getLocales()[0].languageCode ?? "en";

i18next.use(initReactI18next).init({
  debug: false,
  lng,
  ns: [
    "common",
    "profil",
    "explore",
    "woofshare",
    "saved",
    "missions",
    "myoffer",
    "backpackers",
    "roadtrip",
  ],
  resources,
});
