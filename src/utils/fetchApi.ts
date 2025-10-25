import { z } from "zod";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async <T>(
  url: string,
  schema: z.ZodSchema<T>
): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY as string,
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch data: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return schema.parse(data);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
