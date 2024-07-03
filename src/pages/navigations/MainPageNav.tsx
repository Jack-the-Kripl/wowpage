import React from "react";
import NavItem from "../../components/NavItem/NavItem";

export default function MainPageNav(): JSX.Element {
    return (
        <>
            <NavItem path="items" text="Items" dark />
            <NavItem path="mounts" text="Mounts" dark />
        </>
    )
}