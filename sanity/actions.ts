import { groq } from "next-sanity";
import { readClient } from "./lib/client";
import { buildQuery } from "./utils";

interface GetResourcesParam {
  query: string;
  category: string;
  page: string;
}

export const getResources = async (params: GetResourcesParam) => {
  const { query, category, page } = params;

  try {
    const resources = await readClient.fetch(
      // La solicitud y lo que quiero que me devuelva
      groq`${buildQuery({
        type: "resource",
        query,
        category,
        page: parseInt(page),
      })}{
        title,
        _id,
        downloadLink,
        "image": poster.asset->url,
        views,
        slug,
        category,
        }`
    );
    return resources;
  } catch (error) {
    console.log(error);
  }
};


export const getResourcesPlaylist = async () => {
  try {
    const resources = await readClient.fetch(
      // La solicitud y lo que quiero que me devuelva
      groq`*[_type == "resourcePlaylist"]{
        _id,
        title,
        resources[0...6]->{
          _id,
          title,
          downloadLink,
          "image": poster.asset->url,
          views,
          category,
        }
      }`
    );
    
    return resources;
  } catch (error) {
    console.log(error);
  }
};