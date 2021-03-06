import React, { Fragment, Component } from "react"
import { findDOMNode } from "react-dom"

import AppConst from "../config/AppConst"
import axios from "../helpers/Axios"
import Conversation from "../components/Conversation"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { normalizeById } from "../helpers/normalizer"

import { mailboxes } from "../Store"

class ConversationContainer extends Component {
  state = {
    messageByConvID: {},
    conversations: [],
    activeConvID: "",
    messageListByConvID: {},
    showNewMessage: false,
    phoneNo: "",
    newMsg: "",
    submissionInitiated: false,
    phoneError: false,
    msgError: false,
    winHeight: 500,
    recipient: "group",
    groupsByID: {},
    selectedGrpID: "",
  }

  async componentDidMount() {
    this.fetchAllGroup()
    const activeConvID = await this.fetchAllConversations()
    if (activeConvID) {
      this.fetchConversationMessages(activeConvID)
      this.setState({ activeConvID })
    }
    this.startPolling()
    this.setState({ winHeight: window.innerHeight })
    this.scrollToBottom()
    this.msgListRef = React.createRef()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  scrollToBottom = () => {
    if (this.msgListRef && this.msgListRef.current) {
      const scrollHeight = this.msgListRef.current.scrollHeight
      const height = this.msgListRef.current.clientHeight
      const maxScrollTop = scrollHeight - height
      // eslint-disable-next-line
      findDOMNode(this.msgListRef.current).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }

  pageDataLoader = () => {
    const { activeConvID } = this.state
    this.fetchAllConversations()
    this.fetchConversationMessages(activeConvID)
  }

  startPolling = () => {
    this.intervalId = setInterval(() => this.pageDataLoader(), AppConst.pollingInterval)
  }

  handleGroupSelect = e => {
    const selectedGrpID = e.target.value
    this.setState(() => ({
      selectedGrpID,
    }))
  }

  fetchAllGroup = () => {
    axios()
      .get("/groups")
      .then(resp => {
        this.setState({ groupsByID: normalizeById(resp.data) })
      })
  }

  fetchAllConversations = () =>
    axios()
      .get("/conversations")
      .then(resp => {
        const messageByConvID = this.normalizeMessageByConversationId(resp.data.conversations)
        const conversations = this.extractOnlyConversationData(resp.data.conversations)
        const activeConvID = conversations.length > 0 ? conversations[0].id : ""

        this.setState({
          messageByConvID,
          conversations,
        })
        return activeConvID
      })

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

  handleNewMessageClick = () => {
    const { showNewMessage } = this.state
    this.setState({
      showNewMessage: !showNewMessage,
      phoneNo: "",
      newMsg: "",
      submissionInitiated: false,
      selectedGrpID: "",
      recipient: "individual",
    })
  }

  sendMessage = (to, body) =>
    axios().post("/messages", {
      to,
      body,
    })

  handlePhoneNoChange = e => {
    if (!isNaN(e.target.value)) {
      this.setState({ phoneNo: e.target.value })
    }
  }

  handleMessageChange = e => {
    this.setState({ newMsg: e.target.value })
  }

  handleNewMessageSend = async () => {
    const { newMsg, phoneNo } = this.state
    this.setState(() => ({ submissionInitiated: true }))
    if (this.state.recipient === "individual") {
      if (phoneNo.length === 10 && newMsg.length < 160 && newMsg.length !== 0) {
        const resp = await this.sendMessage(`+1${phoneNo}`, newMsg)
        const activeConvID = resp.data.conversationId
        this.setState({ showNewMessage: false, newMsg: "" })
        this.setState({ showNewMessage: false, newMsg: "" })
        this.fetchConversationMessages(activeConvID)
        this.setState({ activeConvID })
      }
    }

    if (newMsg.length < 160 && newMsg.length !== 0 && this.state.selectedGrpID !== "") {
      await this.sendMessageToGroup(this.state.selectedGrpID, newMsg)
      this.setState({ showNewMessage: false, newMsg: "" })
    }

    this.fetchAllConversations()
  }

  sendMessageToGroup = (grpID, body) =>
    axios().post("messages/groups", {
      groupID: grpID,
      body,
    })

  handleRecipientChange = e => {
    const recipient = e.target.value
    this.setState(() => ({
      recipient,
      selectedGrpID: "",
    }))
  }

  handleMessageSend = () => {
    const { newMsg, activeConvID, messageListByConvID } = this.state
    const msg = messageListByConvID[activeConvID][0]

    const to = msg.direction === "incoming" ? msg.from : msg.to
    this.sendMessage(to, newMsg).then(() => {
      this.fetchConversationMessages(activeConvID)
      this.setState({ newMsg: "" })
    })
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Conversation
          {...this.state}
          onConvClick={this.handleConvClick}
          onNewMessageClick={this.handleNewMessageClick}
          onPhoneNoChange={this.handlePhoneNoChange}
          onMessageChange={this.handleMessageChange}
          onNewMessageSend={this.handleNewMessageSend}
          onMessageSend={this.handleMessageSend}
          onRecipientChange={this.handleRecipientChange}
          onGroupSelect={this.handleGroupSelect}
          ref={this.msgListRef}
        />
        <Footer mailboxes={mailboxes} />
      </Fragment>
    )
  }
}

export default ConversationContainer
