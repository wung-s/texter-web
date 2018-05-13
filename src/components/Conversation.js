import React from "react"
import PropTypes from "prop-types"
import { Grid, Paper, List } from "material-ui"
import { ListItem, ListItemText } from "material-ui/List"
import grey from "material-ui/colors/grey"

const s = {
  paper: { padding: 20, marginTop: 10, marginBottom: 10, overflowY: "auto", height: 400 },
  convActive: { backgroundColor: grey[300] },
}

const Conversation = ({
  conversations,
  messageByConvID,
  activeConvID,
  messageListByConvID,
  onConvClick,
}) => {
  const messageList = messageListByConvID[activeConvID] || []
  return (
    <div className="App">
      <Grid container spacing={8}>
        <Grid item sm={4}>
          <Paper style={s.paper}>
            <List>
              {conversations.map(conv => (
                <ListItem
                  key={conv.id}
                  button
                  divider
                  onClick={() => onConvClick(conv.id)}
                  style={activeConvID === conv.id ? s.convActive : null}
                >
                  <ListItemText
                    primary={messageByConvID[conv.id].from}
                    secondary={messageByConvID[conv.id].body}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item sm={8}>
          <Paper style={s.paper}>
            <List>
              {messageList.map(({ id, body, createdAt }) => (
                <ListItem key={id}>
                  <ListItemText primary={body} secondary={createdAt} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

Conversation.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.object),
  messageByConvID: PropTypes.objectOf(PropTypes.object).isRequired,
  activeConvID: PropTypes.string,
  messageListByConvID: PropTypes.objectOf(PropTypes.array).isRequired,
  onConvClick: PropTypes.func.isRequired,
}

Conversation.defaultProps = {
  conversations: [],
  activeConvID: "",
}

export default Conversation
