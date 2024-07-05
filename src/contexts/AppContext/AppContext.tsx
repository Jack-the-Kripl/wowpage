import React, { PropsWithChildren, createContext, useState } from "react";
import { CULTURE, NAMESPACE, REGION } from "../../variables";
import { TCulture, TTranslatedName } from "../../types/types";

export interface IAppContext {
	namespace: string;
	region: string;
	culture: keyof TTranslatedName;
	setContext: (key: keyof IAppContext, value: any) => void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export default function AppContextProvider({ children }: PropsWithChildren) {
	const [appContext, setAppContext] = useState<IAppContext>({
		namespace: NAMESPACE.WOTLK_S.id,
		region: REGION.EUROPE.id,
		culture: CULTURE.en_US.id as TCulture,
		setContext: () => {}
	});

	function setContext(key: keyof IAppContext, value: any): void {
		setAppContext(prevState => {
			const newState = { ...prevState };
			newState[key] = value;
			return newState;
		});
	};

	return (
		<AppContext.Provider value={{ ...appContext, setContext }}>
			{children}
		</AppContext.Provider>
	)

}