import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Plugin, Template, TemplatePlaceholder } from "@devexpress/dx-react-core";
import { FilteringState, IntegratedFiltering, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, VirtualTable, TableHeaderRow, TableFilterRow, DragDropProvider, 
         TableColumnReordering, ColumnChooser, TableColumnVisibility, 
         Toolbar,   
       } from '@devexpress/dx-react-grid-material-ui';
import DateRange from '@material-ui/icons/DateRange';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
    },
  },
  headerCell: {
    '&': {
      color: '#000',
      fontWeight: 800,
    }
  },
});

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const TableComponentBase = ({ classes, ...restProps }) => (
  <VirtualTable.Table
    {...restProps}
    className={classes.tableStriped}
  />
);

const TableHeaderComponentBase = ({ classes, ...restProps }) => (
  <TableHeaderRow.Cell
    {...restProps}
    className={classes.headerCell}
  />
);

const Root = props => <Grid.Root {...props} style={{ height: '100%' }} />;
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
export const TableHeaderComponent = withStyles(styles, { name: 'TableHeaderComponent' })(TableHeaderComponentBase);

class TableRow extends React.PureComponent {

  getCellValue(row, columnName) {
    return columnName === "index"
      ? this.state.data.indexOf(row)
      : row[columnName];
  }

  getRowId = (row) => {
    return this.props.data.indexOf(row);
  }

    render() {

      const CustomToolbarMarkup = () => {
        const {
          handleVisibleChange
        } = this.props
        return (
        <Plugin name="customToolbarMarkup">
          <Template name="toolbarContent">
            <Tooltip title="Show Console" aria-label="showConsole">
              <IconButton aria-label="consoleButton" onClick={() => handleVisibleChange(true)}>
                <FontAwesomeIcon icon={faTerminal} size="sm" />
              </IconButton>
            </Tooltip>
            <TemplatePlaceholder />
          </Template>
        </Plugin>)
      };

      const rows = this.props.data;
      const columns = Object.keys(rows[0]).map(row => ({
        name: row,
        title: row,
      }));
      return (
        <Paper>
          <Grid
            rows={rows}
            columns={columns}
            getRowId={this.getRowId}
            rootComponent={Root}
          >
            <DragDropProvider />
            <FilteringState defaultFilters={[]} />
            <SortingState defaultSorting={[{ columnName: 'row', direction: 'asc' }]} />
            <IntegratedFiltering />
            <IntegratedSorting />
            <VirtualTable 
              height={"auto"}
              tableComponent={TableComponent}
            />
            {/* <TableColumnResizing defaultColumnWidths /> */}
            <TableHeaderRow 
              showSortingControls 
              cellComponent={TableHeaderComponent}
            />
            <TableColumnReordering 
              defaultOrder={columns.map(column => column.name)}
            />
            <TableFilterRow
              showFilterSelector
              iconComponent={FilterIcon}
            />
            <TableColumnVisibility 
              onHiddenColumnNamesChange={change => console.info(`Columns filtered: ${change}`)}
            />
            <Toolbar />
            <ColumnChooser />
            <CustomToolbarMarkup />
          </Grid>
        </Paper>
      );
    }
  }

export default TableRow