import React from "react"
import PropTypes from "prop-types"
import { Grid, Paper, List } from "material-ui"
import { ListItem, ListItemText } from "material-ui/List"

const styles = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10, overflowY: "auto", height: 400 },
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
          <Paper style={styles.Paper}>
            <List>
              {conversations.map(conv => (
                <ListItem button divider key={conv.id} onClick={() => onConvClick(conv.id)}>
                  <ListItemText primary={conv.id} secondary={messageByConvID[conv.id].body} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item sm={8}>
          <Paper style={styles.Paper}>
            <List>
              {messageList.map(({ id, body, userID, createdAt }) => {
                const align = userID ? "center" : "flex-start"
                return (
                  <Grid container key={id} alignItems={align}>
                    <Grid item sm={6}>
                      <ListItem>
                        <ListItemText primary={body} secondary={createdAt} />
                      </ListItem>
                    </Grid>
                  </Grid>
                )
              })}
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
