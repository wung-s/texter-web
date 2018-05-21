import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"

const s = {
  link: {
    textDecoration: "none",
  },
  btn: {
    color: "white",
  },
}

const HeaderNav = ({ title, to, onClick }) => (
  <Link to={to} style={s.link}>
    <Button onClick={onClick} style={s.btn}>
      {title}
    </Button>
  </Link>
)

HeaderNav.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
}

HeaderNav.defaultProps = {
  onClick: () => ({}),
}

export default HeaderNav
