import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

export default class ContentCard extends Component {



// deleteLike = (likeID) =>{
//     this.props.pushLike(likeID)
// }

handleLike =(e)=>{
let {id} =this.props.content
let userid =this.props.user.id
let token =localStorage.getItem(`token`)

fetch(`http://localhost:3000/contents/${id}/likes`, {
    method: "POST",
    headers: {
        'Content-type' : 'application/json',
        "Authorization": `bearer ${token}`
},
body: JSON.stringify({
    content_id: id,
    user_id: userid

})
})
.then(r => r.json())
.then(content =>{
    console.log("here", content)
    this.props.updateLike(content)
})
}


handleDelete = (e) =>{
let id = this.props.content.id
this.props.deleteContent(id)
}



    render() {
        let {name, source, description, image, likes} =this.props.content
        return (
            <Card>
            <div className="card">
          <h1>{name}</h1> 
          <img alt={description} src={image} />
          <br></br>
          <iframe allowFullScreen ="allowFullScreen" className='videoFrame' title='videoContainer'
                        src={`https://www.youtube.com/embed/${source}`} allow='encrypted-media' >
                    </iframe>

          <h3>{description}</h3> 
          <h4> <button onClick ={this.handleLike}>  likes {likes.length}</button></h4>
          <h4> <button onClick ={this.handleDelete} className = "delete">  Delete </button></h4>
            </div>
            </Card>
        )
    }
}
