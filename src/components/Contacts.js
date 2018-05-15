import React, { Fragment } from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import Grid from "@material-ui/core/Grid"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import grey from "@material-ui/core/colors/grey"

import NewContactDialog from "./NewContactDialog"
import Content from "./Content"

const s = {
  flow: { overflowY: "auto" },
  active: { backgroundColor: grey[300] },
}

const Contacts = props => (
  <Content>
    <Grid container>
      <Grid item xs={12}>
        <Button color="secondary" variant="raised" onClick={props.onNewCttClick}>
          + Add New Contact
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={8}>
          <Grid item sm={4} style={{ ...s.flow, height: props.winHeight - 120 }}>
            <List>
              {Object.keys(props.contactsByID).map(id => (
                <ListItem
                  key={id}
                  button
                  divider
                  onClick={() => props.onCttClick(id)}
                  style={props.activeCttID === id ? s.active : null}
                >
                  <ListItemText
                    primary={props.contactsByID[id].firstName}
                    secondary={props.contactsByID[id].phoneNo}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item sm={8}>
            {props.activeCttID && (
              <Fragment>
                <Typography variant="title">First Name</Typography>
                <Typography variant="body1">
                  {props.activeCttID && props.contactsByID[props.activeCttID].firstName}
                </Typography>

                <Typography variant="title">Last Name</Typography>
                <Typography variant="body1">
                  {props.activeCttID && props.contactsByID[props.activeCttID].lastName}
                </Typography>

                <Typography variant="title">Phone No</Typography>
                <Typography variant="body1">
                  {props.activeCttID && props.contactsByID[props.activeCttID].phoneNo}
                </Typography>
              </Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>

      <NewContactDialog
        submissionInitiated={props.submissionInitiated}
        phone={props.newCttPhone}
        visible={props.showNewCtt}
        onPhoneChange={props.onCttPhoneChange}
        onLnameChange={props.onCttLnameChange}
        onFnameChange={props.onCttFnameChange}
        onCancel={props.onNewCttCancel}
        onConfirm={props.onNewCttSubmit}
      />
    </Grid>
  </Content>
)

Contacts.propTypes = {
  submissionInitiated: PropTypes.bool.isRequired,
  contactsByID: PropTypes.objectOf(PropTypes.object).isRequired,
  activeCttID: PropTypes.string.isRequired,
  newCttPhone: PropTypes.string.isRequired,
  showNewCtt: PropTypes.bool.isRequired,
  onCttPhoneChange: PropTypes.func.isRequired,
  onCttLnameChange: PropTypes.func.isRequired,
  onCttFnameChange: PropTypes.func.isRequired,
  onNewCttCancel: PropTypes.func.isRequired,
  onNewCttSubmit: PropTypes.func.isRequired,
  onNewCttClick: PropTypes.func.isRequired,
  winHeight: PropTypes.number.isRequired,
}

export default Contacts
