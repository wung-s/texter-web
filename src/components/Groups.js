import React, { Fragment } from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import grey from "@material-ui/core/colors/grey"

import NewGroupDialog from "./NewGroupDialog"
import Content from "./Content"

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
    </Grid>
  </Content>
)

Groups.propTypes = {
  submissionInitiated: PropTypes.bool.isRequired,
  groupsByID: PropTypes.objectOf(PropTypes.object).isRequired,
  activeGrpID: PropTypes.string.isRequired,
  newGrpName: PropTypes.string.isRequired,
  showNewGrp: PropTypes.bool.isRequired,
  onGrpDescChange: PropTypes.func.isRequired,
  onGrpNameChange: PropTypes.func.isRequired,
  onNewGrpCancel: PropTypes.func.isRequired,
  onNewGrpSubmit: PropTypes.func.isRequired,
  onNewGrpClick: PropTypes.func.isRequired,
  winHeight: PropTypes.number.isRequired,
}

export default Groups
