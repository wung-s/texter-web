import React from "react"
import Button from "material-ui/Button"
import logo from "../logo.svg"
import "../App.css"

const Home = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Text Campaign</h1>
      <Button variant="raised" color="secondary">
        Secondary
      </Button>
    </header>
  </div>
)

export default Home
