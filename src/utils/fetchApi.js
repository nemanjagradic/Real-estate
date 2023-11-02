import { json } from "react-router-dom";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": "5642d7379amshcd1a9da0b12923dp18a698jsn23fdf0a88d1e",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });
  if (!response.ok) {
    throw json({ message: "Could not fetch data" }, { status: 500 });
  }
  const data = await response.json();
  return data;
};
