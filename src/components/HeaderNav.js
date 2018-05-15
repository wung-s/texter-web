import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"

const HeaderNav = ({ title, to, onClick }) => (
  <Link to={to} style={{ textDecoration: "none", color: "white" }}>
    <Button onClick={onClick}>{title}</Button>
  </Link>
)

HeaderNav.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
}

export default HeaderNav
