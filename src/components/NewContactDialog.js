import React from "react"
import PropTypes from "prop-types"
import Button from "material-ui/Button"
import Grid from "material-ui/Grid"
import TextField from "material-ui/TextField"
import Dialog, { DialogActions, DialogContent, DialogTitle } from "material-ui/Dialog"
import red from "material-ui/colors/red"

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
        Send
      </Button>
    </DialogActions>
  </Dialog>
)

NewContactDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  submissionInitiated: PropTypes.bool.isRequired,
  onPhoneChange: PropTypes.func.isRequired,
  onFnameChange: PropTypes.func.isRequired,
  onLnameChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default NewContactDialog
