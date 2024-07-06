import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IListItemData } from "../types/ItemList";
import useFetch from "../hooks/useFetch";
import useTranslatedName from "../hooks/useTranslatedName";

// interface IItemDetailPageProps {
//     reference: string;
// }

export function ItemDetailPage(): JSX.Element {
	const { itemId } = useParams();
	const [data, setData] = useState<IListItemData | null>(null);
	const [icon, setIcon] = useState<any>(null);
	const [imgPreview, setImgPreview] = useState<any>(null);
	const [doFetch, fetchState] = useFetch();
	const getTranslatedName = useTranslatedName();

	useEffect(() => {
		itemId && doFetch("item_detail", [itemId], [], setData);
	}, [itemId]);

	useEffect(() => {
		data && doFetch(data.media.key.href, [], [], (data: any) => {
			setIcon(data?.assets[0]);
		});
	}, [data?.media.key.href]);

	if (!data) {
		return <></>;
	}
	return (
		<div>
			<div className="section">
				<div className="row">
					<div><img src={icon?.value} alt="no image" width={50} height={50} /></div>
					<h3>{data.name.en_US}</h3>
				</div>
				<div className="row">
					<span>{data.inventory_type.name.en_US}&nbsp;{data.item_class.name.en_US}</span>&nbsp;-&nbsp;<span>{data.item_subclass.name.en_US}</span>
				</div>
				{data.unique_equipped && <div className="row">
					<span>{getTranslatedName(data.unique_equipped)}</span>
				</div>}
				{data.level &&
					<div className="row">
						<span>Level:&nbsp;</span><span>{data.level}</span>
					</div>
				}
			</div>
			{data.preview_item?.weapon &&
				<div className="section">
					<div className="row">{getTranslatedName(data.preview_item.weapon.attack_speed.display_string)}</div>
					<div className="row">{getTranslatedName(data.preview_item.weapon.damage.display_string)}</div>
					<div className="row">{getTranslatedName(data.preview_item.weapon.dps.display_string)}</div>
				</div>
			}
			{data.preview_item?.stats &&
				<div className="section">
					{data.preview_item.stats.map(stat => {
						return (
							<div className="row">
								<span>{stat.display.display_string.en_US}</span>
							</div>
						);
					})}
				</div>
			}
			{data.preview_item?.spells &&
				<div className="section">
					{data.preview_item.spells.map(spell => {
						return (
							<div className="row">
								<span>{spell.description.en_US}</span>
							</div>
						);
					})}
				</div>
			}
		</div>
	)
}