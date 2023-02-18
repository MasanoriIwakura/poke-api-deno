import { serve } from "https://deno.land/std@0.157.0/http/server.ts";

const handler = async (request: Request): Promise<Response> => {
  const requestUrl = new URL(request.url);
  const pokemonNumber = requestUrl.searchParams.get("number");

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
  const resp = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  let body = `<p>Not Found. number: ${pokemonNumber}`;
  if (resp.status === 200) {
    const json = await resp.json();
    body = `
      <p>Id: ${json["id"]}</p>
      <p>Name: ${json["name"]}</p>
      <img src="${json["sprites"]["front_default"]}" alt="${json["name"]}">
    `;
  }

  return new Response(body, {
    status: resp.status,
    headers: {
      "content-type": "text/html",
    },
  });
};

serve(handler);
