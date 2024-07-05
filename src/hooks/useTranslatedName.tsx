import { useCallback, useContext } from "react";
import { AppContext } from "../contexts/AppContext/AppContext";
import { TTranslatedName } from "../types/types";

export default function useTranslatedName() {
	const { culture } = useContext(AppContext);

	const getTranslatedName = useCallback((name: TTranslatedName): string | null => {
		return name[culture] ?? null;
	}, [culture]);

	return getTranslatedName;
}