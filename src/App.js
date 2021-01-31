import React from 'react'
import { Component } from 'react'
import './App.css';

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
  deleteRecipe = (event) => {
    axios.delete('/recipes/' + event.target.value).then((response) => {this.getRecipes()})
  }
  updateRecipe = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/recipes/' + id, this.state).then((response) => {
      this.getRecipes()
      this.setState({
        name: '',
        ingredients: '',
        instructions: '',
      })
    })
  }
  componentDidMount = () => {
    this.getRecipes()
  }
  render = () => {
    const output = (
      <div className="recipes">
        {this.state.recipes.map((recipe) => {
          return (
            <div>
              <div className="recipe">
                <h3>Name: {recipe.name}</h3>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Instructions: {recipe.instructions}</p>
              </div>
              <div>
                <h3>Create New Recipe</h3>
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
                  <br />
                  <label htmlFor="ingredients">Ingredients</label>
                  <input type="text" id="ingredients" onChange={this.handleChange} value={this.state.ingredients}/>
                  <br />
                  <input type="text" id="instructions" onChange={this.handleChange} value={this.state.instructions}/>
                  <br />
                  <input type="submit" value="Create Recipe" />
                </form>
              </div>
              <div className="recipe" key={recipe.id}>
                <h3>Name: {recipe.name}</h3>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Instructions: {recipe.instructions}</p>
                <button value={recipe.id} onClick={this.deleteRecipe}>Delete</button>
              </div>
              <div>
                <details>
                  <summary>Edit Recipe</summary>
                  <form id={recipe.id} onSubmit={this.updateRecipe}>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input type="text" id="ingredients" onChange={this.handleChange}/>
                    <label htmlFor="Ingredients">Ingredients</label>
                    <br />
                    <input type="text" id="instructions" onChange={this.handleChange}/>
                    <label htmlFor="Instructions">Instructions</label>
                    <br />
                    <input type="submit" value="Update Recipe" />
                  </form>
                </details>
              </div>
            </div>
          )
        })}
      </div>
    );
    return output
  }
}

export default App;
