/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            map:null,
            markers:[],
            center: {
                lat: 37.401018799999996,
                lng: -122.0178674
            }
        };
        this.mapLoaded = this.mapLoaded.bind(this);
        this.mapMoved = this.mapMoved.bind(this);
        this.zoomChanged = this.zoomChanged.bind(this);
    }
 
    componentWillMount() {
        // const center = {
        //     lat: this.props.markers[0].location.lat,
        //     lng: this.props.markers[0].location.lng
        // }
        // this.setState({
        //     center
        // })
    }

    mapMoved()
    {
        //  console.log('map moved:', JSON.stringify(this.state.map.getCenter()) )
    }

    mapLoaded(map)
    {
        //  console.log('map loaded:' + JSON.stringify(map.getCenter()) );
        if(this.state.map!== null)
        {
            return;
        }
        this.setState({
            map
        })
    }

    zoomChanged()
    {
        // eslint-disable-next-line no-console
        console.log('zoom changed:', this.state.map.getZoom())
        const center = {
            lat: this.props.markers[0].location.lat,
            lng: this.props.markers[0].location.lng
        }
        this.setState({
            center
        })
    }

    render(){

        const markers = this.props.markers.map((venue, i) => {
            const marker = {
                position:{
                    lat: venue.location.lat,
                    lng: venue.location.lng
                }
            };
            return <Marker key={i} {...marker} />
        });

        return (
            <div>
                <GoogleMap
                    center={this.zoomChanged}
                    ref={this.mapLoaded}
                    onDragEnd={this.mapMoved}
                    onZoomChanged={this.zoomChanged}
                    defaultZoom={this.props.zoom}
                    defaultCenter={this.props.center}
                    >
                    {markers}
                </GoogleMap>
            </div>
        )

    }
}

export default withGoogleMap(Map);