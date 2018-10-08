import React, {Component} from 'react';
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
                lat: 37.401018799999996,
                lng: -122.0178674
            }
        }
        this.updateSearchFilters = this.updateSearchFilters.bind(this);
        this.searchVenues = this.searchVenues.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state);
    }


    updateSearchFilters(event) {
        console.log(event.target.name);
        const search = Object.assign({}, this.state.search);
        search[event.target.name] = event.target.value;
        this.setState({search});
    }

    searchVenues(event) {
        event.preventDefault();
        console.log('searchVenues: ',JSON.stringify(this.state.search));
        const url = 'https://api.foursquare.com/v2/venues/search';
        const params = {
            v: '20181006',
            near: this.state.search.location,
            query: this.state.search.query,
            radius: this.state.search.radius,
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
                 this.setState({ venues });
            });
        console.log(this.state.venues);
        }

    render() {
        
        return (
            <form>
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-8 col-lg-9 col-xl-9 clear-padding">
                        <Map center={this.state.center}
                            zoom={5}
                            containerElement={<div style={{height: '100vh'}}/>}
                            mapElement={<div style={{height: '100vh'}}/>}
                            markers={this.state.venues}
                        />
                    </div>
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 clear-padding">
                        <div className="form-style-8" style={{height: '100vh'}}>
                            <div className="box">
                                <h1>Search Venues</h1>
                                <select onChange={this.updateSearchFilters} 
                                        type="text"
                                        name="query"
                                        value={this.state.search.query}
                                        placeholder="Query">
                                    <option value="Top Picks">Top Picks</option>
                                    <option value="Trending">Trending</option>
                                    <option value="Food">Food</option>
                                    <option value="Nightlife">Nightlife</option>
                                    <option value="Fun">Fun</option>
                                    <option value="Shopping">Shopping</option>
                                </select>
                                <input onChange={this.updateSearchFilters} 
                                        type="number"
                                        placeholder="Zipcode" 
                                        className="inputRequired" 
                                        name="location"
                                        value={this.state.search.location}/>
                                <input onChange={this.updateSearchFilters} 
                                        type="number"
                                        placeholder="Radius in metres"
                                        name="radius"
                                        value={this.state.search.radius}/>
                                
                            </div>
                            <p>
                                <button className="w3-button w3-border w3-hover-cyan w3-xlarge"
                                        onClick={this.searchVenues}>Search
                                </button>
                            </p>

                            <h1>Venues</h1>
                            
                            <ul>
                                {this.state.venues.map((venue, i) => {
                                    return <li key={venue.id}>
                                        <div id="venue">
                                            <div id="venue-text">
                                                <span id="name">{venue.name}</span><br/>
                                                <span>{venue.location.address}</span><br/>
                                                <a href={venue.url}>{venue.url}</a><br/>
                                              {  // <b>{venue.contact.phone}</b><br/> 
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