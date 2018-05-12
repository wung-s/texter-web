import React from "react"
import PropTypes from "prop-types"
import { Paper, Tabs } from "material-ui"
import { Tab } from "material-ui/Tabs"

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
