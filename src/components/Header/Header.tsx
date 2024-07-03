import React, { useCallback, useContext } from "react";
import "./header.css"
import { Link } from "react-router-dom";
import Dropdown from "../common/Dropdown/Dropdown";
import { CULTURE, NAMESPACE, REGION } from "../../variables";
import { AppContext } from "../../contexts/AppContext/AppContext";

export default function Header(): JSX.Element {

	const { namespace, region, culture, setContext } = useContext(AppContext);

	const namespaces = [NAMESPACE.CLASSIC_S, NAMESPACE.WOTLK_S];
	const regions = Object.entries(REGION).map(entry => entry[1]);
	const cultures = Object.entries(CULTURE).map(entry => entry[1]);

	const handleNamespaceChange = useCallback((value: string) => {
		setContext("namespace", value);
	}, [setContext]);

	const handleRegionChange = useCallback((value: string) => {
		setContext("region", value);
	}, [setContext]);

	const handleCultureChange = useCallback((value: string) => {
		setContext("culture", value);
	}, [setContext]);

	return (
		<div className="layout_header">
			<div className="header_inner_layout">
				<div className="header_side left">
					<div className="header_item">
						<Link to="/"><h2 className="header_item_title">WowPage</h2></Link>
					</div>
				</div>
				<div className="header_side right">
					<div className="header_item">
						<Dropdown options={namespaces} value={namespace} dark={false} onChange={handleNamespaceChange} />
					</div>
					<div className="header_item" style={{ width: "20%" }}>
						<Dropdown options={regions} value={region} dark={false} onChange={handleRegionChange} />
					</div>
					<div className="header_item" style={{ width: "10%" }}>
						<Dropdown options={cultures} value={culture} dark={false} onChange={handleCultureChange} />
					</div>
				</div>
			</div>
		</div>
	)
}