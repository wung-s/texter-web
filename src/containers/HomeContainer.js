import React, { Fragment } from "react"

import Home from "../components/Home"
import Header from "../components/Header"
import Footer from "../components/Footer"

import { mailboxes, contacts, messages } from "../Store"

const HomeContainer = () => (
  <Fragment>
    <Header />
    <Home contacts={contacts} messages={messages} />
    <Footer mailboxes={mailboxes} />
  </Fragment>
)

export default HomeContainer
