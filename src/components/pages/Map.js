import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

// eslint-disable
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
        this.mapMoved = this.mapMoved.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
        this.zoomChanged = this.zoomChanged.bind(this);
    }

    componentDidMount() {
       this.zoomChanged();
    }

    mapMoved()
    {
        console.log("Hello");
    }

    mapLoaded(map)
    {
        // console.log('map loaded:', JSON.stringify(map.getCenter()) );

        if(this.state.map!== null)
        {
            return;
        }
        this.setState({ map })
      }

    zoomChanged()
    {
        //console.log('zoom changed:',this.state.map.getZoom())
        console.log(this.props.markers.length)
         if(this.props.markers.length > 0) {
            const center = {
                lat: this.props.markers[0].location.lat, 
                lng: this.props.markers[0].location.lng,
             }
            this.setState({ center })
       }    
       console.log(this.state.center);   
    }

    render(){
        console.log(this.props.markers);
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
                    center={this.state.center}
                    ref={this.mapLoaded}
                    onDragEnd={this.mapMoved}
                    onZoomChanged={this.zoomChanged}
                    defaultZoom={this.props.zoom}
                    defaultCenter={this.state.center}>
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