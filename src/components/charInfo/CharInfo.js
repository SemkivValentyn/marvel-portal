import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }


    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoader)
            .catch(this.onError);
    }



    onCharLoader = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: false,
        })
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    render() {
        const { char, loading, error } = this.state;


        const skeleton = char || loading || error ? null : <Skeleton/> 
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const contetn = !(loading || error || !char) ? < View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {contetn}
            </div>
        )
    }

}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main btn-dark">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary btn-dark">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {comics.length > 0 ? null : 'There is no comic book at the moment'}

                {
                    comics.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                               {item.name}
                            </li>
                        )
                    })
                }

                
            </ul>
        </>
    )
}

export default CharInfo;