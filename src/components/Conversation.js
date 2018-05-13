import React, { forwardRef, Fragment } from "react"
import PropTypes from "prop-types"
import { Grid, Paper, List } from "material-ui"
import Typography from "material-ui/Typography"
import TextField from "material-ui/TextField"
import { ListItem, ListItemText } from "material-ui/List"
import grey from "material-ui/colors/grey"
import Button from "material-ui/Button"
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
      phoneNo,
      winHeight,
      onConvClick,
      onNewMessageClick,
      onPhoneNoChange,
      onMessageChange,
      onNewMessageSend,
      onMessageSend,
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
          msg={newMsg}
          phoneNo={phoneNo}
          submissionInitiated={submissionInitiated}
        />
        <Grid container spacing={8}>
          <Grid item sm={4}>
            <Paper style={{ ...s.flow, height: winHeight - 150 }}>
              <List>
                <ListItem>
                  <Button color="secondary" variant="raised" onClick={onNewMessageClick}>
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
                        const textAlign = direction === "incoming" ? "right" : "left"
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
  newMsg: PropTypes.string.isRequired,
  phoneNo: PropTypes.string.isRequired,
  winHeight: PropTypes.number.isRequired,
  onConvClick: PropTypes.func.isRequired,
  onNewMessageClick: PropTypes.func.isRequired,
  onPhoneNoChange: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  onNewMessageSend: PropTypes.func.isRequired,
  onMessageSend: PropTypes.func.isRequired,
}

Conversation.defaultProps = {
  conversations: [],
  activeConvID: "",
}

export default Conversation
