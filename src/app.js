import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from '../components/Map';
import Search from '../components/Search';
//import Form from '../components/Form';



class App extends Component {
    render() {
        return (
            <div>
                <Map />
                <Search />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));