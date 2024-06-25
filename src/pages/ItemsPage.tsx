import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import doFetch from "../hooks/doFetch";
import { create_api_url } from "../api";
import { IItemSearchData, ISearchMeta } from "../types/types";
import { Link, useSearchParams } from "react-router-dom";

export function ItemsPage(): JSX.Element {
    const [search, setSearch] = useSearchParams();
    const [searchMeta, setSearchMeta] = useState<ISearchMeta | null>(null);
    const [items, setItems] = useState<Array<any>>([]);
    const [searchValue, setSearchValue] = useState<string>(search.get("search") ?? "");

    useEffect(() => {
        if (search.get("search")) {
            doSearch();
        }
    }, [search]);

    function doSearch() {
        doFetch(create_api_url("search_item") + `?name.en_US=${searchValue}&_page=1`, (data: IItemSearchData) => {
            setSearchMeta({
                maxPageSize: data.maxPageSize,
                page: data.page,
                pageCount: data.pageCount,
                pageSize: data.pageSize
            });
            setItems(data.results);
        }).catch(console.log);
    }

    function handleInputChange(e: any) {
        const val = e.target.value;
        setSearchValue(val);
    }

    function handleSearchClick() {
        setSearch(params => {
            params.set("search", searchValue);
            return params
        });
        doSearch();
    }

    return (
        <div className="container">
            <h1>ITEMS PAGE</h1>
            <div className="row">
                <TextField onChange={handleInputChange} value={searchValue} InputProps={{ value: searchValue }} />
                <Button onClick={handleSearchClick}>SEARCH</Button>
            </div>
            {
                items.map(item => <div className="row"><Link to={`detail/${item.data.id}`} key={`item_` + item.data.id}>{item.data.name.en_US}</Link></div>)
            }
        </div>
    )
}