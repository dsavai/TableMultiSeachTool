import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

class TableHeader extends Component {
  render() {
    return (
      <tr className="tableHead">
        <th>Country</th>
        <th>Capital</th>
        <th>Region</th>
        <th>Subregion</th>
        <th>Population</th>
        <th>Lat / Lng</th>
      </tr>
    );
  }
}

class TableList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.items.map((item, index) => (
          <React.Fragment>
            <tr>
              <td className="country">{item.name}</td>
              <td className="capital">{item.capital}</td>
              <td className="region">{item.region}</td>
              <td className="subregion">{item.subregion}</td>
              <td className="lat">{item.population}</td>
              <td className="lon">{item.latlng}</td>
            </tr>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      filteredItems: []
    };
  }

  filterList = event => {
    const { value, name: filter } = event.target;
    this.updateSearch(value, filter);
  };

  filterListNumber = event => {
    const { value, population: filter } = event.target;
    this.updateSearchNumber(value, filter);
  };

  updateSearch(inputValue, filter) {
    const filtered = this.state.allItems.filter(item =>
      item[filter].toLowerCase().startsWith(inputValue.toLowerCase())
    );
    this.setState({
      filteredItems: filtered
    });
  }

  componentDidMount() {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(res => {
      const myData = res.data;
      this.setState({
        allItems: myData,
        filteredItems: myData
      });
    });
  }
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.filterList}
          name="name"
          placeholder="Filter by Country"
        />
        <input
          type="text"
          onChange={this.filterList}
          name="region"
          placeholder="Filter by Region"
        />
        <input
          type="text"
          onChange={this.filterList}
          name="region"
          placeholder="Filter by Sub-region"
        />
        <table>
          <TableHeader />
          <TableList items={this.state.filteredItems} />
        </table>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
