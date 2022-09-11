import { useHttp } from "../hooks/http.hook";

const MarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

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

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
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

  const _transformComics = (comics) => {
    return {
        id: comics.id,
        title: comics.title,
        description: comics.description || 'There is no description',
        pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
        thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
        language: comics.textObjects.language || 'en-us',
        price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
    }
}

  return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComics };
};

export default MarvelService;
