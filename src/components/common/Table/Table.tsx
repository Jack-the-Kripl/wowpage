import React from "react";
import "./table.css";

export interface IColDef {
	field: string;
	headerName: string;
	description?: string;
	// sortable?: boolean;
	width?: string | number;
	valueGetter?: (rowData: any) => string;
}

interface ITableProps {
	columns: Array<IColDef>;
	rows: Array<any>;
}

export default function Table(props: ITableProps): JSX.Element {
	return (
		<table>
			<tr>
				{
					props.columns.map(col => {
						return (
							<th style={{ width: col.width }} key={"table_head_" + col.field}>
								{col.headerName}
							</th>
						)
					})
				}
			</tr>
			<tbody>
				{
					props.rows.map(row => {
						return (
							<tr>
								{
									props.columns.map(col => {
										return (
											<td>
												{col.valueGetter ?
													col.valueGetter(row)
													: row[col.field as keyof typeof row] ?? ""
												}
											</td>
										)
									})
								}
							</tr>
						)
					})
				}
			</tbody>
		</table>
	)
}