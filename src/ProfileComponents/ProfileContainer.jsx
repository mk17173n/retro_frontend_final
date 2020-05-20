import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class ProfileContainer extends Component {

  componentDidMount() {
    if(!this.props.token){
      this.props.history.push("/login")
    }
  }

  render() {
    let {user:{username}} = this.props

    return (
      <div>
        <h2>{username}&apos;s Profile</h2>

      </div>
    );
  }
}
export default withRouter(ProfileContainer);