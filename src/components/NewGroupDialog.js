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

const s = {
  error: {
    color: red[500],
    fontSize: 12,
  },
}

const NewGroupDialog = props => (
  <Dialog open={props.visible} aria-labelledby="form-dialog-title" fullWidth>
    <DialogTitle id="form-dialog-title">New Group</DialogTitle>
    <DialogContent>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={props.name}
            onChange={props.onGrpNameChange}
          />
        </Grid>
        {props.submissionInitiated &&
          props.name.trim().length === 0 && (
            <Grid item xs={12}>
              <span style={s.error}> Name cannot be blank </span>
            </Grid>
          )}
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            onChange={props.onGrpDescChange}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={props.onConfirm} color="primary" disabled={props.name.trim().length < 0}>
        Send
      </Button>
    </DialogActions>
  </Dialog>
)

NewGroupDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  submissionInitiated: PropTypes.bool.isRequired,
  onGrpNameChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onGrpDescChange: PropTypes.func.isRequired,
}

export default NewGroupDialog
