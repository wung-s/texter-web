import React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import ConversationContainer from "./containers/ConversationContainer"
import HomeContainer from "./containers/HomeContainer"
import { isLoggedIn } from "./helpers/Auth"
import ContactsContainer from "./containers/ContactsContainer"
import GroupsContainer from "./containers/GroupsContainer"

const App = () => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        render={() => (isLoggedIn() ? <Redirect to="/conversations" /> : <HomeContainer />)}
      />
      <Route
        exact
        path="/conversations"
        render={() => (isLoggedIn() ? <ConversationContainer /> : <Redirect to="/" />)}
      />

      <Route
        exact
        path="/contacts"
        render={() => (isLoggedIn() ? <ContactsContainer /> : <Redirect to="/" />)}
      />

      <Route
        exact
        path="/groups"
        render={() => (isLoggedIn() ? <GroupsContainer /> : <Redirect to="/" />)}
      />
    </div>
  </Router>
)

export default App
