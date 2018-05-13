import React from "react"
import PropTypes from "prop-types"
import Button from "material-ui/Button"
import Grid from "material-ui/Grid"
import TextField from "material-ui/TextField"
import Dialog, { DialogActions, DialogContent, DialogTitle } from "material-ui/Dialog"
import red from "material-ui/colors/red"
import Typography from "material-ui/Typography"

import AppConst from "../config/AppConst"

const s = {
  error: {
    color: red[500],
    fontSize: 12,
  },
}

const NewMessageDialog = ({
  visible,
  onCancel,
  phoneNo,
  msg,
  submissionInitiated,
  onPhoneNoChange,
  onMessageChange,
  onNewMessageSend,
}) => (
  <Dialog open={visible} aria-labelledby="form-dialog-title" fullWidth>
    <DialogTitle id="form-dialog-title">New Message</DialogTitle>
    <DialogContent>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            label="Phone No"
            type="number"
            value={phoneNo}
            onChange={onPhoneNoChange}
          />
        </Grid>
        {submissionInitiated &&
          phoneNo.length !== AppConst.phoneNoLength && (
            <Grid item xs={12}>
              <span style={s.error}> Phone No invalid </span>
            </Grid>
          )}
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            value={msg}
            onChange={onMessageChange}
            multiline
            rows={3}
          />
        </Grid>
        {submissionInitiated &&
          (msg.length > AppConst.msgLength || msg.length === 0) && (
            <Grid item xs={12}>
              <span style={s.error}> Too long </span>
            </Grid>
          )}
      </Grid>

      <Typography variant="caption">{`${msg.length}/${AppConst.msgLength}`}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onNewMessageSend} color="primary">
        Send
      </Button>
    </DialogActions>
  </Dialog>
)

NewMessageDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  phoneNo: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  submissionInitiated: PropTypes.bool.isRequired,
  onPhoneNoChange: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  onNewMessageSend: PropTypes.func.isRequired,
}

export default NewMessageDialog
