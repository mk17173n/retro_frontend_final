import React, { Component } from 'react'
import ContentCard from './ContentCard'
import { Card } from 'semantic-ui-react'

export class Home extends Component {
  render() {
    let contentMapper =this.props.contents.map(content => {
    
      return <ContentCard  updateLike ={this.props.updateLike} deleteContent ={this.props.deleteContent} key ={content.name} user ={this.props.user} content ={content} />
    })
    return (
      <div>
         <h1 id="header">Awesome 80's Songs</h1>
    <img src="https://media0.giphy.com/media/3oEduT2UVPqe3my3Di/source.gif" alt="Child of the 80's" width="400" height="200"/>
    <Card.Group itemsPerRow={2}>
    {contentMapper}
    </Card.Group>
  </div>
    )
  }
}

export default Home
