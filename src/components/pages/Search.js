import React, {Component} from 'react';
//eslint-disable-next-line
import {get} from 'superagent';
//import ReactDOM from 'react-dom';
//eslint-disable-next-line
import superagent from 'superagent';
import Map from './Map';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            venues: [],
            search: {
                location: '',
                query: '',
                radius: '',
            },
            center: {
                lat: '',
                lng: ''
            }
        }
    }


    updateSearchFilters(field, event) {
        const search = Object.assign({}, this.state.search);
        search[field] = event.target.value;
        this.setState({search});
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
                    alert('PLEASE FILL OUT ALL THE FIELDS');
                    return
                }
                const venues = data.body.response.venues;
                
                this.setState({
                    venues: venues
                })
            });
        }

    render() {
        const location = {
            lat: 37.401018799999996,
            lng: -122.0178674
        };

        return (
            <form>
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-8 col-lg-9 col-xl-9 clear-padding">
                        <Map center={location}
                            zoom={5}
                            containerElement={<div style={{height: 100 + 'vh'}}/>}
                            mapElement={<div style={{height: 100 + 'vh'}}/>}
                            markers={this.state.venues}
                        />
                    </div>
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 clear-padding">
                        <div className="form-style-8" style={{height: 100 + 'vh'}}>
                            <h1>Search Venues</h1>
                            <select onChange={this.updateSearchFilters.bind(this, 'query')} type="text"
                                    placeholder="Query">
                                <option value="Top Picks">Top Picks</option>
                                <option value="Trending">Trending</option>
                                <option value="Food">Food</option>
                                <option value="Nightlife">Nightlife</option>
                                <option value="Fun">Fun</option>
                                <option value="Shopping">Shopping</option>
                            </select>
                            <input onChange={this.updateSearchFilters.bind(this, 'location')} type="number"
                                placeholder="Zipcode" className="inputRequired"/>
                            <input onChange={this.updateSearchFilters.bind(this, 'radius')} type="number"
                                placeholder="Radius in metres"/>
                            <p>
                                <button className="w3-button w3-border w3-hover-cyan w3-xlarge"
                                        onClick={this.searchVenues.bind(this)}>Search
                                </button>
                            </p>

                            <h1>Venues</h1>
                            <ol>
                                {this.state.venues.map((venue, i) => {
                                    return <li key={venue.id}>
                                        <div style={{
                                            padding: 10,
                                            marginBottom: 16,
                                            background: 'f9f9f9',
                                            fontSize: 16,
                                            fontFamily: 'Roboto'
                                        }}>
                                            <h4 style={{marginBottom: 0}}>{venue.name}</h4>
                                            <span>{venue.location.address}</span><br/>
                                            <a href={venue.url}>{venue.url}</a><br/>
                                            <b>{venue.contact.phone}</b><br/>
                                        </div>
                                    </li>
                                })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default (Search);