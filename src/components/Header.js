import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
import { logout } from "../helpers/Auth"
import HeaderNav from "./HeaderNav"

const signout = history => {
  history.push("/")
  logout()
}

const s = {
  btn: {
    color: "white",
  },
}

const Header = ({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" style={{ flex: 1 }}>
        RallyCHQ
      </Typography>
      <HeaderNav title={"Conversations"} to={"/conversations"} />
      <HeaderNav title={"Contacts"} to={"/contacts"} />
      <HeaderNav title={"Groups"} to={"/groups"} />
      <Button onClick={() => signout(history)} style={s.btn}>
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
