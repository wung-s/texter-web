import React from "react"
import PropTypes from "prop-types"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Paper from "@material-ui/core/Paper"

const Footer = ({ mailboxes }) => (
  <Paper>
    <Tabs indicatorColor="primary" textColor="primary" centered value={1}>
      {mailboxes.map(mailbox => <Tab key={mailbox} label={mailbox} />)}
    </Tabs>
  </Paper>
)

Footer.propTypes = {
  mailboxes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Footer
