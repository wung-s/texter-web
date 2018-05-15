import React from "react"
import TextField from "material-ui/TextField"
import Button from "material-ui/Button"

const UserForm = () => (
  <form noValidate autoComplete="off">
    <TextField fullWidth id="firstName" label="First Name" margin="normal" />
    <TextField fullWidth id="lastName" label="Last Name" margin="normal" />
    <TextField fullWidth id="phoneNumber" label="Phone Number" margin="normal" />
    <Button color="secondary" variant="raised">
      + Create Contact
    </Button>
  </form>
)

export default UserForm