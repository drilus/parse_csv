import React, { Component } from 'react';
import CSVReader from './CSVReader/CSVReader';

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      data: [
        [
          "id",
          "name",
          "age"
        ],
        [
          1,
          "Foo",
          "20"
        ],
        [
          2,
          "Bar",
          "30"
        ],
        [
          3,
          "Baz",
          "40"
        ]
      ],
      fileName: "example.csv"
    };
  }

  handleReadCSV = (data) => {
    // Load our data to the "state"
    if(data !== undefined)
      this.setState({ 
        data: data.data,
        fileName: data.files[0].name
      });
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  }

  handleImportOffer = () => {
    this.fileInput.current.click();
  }

  // Stream the contents. A 9MB CSV file takes up 1.5GB of memory completely loaded in the DOM.
  // step: function(row) { /* Stream */
  //   console.log("Row:", row.data);
  // },

  render() {
    return (
      <div>
        <TableRow
          data={this.state.data}
          fileName={this.state.fileName}
        />
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: 'none'}}
          onError={this.handleOnError}
          configOptions={{
            skipEmptyLines: true,
            chunk: (chunk) => {
              this.setState({ data: chunk.data });
            }
          }}
        />
        <button onClick={this.handleImportOffer}>Load CSV</button>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    return (
      <table id="csv_table" className="table table-striped table-bordered table-hover table-sm">
        <caption>{this.props.fileName}</caption>
        <thead id="headers" className="thead-dark">
          <tr>
            {Object.values(this.props.data[0]).map((item, key) => <th key={key}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((row, key) => {
            if(key > 0)
              return (
                <tr key={key}>
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