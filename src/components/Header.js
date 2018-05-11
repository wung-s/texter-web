import React from "react"
import PropTypes from "prop-types"
import { AppBar, Toolbar, Typography } from "material-ui"
import { withRouter } from "react-router-dom"
import Button from "material-ui/Button"
import { logout } from "../helpers/Auth"

const signout = history => {
  history.push("/")
  logout()
}

const Header = ({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        RallyCHQ
      </Typography>
      <Button color="inherit" onClick={() => signout(history)}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

export default withRouter(Header)
