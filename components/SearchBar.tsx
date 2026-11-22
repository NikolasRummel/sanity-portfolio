"use client";

import React, {ChangeEvent, useState} from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar:React.FC<SearchBarProps> = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <div className="search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
            <input
                type="text"
                aria-label="Suche"
                placeholder="Projekte durchsuchen"
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
