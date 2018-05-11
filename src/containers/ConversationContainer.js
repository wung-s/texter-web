import React, { Fragment } from "react"

import Conversation from "../components/Conversation"
import Header from "../components/Header"
import Footer from "../components/Footer"

import { mailboxes, contacts, messages } from "../Store"

const ConversationContainer = () => (
  <Fragment>
    <Header />
    <Conversation contacts={contacts} messages={messages} />
    <Footer mailboxes={mailboxes} />
  </Fragment>
)

export default ConversationContainer
