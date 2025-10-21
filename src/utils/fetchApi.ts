import { json } from "react-router-dom";

export const baseUrl = "https://bayut.p.rapidapi.com";

type Property = {
  coverPhoto: {
    url: string;
  };
  price: number;
  rentFrequency?: string;
  rooms: number;
  title: string;
  baths: number;
  area: number;
  agency: {
    logo: {
      url: string;
    };
  };
  isVerified: boolean;
  externalID: string;
  purpose: string;
};

type ApiResponse = {
  hits: Property[];
};

export const fetchApi = async <T = ApiResponse>(url: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY as string,
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    });
    if (!response.ok) {
      throw json(
        { message: "Could not fetch data" },
        { status: response.status }
      );
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
