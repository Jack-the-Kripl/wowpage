import { CULTURE } from "../variables";

export type TFetchState = "notFired" | "waiting" | "success" | "error";

export interface ISearchMeta {
	maxPageSize: number;
	page: number;
	pageCount: number;
	pageSize: number;
}

export interface IItemSearchData extends ISearchMeta {
	results: Array<any>;
};

export type TColor = {
	r: number;
	g: number;
	b: number;
	a: number;
}

export type TCulture = "en_US" | "es_MX" | "pt_BR" | "de_DE" | "en_GB" | "es_ES" | "fr_FR" | "it_IT" | "ru_RU" | "ko_KR" | "zh_TW" | "zh_CN";
export type TTranslatedName = {
	[key in TCulture]: string;
}

const test: TCulture = "it_IT"
