import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Papa from 'papaparse'

export default class CSVReader extends Component {
  static propTypes = {
    onFileLoaded: PropTypes.func.isRequired,
    onError: PropTypes.func,
    inputRef: PropTypes.object,
    configOptions: PropTypes.object,
    style: PropTypes.object
  }

  handleChangeFile = (e) => {
    const {
      onFileLoaded,
      onError,
      fileName,
      configOptions = {}
    } = this.props

    const reader = new window.FileReader()
    if(e.target.files[0] === undefined)
      return undefined
    fileName(e.target.files[0].name)

    reader.onload = (event) => {
      Papa.parse(
        event.target.result,
        Object.assign(configOptions, {
          error: onError,
          complete: function(results) {
            onFileLoaded(results)
          }
        })
      )
    }

    reader.readAsText(e.target.files[0])
  }

  render() {
    const {
      inputRef,
      style
    } = this.props

    if(inputRef === undefined)
      return null

    return (
      <input
        type='file'
        accept='text/csv'
        ref={inputRef}
        onChange={e => this.handleChangeFile(e)}
        style={style}
      />
    )
  }
}