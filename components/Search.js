import React, {Component} from 'react';
import {get} from 'superagent';
import superagent from 'superagent';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
//import {GoogleMapLoader ,GoogleMap, Marker} from 'react-google-maps';

/*
const SAN_FRANCISCO =  {
    lat: 37.401018799999996,
    lng: -122.0178674
};
*/

/*
let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: new google.maps.LatLng(40.729,-73.996),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
*/

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

    componentDidMount() {
        /*this.map = new google.maps.Map(this.refs.map, {
            center: SAN_FRANCISCO,
            zoom: 16
        });*/

        /*this.marker = new google.maps.Marker(this.refs.map,{
            position: {
                lat: SAN_FRANCISCO.position.lat,
                lng: SAN_FRANCISCO.position.lng
            }
        });*/
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

    /*mapMoved()
    {
        console.log('map moved:'+ JSON.stringify(this.state.map.getCenter()) )
    }

    mapLoaded(map)
    {
        //console.log('map loaded:' + JSON.stringify(map.getCenter()) )
        if(this.state.map!= null)
        {
            return;
        }
        this.setState({
            map:map
        })
    }

    zoomChanged()
    {
        console.log('zoom changed:' + this.state.map.getZoom())
    }
*/

    render() {
        /*const markers = this.props.markers.map((venue, i) => {
            const marker = {
                position:{
                    lat: venue.location.lat,
                    lng: venue.location.lng
                }
            };
            return <Marker key={i} {...marker} />
        });*/
        /*const mapStyle = {
            width: 800,
            height: 800,
            border: '1px solid black'
        };*/
        //const mapContainer = <div style={{height:'100%',width:'100%'}}></div>;
        return (
            <div className="container">
                <div className="row">
             {/*       <div>
                        <div className="col-md-12">
                            <GoogleMap
                                ref={this.mapLoaded.bind(this)}
                                onDragEnd={this.mapMoved.bind(this)}
                                onZoomChanged={this.zoomChanged.bind(this)}
                                defaultZoom={this.props.zoom}
                                defaultCenter={this.props.center}>
                                {markers}
                                {markers.map((marker, index) =>(
                                    <Marker {...marker}/>
                                        )
                                        )}
                            </GoogleMap>
*/}                       {/*     <Mapp center={{lat: 37.401018799999996,
                    lng: -122.0178674}}
                      zoom={14}
                      containerElement={<div style={{height: 400+'px'}}/>}
                      mapElement={<div style={{height: 400+'px'}}/>}
                      markers={this.state.venues}
                />*/}
   {/*                     </div>
                    </div>*/}
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

export default (Search);