import React from 'react';
import axios from 'axios';
import Card from "./Card";
import {endpoints, getImageUrl} from '../config';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            list: [],
            genres: [],
        };
    }

    componentDidMount() {
        axios.all([
            axios.get(endpoints.mostPopularMovies()),
            axios.get(endpoints.genres())
        ])
            .then(axios.spread((data, genres) => {
                this.setState({
                    list: data.data.results,
                    genres: genres.data.genres,
                });
            }));
    }


    getTitle = (title) => {
        //console.log(title);
    };

    render() {
        return (
            <div>
                <div className="genres">
                    {this.state.genres.map((g) => (
                        <button key={g.id} className="genre"
                                onClick={() => {
                                    axios.get(endpoints.genreMovies(g.id))
                                        .then((data) => {
                                            this.setState({
                                                list: data.data.results,
                                            })
                                        })
                                }}
                        > {g.name} </button>
                    ))}
                    <button className="genre" onClick={() => {
                        axios.get(endpoints.mostPopularMovies())
                            .then((data) => {
                                this.setState({
                                    list: data.data.results,
                                })
                            })
                    }}>Show all
                    </button>
                </div>
                <div>
                    {this.state.list.map((card) => (
                        <Card
                            getTitle={this.getTitle}
                            key={card.original_title}
                            backgroundImage={getImageUrl(card.backdrop_path)}
                            date={card.release_date}
                            rating={card.vote_average}
                            votes={card.vote_count}
                            description={card.overview}
                            title={card.original_title}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
