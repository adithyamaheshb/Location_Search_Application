import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Mapp from '../components/Mapp';
import Search from '../components/Search';

//import Form from '../components/Form';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            venues: []
        }
    }

    componentDidMount() {
        this.setState({

        })
    }

    render() {

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
        const list = this.state.venues;
        return (
            <div>
                <div>

                <Mapp center={location}
                      zoom={14}
                      containerElement={<div style={{height: 400+'px'}}/>}
                      mapElement={<div style={{height: 400+'px'}}/>}
                      markers={list}
                />
                    <Search />

            </div>

    </div>
    )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));