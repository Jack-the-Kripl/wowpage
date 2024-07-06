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
			return <Link to={`detail/${rowData.data.id}`} key={`item_` + rowData.data.id}>Detail</Link>;
		}
	}
];

export function ItemsPage(): JSX.Element {
	const [search, setSearch] = useSearchParams();
	const [searchMeta, setSearchMeta] = useState<ISearchMeta | undefined>();
	const [items, setItems] = useState<Array<IListItem>>([]);
	const [searchValue, setSearchValue] = useState<string>(search.get("search") ?? "");
	const [itemClasses, setItemClasses] = useState<Array<any>>([]);

	const [filters, setFilters] = useState<Array<[string, string | number]>>([]);

	const [doFetch, fetchState] = useFetch();

	useEffect(() => {
		if (search.get("search")) {
			doSearch();
		};
	}, []);

	// useEffect(() => {
	// 	items.length > 0 && doSearch();
	// }, [filters]);

	function doSearch() {
		doFetch(
			"search_item",
			[],
			[["name.{culture}", searchValue], ["orderby", "required_level"], ...filters],
			(data: IItemSearchData) => {
				setSearchMeta({
					maxPageSize: data.maxPageSize,
					page: data.page,
					pageCount: data.pageCount,
					pageSize: data.pageSize
				});
				setItems(data.results);
			}).catch(console.log);
	};

	function handleInputChange(e: any) {
		const val = e.target.value;
		setSearchValue(val);
	};

	function handleSearchClick() {
		setSearch(params => {
			params.set("search", searchValue);
			return params
		});
		doSearch();
	};

	function handleFilterChange(args: Array<[string, string | number]>) {
		setFilters(prev => {
			const newFilters = [...prev];
			let modified = false;
			args.forEach(([key, value]) => {
				const filter = newFilters.find(f => f[0] === key);
				if (filter) {
					if (filter[1] !== value) {
						filter[1] = value;
						modified = true;
					}
				} else {
					newFilters.push([key, value]);
					modified = true;
				};
			});
			return modified ? newFilters : prev;
		});
	};

	return (
		<>
			<h1>ITEMS PAGE</h1>
			<div className="row">
				<TextField variant="standard" onChange={handleInputChange} value={searchValue} InputProps={{ value: searchValue }} placeholder="Name" />
				<Button onClick={handleSearchClick}>SEARCH</Button>
			</div>
			<div className="row">
				<Dropdown dark options={itemClasses} valueKey="name" style={{ width: "10rem" }} onChange={(value) => {
					handleFilterChange([["type", (value as string).toLowerCase()]]);
				}} />
			</div>
			<Table columns={item_table_cols_def} rows={items} metadata={searchMeta} onPageChange={(currentPage: number, currentPageSize: number) => {
				handleFilterChange([["_page", currentPage], ["_pageSize", currentPageSize]]);
			}} fetchState={fetchState} />
		</>
	)
}