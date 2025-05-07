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
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="text-blue-900 font-medium border-b pb-2 text-base sm:text-lg">
        Results{" "}
        <span className="font-semibold">
          {startIndex + 1}-{Math.min(startIndex + paginatedPeople.length, filteredPeople.length)}
        </span>{" "}
        of {filteredPeople.length}
      </div>

      {paginatedPeople.map((person, index) => (
  <div
    key={index}
    className="flex items-start gap-4 border rounded p-4 shadow-sm hover:shadow-md transition"
  >
    {/* Placeholder image or avatar */}
    <img
            src="https://www.dlapiper.com/-/media/project/dlapiper-tenant/dlapiper/bio-images/j/john_gilluly_personality_web_crop.jpg?rev=-1"
            alt={person.name}
            className="w-28 h-28 "
          />

    <div>
      <h3 className="text-lg font-semibold text-blue-900">{person.name}</h3>
      <p className="text-gray-700">{person.title}</p>
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
