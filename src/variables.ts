import { TCulture, TTranslatedName } from "./types/types"

export const NAMESPACE = {
	CLASSIC_S: { id: "static-classic1x-", name: "World of Warcraft Classic" },
	CLASSIC_D: { id :"dynamic-classic1x-", name: "World of Warcraft Classic" },
	CLASSIC_P: { id: "profile-classic1x-", name: "World of Warcraft Classic" },

	WOTLK_S: { id: "static-classic-", name: "Wrath of the Lich King Classic" },
	WOTLK_D: { id: "dynamic-classic-", name: "Wrath of the Lich King Classic" },
	WOTLK_P: { id: "profile-classic-", name: "Wrath of the Lich King Classic" }
}
export const REGION = {
	// NORTH_AMERICA: { id: "us", name: "North America (US)"},
	EUROPE: { id: "eu", name: "Europe (EU)"}
}

export const CULTURE: {
	[key in TCulture]: { id: TCulture, name: string };
} = {
	en_US: { id: "en_US", name: "US"},
	es_MX: { id: "es_MX", name: "MX"},
	pt_BR: { id: "pt_BR", name: "BR"},
	de_DE: { id: "de_DE", name: "DE"},
	en_GB: { id: "en_GB", name: "GB"},
	es_ES: { id: "es_ES", name: "ES"},
	fr_FR: { id: "fr_FR", name: "FR"},
	it_IT: { id: "it_IT", name: "IT"},
	ru_RU: { id: "ru_RU", name: "RU"},
	ko_KR: { id: "ko_KR", name: "KR"},
	zh_TW: { id: "zh_TW", name: "TW"},
	zh_CN: { id: "zh_CN", name: "CN"}
}

export enum THEME_COLOR {
	LIGHT = 'rgb(219, 184, 141)',
	DARK = 'rgb(47, 56, 71)'

}