"use client";

import { useEffect, useState } from "react";
import { people } from "../PeopleInfo/PeopleData";

export default function SearchBox({
  onQueryChange,
}: {
  onQueryChange: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length >= 3) {
      const lowerQuery = query.toLowerCase();

      const matches = people.flatMap((person) => {
        const values = Object.values(person).filter(
          (val) => typeof val === "string"
        ) as string[];

        return values.filter((val) => val.toLowerCase().includes(lowerQuery));
      });

      const uniqueMatches = [...new Set(matches)];

      setSuggestions(uniqueMatches);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleSelect = (value: string) => {
    setQuery(value);   
    setSuggestions([]);  
    setTimeout(() => {
      setShowDropdown(false);
    }, 0);
  
    onQueryChange(value); 
  };

  const clearQuery = () => {
    setQuery("");        
    setSuggestions([]);  
    setShowDropdown(false);  
    onQueryChange("");   
  };

  return (
    <div className="relative w-full max-w-md mb-4">
      <div className="flex items-center border rounded overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
          }}
          placeholder=""
          className="flex-grow px-3 py-2 focus:outline-none"
        />

        {query && (
          <button
            onClick={clearQuery}
            className="px-2 text-blue-800 font-bold"
            aria-label="Clear"
          >
            &#x2715;
          </button>
        )}

<button className="px-3 " aria-label="Search">
  <svg
    focusable="false"
    enableBackground="new 0 0 20 20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Search"
    className="h-5 w-8"
  >
    <title>Search</title>
    <g fill="olive">
      <path
        
        d="m8.368 16.736c-4.614 0-8.368-3.754-8.368-8.368s3.754-8.368 8.368-8.368 8.368 3.754 8.368 8.368-3.754 8.368-8.368 8.368m0-14.161c-3.195 0-5.793 2.599-5.793 5.793s2.599 5.793 5.793 5.793 5.793-2.599 5.793-5.793-2.599-5.793-5.793-5.793"
      />
      <path
        d="m18.713 20c-.329 0-.659-.126-.91-.377l-4.552-4.551c-.503-.503-.503-1.318 0-1.82.503-.503 1.318-.503 1.82 0l4.552 4.551c.503.503.503 1.318 0 1.82-.252.251-.581.377-.91.377"
      />
    </g>
  </svg>
</button>

      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border rounded-b shadow z-10 max-h-64 overflow-auto">
          {suggestions.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)} 
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
