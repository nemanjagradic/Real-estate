import { json } from "react-router-dom";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": "af7f537d65msh1f875a951f4ad95p1ebb51jsn246f7699837f",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });
  if (!response.ok) {
    throw json({ message: "Could not fetch data" }, { status: 500 });
  }
  const data = await response.json();
  return data;
};
