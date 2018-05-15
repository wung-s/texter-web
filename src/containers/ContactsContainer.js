import React, { Fragment } from "react"

import Users from "../components/Users"
import Header from "../components/Header"

import { users } from "../Store"

const ContactsContainer = () => (
  <Fragment>
    <Header />
    <Users users={users} />
  </Fragment>
)

export default ContactsContainer
