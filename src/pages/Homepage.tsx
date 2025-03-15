import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Country } from "../types";

const Homepage = () => {
  const [continent, setContinent] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchCountry, setSearchCountry] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,region,flags,population,capital"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An uknown error occurred"
        );
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const continentMatch = continent ? country.region === continent : country;

    const countryMatch = searchCountry
      ? country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
      : country;

    return continentMatch && countryMatch;
  });

  return (
    <div className="space-y-12 grow">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <input
          name="search"
          type="text"
          onChange={(e) => setSearchCountry(e.target.value)}
          className="bg-white dark:bg-darkelements p-4 rounded-md max-md:w-full w-1/3"
          placeholder="Search for a country..."
        />
        <select
          name="continent"
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          className="p-4 pr-8 bg-white dark:bg-darkelements rounded-md"
        >
          <option value="" hidden>
            Filter by region
          </option>
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <main>
        {error ? (
                <p>{error}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, i) => (
                      <Link
                        to={`/${country.name.common}`}
                        key={i}
                        className="rounded-md w-full max-sm:max-w-96 max-sm:mx-auto bg-white dark:bg-darkelements"
                      >
                        <div className="aspect-[4/3] w-full">
                          <img
                            src={country.flags.png}
                            className="w-full h-full object-contain object-top rounded-t-md"
                            alt="country flag"
                          />
                        </div>
                        <div className="m-4">
                          <h2 className="text-2xl font-bold mb-4">
                            {country.name.common}
                          </h2>
                          <p>
                            <span className="font-semibold">Population: </span>
                            {country.population}
                          </p>
                          <p>
                            <span className="font-semibold">Region: </span>
                            {country.region}
                          </p>
                          <p>
                            <span className="font-semibold">Capital: </span>
                            {country.capital}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p>No countries match your search</p>
                  )}
                </div>
              )}
      </main>
    </div>
  );
};

export default Homepage;
