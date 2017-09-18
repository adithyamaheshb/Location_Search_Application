import React, {Component} from 'react';
import {get} from 'superagent';
import superagent from 'superagent';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            venues: [],
            search: {
                location: '',
                query: '',
                radius: '',

            }
        };

    }

    updateSearchFilters(field, event) {
        let search = Object.assign({}, this.state.search);
        search[field] = event.target.value;
        this.setState({
            search: search
        })
    }

    searchVenues(event) {
        event.preventDefault();
        console.log('searchVenues: ' + JSON.stringify(this.state.search));

        const url = 'https://api.foursquare.com/v2/venues/search';

        const params = {
            v: '20170916',
            near: this.state.search.location,
            query: this.state.search.query,
            radius: this.state.search.radius,
            //postalCode: this.state.search.zipcode,
            client_id: 'FDTNNCZ2XM53JG0PDPHBJRRGEJU5TCKHAUT1KGEAXKGURAPE',
            client_secret: 'ANZQ2VPFYNUNAXKQQ3G000KMDKIAW2VZIMOKVYUOG41QEKLT'
        };

        superagent
            .get(url)
            .query(params)
            .set('Accept', 'application/json')
            .end((err, data) => {
                if (err) {
                    alert('HOLYMOLY ERRRRRORR' + err.message);
                    return
                }
                const venues = data.body.response.venues;
                console.log(JSON.stringify(venues));
                this.setState({
                    venues: venues
                })
            })

    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1>Search Venues</h1>
                        <input onChange={this.updateSearchFilters.bind(this, 'query')} type="text" placeholder="Query"/><br/><br/>
                        <input onChange={this.updateSearchFilters.bind(this, 'location')} type="text"
                               placeholder="location"/><br/><br/>
                        <input onChange={this.updateSearchFilters.bind(this, 'radius')} type="number"
                               placeholder="Radius in metres"/><br/><br/>

                        <button onClick={this.searchVenues.bind(this)}>Search</button>
                    </div>
                    <div className="col-md-8">
                        <h1>Venues</h1>
                        <ol>
                            {this.state.venues.map((venue, i) => {
                                return <li key={venue.id}>{venue.name}</li>
                            })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;