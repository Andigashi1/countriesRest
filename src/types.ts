export interface Country {
    name: {
        common: string;
        official: string;
        nativeName: Record<string, { common: string; official: string }>;
    }
    region: string;
    flags: {
        png: string;
        svg: string;
    },
    population: number;
    capital?: string[];
}

export interface CountryData extends Country {
    subregion: string;
    tld: string[];
    currencies: Record<string, { name: string; symbol: string }>;
    languages: Record<string, string>;
    borders?: string[];
}

export interface BorderCountry {
    name: {
        common: string;
    }
}