import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Mapp from '../components/Mapp';
//import Search from '../components/Search';
import superagent from 'superagent';
//import Form from '../components/Form';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            venues: [],
            markers: [],
            search: {
                query: '',
                radius: '',
                zipcode:''
            }
        }
    }

    componentDidMount() {

        const url = 'https://api.foursquare.com/v2/venues/search';

        const params = {
            v: '20170918',
            near: '94089',
            query: 'food',
            radius: '5000',
            //postalCode: this.state.search.zipcode,
            client_id: 'FDTNNCZ2XM53JG0PDPHBJRRGEJU5TCKHAUT1KGEAXKGURAPE',
            client_secret: 'ANZQ2VPFYNUNAXKQQ3G000KMDKIAW2VZIMOKVYUOG41QEKLT'
        };

        superagent
            .get(url)
            .query(params)
            .set('Accept', 'text/json')
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
            })

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
            near: this.state.search.zipcode,
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
        console.log(this.state.venues);
        const markers = [
            {
            location: {
                lat: 37.401018799999996,
                lng: -122.0178674
            }
        }
        ];

        const location = {
            lat: 37.401018799999996,
            lng: -122.0178674
        };

        return (
            <form>
                <div>
                    <div>
                        <div className="col-md-3">
                            <div className="form-style-8">
                            <h1>Search Venues</h1>
                                <select onChange={this.updateSearchFilters.bind(this, 'query')} type="text"
                                            placeholder="Query">
                                    <option value="Top Picks">Top Picks</option>
                                    <option selected value="Trending">Trending</option>
                                    <option value="Food">Food</option>
                                    <option value="Nightlife">Nightlife</option>
                                    <option value="Fun">Fun</option>
                                    <option value="Shopping">Shopping</option>
                                </select>
                                <input onChange={this.updateSearchFilters.bind(this, 'zipcode')} type="number" placeholder="Zipcode"/>
                                <input onChange={this.updateSearchFilters.bind(this, 'radius')} type="number"
                                            placeholder="Radius in metres"/>
                            <button className="w3-button w3-border w3-hover-cyan w3-xlarge" onClick={this.searchVenues.bind(this)}>Search</button>

                                <h1>Venues</h1>
                                     <ol>
                                        {this.state.venues.map((venue, i) => {
                                            return <li key={venue.id}>{venue.name}</li>
                                             })
                                        }
                                     </ol>
                        </div>
                    </div>

                    <div className="col-md-9">
                         <Mapp center={location}
                               zoom={2}
                               containerElement={<div style={{height: 800+'px',width: 1200+'px'}}/>}
                               mapElement={<div style={{height: 800+'px',width: 1200+'px'}}/>}
                               markers={this.state.venues}
                         />
                    </div>
                </div>
            </div>
            </form>
    )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));