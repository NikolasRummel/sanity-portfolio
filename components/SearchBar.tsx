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
        <div className="relative mt-5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            </div>
            <input
                type="text"
                className="rounded-full py-2 pl-12 pr-4 w-full bg-accent border border-gray-300 dark:border-gray-900"
                placeholder="Search here"
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
