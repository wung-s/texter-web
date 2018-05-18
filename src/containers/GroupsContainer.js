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
    showAddContactDialog: false,
    addableContactsByID: {},
    selectedContacts: [],
    grpContactsByID: {},
    contactDialogPagination: {
      perPage: 0,
      page: 0,
      totalContacts: 0,
      totalPages: 0,
      rowsPerPage: 0,
    },
    contactPagination: {
      perPage: 10,
      page: 0,
      totalContacts: 0,
      totalPages: 0,
      rowsPerPage: 0,
    },
  }

  async componentDidMount() {
    const activeGrpID = await this.fetchAllGroups()

    this.setState(() => ({
      activeGrpID,
      winHeight: window.innerHeight,
    }))

    if (activeGrpID) {
      await this.fetchContactsAndSetPaginator(
        activeGrpID,
        1,
        this.state.contactPagination.perPage,
        "contactPagination",
        false
      )
    }
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

  handleGrpClick = async id => {
    this.setState(() => ({ activeGrpID: id }))
    await this.fetchContactsAndSetPaginator(
      id,
      1,
      this.state.contactPagination.perPage,
      "contactPagination",
      false
    )
  }

  handleAddContactsClick = async () => {
    this.setState(() => ({
      addableContactsByID: {},
    }))

    await this.fetchContactsAndSetPaginator(
      this.state.activeGrpID,
      1,
      this.state.contactPagination.perPage,
      "contactDialogPagination",
      true
    )

    this.setState(() => ({
      showAddContactDialog: true,
    }))
  }

  handleAddContactsCancel = () => {
    this.setState(() => ({
      showAddContactDialog: false,
    }))
  }

  handleNewGrpContactChange = (e, id) => {
    if (e.target.checked) {
      // ensure only unique IDs
      this.setState(prevState => ({
        selectedContacts: [...new Set(prevState.selectedContacts.concat(id))],
      }))
    } else {
      this.setState(prevState => ({
        selectedContacts: prevState.selectedContacts.filter(i => id !== i),
      }))
    }
  }

  handleAddMemberCancel = () => {
    this.setState(() => ({ showAddContactDialog: false }))
  }

  handleAddContactsConfirm = async () => {
    const grp = this.state.groupsByID[this.state.activeGrpID]
    await axios().put(`/groups/${this.state.activeGrpID}`, {
      ...grp,
      addContacts: this.state.selectedContacts,
    })

    await this.fetchContactsAndSetPaginator(
      this.state.activeGrpID,
      1,
      this.state.contactDialogPagination.perPage,
      "contactPagination",
      false
    )

    this.setState(() => ({
      showAddContactDialog: false,
    }))
  }

  handleContactsDialogChangePage = async (e, page) => {
    // material ui pagination is 0-index based, thus the need to add 1
    // to the page no to meet the server requirement
    await this.fetchContactsAndSetPaginator(
      this.state.activeGrpID,
      page + 1,
      this.state.contactDialogPagination.perPage,
      "contactDialogPagination",
      true
    )
  }

  handleContactsExistingChangePage = async (e, page) => {
    // material ui pagination is 0-index based, thus the need to add 1
    // to the page no to meet the server requirement
    await this.fetchContactsAndSetPaginator(
      this.state.activeGrpID,
      page + 1,
      this.state.contactPagination.perPage,
      "contactPagination",
      false
    )
  }

  fetchContactsAndSetPaginator = async (grpID, page, perPage, paginatorFor, omit) => {
    const resp = await this.fetchContacts(grpID, omit, page, perPage)
    const contactHolderKey =
      paginatorFor === "contactDialogPagination" ? "addableContactsByID" : "grpContactsByID"
    this.setState(prevState => ({
      [contactHolderKey]: normalizeById(resp.data.contacts),
      [paginatorFor]: {
        ...prevState[paginatorFor],
        perPage: resp.data.perPage,
        page: resp.data.page,
        totalContacts: resp.data.totalEntriesSize,
        totalPages: resp.data.totalPages,
        rowsPerPage: resp.data.currentEntriesSize,
      },
    }))
  }

  handleContactsExistingRowsPerPageChange = async e => {
    await this.fetchContactsAndSetPaginator(
      this.state.activeGrpID,
      1,
      e.target.value,
      "contactPagination",
      false
    )
  }

  handleContactsDialogRowsPerPageChange = async e => {
    await this.fetchContactsAndSetPaginator(
      this.state.activeGrpID,
      1,
      e.target.value,
      "contactDialogPagination",
      true
    )
  }

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

  fetchContacts = (grpID, omit = false, page = 1, perPage = 10) => {
    let url = ""
    if (omit) {
      url = `/contacts/search?page=${page}&per_page=${perPage}&omit_group_id=${grpID}`
    } else {
      url = `/contacts/search?page=${page}&per_page=${perPage}&group_id=${grpID}`
    }

    return axios()
      .get(url)
      .then(resp => resp)
  }

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
          onNewGrpContactChange={this.handleNewGrpContactChange}
          onGrpClick={this.handleGrpClick}
          onAddContactsClick={this.handleAddContactsClick}
          onAddContactsCancel={this.handleAddContactsCancel}
          onAddContactsConfirm={this.handleAddContactsConfirm}
          onContactsDialogChangePage={this.handleContactsDialogChangePage}
          onContactsDialogRowsPerPageChange={this.handleContactsDialogRowsPerPageChange}
          onContactsExistingChangePage={this.handleContactsExistingChangePage}
          onContactsExistingRowsPerPageChange={this.handleContactsExistingRowsPerPageChange}
        />
      </Fragment>
    )
  }
}

export default GroupsContainer
