import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import PropTypes from 'prop-types';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 219,

    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onRequest = () => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
            newItemLoading: false,
        })
    }

    onNewRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onNewCharListLoaded)
            .catch(this.onError)
    }

    onNewCharListLoaded = (newCharList) => {
        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const { charList, loading, error, offset, newItemLoading } = this.state;

        const items = this.renderItems(charList);

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
                    onClick={() => this.onNewRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
