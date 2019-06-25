import React, { Component } from 'react';
import { Column, Table, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";

class TableRow extends Component {

    rowGetter = (key) => {
      return this.props.data[key.index];
    }

    render() {
      return (
        <div style={{ height: 800 }}>
          <AutoSizer>
            {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.props.data.length}
              rowGetter={this.rowGetter}
            >
              {/* <Column label="row" dataKey="row" width={200} /> */}
              {Object.values(this.props.data[0]).map((item, key) => <Column label={item} key={key} dataKey={key} width={200} />)}
            </Table>
            )}
          </AutoSizer>
        </div>
      );
    }
  }

export default TableRow