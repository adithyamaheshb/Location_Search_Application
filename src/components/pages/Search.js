import React, {Component} from 'react';
//eslint-disable-next-line
import {get} from 'superagent';
//import ReactDOM from 'react-dom';
//eslint-disable-next-line
import superagent from 'superagent';
import axios from 'axios';
import Map from './Map';
import './../../../node_modules/react-select-input/lib/react-select-input.css';
import InputSelect from 'react-select-input';
const data = require('./../../config.dev');


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
            centerLat: 37.401018799999996,
            centerLng: -122.0178674,
            selected: {}
        }

        this.options = [
            { label: "Top Picks", value: "toppicks" },
            { label: "Trending", value: "trending" },
            { label: "Food", value: "food" },
            { label: "Coffee", value: "coffee" },
            { label: "Nightlife", value: "nightlife" },
            { label: "Fun", value: "fun" },
            { label: "Shopping", value: "shopping" }
        ];

        //this.getDetails = this.getDetails.bind(this);
    }

    manipState = (state, key, value) => {
        return Object.assign({}, state, {
          [key]: value
        });
      }
    
      handleChange = (key) => {
        let state = this.manipState(this.state, key, !this.state[key]);
        this.setState(state);
      }
    
      handleSelect = (option) => {
        let state = this.manipState(this.state, 'selected', option);
        this.setState(state);
      }

    updateSearchFilters(field, event) {
        const search = Object.assign({}, this.state.search);
        search[field] = event.target.value;
        this.setState({search});
    }

    searchVenues(event) {
        //console.log(data);
        event.preventDefault();
        //console.log('searchVenues: ' + JSON.stringify(this.state.search));
        const url = 'https://api.foursquare.com/v2/venues/search';
        //let query  = this.state.search.query ? this.state.search.query : this.state.selected.value;
        const params = {
            v: '20190101',
            near: this.state.search.location,
            query: this.state.search.query ? this.state.search.query : this.state.selected.value,
            limit: 50,
            radius: this.state.search.radius,
            client_id: `${data.client_id}`,
            client_secret: `${data.client_secret}`
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
                if(venues.length > 0) {
                    this.setState({
                        centerLat: venues[0].location.lat,
                        centerLng: venues[0].location.lng,
                        venues
                    })
                }
            });
    }

    // getDetails(id) {
    //     const url = `https://api.foursquare.com/v2/venues/${id}`;
    //     //let query  = this.state.search.query ? this.state.search.query : this.state.selected.value;
    //     const params = {
    //         v: '20190203',
    //         limit: 50,
    //         client_id: `${data.client_id}`,
    //         client_secret: `${data.client_secret}`
    //     };

    //     superagent
    //         .get(url)
    //         .query(params)
    //         .set('Accept', 'application/json')
    //         .end((err, data) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             if(data) {
    //                 console.log("Details of a venue", data);
    //             }
    //         });
    //     console.log("Details of a venue");
    // }

    render() {
        const location = {
            lat: this.state.centerLat,
            lng: this.state.centerLng
        };

        return (
            <form>
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-8 col-lg-9 col-xl-9 clear-padding">
                        <Map center={location}
                            zoom={12}
                            containerElement={<div style={{height: 100 + 'vh'}}/>}
                            mapElement={<div style={{height: 100 + 'vh'}}/>}
                            markers={this.state.venues}
                        />
                    </div>
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 clear-padding">
                        <div className="form-style-8" style={{height: 100 + 'vh'}}>
                            <h1 style={{ marginTop: '5%'}}>Search Venues</h1>
                            <div className="box" style={{ marginLeft: '15%'}}>
                                <InputSelect
                                    className="text-center"
                                    onSelect={this.handleSelect}
                                    onChange={this.updateSearchFilters.bind(this, 'query')}
                                    options={this.options}
                                    autoFocus={false}
                                    openUp={false}
                                    disableEnter={true}
                                    collapseOnBlur={true}
                                    collapseOnEscape={true}
                                    collapseOnSelect={true}
                                />
                                <input onChange={this.updateSearchFilters.bind(this, 'location')} type="number"
                                    placeholder="Zipcode" className="inputRequired"/>
                                <input onChange={this.updateSearchFilters.bind(this, 'radius')} type="number"
                                    placeholder="Radius in metres"/>
                                
                            </div>
                            <p>
                                <button className="btn btn-outline-dark"
                                            onClick={this.searchVenues.bind(this)}>SEARCH
                                </button>
                            </p>

                            <h1>Venues</h1>
                            
                            <ul>
                                {this.state.venues.map((venue, i) => {
                                    return <li key={venue.id} id="list"
                                     //onClick={this.getDetails(venue.id)}
                                     >
                                        <div id="venue">
                                            <div id="venue-text">
                                                <span id="name">{i+1}.{venue.name}</span>
                                                <br/>
                                                {venue.categories.length > 0 ? (<b>{venue.categories[0].name}<br/></b>) : (null)}
                                                <span>{venue.location.formattedAddress[0] ? venue.location.formattedAddress[0] : null}</span><br/>
                                                <span>{venue.location.formattedAddress[1] ? venue.location.formattedAddress[1] : null}</span><br/>
                                                <span>{venue.location.formattedAddress[0] ? venue.location.formattedAddress[2] : null}</span><br/>
                                                {venue.url ? (<a href={venue.url}>{venue.url}<br/></a>) : (null)}
                                                {
                                                    //venue.contact.phone ? (<b>{venue.contact.phone}<br/></b>) : (null)
                                                }
                                            </div>
                                        </div>
                                    </li>
                                })
                                }
                            </ul>
                            
                        
                            </div>
                        
                    </div>
                </div>
            </form>
        )
    }
}

export default (Search);