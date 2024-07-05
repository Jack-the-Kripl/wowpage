import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IItemSearchData, ISearchMeta } from "../types/types";
import { Link, useSearchParams } from "react-router-dom";
import Table, { IColDef } from "../components/common/Table/Table";
import useFetch from "../hooks/useFetch";
import { IListItem } from "../types/ItemList";
import Dropdown from "../components/common/Dropdown/Dropdown";

const item_table_cols_def: Array<IColDef<IListItem>> = [
	{
		field: '',
		headerName: "Name",
		valueGetter: (rowData) => rowData.data.name,
	},
	{
		field: '',
		headerName: "Type",
		valueGetter: (rowData) => rowData.data.inventory_type.name
	},
	{
		field: '',
		headerName: "Item Level",
		valueGetter: (rowData) => rowData.data.level
	},
	{
		field: '',
		headerName: "Required Level",
		valueGetter: (rowData) => rowData.data.required_level
	},
	{
		field: 'actions',
		headerName: "",
		render: (rowData) => {
			return <Link to={`detail/${rowData.data.id}`} key={`item_` + rowData.data.id}>Detail</Link>
		}
	}
]

export function ItemsPage(): JSX.Element {
	const [search, setSearch] = useSearchParams();
	const [searchMeta, setSearchMeta] = useState<ISearchMeta | undefined>();
	const [items, setItems] = useState<Array<IListItem>>([]);
	const [searchValue, setSearchValue] = useState<string>(search.get("search") ?? "");
	const [itemClasses, setItemClasses] = useState<Array<any>>([]);

	const [doFetch, fetchState] = useFetch();

	useEffect(() => {
		if (search.get("search")) {
			doSearch();
		}

		doFetch("item_classes", [], [], (data: any) => {
			setItemClasses(data.item_classes);
		}).catch(console.log);
	}, []);

	function doSearch(page: number = 1, pageSize: number = 15) {
		(page !== searchMeta?.page || pageSize !== searchMeta?.pageSize) && doFetch(
			"search_item",
			[],
			[["name.{culture}", searchValue], ["_page", page.toString()], ["_pageSize", pageSize.toString()], ["orderby", "required_level"]],
			(data: IItemSearchData) => {
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
		<>
			<h1>ITEMS PAGE</h1>
			<div className="row">
				<TextField variant="standard" onChange={handleInputChange} value={searchValue} InputProps={{ value: searchValue }} placeholder="Name" />
				<Dropdown dark options={itemClasses} style={{ width: "10rem" }} />
				<Button onClick={handleSearchClick}>SEARCH</Button>
			</div>
			<Table columns={item_table_cols_def} rows={items} metadata={searchMeta} onPageChange={doSearch} fetchState={fetchState} />
		</>
	)
}