import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import ConversationContainer from "./containers/ConversationContainer"
import HomeContainer from "./containers/HomeContainer"

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/conversations" component={ConversationContainer} />
    </div>
  </Router>
)

export default App
