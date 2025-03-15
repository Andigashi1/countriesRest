import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { CountryData } from "../types";
import { BorderCountry } from "../types";

const Country = () => {
  const { country } = useParams();
  const [countryData, setCountryData] = useState<CountryData | null>();
  const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCountryData(data[0]);

        if (data[0].borders?.length > 0) {
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(
              ","
            )}?fields=true`
          );
          const borderData = await borderResponse.json();
          setBorderCountries(borderData);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown message occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [country]);

  if (isLoading) {
    return <div>Loading Country Data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="self-center w-full max-w-7xl mb-[20vh]">
      <Link to="/" className="py-2 px-4 rounded shadow-xl bg-white dark:bg-darkelements">
        Back
      </Link>
      {countryData && (
        <div className="mt-12 flex max-lg:flex-col items-center mx-auto gap-10 lg:gap-40">
          <img
            src={countryData.flags.png}
            className="w-full max-w-xl aspect-[4/3] object-center object-contain"
            alt={`${countryData} flag`}
          />
          <div className="w-full max-w-xl">
            <h1 className="text-2xl font-bold">{countryData.name.common}</h1>
            <div className="flex max-md:flex-col justify-between gap-10 ">
              <div className="[&>p>span]:font-semibold ">
                <p>
                  <span>Native Name:</span>{" "}
                  {countryData.name.nativeName &&
                    Object.values(countryData.name.nativeName)
                      .map((name) => name.common)
                      .join(", ")}
                </p>
                <p>
                  <span>Population:</span> {countryData.population}
                </p>
                <p>
                  <span>Region:</span> {countryData.region}
                </p>
                <p>
                  <span>Subregion:</span> {countryData.subregion}
                </p>
                <p>
                  <span>Capital:</span> {countryData.capital}
                </p>
              </div>

              <div className="[&>p>span]:font-semibold">
                {countryData.tld && (
                  <p>
                    <span>Top Level Domain:</span> {countryData.tld[0]}
                  </p>
                )}
                <p>
                  <span>Currencies:</span> <span>Currencies:</span>{" "}
                  {countryData.currencies &&
                    Object.values(countryData.currencies)
                      .map((currency) => currency.name)
                      .join(", ")}
                </p>
                <p>
                  <span>Languages:</span>{" "}
                  {countryData.languages &&
                    Object.values(countryData.languages).join(", ")}
                </p>
              </div>
            </div>
            {borderCountries.length > 0 && (
              <div className="md:flex items-center gap-10 mt-10">
                <p className="font-semibold text-xl max-md:mb-5">
                  Borders Countries:
                </p>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((country, i) => (
                    <p key={i} className="py-2 px-6 rounded shadow-2xl">
                      {country.name.common}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;
