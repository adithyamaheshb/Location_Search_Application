import React, { Component } from 'react';

import axios from 'axios';


const ARC_DE_TRIOMPHE_POSITION = {
    lat: 48.873947,
    lng: 2.295038
};

const SAN_FRANCISCO = {
    lat: 37.401018799999996,
    lng: -122.0178674
};



class Map extends Component {

        constructor(props) {
            super(props);

            //this.panToArcDeTriomphe = this.panToArcDeTriomphe.bind(this);
    }

    componentDidMount() {
        this.map = new google.maps.Map(this.refs.map, {
            center: SAN_FRANCISCO,
            zoom: 16
        });

    }


    //panToArcDeTriomphe() {
    //    console.log(this);
     //   this.map.panTo(ARC_DE_TRIOMPHE_POSITION);
    //}

    render() {
        //console.log(this.state.result_mu);

        const mapStyle = {
            width: 500,
            height: 300,
            border: '1px solid black'
        };

        return (
            <div>

            <div ref="map" style={mapStyle}>Google maps!</div>

            </div>
        );
    }
}

export default Map;