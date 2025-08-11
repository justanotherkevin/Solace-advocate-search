"use client";

import { useEffect, useState } from "react";
import type { Advocate } from "../types/advocate";
import { matchesSearch } from "../lib/search";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        const data = (jsonResponse.data || []) as Advocate[];
        console.log(data);
        setAdvocates(data);
        setFilteredAdvocates(data);
      })
      .catch((err) => {
        console.error("failed to fetch advocates", err);
      });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = advocates.filter((advocate) =>
      matchesSearch(advocate, term)
    );

    setFilteredAdvocates(filtered);
  };

  const onClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input
          value={searchTerm}
          style={{ border: "1px solid black" }}
          onChange={onChange}
          placeholder="Type to search advocates..."
        />
        <button type="button" onClick={onClick}>
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            const rowKey = `${advocate.phoneNumber}-${advocate.firstName}-${advocate.lastName}`;
            return (
              <tr key={rowKey}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, i) => (
                    <div key={`${i}-specialties-${s}`}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
