import React from "react";
import { ItemDetailPage, ItemsPage, MainPage, MountsPage } from "./pages";
import { Route, Routes } from "react-router-dom";

export default function Router(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/detail/:itemId" element={<ItemDetailPage />} />
            <Route path="/mounts" element={<MountsPage />} />


        </Routes>
    )
}