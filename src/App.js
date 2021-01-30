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
  getRecipes = () => {
    axios.get('/recipes')
    .then((response) => this.setState({recipes: response.data}),
    (err) => console.error(err))
    .catch((error) => console.error(error))
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/recipes', this.state).then((response) => {this.getRecipes()})
  }
  componentDidMount = () => {
    this.getRecipes()
  }
  
  render = () => {
    const output = (
      <div className="recipes">
        {this.state.recipes.map((recipe) => {
          return (
            <div className="recipe">
              <h3>Name: {recipe.name}</h3>
              <p>Ingredients: {recipe.ingredients}</p>
              <p>Instructions: {recipe.instructions}</p>
            </div>
          )
        })}
      </div>
    );
    return output
  }
}

export default App;
