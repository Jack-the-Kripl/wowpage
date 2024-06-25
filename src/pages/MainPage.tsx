import React from "react";
import { Link } from "react-router-dom";

export function MainPage():JSX.Element {
    return (
        <div>
            <Link to="items" >Items</Link>
        </div>
    )
}