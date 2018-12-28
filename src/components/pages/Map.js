import React, {Component} from 'react';
import {google, withGoogleMap, GoogleMap, InfoWindow, Marker, MarkerWithLabel} from 'react-google-maps';
//const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            map:null,
            markers:[]
        };
        
    }

    mapMoved()
    {
        console.log('map moved:'+ JSON.stringify(this.state.map.getCenter())); 
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

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if(this.props.markers.length > 0) {
    //         if ((this.props.markers[0].location.lat !== prevProps.markers[0].location.lat)
    //         || (this.props.markers[0].location.lng !== prevProps.markers[0].location.lng)) {
    //           this.forceUpdate();
    //           console.log(this.props.markers[0])
    //         }
    //     }        
    //   }

    render(){
        console.log(this.props);
        let selfThis  = this;
        const markers = this.props.markers.map((venue, i) => {
            const marker = {
                position:{
                    lat: venue.location.lat,
                    lng: venue.location.lng
                }
            };
            // return <Marker key={i} {...marker} />
            return  <InfoWindow
                position={{ lat: marker.position.lat, lng: marker.position.lng}}
            >
            
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                    <b>{i+1}</b>
                    <Marker key={i} {...marker} />
                </div>
                
            </InfoWindow>
        });

        return (
            <div>
                <GoogleMap
                    ref={this.mapLoaded.bind(this)}
                    onDragEnd={this.mapMoved.bind(this)}
                    onZoomChanged={this.zoomChanged.bind(this)}
                    defaultZoom={this.props.zoom}
                    center={this.props.center}>
                    {markers}                    
                </GoogleMap>
            </div>
        )
    }
}

export default withGoogleMap(Map);