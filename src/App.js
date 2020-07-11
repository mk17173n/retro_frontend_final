import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Form from './components/Form'
import NavBar from './components/NavBar'
import Home from './components/Home'
import ProfileContainer from './ProfileComponents/ProfileContainer'
import Search from './components/Search'

import { withRouter } from 'react-router-dom'

class App extends React.Component {

  state = {
    user: {
      username: "",
      id: 0
    },
    token: "",
    searchTerm: "",
    contents: []
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {

      fetch("https://retro-back.herokuapp.com/persist", {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      })
        .then(r => r.json())
        .then(this.handleResp)
    }

    fetch("https://retro-back.herokuapp.com/contents")
      .then(r => r.json())
      .then((resp) => {
        this.setState({
          contents: resp
        })
      })
  }

  functionReturnFilteredArray = () => {
    let filteredArray = this.state.contents.filter(content => {
      return content.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    return filteredArray
  }

  handleSearchTerm = (string) => {
    this.setState({
      searchTerm: string
    })
  }


  clearUser = (state) => {
    localStorage.clear()
    this.setState({
      state
    })

    return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit} />
  }


  handleResp = (resp) => {
    if (resp.user) {
      localStorage.token = resp.token
      this.setState(resp, () => {
        this.props.history.push("/profile")
      })
    }
    else {
      alert(resp.error)
    }
  }

  handleLoginSubmit = (userInfo) => {
    return fetch(`https://retro-back.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(this.handleResp)
  }

  handleRegisterSubmit = (userInfo) => {
    return fetch(`https://retro-back.herokuapp.com/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(this.handleResp)
  }

  renderForm = (routerProps) => {
    if (routerProps.location.pathname === "/login") {
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit} />
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit} />
    }
  }

  renderProfile = (routerProps) => {
    return <ProfileContainer user={this.state.user} token={this.state.token} />
  }


  updateLike = (newContent) => {
    let newArray = this.state.contents.map(content => {
      if (content.id === newContent.content.id) {
        return newContent.content
      } else { return content }
    })
    this.setState({
      contents: newArray
    })
  }

  deleteContent = (id) => {
    fetch(`https://retro-back.herokuapp.com/contents/${id}`, {
      method: "DELETE"

    })
      .then(r => r.json())
      .then(deletedContent => {
        let deletedContentId = deletedContent.id
        let newArray = this.state.contents.filter(content => content.id !== deletedContentId)
        this.setState({
          contents: newArray
        })
      })
  }


  handleHome = (routerProps) => {
    if (this.state.user.id === 0 || localStorage.length === 0) {
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit} />
    }
    else {
      return <Home deleteContent={this.deleteContent} updateLike={this.updateLike} user={this.state.user} contents={this.functionReturnFilteredArray()} />
    }

  }




  // handleLogOuts = (routerProps) =>{
  //   localStorage.clear()
  //   // this.setState({
  //   //   user: {
  //   //     username: "",
  //   //     id: 0
  //   //   },
  //   //   token: "",
  //   //   contents: []
  //   // })

  //   return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
  // }

  render() {
    return (
      <div className="App">
        <NavBar clearUser={this.clearUser} />
        <Search searchTerm={this.state.searchTerm} handleSearchTerm={this.handleSearchTerm} />
        <Switch>
          <Route path="/login" render={this.renderForm} />
          <Route path="/register" render={this.renderForm} />
          <Route path="/profile" render={this.renderProfile} />
          <Route path="/logout" render={this.handleLogOut} />
          <Route path="/" exact component={this.handleHome} />
          <Route render={() => <p>Page not Found</p>} />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App)