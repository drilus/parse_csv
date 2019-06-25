import React, { Component } from 'react';
import './App.css';
import CSVReader from './CSVReader/CSVReader';
import TableRow from './TableRow';
import "react-virtualized/styles.css";

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

export default App;