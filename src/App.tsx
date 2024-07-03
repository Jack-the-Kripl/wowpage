import React from "react";
import './App.css';
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AppContextProvider from "./contexts/AppContext/AppContext";

function App() {

	return (
		<AppContextProvider>
			<BrowserRouter>
				<Layout>
					<Router />
				</Layout>
			</BrowserRouter>
		</AppContextProvider>
	);
}

export default App;
