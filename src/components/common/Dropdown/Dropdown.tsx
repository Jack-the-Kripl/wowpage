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
				const optionNameKey = props.nameKey ?? "name";
				let optionName: string | null = null;
				const optionValueKey = props.valueKey ?? "id";
				let optionValue: string | null = null;
				
				if (typeof option[optionNameKey] === "object") {
					optionName = getTranslatedName(option[optionNameKey]);
				} else {
					optionName = option[optionNameKey];
				}
				if (typeof option[optionValueKey] === "object") {
					optionValue = getTranslatedName(option[optionValueKey]);
				} else {
					optionValue = option[optionValueKey];
				}
				return <MenuItem value={optionValue ?? ""}>{optionName}</MenuItem>;
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