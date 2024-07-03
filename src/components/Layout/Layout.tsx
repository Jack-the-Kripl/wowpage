import React, { PropsWithChildren } from "react";
import "./layout.css";
import Header from "../Header/Header";
import LayoutNav from "../LayoutNav/LayoutNav";

export default function Layout({ children }: PropsWithChildren): JSX.Element {
    return (
        <div className="layout">
            <Header />
            <div className="layout_2">
                <LayoutNav />
                <div className="container">
                    {children}
                </div>
            </div>

        </div>
    )
}