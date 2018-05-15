import React, { Component, Fragment } from "react"

import Groups from "../components/Groups"
import Header from "../components/Header"
import axios from "../helpers/Axios"
import { normalizeById } from "../helpers/normalizer"

class GroupsContainer extends Component {
  state = {
    newGrpName: "",
    newGrpDesc: "",
    showNewGrp: false,
    submissionInitiated: false,
    groupsByID: {},
    activeGrpID: "",
    winHeight: 500,
  }

  async componentDidMount() {
    const activeGrpID = await this.fetchAllGroups()
    this.setState({
      activeGrpID,
      winHeight: window.innerHeight,
    })
  }

  handleNewGrpClick = () => {
    this.setState({ showNewGrp: true, submissionInitiated: false })
  }

  handleGrpNameChange = e => {
    this.setState({ newGrpName: e.target.value })
  }

  handleGrpDescChange = e => {
    this.setState({ newGrpDesc: e.target.value })
  }

  handleNewGrpCancel = () => {
    this.setState({ showNewGrp: false })
  }

  handleNewGrpSubmit = () => {
    this.setState({ submissionInitiated: true })
    if (this.state.newGrpName.trim().length !== 0) {
      axios()
        .post("/groups", {
          name: this.state.newGrpName,
          description: this.state.newGrpDesc,
        })
        .then(() => {
          this.fetchAllGroups()
          this.setState({ showNewGrp: false, submissionInitiated: false })
        })
    }
  }

  handleGrpClick = id => {
    this.setState({ activeGrpID: id })
  }

  normalizeById = data =>
    data.reduce((res, e) => {
      res[e.id] = e
      return res
    }, {})

  fetchAllGroups = () =>
    axios()
      .get("/groups")
      .then(resp => {
        const grps = resp.data || []
        const id = grps.length > 0 ? grps[0].id : ""
        this.setState({
          groupsByID: normalizeById(resp.data),
        })
        return id
      })

  render() {
    return (
      <Fragment>
        <Header />
        <Groups
          {...this.state}
          onNewGrpClick={this.handleNewGrpClick}
          onGrpDescChange={this.handleGrpDescChange}
          onGrpNameChange={this.handleGrpNameChange}
          onNewGrpCancel={this.handleNewGrpCancel}
          onNewGrpSubmit={this.handleNewGrpSubmit}
          onGrpClick={this.handleGrpClick}
        />
      </Fragment>
    )
  }
}

export default GroupsContainer
