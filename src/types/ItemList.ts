import { TTranslatedName, TColor } from "./types";

export interface IListItemData {
	_links?: {
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
		}>,
		weapon?: {
			attack_speed: {
				value: number,
				display_string: TTranslatedName
			},
			damage: {
				damage_class: {
					type: string,
					name: TTranslatedName
				},
				display_string: TTranslatedName,
				max_value: number,
				min_value: number
			},
			dps: {
				value: number,
				display_string: TTranslatedName
			}
		}
	},
	purchase_quantity: number;
	unique_equipped?: TTranslatedName
};

export interface IListItem {
	data: IListItemData,
	key: {
		href: string;
	}
};

export interface IItemsList {

	maxPageSize: number;
	page: number;
	pageCount: number;
	pageSize: number;
	results: Array<IListItem>;
}