import { FormControl, Select, MenuItem, SxProps } from "@mui/material";
import React, { useMemo } from "react";
import { THEME_COLOR } from "../../../variables";
import useTranslatedName from "../../../hooks/useTranslatedName";

interface IDropdownProps {
	options: Array<any>;
	nameKey?: string;
	valueKey?: string;
	value?: string | number;
	onChange?: (value: string | number) => void;
	dark?: boolean;
	style?: SxProps;
}

export default function Dropdown(props: IDropdownProps) {
	const getTranslatedName = useTranslatedName();

	const options = useMemo(() => {
		return props.options.map((option) => {
			if (typeof option === "object") {
				const optionKey = props.nameKey ?? "name";
				let optionName: string | null = null;
				if (typeof option[optionKey] === "object") {
					optionName = getTranslatedName(option[optionKey]);
				} else {
					optionName = option[optionKey];
				}
				return <MenuItem value={option[props.valueKey ?? "id"]}>{optionName}</MenuItem>;
			} else {
				return <MenuItem value={option}>{option}</MenuItem>;
			}
		});
	}, [props.options]);

	const theme_color = props.dark ? THEME_COLOR.DARK : THEME_COLOR.LIGHT;

	return (
		<FormControl sx={{
			justifyContent: "center",
			minWidth: '3rem',
			...props.style
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