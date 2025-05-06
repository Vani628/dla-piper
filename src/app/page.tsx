"use client";

import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import PeopleInfo from "@/components/PeopleInfo/PeopleInfo";

export default function Page() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  return (
    <div className="flex flex-col md:flex-row px-4 md:pr-8 md:pl-0 py-8">
      <aside className="w-full md:w-1/4">
        <FilterSidebar
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </aside>
      <main className="w-full md:w-3/4">
        <PeopleInfo selectedLocations={selectedLocations} />
      </main>
    </div>
  );
}
