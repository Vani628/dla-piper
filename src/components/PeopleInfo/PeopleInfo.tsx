"use client";

import { useEffect, useState } from "react";
import { people } from "./PeopleData";

export default function PeopleInfo({
  selectedLocations = [],
  searchTerm = "",
}: {
  selectedLocations: string[];
  searchTerm: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByNameAsc, setSortByNameAsc] = useState(false);
  const [sortByRelevance, setSortByRelevance] = useState(true);

  const peoplePerPage = 5;

  const lowerSearch = searchTerm.toLowerCase();

  const filteredPeople = people.filter((person) => {
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(person.location);

    const matchesSearch = Object.values(person)
      .filter((val) => typeof val === "string")
      .some((val) => val.toLowerCase().includes(lowerSearch));

    return matchesLocation && matchesSearch;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (sortByRelevance) {
      const score = (person: typeof a) =>
        Object.values(person)
          .filter((val) => typeof val === "string")
          .reduce(
            (acc, val) =>
              acc + (val.toLowerCase().includes(lowerSearch) ? 1 : 0),
            0
          );
      return score(b) - score(a); 
    } else {
      return sortByNameAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  const totalPages = Math.ceil(sortedPeople.length / peoplePerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocations, searchTerm, sortByNameAsc]);

  const startIndex = (currentPage - 1) * peoplePerPage;
  const paginatedPeople = sortedPeople.slice(
    startIndex,
    startIndex + peoplePerPage
  );

  const toggleSort = () => {
    setSortByNameAsc((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <div className="font-medium border-b border-black pb-2 text-base sm:text-lg flex items-center justify-between">
        <div className="text-blue-900">
          Results{" "}
          <span className="font-semibold">
            {startIndex + 1}-
            {Math.min(startIndex + paginatedPeople.length, sortedPeople.length)}
          </span>{" "}
          of {sortedPeople.length}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSortByRelevance(true)}
            className={`text-olive-700 hover:text-blue-900 font-bold focus:underline focus:underline-offset-15 decoration-2 cursor-pointer`}
          >
            RELEVANCE
          </button>

          <button
            onClick={() => {
              setSortByRelevance(false);
              toggleSort();
            }}
            className={`text-olive-700 hover:text-blue-900 font-bold flex items-center gap-1 focus:underline focus:underline-offset-15 decoration-2 cursor-pointer`}
          >
            NAME
            {sortByNameAsc ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {paginatedPeople.map((person, index) => (
        <div
          key={index}
          className="flex items-start gap-4 border-b p-4 transition"
        >
          <img
            src="https://www.dlapiper.com/-/media/project/dlapiper-tenant/dlapiper/bio-images/j/john_gilluly_personality_web_crop.jpg?rev=-1"
            alt={person.name}
            className="w-35 h-35 "
          />

          <div>
            <h3 className="text-xl font-semibold text-blue-900">
              {person.name}
            </h3>
            <p className="text-lg text-gray-700">{person.title}</p>
            <p className="text-sm text-gray-500">{person.location}</p>
            <p className="text-sm text-gray-500">{person.office}</p>
            <p className="text-sm text-gray-500">{person.capability}</p>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-6 border-t pt-4 gap-3 items-center">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="text-olive-700"
            >
              &lt;
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`underline-offset-2 px-2 py-1 rounded ${
                currentPage === page
                  ? "text-olive-700 underline font-medium"
                  : "text-olive-700"
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-olive-700"
            >
              &gt;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
