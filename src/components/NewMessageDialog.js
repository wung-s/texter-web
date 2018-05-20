import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import red from "@material-ui/core/colors/red"
import Typography from "@material-ui/core/Typography"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import Radio from "@material-ui/core/Radio"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

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
  selectedGrpID,
  groupsByID,
  recipient,
  submissionInitiated,
  onPhoneNoChange,
  onMessageChange,
  onNewMessageSend,
  onRecipientChange,
  onGroupSelect,
}) => (
  <Dialog open={visible} aria-labelledby="form-dialog-title" fullWidth>
    <DialogTitle id="form-dialog-title">New Message</DialogTitle>
    <DialogContent>
      <Grid container>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Radio
                  checked={recipient === "individual"}
                  onChange={onRecipientChange}
                  value="individual"
                  name="radio-button-recipient"
                  aria-label="A"
                />
              }
              label="Individual"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={recipient === "group"}
                  onChange={onRecipientChange}
                  value="group"
                  name="radio-button-recipient"
                  aria-label="A"
                />
              }
              label="Group"
            />
          </FormGroup>
        </Grid>
        {recipient === "individual" && (
          <Fragment>
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
          </Fragment>
        )}

        <Grid item xs={12}>
          {recipient === "group" && (
            <Fragment>
              <FormControl>
                <InputLabel htmlFor="age-simple">Group</InputLabel>
                <Select autoWidth value={selectedGrpID} onChange={onGroupSelect}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(groupsByID).map(id => (
                    <MenuItem key={id} value={id}>
                      {groupsByID[id].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {submissionInitiated &&
                selectedGrpID === "" && (
                  <Grid item xs={12}>
                    <span style={s.error}> Must select a group </span>
                  </Grid>
                )}
            </Fragment>
          )}
        </Grid>
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
              <span style={s.error}>{msg.length === 0 ? "Cannot be empty" : "Too long"}</span>
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
  recipient: PropTypes.string.isRequired,
  selectedGrpID: PropTypes.string.isRequired,
  groupsByID: PropTypes.objectOf(PropTypes.object).isRequired,
  submissionInitiated: PropTypes.bool.isRequired,
  onPhoneNoChange: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  onNewMessageSend: PropTypes.func.isRequired,
  onRecipientChange: PropTypes.func.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
}

export default NewMessageDialog
