import { TTranslatedName, TColor } from "./types";

export interface IItemDetail {
    _links: {
        self: {
            href: string;
        },
    },
    id: number;
    name: TTranslatedName,
    quality: {
        type: string;
        name: TTranslatedName,
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
        name: TTranslatedName,
        id: number;
    },
    item_subclass: {
        key: {
            href: string;
        },
        name: TTranslatedName,
        id: number;
    },
    inventory_type: {
        type: string;
        name: TTranslatedName,
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
            name: TTranslatedName,
        },
        name: TTranslatedName,
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
            name: TTranslatedName,
            id: number;
        },
        item_subclass: {
            key: {
                href: string;
            },
            name: TTranslatedName,
            id: number;
        },
        inventory_type: {
            type: string;
            name: TTranslatedName,
        },
        binding: {
            type: string;
            name: TTranslatedName,
        },
        armor?: {
            value: number;
            display: {
                display_string: TTranslatedName,
                color: TColor,
            },
        },
        sell_price: {
            value: number;
            display_strings: {
                header: TTranslatedName,
                gold: TTranslatedName,
                silver: TTranslatedName,
                copper: TTranslatedName,
            },
        },
        requirements: {
            level: {
                value: number;
                display_string: TTranslatedName,
            },
        },
        durability: {
            value: number;
            display_string: TTranslatedName;
        },
        stats?: Array<{
            type: {
                type: string;
                name: TTranslatedName;
            },
            value: number;
            display: {
                display_string: TTranslatedName;
                color: TColor;
            },
        }>,
        spells?: Array<{
            spell: {
                key: {
                    href: string;
                },
                name: TTranslatedName;
                id: number;
            },
            description: TTranslatedName;
        }>
    },
    purchase_quantity: number;
}