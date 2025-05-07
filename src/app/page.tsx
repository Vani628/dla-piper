"use client";

import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import PeopleInfo from "@/components/PeopleInfo/PeopleInfo";

export default function Page() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 px-4 sm:px-6 lg:px-12 py-6">
      <aside className="w-full md:w-1/3">
        <FilterSidebar
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </aside>

      <main className="w-full md:w-2/3">
        <PeopleInfo selectedLocations={selectedLocations} />
      </main>
    </div>
  );
}
