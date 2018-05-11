import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"

import axios from "../helpers/Axios"
import Login from "../components/Home"
import { setAccessToken, isLoggedIn } from "../helpers/Auth"

class HomeContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  state = {
    loginObj: {},
    loading: false,
    showError: false,
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.props.history.push("/conversations")
    }
  }

  handleSignIn = loginObj => {
    this.setState({ loading: true, showError: false })
    axios()
      .post("/login", loginObj)
      .then(resp => {
        const { token } = resp.data
        setAccessToken(token)
        this.props.history.push("/conversations")
      })
      .catch(() => {
        this.setState({ showError: true, loading: false })
      })
  }

  render() {
    return (
      <Login
        onSignIn={this.handleSignIn}
        loading={this.state.loading}
        showError={this.state.showError}
      />
    )
  }
}

export default withRouter(HomeContainer)
