/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {google, withGoogleMap, GoogleMap, InfoWindow, Marker, MarkerWithLabel} from 'react-google-maps';
//const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

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
        
    }

    mapMoved()
    {
        console.log('map moved:'+ JSON.stringify(this.state.map.getCenter())); 
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
                

             return <Marker style={{ color: 'white'}} label={`${i+1}`} key={i} {...marker} />
            // return  <InfoWindow
            //     position={{ lat: marker.position.lat, lng: marker.position.lng}}
            // >
            
            //     <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            //         <b>{i+1}</b>
            //         <Marker key={i} {...marker} />
            //     </div>
                
            // </InfoWindow>
        });

        return (
            <div>
                <GoogleMap
                    center={this.zoomChanged}
                    ref={this.mapLoaded}
                    onDragEnd={this.mapMoved}
                    onZoomChanged={this.zoomChanged}
                    defaultZoom={this.props.zoom}
                    center={this.props.center}>
                    {markers}                    
                </GoogleMap>
            </div>
        )

    }
}

export default withGoogleMap(Map);