import { json } from "react-router-dom";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": "aa56e453b7msh8ff1fbfcc1fd301p1946dbjsn88f835ffd270",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });
  if (!response.ok) {
    throw json({ message: "Could not fetch data" }, { status: 500 });
  }
  const data = await response.json();
  return data;
};
