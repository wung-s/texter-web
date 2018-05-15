import PropTypes from "prop-types"
import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Fade from "@material-ui/core/Fade"
import red from "@material-ui/core/colors/red"

import Loading from "./Loading"

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  error: {
    color: red[500],
  },
})

const loginObj = {
  userName: "",
  password: "",
}
const onUserNameChange = event => {
  loginObj.userName = event.target.value
}

const onPwChange = event => {
  loginObj.password = event.target.value
}

const Home = ({ classes, ...props }) => (
  <Grid container spacing={8} className={classes.root}>
    <Grid item xs={12}>
      <Grid container alignItems="center" direction="column" justify="center">
        <Grid item xs={12}>
          <h3 style={{ marginBottom: 30 }}>Welcome to Text Campaign</h3>
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={12}>
      <Grid container alignItems="center" direction="column" justify="center">
        <form>
          <Grid item xs={12}>
            <TextField
              label="User name"
              placeholder="User name"
              margin="normal"
              onChange={onUserNameChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              placeholder="password"
              margin="normal"
              type="password"
              onChange={onPwChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="raised" color="primary" onClick={() => props.onSignIn(loginObj)}>
              Sign In
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>

    <Grid item xs={12}>
      {props.loading && <Loading />}
    </Grid>

    <Fade in={props.showError}>
      <Grid item xs={12}>
        <Grid container alignItems="center" direction="column" justify="center">
          <Grid item xs={12}>
            <span className={classes.error}> Login Credentials Incorrect, please try again </span>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  </Grid>
)

Home.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  onSignIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showError: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Home)
