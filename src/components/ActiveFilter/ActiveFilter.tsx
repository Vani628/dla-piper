"use client";
import { filters } from "../FilterSidebar/FilterData";

interface ActiveFilterProps {
  selectedLocations: string[];
  handleRemoveFilter: (location: string) => void;
  handleClearAllFilters: () => void;
}

const ActiveFilter: React.FC<ActiveFilterProps> = ({
  selectedLocations,
  handleRemoveFilter,
  handleClearAllFilters,
}) => {
  const groupedFilters: Record<string, string[]> = {};

  selectedLocations.forEach((location) => {
    const filterGroup = filters.find((filter) =>
      filter.items.some((item) => item.label === location)
    );
    const title = filterGroup?.title ?? "Other";
    if (!groupedFilters[title]) {
      groupedFilters[title] = [];
    }
    groupedFilters[title].push(location);
  });

  return Object.keys(groupedFilters).length > 0 ? (
    <div className="mt-4">
      {Object.entries(groupedFilters).map(([title, locations]) => (
        <div key={title} className="flex items-center gap-2 mb-2 flex-wrap">
          <div className="whitespace-nowrap">{title}:</div>
          {locations.map((location) => (
            <div
              key={location}
              className="px-3 py-1 text-olive-700 border rounded flex items-center gap-1"
            >
              <div>{location}</div>
              <button
                onClick={() => handleRemoveFilter(location)}
                className="text-blue-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={handleClearAllFilters}
        className="mt-4 text-olive-700 py-2 mb-2 underline cursor-pointer"
      >
        Clear All Filters
      </button>
      <div className="border-b mb-2"></div>
    </div>
  ) : (
    <></>
  );
};

export default ActiveFilter;
