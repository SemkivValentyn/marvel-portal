

class MarvelService {

    _apiKey = 'de50150be9157c8001775f59c9103842';
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _baseOffset = Math.floor(Math.random() * 1560);


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);

        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&apikey=${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no information about this character yet',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[1].url,
            wiki: char.urls[0].url,
            comics: char.comics.items.slice(0, 10) 
        }
    }
}


export default MarvelService;