import React from 'react'
import { Component } from 'react'

import axios from 'axios'

class App extends Component {
  state = {
    name: '',
    ingredients: '',
    instructions: '',
    recipes: [],
  }
  render = () => {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

export default App;
