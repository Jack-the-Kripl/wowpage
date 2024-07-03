import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPageNav from "../../pages/navigations/MainPageNav";

export default function LayoutNav(): JSX.Element {
    return (
        <div className="layout_nav">
            <Routes>
                <Route path="/*" element={<MainPageNav />} />
            </Routes>
        </div>
    )
}