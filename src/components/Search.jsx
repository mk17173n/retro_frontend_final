import React from 'react'

const Search = props => {

  const searchChange = (e) => {
  props.handleSearchTerm(e.target.value)
  }

  return (
    <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" onChange={searchChange} value ={props.searchTerm}/>
        <i className="search icon" />
      </div>
    </div>
  )
}

export default Search