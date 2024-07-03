import { MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { THEME_COLOR } from "../../variables";

interface INavItemProps {
    path: string;
    text: string;
		dark?: boolean;
}

export default function NavItem(props: INavItemProps): JSX.Element {

	const theme_color = props.dark ? THEME_COLOR.DARK : THEME_COLOR.LIGHT;

    return (
        <Link to={props.path}><MenuItem style={{ fontWeight: 'bold', color: theme_color }}>{props.text}</MenuItem></Link>
    )
}