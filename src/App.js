import React from 'react'
import { Component } from 'react'
import './App.css';

import axios from 'axios'

class App extends Component {
  state = {
    name: '',
    ingredients: '',
    instructions: '',
    image_url: '',
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
        image_url: '',
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
             <h1> HomeMade </h1>
              <div>
                <h3>Create New Recipe</h3>
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
                  <br />
                  <label htmlFor="name">Image</label>
                  <input placeholder="url" type="text" id="image" onChange={this.handleChange} value={this.state.image_url} />
                  <br />
                  <label htmlFor="ingredients">Ingredients</label>
                  <input type="text" id="ingredients" onChange={this.handleChange} value={this.state.ingredients}/>
                  <br />
                  <label htmlFor="ingredients">Instructions</label>
                  <input type="text" id="instructions" onChange={this.handleChange} value={this.state.instructions}/>
                  <br />
                  <input type="submit" value="Create Recipe" />
                </form>
              </div>
              <div className="recipe" key={recipe.id}>
                <h3>Name: {recipe.name}</h3>
                <p>{recipe.image_url}</p>
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
                    <label htmlFor="name">Image</label>
                    <input type="url" id="image" onChange={this.handleChange} value={this.state.image_url} />
                    <br />
                    <label htmlFor="Ingredients">Ingredients</label>
                    <input type="text" id="ingredients" onChange={this.handleChange}/>
                    <br />
                    <label htmlFor="Instructions">Instructions</label>
                    <input type="text" id="instructions" onChange={this.handleChange}/>
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
