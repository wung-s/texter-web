import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import red from "@material-ui/core/colors/red"

import AppConst from "../config/AppConst"

const s = {
  error: {
    color: red[500],
    fontSize: 12,
  },
}

const NewContactDialog = props => (
  <Dialog open={props.visible} aria-labelledby="form-dialog-title" fullWidth>
    <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
    <DialogContent>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            value={props.firstName}
            label="First Name"
            fullWidth
            onChange={props.onFnameChange}
            rows={3}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Last Name"
            value={props.lastName}
            fullWidth
            onChange={props.onLnameChange}
            rows={3}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Phone No"
            value={props.phone}
            onChange={props.onPhoneChange}
          />
        </Grid>
        {props.submissionInitiated &&
          props.phone.trim().length !== AppConst.phoneNoLength && (
            <Grid item xs={12}>
              <span style={s.error}>Phone number must be 10-digit long</span>
            </Grid>
          )}
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={props.onConfirm} color="primary">
        Submit
      </Button>
    </DialogActions>
  </Dialog>
)

NewContactDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  submissionInitiated: PropTypes.bool.isRequired,
  onPhoneChange: PropTypes.func.isRequired,
  onFnameChange: PropTypes.func.isRequired,
  onLnameChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default NewContactDialog
