import { z } from "zod";

export const baseUrl = "https://us-real-estate.p.rapidapi.com";

export const fetchApi = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": process.env
          .REACT_APP_US_REAL_ESTATE_API_KEY as string,
        "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch data: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return schema.parse(data);
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("REQUEST_TIMEOUT");
    }
    console.error("Fetch error:", error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
