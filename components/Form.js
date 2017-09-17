import React, { Component } from 'react';

import axios from 'axios';
//import { Screen, Spinner, Examples } from '@shoutem/ui';
import { stringify as queryString } from 'query-string';


//import styles from './styles';
//import RecommendationsMap from './RecommendationsMap';
//import { OverlayTopics, BottomTopics } from './Topics';


const CLIENT_ID = 'FDTNNCZ2XM53JG0PDPHBJRRGEJU5TCKHAUT1KGEAXKGURAPE';
const CLIENT_SECRET= 'ANZQ2VPFYNUNAXKQQ3G000KMDKIAW2VZIMOKVYUOG41QEKLT';
const FOURSQUARE_ENDPOINT = 'https://api.meetup.com/topics';
const API_DEBOUNCE_TIME = 2000;


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zipcode: '',
            radius: '',
            items: [],
            result_mu: [],
            recommendations: [],
            lookingFor: null,
            headerLocation: null,
            last4sqCall: null
        };

        this.onZipcodeChange = this.onZipcodeChange.bind(this);
        this.onRadiusChange = this.onRadiusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.clicked = this.clicked.bind(this);
        this.onRegionChange=this.onRegionChange.bind(this);
        //this.panToArcDeTriomphe = this.panToArcDeTriomphe.bind(this);
    }

    componentWillMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            };

            this.onRegionChange(region, position.coords.accuracy);
        });
    }

    onRegionChange(region, gpsAccuracy) {
        //this.fetchVenues(region);

        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onZipcodeChange(event) {
        this.setState({zipcode: event.target.value});
    }

    onRadiusChange(event) {
        this.setState({radius: event.target.value});
    }
    handleSubmit(event) {
        alert('Zipcode and radius are submitted  ' + this.state.zipcode +' '+ this.state.radius);
        event.preventDefault();
    }

    /*clicked () {
        var query = 'food';
          fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
              .then((res) => res.json())
              .then((responseJson) => {
                  if (responseJson.response.groups) {
                      this.setState({
                          recommendations: json.response.groups.reduce(
                              (all, g) => all.concat(g ? g.items : []), []
                          ),
                          headerLocation: json.response.headerLocation,
                          last4sqCall: new Date()
                      });
                  }
              })
              .catch((error) => {
                  console.log(error);
              });
      };*/
        /*axios.get(FOURSQUARE_ENDPOINT)
            .then(function (result) {
                const result_mu = console.log(result);
                this.setState({result_mu});
            })
            .catch(function (error) {
                console.log(error);
            })
    };*/
    //panToArcDeTriomphe() {
    //    console.log(this);
    //   this.map.panTo(ARC_DE_TRIOMPHE_POSITION);
    //}
    fetchVenues(region, lookingFor) {
        if (!this.shouldFetchVenues(lookingFor)) return;

        const query = this.venuesQuery(region, lookingFor);

            axios.get(`${FOURSQUARE_ENDPOINT}?${query}`)
            .then(res => res.json())
            .then(json => {
                if (json.response.data) {

                    this.setState({
                        /*recommendations: json.response.groups.reduce(
                            (all, g) => all.concat(g ? g.items : []), []
                        )*/
                        recommendations: json.response.data.map,
                        headerLocation: json.response.headerLocation,
                        last4sqCall: new Date()

                    });
                }
            })
            .catch(err => console.log(err));

    }

    shouldFetchVenues(lookingFor) {
        return lookingFor !== this.state.lookingFor
            || this.state.last4sqCall === null
            || new Date() - this.state.last4sqCall > API_DEBOUNCE_TIME;
    }

    venuesQuery({ latitude, longitude }, lookingFor) {
        return queryString({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: 20170305,
            ll: `${latitude}, ${longitude}`,
            llAcc: this.state.gpsAccuracy,
            section: lookingFor || this.state.lookingFor || 'food',
            limit: 10,
            openNow: 1,
            venuePhotos: 1
        });
    }


    render() {
        console.log(this.state.recommendations);
        console.log(this.state.headerLocation);
        console.log(this.state.last4sqCall);


        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Place:
                            <input placeholder = "Enter zipcode here" name="zipcode"
                                   type="number" value={this.state.zipcode}
                                   onChange={this.onZipcodeChange} />
                        </label>

                        <label>
                            Radius:
                            <input placeholder = "Enter radius here" name="radius"
                                   type="number" value={this.state.radius}
                                   onChange={this.onRadiusChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div><button onClick={this.clicked}>meetup results</button></div>
            </div>
        );
    }
}

export default Form;


