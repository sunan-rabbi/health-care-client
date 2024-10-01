import { useEffect, useState } from "react";

type IDebounce = {
    searchTerm: string;
    delay: number;
}

export const useDebounced = ({ searchTerm, delay }: IDebounce) => {

    const [debounceValue, setDebounceValue] = useState('')

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(searchTerm);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, delay])

    return debounceValue
}