import React, { Component, Fragment } from "react"

import Contacts from "../components/Contacts"
import Header from "../components/Header"
import axios from "../helpers/Axios"
import { normalizeById } from "../helpers/normalizer"

class ContactsContainer extends Component {
  state = {
    newCttLname: "",
    newCttFname: "",
    newCttPhone: "",
    showNewCtt: false,
    submissionInitiated: false,
    contactsByID: {},
    activeCttID: "",
    winHeight: 500,
    editMode: false,
  }

  async componentDidMount() {
    const activeCttID = await this.fetchAllContacts()
    this.setState({
      activeCttID,
      winHeight: window.innerHeight,
    })
  }

  handleDeleteCttClick = async () => {
    await axios().delete(`/contacts/${this.state.activeCttID}`)
    this.setState(() => ({
      activeCttID: "",
    }))
    const activeCttID = await this.fetchAllContacts()
    this.setState(() => ({
      activeCttID,
    }))
  }

  handleEditCttClick = () => {
    this.setState(prevState => ({
      showNewCtt: true,
      editMode: true,
      newCttFname: prevState.contactsByID[prevState.activeCttID].firstName,
      newCttLname: prevState.contactsByID[prevState.activeCttID].lastName,
      newCttPhone: prevState.contactsByID[prevState.activeCttID].phoneNo.replace("+1", ""),
    }))
  }

  handleNewCttClick = () => {
    this.setState({
      showNewCtt: true,
      editMode: false,
      submissionInitiated: false,
      newCttFname: "",
      newCttLname: "",
      newCttPhone: "",
    })
  }

  handleCttFnameChange = e => {
    this.setState({ newCttFname: e.target.value })
  }

  handleCttLnameChange = e => {
    this.setState({ newCttLname: e.target.value })
  }

  handleCttPhoneChange = e => {
    if (!isNaN(e.target.value)) {
      this.setState({ newCttPhone: e.target.value })
    }
  }

  handleNewCttCancel = () => {
    this.setState({ showNewCtt: false })
  }

  handleNewCttSubmit = async () => {
    this.setState({ submissionInitiated: true })
    const phone = this.state.newCttPhone.trim()
    if (phone.length === 10) {
      const data = {
        firstName: this.state.newCttFname,
        lastName: this.state.newCttLname,
        phoneNo: `+1${this.state.newCttPhone}`,
      }

      if (this.state.editMode) {
        await axios().put(`/contacts/${this.state.activeCttID}`, data)
      } else {
        await axios().post("/contacts", data)
      }

      this.fetchAllContacts()
      this.setState({ showNewCtt: false, submissionInitiated: false })
    }
  }

  handleCttClick = id => {
    this.setState({ activeCttID: id })
  }

  fetchAllContacts = () =>
    axios()
      .get("/contacts")
      .then(resp => {
        const contacts = resp.data.contacts || []
        const id = contacts.length > 0 ? contacts[0].id : ""
        this.setState({
          contactsByID: normalizeById(contacts),
        })
        return id
      })

  render() {
    return (
      <Fragment>
        <Header />
        <Contacts
          {...this.state}
          onEditCttClick={this.handleEditCttClick}
          onDeleteCttClick={this.handleDeleteCttClick}
          onNewCttClick={this.handleNewCttClick}
          onCttPhoneChange={this.handleCttPhoneChange}
          onCttLnameChange={this.handleCttLnameChange}
          onCttFnameChange={this.handleCttFnameChange}
          onNewCttCancel={this.handleNewCttCancel}
          onNewCttSubmit={this.handleNewCttSubmit}
          onCttClick={this.handleCttClick}
        />
      </Fragment>
    )
  }
}

export default ContactsContainer
