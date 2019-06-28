import React, { Component } from 'react';
import './App.css';
import CSVReader from './CSVReader/CSVReader';
import TableRow from './TableRow';
import RecordData from './records.js'
import Dock from 'react-dock';
import { Hook, Console, Decode } from 'console-feed'

const styles = {
  dockContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#242424',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'column'
  },
  remove: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '10px',
    cursor: 'pointer'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.fileName = "example.csv";
    this.state = {
      data: RecordData,
      dock: {
        isVisible: false,
        fluid: true,
        size: 0.25,
        dimMode: "transparent",
        customAnimation: false
      },
      logs: [],
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
    console.info(`Parsing ${this.fileName} complete.`)
    console.info(`Total rows: ${this.state.data.length}`)
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.error(err);
  }

  handleImportOffer = () => {
    this.fileInput.current.click();
  }

  handleVisibleChange = isVisible => {
    this.setState({ dock: {isVisible} });
  }

  componentDidMount() {
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
  }

  render() {
    const duration = 200;

    return (
      <div>
        <TableRow
          data={this.state.data}
          fileName={this.fileName}
          handleVisibleChange={this.handleVisibleChange}
        />
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: 'none'}}
          fileName={this.updateFileName}
          onError={this.handleOnError}
          configOptions={{
            skipEmptyLines: true,
            header: true,
            chunk: (chunk) => {
              this.setState({ data: chunk.data });
            }
          }}
        />
        <button className="btn btn-primary" onClick={this.handleImportOffer}>Load CSV</button>
        <Dock
          position="bottom"
          size={this.state.dock.size}
          dimMode={this.state.dock.dimMode}
          isVisible={this.state.dock.isVisible}
          onVisibleChange={this.handleVisibleChange}
          fluid={this.state.dock.fluid}
          dimStyle={{ background: 'rgba(0, 0, 100, 0.2)' }}
          dockStyle={null}
          dockHiddenStyle={null}
          duration={duration}
        >
          {() => {
            return (
            <div style={styles.dockContent}>
              <div style={{ backgroundColor: '#242424' }}>
                <Console logs={this.state.logs} variant="dark" />
              </div>
            </div>)
          }
          }
        </Dock>
      </div>
    );
  }
}

export default App;