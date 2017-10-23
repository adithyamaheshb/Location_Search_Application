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
        }
    }


    updateSearchFilters(field, event) {
        let search = Object.assign({}, this.state.search);
        search[field] = event.target.value;
        this.setState({
            search: search
        });

        /*this.setState({
            address: geocoder.geocode({'address': this.state.search.location}, function (results, status) {
                if (status === 'OK') {
                    this.setState({
                        address: results.geometry.location
                    })
                }
            })
        });*/


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
                //console.log(JSON.stringify(venues));
                this.setState({
                    venues: venues
                })
            });
        //ReactDOM.findDOMNode(this.refs.form).value = " ";


    }

    render() {

        //let venue = this.state.venues[0];
        let location = {
            lat: 37.401018799999996,
            lng: -122.0178674
        };

        /*let location2 = {
            lat: venue.location.lat,
            lng: venue.location.lng
        };*/

        //console.log(location2);
        return (

            <form ref="myform">
                    <div className="col-md-3">
                        <div className="form-style-8">
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
                            <input onChange={this.updateSearchFilters.bind(this, 'location')} type="number" placeholder="Zipcode"/>
                            <input onChange={this.updateSearchFilters.bind(this, 'radius')} type="number"
                                   placeholder="Radius in metres"/>
                            <button className="w3-button w3-border w3-hover-cyan w3-xlarge" onClick={this.searchVenues.bind(this)}>Search</button>

                            <h1>Venues</h1>
                            <ol>
                                {this.state.venues.map((venue, i) => {
                                    return <li key={venue.id}>
                                        <div style={{padding:12, marginBottom:16, background:'f9f9f9'}}>
                                            <h4 style={{marginBottom:0}}>{venue.name}</h4>
                                            <span>{venue.location.address}</span><br />
                                            <a href={venue.url}>{venue.url}</a>
                                        </div>
                                    </li>
                                })
                                }
                            </ol>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <Map center={location }
                             zoom={5}
                             containerElement={<div style={{height: 750+'px',width: 1200+'px'}}/>}
                             mapElement={<div style={{height: 750+'px',width: 1200+'px'}}/>}
                             markers={this.state.venues}
                        />
                    </div>
            </form>
        )
    }
}

export default (Search);