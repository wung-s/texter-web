import React from "react"
import PropTypes from "prop-types"
import { Grid } from "material-ui"

const Content = props => (
  <Grid container style={{ padding: "5px 10px" }}>
    <Grid item xs={12}>
      {props.children}
    </Grid>
  </Grid>
)

Content.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Content
