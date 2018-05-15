import React from "react"
import PropTypes from "prop-types"
import { Grid, List } from "material-ui"
import { ListItem, ListItemText } from "material-ui/List"
import Button from "material-ui/Button"
import UserForm from "./UserForm"

const Users = ({ users }) => (
  <div className="App">
    <Grid container spacing={8}>
      <Grid item sm={4}>
        <List>
          <ListItem>
            <Button color="secondary" variant="raised">
              + Add New Contact
            </Button>
          </ListItem>
          {users.map(({ firstName, phoneNumber }) => (
            <ListItem button divider>
              <ListItemText primary={firstName} secondary={phoneNumber} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item sm={8}>
        <UserForm />
      </Grid>
    </Grid>
  </div>
)

Users.propTypes = {
  users: PropTypes.string.isRequired,
}

export default Users
