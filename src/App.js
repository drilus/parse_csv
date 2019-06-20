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
      ]
    };
  }

  handleReadCSV = (data) => {
    // console.log(data);
    this.setState({ data: data.data });
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
        />
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: 'none'}}
          onError={this.handleOnError}
          configOptions={{
            skipEmptyLines: true
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
        <caption>caption</caption>
        <thead id="headers" className="thead-dark">
          <tr>
            {Object.values(this.props.data[0]).map((item, key) => <th id={key}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((row, key) => {
            if(key > 0)
              return (
                <tr>
                  {Object.values(row).map((value, key) => {
                    return <td>{value}</td>
                  })}
                </tr>
              )
          })}
        </tbody>
      </table>
    );
  }
}

export default App;