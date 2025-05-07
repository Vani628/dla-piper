"use client";
import { useState } from "react";
import { filters } from "./FilterData";

function FilterSection({
  title,
  items,
  searchable = false,
  selectedLocations,
  setSelectedLocations,
}: any) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item: any) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (label: string) => {
    if (selectedLocations.includes(label)) {
      setSelectedLocations(selectedLocations.filter((loc: string) => loc !== label));
    } else {
      setSelectedLocations([...selectedLocations, label]);
    }
  };

  return (
    <div className="py-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-lg text-blue-900">{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {isOpen && (
        <div className="mt-2 max-h-40 overflow-y-auto space-y-2">
          {searchable && (
            <input
              type="text"
              placeholder="Search"
              className="w-[80%] border rounded px-2 py-1 mb-2 focus:outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          )}
          {filteredItems.map((item: any) => (
            <label key={item.label} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-olive-700"
                checked={selectedLocations.includes(item.label)}
                onChange={() => handleCheckboxChange(item.label)}
              />
              <span className="text-olive-500">{item.label}</span>
              <span className="text-sm text-gray-600">({item.count})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterSidebar({
  selectedLocations,
  setSelectedLocations,
}: any) {
  return (
    <div className="p-4 md:p-6 md:h-full lg:p-12 bg-gray-100 rounded w-full md:w-64 lg:w-85">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-blue-900">
        Filter by:
      </h2>
      {filters.map((filter, index) => (
        <div
          key={filter.title}
          className={index !== filters.length - 1 ? "border-b" : ""}
        >
          <FilterSection
            title={filter.title}
            items={filter.items}
            searchable={filter.searchable}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
          />
        </div>
      ))}
    </div>
  );
}
