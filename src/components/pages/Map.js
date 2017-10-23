import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            map:null,
            markers:[]
        };
        console.log(props);
    }

    mapMoved()
    {
        console.log('map moved:'+ JSON.stringify(this.state.map.getCenter()) )
    }

    mapLoaded(map)
    {
        //console.log('map loaded:' + JSON.stringify(map.getCenter()) );
        if(this.state.map!== null)
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
                    ref={this.mapLoaded.bind(this)}
                    onDragEnd={this.mapMoved.bind(this)}
                    onZoomChanged={this.zoomChanged.bind(this)}
                    defaultZoom={this.props.zoom}
                    defaultCenter={this.props.center}>
                    {markers}
                    {/*{markers.map((marker, index) =>(
                <Marker {...marker}/>
                )
                    )}*/}
                </GoogleMap>
            </div>
        )
    }
}

export default withGoogleMap(Map);