"use client";

import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import PeopleInfo from "@/components/PeopleInfo/PeopleInfo";
import SearchBox from "@/components/Search/SearchBox";
import ActiveFilter from "@/components/ActiveFilter/ActiveFilter";


export default function Page() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleRemoveFilter = (location: string) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
  };
  const handleClearAllFilters = () => {
    setSelectedLocations([]); 
  };

  return (
    <div className="flex flex-col md:flex-row py-6">
      <aside className="w-full md:w-1/4">
        <FilterSidebar
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </aside>

      <main className="w-full md:w-3/4 px-4 lg:px-16">
        <SearchBox onQueryChange={setSearchTerm} />

        <ActiveFilter
          selectedLocations={selectedLocations}
          handleRemoveFilter={handleRemoveFilter}
          handleClearAllFilters={handleClearAllFilters}  />

        <PeopleInfo
          selectedLocations={selectedLocations}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
}
