import { FormControl, Select, MenuItem } from "@mui/material";
import React, { useMemo } from "react";
import { THEME_COLOR } from "../../../variables";

interface IDropdownProps {
	options: Array<any>;
	nameKey?: string;
	valueKey?: string;
	value?: string;
	onChange?: (value: string) => void;
	dark?: boolean;
}

export default function Dropdown(props: IDropdownProps) {

	const options = useMemo(() => {
		return props.options.map((option) => {
			return <MenuItem value={option[props.valueKey ?? "id"]}>{option[props.nameKey ?? "name"]}</MenuItem>
		})
	}, [props.options]);

	// const value = props.value ?? props.options[0]?.[props.valueKey ?? "id"] ?? undefined;
	const theme_color = props.dark ? THEME_COLOR.DARK : THEME_COLOR.LIGHT;

	return (
		<FormControl sx={{
			justifyContent: "center",
			width: '20rem'
			}}>
			<Select
				variant="standard"
				labelId="namespace_select_label"
				value={props.value}
				label="Namespace"
				onChange={(e) => {
					const value = e.target.value;
					props.onChange?.(value);
				}}
				sx={{
					color: theme_color
				}}
			>
				{options}
			</Select>
		</FormControl>
	)
}