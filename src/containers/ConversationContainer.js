import React, { Fragment, Component } from "react"

import axios from "../helpers/Axios"
import Conversation from "../components/Conversation"
import Header from "../components/Header"
import Footer from "../components/Footer"

import { mailboxes, contacts, messages } from "../Store"

class ConversationContainer extends Component {
  state = {
    messageByConvID: {},
    conversations: [],
    activeConvID: "",
    messageListByConvID: {},
  }

  componentDidMount() {
    axios()
      .get("/conversations")
      .then(resp => {
        const messageByConvID = this.normalizeMessageByConversationId(resp.data.conversations)
        const conversations = this.extractOnlyConversationData(resp.data.conversations)
        const activeConvID = conversations.length > 0 ? conversations[0].id : ""

        this.setState({
          messageByConvID,
          conversations,
          activeConvID,
        })
        return activeConvID
      })
      .then(activeConvID => {
        if (activeConvID) {
          this.fetchConversationMessages(activeConvID)
        }
      })
  }

  fetchConversationMessages = id => {
    axios()
      .get(`/conversations/${id}`)
      .then(resp => {
        const { messageListByConvID } = this.state
        messageListByConvID[id] = resp.data.messages
        this.setState({
          messageListByConvID,
        })
      })
  }

  extractOnlyConversationData = data =>
    data.map(e => {
      // eslint-disable-next-line
      const { createdAt, id, status, userID, ...rest } = e
      const res = { createdAt, id, status, userID }
      return res
    })

  normalizeMessageByConversationId = data =>
    data.reduce((res, conv) => {
      res[conv.id] = conv.lastMessage
      return res
    }, {})

  handleConvClick = convID => {
    this.fetchConversationMessages(convID)
    this.setState({ activeConvID: convID })
  }
  render() {
    return (
      <Fragment>
        <Header />
        <Conversation
          contacts={contacts}
          messages={messages}
          {...this.state}
          onConvClick={this.handleConvClick}
        />
        <Footer mailboxes={mailboxes} />
      </Fragment>
    )
  }
}

export default ConversationContainer
