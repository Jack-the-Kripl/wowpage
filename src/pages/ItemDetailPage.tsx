import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import doFetch from "../hooks/doFetch";
import { create_api_url } from "../api";
import { IItemDetail } from "../types/ItemDetail";

// interface IItemDetailPageProps {
//     reference: string;
// }

export function ItemDetailPage(): JSX.Element {
    const { itemId } = useParams();
    const [data, setData] = useState<IItemDetail | null>(null);
    const [icon, setIcon] = useState<any>(null);
    const [imgPreview, setImgPreview] = useState<any>(null);

    useEffect(() => {
        doFetch(create_api_url("item_detail") + itemId, setData);
    }, [itemId]);

    useEffect(() => {
        data && doFetch(data.media.key.href, (data: any) => {
            setIcon(data?.assets[0]);
        });
    }, [data?.media.key.href]);

    if (!data) {
        return <></>;
    }
    return (
        <div className="container">
            <div className="row">
                <div><img src={icon?.value} alt="no image" width={50} height={50} /></div>
                <h3>{data.name.en_US}</h3>
            </div>
            <div className="row">
                <span>{data.item_class.name.en_US}</span> - <span>{data.item_subclass.name.en_US}</span>
            </div>
            <div className="row">
                <span>{data.inventory_type.name.en_US}</span>
            </div>
            {data.level &&
                <div className="row">
                    <span>Level:&nbsp;</span><span>{data.level}</span>
                </div>
            }
            {data.preview_item &&
                data.preview_item.stats?.map(stat => {
                    return (
                        <div className="row">
                            <span>{stat.display.display_string.en_US}</span>
                        </div>
                    );
                })
            }
            {data.preview_item?.spells &&
                data.preview_item.spells.map(spell => {
                    return (
                        <div className="row">
                            <span>{spell.description.en_US}</span>
                        </div>
                    );
                })
            }
        </div>
    )
}