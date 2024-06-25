import { ITranslatedName, TColor } from "./types";

export interface IItemDetail {
    _links: {
        self: {
            href: string;
        },
    },
    id: number;
    name: ITranslatedName,
    quality: {
        type: string;
        name: ITranslatedName,
    },
    level: number;
    required_level: number;
    media: {
        key: {
            href: string;
        },
        id: number;
    },
    item_class: {
        key: {
            href: string;
        },
        name: ITranslatedName,
        id: number;
    },
    item_subclass: {
        key: {
            href: string;
        },
        name: ITranslatedName,
        id: number;
    },
    inventory_type: {
        type: string;
        name: ITranslatedName,
    },
    purchase_price: number;
    sell_price: number;
    max_count: number;
    is_equippable: boolean;
    is_stackable: boolean;
    preview_item?: {
        item: {
            key: {
                href: string;
            },
            id: number;
        },
        quality: {
            type: string;
            name: ITranslatedName,
        },
        name: ITranslatedName,
        media: {
            key: {
                href: string;
            },
            id: number;
        },
        item_class: {
            key: {
                href: string;
            },
            name: ITranslatedName,
            id: number;
        },
        item_subclass: {
            key: {
                href: string;
            },
            name: ITranslatedName,
            id: number;
        },
        inventory_type: {
            type: string;
            name: ITranslatedName,
        },
        binding: {
            type: string;
            name: ITranslatedName,
        },
        armor?: {
            value: number;
            display: {
                display_string: ITranslatedName,
                color: TColor,
            },
        },
        sell_price: {
            value: number;
            display_strings: {
                header: ITranslatedName,
                gold: ITranslatedName,
                silver: ITranslatedName,
                copper: ITranslatedName,
            },
        },
        requirements: {
            level: {
                value: number;
                display_string: ITranslatedName,
            },
        },
        durability: {
            value: number;
            display_string: ITranslatedName;
        },
        stats?: Array<{
            type: {
                type: string;
                name: ITranslatedName;
            },
            value: number;
            display: {
                display_string: ITranslatedName;
                color: TColor;
            },
        }>,
        spells?: Array<{
            spell: {
                key: {
                    href: string;
                },
                name: ITranslatedName;
                id: number;
            },
            description: ITranslatedName;
        }>
    },
    purchase_quantity: number;
}