import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Mapp from '../components/Mapp';
import Search from '../components/Search';
import superagent from 'superagent';
//import Form from '../components/Form';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            venues: [],
            markers: []
        }
    }

    componentDidMount() {
        const url = 'https://api.foursquare.com/v2/venues/search';

        const params = {
            v: '20170918',
            near: 'sunnyvale',
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

    render() {
        //console.log(this.state.venues);
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
            <div>
                <div>

                <Mapp center={location}
                      zoom={12}
                      containerElement={<div style={{height: 400+'px'}}/>}
                      mapElement={<div style={{height: 400+'px'}}/>}
                      markers={this.state.venues}
                />
                    <Search />

            </div>

    </div>
    )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));