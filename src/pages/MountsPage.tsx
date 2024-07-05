import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IItemSearchData, ISearchMeta } from "../types/types";
import { Link, useSearchParams } from "react-router-dom";
import Table, { IColDef } from "../components/common/Table/Table";
import useFetch from "../hooks/useFetch";

const item_table_cols_def: Array<IColDef<any>> = [
	{
		field: 'name',
		headerName: "Name",
		valueGetter: (rowData) => rowData.data.name.en_US
	}
]

export function MountsPage(): JSX.Element {
	const [search, setSearch] = useSearchParams();
	const [searchMeta, setSearchMeta] = useState<ISearchMeta | null>(null);
	const [items, setItems] = useState<Array<any>>([]);
	const [searchValue, setSearchValue] = useState<string>(search.get("search") ?? "");

	const [doFetch, fetchState] = useFetch();

	useEffect(() => {
		if (search.get("search")) {
			doSearch();
		}
	}, []);

	function doSearch() {
		// doFetch("search_item", [], [["name.{culture}", searchValue], ["_page", "1"]], (data: IItemSearchData) => {
		//     setSearchMeta({
		//         maxPageSize: data.maxPageSize,
		//         page: data.page,
		//         pageCount: data.pageCount,
		//         pageSize: data.pageSize
		//     });
		//     setItems(data.results);
		// }).catch(console.log);
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
		<div>
			<h1>MOUNTS</h1>
			<div className="row">
				<TextField onChange={handleInputChange} value={searchValue} InputProps={{ value: searchValue }} />
				<Button onClick={handleSearchClick}>SEARCH</Button>
			</div>
			{
				items.map(item => <div className="row" key={"list_item_" + (item.id ?? Math.random())}><Link to={`detail/${item.data.id}`} key={`item_` + item.data.id}>{item.data.name.en_US}</Link></div>)
			}
			<Table columns={item_table_cols_def} rows={items} />
		</div>
	)
}