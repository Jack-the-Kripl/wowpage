export const client_id = "8f21d56065574687b166900cbcbe9a8b";
export const client_secret = "ewp13AN3B68wCuP96s9RMiEwY3tquSWh";
export const base_api_url = "https://eu.api.blizzard.com";
export const token_api_url = "https://us.battle.net/oauth/token";
export const api_namespace = "static-classic-eu";

export const paths = {
    search_item: "/data/wow/search/item",
    item_classes: "/data/wow/item-class/index",
    item_class: "/data/wow/item-class/",
    item_subclass: "/item-subclass/",
    item_detail: "/data/wow/item/",
    item_media: "/data/wow/media/item/"
}

export function create_api_url(key: string) {
    const k = key as keyof typeof paths;
    return base_api_url + paths[k];
}

export function fill_with_values(values: Array<string | number>) {

}