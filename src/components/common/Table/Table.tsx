import React, { useCallback, useEffect, useState } from "react";
import "./table.css";
import useTranslatedName from "../../../hooks/useTranslatedName";
import { ISearchMeta, TFetchState } from "../../../types/types";
import { TRequestConfig } from "../../../hooks/useFetch";
import { ENDPOINTS } from "../../../api";
import Dropdown from "../Dropdown/Dropdown";
import { CircularProgress } from "@mui/material";

export interface IColDef<T> {
	field: string;
	headerName: string;
	description?: string;
	width?: string | number;
	valueGetter?: (rowData: T) => any;
	render?: (rowData: T) => JSX.Element;
}

interface ITableProps {
	columns: Array<IColDef<any>>;
	rows: Array<any>;
	metadata?: ISearchMeta;
	fetchState?: TFetchState;
	onPageChange?: (currentPage: number, currentPageSize: number) => void;
	onRowClick?: (rowData: any) => void;
	tableHeight?: string;
}

const allowedPageSizes = [5, 10, 15, 25, 50, 100];

export default function Table(props: ITableProps): JSX.Element {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentPageSize, setCurrentPageSize] = useState<number>(15);

	const getTranslatedName = useTranslatedName();

	const defaultColWidth = 100 / props.columns.length;

	useEffect(() => {
		props.metadata && props.onPageChange?.(currentPage, currentPageSize);
	}, [currentPage, currentPageSize]);

	useEffect(() => {
		props.metadata?.pageSize && props.metadata.pageSize !== currentPageSize && setCurrentPageSize(props.metadata.pageSize);
	}, [props.metadata?.pageSize]);

	useEffect(() => {
		props.metadata?.page && props.metadata.page !== currentPage && setCurrentPage(props.metadata.page)
	}, [props.metadata?.page]);

	const getValue = useCallback((rowData: any, valueGetter: (rowData: any) => any): string | null => {
		const translations = valueGetter(rowData);
		return getTranslatedName(translations);
	}, [getTranslatedName]);


	function handleNextPage() {
		setCurrentPage(prev => {
			if (!prev) {
				return prev;
			}
			if (prev >= props.metadata!.pageCount) {
				return props.metadata!.pageCount;
			} else {
				return prev + 1;
			}
		});

	};

	function handlePreviousPage() {
		setCurrentPage(prev => {
			if (!prev) {
				return prev;
			}
			if (prev <= 1) {
				return 1;
			} else {
				return prev - 1;
			}
		});
	};

	function handlePageSizeChange(value: string | number) {
		typeof value === "number" && setCurrentPageSize(value);
	};

	let tableContent;
	if (props.fetchState === 'waiting') {
		tableContent = <div className="table_no-data"><CircularProgress /></div>;
	} else {
		if (props.rows.length === 0) {
			tableContent = <div className="table_no-data">No Data</div>
		} else {
			tableContent = props.rows.map(row => {
				return (
					<tr onClick={props.onRowClick ? props.onRowClick : () => { }}>
						{
							props.columns.map(col => {
								if (col.render) {
									return <td style={{ width: col.width ?? `${defaultColWidth}%` }}>{col.render(row)}</td>;
								}
								return (
									<td style={{ width: col.width ?? `${defaultColWidth}%` }}>
										{col.valueGetter ?
											typeof col.valueGetter(row) === "object" ?
												getValue(row, col.valueGetter)
												: col.valueGetter(row)
											: row[col.field as keyof typeof row] ?? ""
										}
									</td>
								);
							})
						}
					</tr>
				)
			})
		}
	};

	return (
		<table style={{ height: props.tableHeight ?? '65vh' }}>
			<tr>
				{
					props.columns.map(col => {
						return (
							<th style={{ width: col.width ?? `${defaultColWidth}%` }} key={"table_head_" + col.field}>
								{col.headerName}
							</th>
						)
					})
				}
			</tr>
			<tbody>
				{tableContent}
			</tbody>

			<tfoot>
				<div className="tfoot_item"></div>
				<div className="tfoot_item">
					<div className="tfoot_page-size">
						<Dropdown options={allowedPageSizes} value={currentPageSize} onChange={handlePageSizeChange} dark />
					</div>
					<div className="tfoot_pagination">
						<button onClick={handlePreviousPage}>Previous</button>
						<span>Page {props.metadata?.page ?? '0'} of {props.metadata?.pageCount ?? '0'}</span>
						<button onClick={handleNextPage}>Next</button>
					</div>

				</div>
			</tfoot>
		</table>
	)
}