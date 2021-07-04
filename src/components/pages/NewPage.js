import React, {Component} from 'react'

import './../../../node_modules/react-select-input/lib/react-select-input.css';
import InputSelect from 'react-select-input';

export default class NewPage extends Component {
  constructor() {
    super();
    this.state = {
      selected: {}
    }

    this.options = [
        { label: "Top Picks", value: "toppicks" },
        { label: "Trending", value: "trending" },
        { label: "Food", value: "food" },
        { label: "Coffee", value: "coffee" },
        { label: "Nightlife", value: "nightlife" },
        { label: "Fun", value: "fun" },
        { label: "Shopping", value: "shopping" }
    ];
  }

  manipState = (state, key, value) => {
    return Object.assign({}, state, {
      [key]: value
    });
  }

  handleChange = (key) => {
    let state = this.manipState(this.state, key, !this.state[key]);
    this.setState(state);
  }

  handleSelect = (option) => {
    let state = this.manipState(this.state, 'selected', option);
    this.setState(state);
  }


  render() {
    return <div className="demo-inner">
      <h1>react-select-input Demo</h1>
      <InputSelect
        onSelect={this.handleSelect}
        onChange={this.handleChange}
        options={this.options}
        autoFocus={false}
        openUp={false}
        disableEnter={true}
        collapseOnBlur={true}
        collapseOnEscape={true}
        collapseOnSelect={true}
      />
    </div>
  }
}

