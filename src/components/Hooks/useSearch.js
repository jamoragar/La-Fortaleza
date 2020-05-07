import { useState } from 'react';

export function useSearch() {
    const [keySearch, setKeySearch] = useState('');
    return {
        keySearch,
        setKeySearch,
    }
}