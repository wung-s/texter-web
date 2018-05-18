import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import Checkbox from "@material-ui/core/Checkbox"
import TableRow from "@material-ui/core/TableRow"

import { pPaginator } from "../helpers/Proptypes"

const ContactListDialog = props => (
  <Grid container>
    <Grid item xs={12}>
      <Dialog open={props.visible} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Contacts</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">Select</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone No</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(props.addableContactsByID).map(id => (
                <TableRow key={id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      // indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={props.selectedContacts.includes(id)}
                      onChange={e => props.onNewGrpContactChange(e, id)}
                    />
                  </TableCell>
                  <TableCell>{props.addableContactsByID[id].firstName}</TableCell>
                  <TableCell>{props.addableContactsByID[id].lastName}</TableCell>
                  <TableCell>{props.addableContactsByID[id].phoneNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            page={props.pagination.page - 1}
            count={props.pagination.totalContacts}
            rowsPerPage={props.pagination.perPage}
            rowsPerPageOptions={[10, 20, 30]}
            backIconButtonProps={{
              "aria-label": "Previous",
            }}
            nextIconButtonProps={{
              "aria-label": "Next",
            }}
            onChangePage={props.onContactsDialogChangePage}
            onChangeRowsPerPage={props.onContactsDialogRowsPerPageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onAddContactsCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onAddContactsConfirm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  </Grid>
)

ContactListDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  pagination: pPaginator.isRequired,
  onContactsDialogRowsPerPageChange: PropTypes.func.isRequired,
  onAddContactsConfirm: PropTypes.func.isRequired,
  onAddContactsCancel: PropTypes.func.isRequired,
  onContactsDialogChangePage: PropTypes.func.isRequired,
  addableContactsByID: PropTypes.objectOf(PropTypes.object).isRequired,
  selectedContacts: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ContactListDialog
