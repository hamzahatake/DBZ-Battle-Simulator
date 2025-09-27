import { useState, useEffect } from "react";

export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup on value or delay change
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}
