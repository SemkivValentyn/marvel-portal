import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";
import PropTypes from "prop-types";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(219);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
     // eslint-disable-next-line
  }, []);

  const onRequest = () => {
    onCharListLoading();
    marvelService.getAllCharacters().then(onCharListLoaded).catch(onError);
  };

  const onCharListLoaded = (charList) => {
    setCharList(charList);
    setLoading((loading) => false);
    setNewItemLoading((newItemLoading) => false);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onNewRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onNewCharListLoaded)
      .catch(onError);
  };

  const onNewCharListLoaded = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
    setLoading((loading) => false);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
  };

  const onError = () => {
    setError(true);
    setLoading((loading) => false);
  };

  function renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => props.onCharSelected(item.id)}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long btn-char-list btn-dark"
        disabled={newItemLoading}
        onClick={() => onNewRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
