import { useMemo } from "react";

export function useDiaryData() {
    const data = useMemo(
        () => JSON.parse(window.localStorage.getItem("diary") || "{}"), []
    );
    return data;
}