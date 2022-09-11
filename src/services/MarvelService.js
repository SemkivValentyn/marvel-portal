import { useHttp } from "../hooks/http.hook";

const MarvelService = () => {
  const { loading, request, error } = useHttp();

  const _apiKey = "de50150be9157c8001775f59c9103842";
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _baseOffset = Math.floor(Math.random() * 1560);

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?&apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no information about this character yet",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[1].url,
      wiki: char.urls[0].url,
      comics: char.comics.items.slice(0, 10),
    };
  };

  return { loading, error, getAllCharacters, getCharacter };
};

export default MarvelService;
