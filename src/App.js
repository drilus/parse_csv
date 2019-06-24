import React, { Component } from 'react';
import './App.css';
import CSVReader from './CSVReader/CSVReader';

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.fileName = "example.csv";
    this.state = {
      data: [
        [
          "value",
          "name",
          "age"
        ],
        [
          10,
          "Foo",
          "20"
        ],
        [
          20,
          "Bar",
          "30"
        ],
        [
          30,
          "Baz",
          "40"
        ]
      ]
    };
  }

  updateFileName = (name) => {
    this.fileName = name;
  }

  handleReadCSV = (data) => {
    // Load our data to the "state"
    if(data !== undefined) {
      this.setState({ 
        data: data.data
      });
    }
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  }

  handleImportOffer = () => {
    this.fileInput.current.click();
  }

  render() {
    return (
      <div>
        <TableRow
          data={this.state.data}
          fileName={this.fileName}
        />
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: 'none'}}
          fileName={this.updateFileName}
          onError={this.handleOnError}
          configOptions={{
            skipEmptyLines: true,
            chunk: (chunk) => {
              this.setState({ data: chunk.data });
            }
          }}
        />
        <button className="btn btn-primary" onClick={this.handleImportOffer}>Load CSV</button>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    return (
      <table id="csv_table" className="table table-striped table-bordered table-hover table-sm">
        <caption>filename: {this.props.fileName}</caption>
        <thead id="headers" className="thead-dark">
          <tr>
            <th>row</th>
            {Object.values(this.props.data[0]).map((item, key) => <th key={key}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((row, key) => {
            if(key > 0)
              return (
                <tr key={key}>
                  <td>{key}</td>
                  {Object.values(row).map((value, key) => {
                    return <td key={key}>{value}</td>
                  })}
                </tr>
              )
            return null
          })}
        </tbody>
      </table>
    );
  }
}

export default App;