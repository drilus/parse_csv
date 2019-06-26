import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, VirtualTable, TableHeaderRow, } from '@devexpress/dx-react-grid-material-ui';

class TableRow extends React.PureComponent {

    render() {
      return (
        <Paper>
          <Grid
            rows={this.props.data.map((value, index) => (
              Object.assign(value, {row: index})
            ))}
            columns={Object.keys(this.props.data[0]).map(row => ({
              name: row,
              title: row
            }))}
          >
            <VirtualTable />
            <TableHeaderRow />
          </Grid>
        </Paper>
      );
    }
  }

export default TableRow