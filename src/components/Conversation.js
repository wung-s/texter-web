import React from "react"
import PropTypes from "prop-types"
import { Grid, Paper, List } from "material-ui"
import { ListItem, ListItemText } from "material-ui/List"

const styles = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10, overflowY: "auto", height: 400 },
}

const Conversation = ({ contacts, messages }) => (
  <div className="App">
    <Grid container spacing={8}>
      <Grid item sm={4}>
        <Paper style={styles.Paper}>
          <List>
            {contacts.map(({ number, lastMessage }) => (
              <ListItem button divider>
                <ListItemText primary={number} secondary={lastMessage} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item sm={8}>
        <Paper style={styles.Paper}>
          <List>
            {messages.map(({ messageBody, time, user }) => {
              const align = user ? "center" : "flex-start"
              return (
                <Grid container>
                  <Grid item alignItems={align} sm={6}>
                    <ListItem>
                      <ListItemText primary={messageBody} secondary={time} />
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

Conversation.propTypes = {
  contacts: PropTypes.string.isRequired,
  messages: PropTypes.string.isRequired,
}

export default Conversation
