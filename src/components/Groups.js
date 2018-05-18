import React, { Fragment } from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import grey from "@material-ui/core/colors/grey"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import NewGroupDialog from "./NewGroupDialog"
import ContactListDialog from "./ContactListDialog"
import Content from "./Content"
import { pPaginator } from "../helpers/Proptypes"

const s = {
  flow: { overflowY: "auto" },
  active: { backgroundColor: grey[300] },
}

const Groups = props => (
  <Content>
    <Grid container>
      <Grid item xs={12}>
        <Button color="secondary" variant="raised" onClick={props.onNewGrpClick}>
          + Add New Group
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={8}>
          <Grid item sm={4} style={{ ...s.flow, height: props.winHeight - 120 }}>
            <List>
              {Object.keys(props.groupsByID).map(id => (
                <ListItem
                  key={id}
                  button
                  divider
                  onClick={() => props.onGrpClick(id)}
                  style={props.activeGrpID === id ? s.active : null}
                >
                  <ListItemText primary={props.groupsByID[id].name} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item sm={8}>
            <Grid container>
              <Grid item xs={12}>
                {props.activeGrpID && (
                  <Fragment>
                    <Typography variant="title">Name</Typography>
                    <Typography variant="body1">
                      {props.activeGrpID && props.groupsByID[props.activeGrpID].name}
                    </Typography>

                    <Typography variant="title">Description</Typography>
                    <Typography variant="body1">
                      {props.activeGrpID && props.groupsByID[props.activeGrpID].description}
                    </Typography>
                  </Fragment>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button color="primary" variant="outlined" onClick={props.onAddContactsClick}>
                  Add Contacts
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Phone No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(props.grpContactsByID).map(id => (
                      <TableRow key={id}>
                        <TableCell>{props.grpContactsByID[id].firstName}</TableCell>
                        <TableCell>{props.grpContactsByID[id].lastName}</TableCell>
                        <TableCell>{props.grpContactsByID[id].phoneNo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  page={props.contactPagination.page - 1}
                  count={props.contactPagination.totalContacts}
                  rowsPerPage={props.contactPagination.perPage}
                  rowsPerPageOptions={[10, 20, 30]}
                  backIconButtonProps={{
                    "aria-label": "Previous",
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next",
                  }}
                  onChangePage={props.onContactsExistingChangePage}
                  onChangeRowsPerPage={props.onContactsExistingRowsPerPageChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <NewGroupDialog
        submissionInitiated={props.submissionInitiated}
        name={props.newGrpName}
        visible={props.showNewGrp}
        onGrpDescChange={props.onGrpDescChange}
        onGrpNameChange={props.onGrpNameChange}
        onCancel={props.onNewGrpCancel}
        onConfirm={props.onNewGrpSubmit}
      />

      <ContactListDialog
        visible={props.showAddContactDialog}
        addableContactsByID={props.addableContactsByID}
        onAddContactsCancel={props.onAddContactsCancel}
        onAddContactsConfirm={props.onAddContactsConfirm}
        selectedContacts={props.selectedContacts}
        pagination={{ ...props.contactDialogPagination }}
        onContactsDialogChangePage={props.onContactsDialogChangePage}
        onNewGrpContactChange={props.onNewGrpContactChange}
        onContactsDialogRowsPerPageChange={props.onContactsDialogRowsPerPageChange}
      />
    </Grid>
  </Content>
)

Groups.propTypes = {
  showAddContactDialog: PropTypes.bool.isRequired,
  submissionInitiated: PropTypes.bool.isRequired,
  groupsByID: PropTypes.objectOf(PropTypes.object).isRequired,
  activeGrpID: PropTypes.string.isRequired,
  newGrpName: PropTypes.string.isRequired,
  showNewGrp: PropTypes.bool.isRequired,
  grpContactsByID: PropTypes.objectOf(PropTypes.object).isRequired,
  selectedContacts: PropTypes.arrayOf(PropTypes.string).isRequired,
  addableContactsByID: PropTypes.objectOf(PropTypes.object).isRequired,
  contactDialogPagination: pPaginator.isRequired,
  winHeight: PropTypes.number.isRequired,
  contactPagination: pPaginator.isRequired,
  onAddContactsCancel: PropTypes.func.isRequired,
  onAddContactsConfirm: PropTypes.func.isRequired,
  onContactsDialogChangePage: PropTypes.func.isRequired,
  onNewGrpContactChange: PropTypes.func.isRequired,
  onGrpDescChange: PropTypes.func.isRequired,
  onGrpNameChange: PropTypes.func.isRequired,
  onNewGrpCancel: PropTypes.func.isRequired,
  onNewGrpSubmit: PropTypes.func.isRequired,
  onNewGrpClick: PropTypes.func.isRequired,
  onAddContactsClick: PropTypes.func.isRequired,
  onContactsExistingChangePage: PropTypes.func.isRequired,
  onContactsExistingRowsPerPageChange: PropTypes.func.isRequired,
  onContactsDialogRowsPerPageChange: PropTypes.func.isRequired,
}

export default Groups
