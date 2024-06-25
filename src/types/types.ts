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

export interface ITranslatedName {
    en_US: string;
    es_MX: string;
    pt_BR: string;
    de_DE: string;
    en_GB: string;
    es_ES: string;
    fr_FR: string;
    it_IT: string;
    ru_RU: string;
    ko_KR: string;
    zh_TW: string;
    zh_CN: string;
}
