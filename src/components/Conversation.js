import React, { forwardRef, Fragment } from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import grey from "@material-ui/core/colors/grey"
import Button from "@material-ui/core/Button"
import moment from "moment"
import AppConst from "../config/AppConst"

import NewMessageDialog from "./NewMessageDialog"

const s = {
  flow: { overflowY: "auto" },
  convActive: { backgroundColor: grey[300] },
}

const Conversation = forwardRef(
  (
    {
      conversations,
      messageByConvID,
      activeConvID,
      messageListByConvID,
      showNewMessage,
      submissionInitiated,
      newMsg,
      selectedGrpID,
      recipient,
      phoneNo,
      winHeight,
      groupsByID,
      onConvClick,
      onNewMessageClick,
      onGroupSelect,
      onPhoneNoChange,
      onMessageChange,
      onNewMessageSend,
      onMessageSend,
      onRecipientChange,
    },
    ref
  ) => {
    const messageList = messageListByConvID[activeConvID] || []
    return (
      <Fragment>
        <NewMessageDialog
          visible={showNewMessage}
          onCancel={onNewMessageClick}
          onPhoneNoChange={onPhoneNoChange}
          onMessageChange={onMessageChange}
          onNewMessageSend={onNewMessageSend}
          onRecipientChange={onRecipientChange}
          onGroupSelect={onGroupSelect}
          msg={newMsg}
          selectedGrpID={selectedGrpID}
          groupsByID={groupsByID}
          phoneNo={phoneNo}
          recipient={recipient}
          submissionInitiated={submissionInitiated}
        />
        <Grid container spacing={8}>
          <Grid item sm={4}>
            <Paper style={{ ...s.flow, height: winHeight - 150 }}>
              <List>
                <ListItem>
                  <Button color="primary" variant="raised" onClick={onNewMessageClick}>
                    New Message
                  </Button>
                </ListItem>
                {conversations.map(conv => {
                  const displayNo =
                    messageByConvID[conv.id].direction === "incoming"
                      ? messageByConvID[conv.id].from
                      : messageByConvID[conv.id].to
                  return (
                    <ListItem
                      key={conv.id}
                      button
                      divider
                      onClick={() => onConvClick(conv.id)}
                      style={activeConvID === conv.id ? s.convActive : null}
                    >
                      <ListItemText primary={displayNo} secondary={messageByConvID[conv.id].body} />
                    </ListItem>
                  )
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item sm={8}>
            <Paper
              style={{
                height: winHeight - 150,
              }}
            >
              {messageList.length > 0 && (
                <Grid container>
                  <Grid item xs={12}>
                    <ul
                      style={{
                        ...s.flow,
                        height: winHeight - 250,
                      }}
                      ref={ref}
                    >
                      {messageList.map(({ id, body, createdAt, direction }) => {
                        const textAlign = direction === "incoming" ? "left" : "right"
                        return (
                          <ListItem key={id} style={{ textAlign }}>
                            <ListItemText
                              primary={body}
                              secondary={moment(createdAt).format("LL HH:MM:SS")}
                            />
                          </ListItem>
                        )
                      })}
                    </ul>
                  </Grid>
                  <Grid item xs={10} style={{ paddingLeft: 10 }}>
                    <TextField
                      fullWidth
                      label="Type here"
                      value={newMsg}
                      onChange={onMessageChange}
                    />
                    <Typography
                      color={newMsg.trim().length >= AppConst.msgLength ? "error" : "default"}
                      variant="caption"
                    >{`${newMsg.trim().length}/${AppConst.msgLength}`}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="raised"
                      onClick={onMessageSend}
                      disabled={
                        newMsg.trim().length === 0 || newMsg.trim().length >= AppConst.msgLength
                      }
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
)

Conversation.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.object),
  messageByConvID: PropTypes.objectOf(PropTypes.object).isRequired,
  activeConvID: PropTypes.string,
  messageListByConvID: PropTypes.objectOf(PropTypes.array).isRequired,
  showNewMessage: PropTypes.bool.isRequired,
  submissionInitiated: PropTypes.bool.isRequired,
  groupsByID: PropTypes.objectOf(PropTypes.object).isRequired,
  newMsg: PropTypes.string.isRequired,
  phoneNo: PropTypes.string.isRequired,
  recipient: PropTypes.string.isRequired,
  selectedGrpID: PropTypes.string.isRequired,
  winHeight: PropTypes.number.isRequired,
  onConvClick: PropTypes.func.isRequired,
  onNewMessageClick: PropTypes.func.isRequired,
  onPhoneNoChange: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  onNewMessageSend: PropTypes.func.isRequired,
  onMessageSend: PropTypes.func.isRequired,
  onRecipientChange: PropTypes.func.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
}

Conversation.defaultProps = {
  conversations: [],
  activeConvID: "",
}

export default Conversation
