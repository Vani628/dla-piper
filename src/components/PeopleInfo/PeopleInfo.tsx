"use client";

import { useEffect, useState } from "react";
import { people } from "./PeopleData";

export default function PeopleInfo({
  selectedLocations = [],
}: {
  selectedLocations: string[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const peoplePerPage = 5;

  const filteredPeople = selectedLocations.length
    ? people.filter((person) => selectedLocations.includes(person.location))
    : people;

  const totalPages = Math.ceil(filteredPeople.length / peoplePerPage);

  useEffect(() => {
    setCurrentPage(1); 
  }, [selectedLocations]);

  const startIndex = (currentPage - 1) * peoplePerPage;
  const paginatedPeople = filteredPeople.slice(
    startIndex,
    startIndex + peoplePerPage
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-blue-900 font-medium border-b pb-2">
      Results{" "}
      <span className="font-semibold">
        {startIndex + 1}-{Math.min(startIndex + paginatedPeople.length, filteredPeople.length)}
      </span>{" "}
      of {filteredPeople.length}
    </div>
      {paginatedPeople.map((person, index) => (
        <div
          key={index}
          className="border rounded p-4 shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-blue-900">{person.name}</h3>
          <p className="text-sm text-gray-700">{person.title}</p>
          <p className="text-sm text-gray-500">{person.location}</p>
          <p className="text-sm text-gray-500">{person.office}</p>
          <p className="text-sm text-gray-500">{person.capability}</p>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 border-t pt-4 gap-3 items-center">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="text-olive-700 text-sm"
            >
              &lt;
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`text-sm underline-offset-2 ${
                currentPage === page
                  ? "text-olive-700 underline"
                  : "text-olive-700 "
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-olive-700 text-sm"
            >
              &gt;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
