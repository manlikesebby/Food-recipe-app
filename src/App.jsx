import "./App.css";
import { useState, useEffect } from "react";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?app_id=68977f43&app_key=f8509a6837022bb488d8596613feed7d&type=any&q=${query}`
      );

      const data = await response.json();
      console.log(data.hits);

      if (data.hits.length > 0) {
        setRecipes(data.hits);
        setLoading(false);
        setError("")
      } else {
        setRecipes([]);
        setError("Nothing found");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Our Food Recipe App</h2>

      {error != "" ? <p>{error}</p> : ""}
      <form autoComplete="off" onSubmit={fetchRecipe}>
        <input
          className="form-control"
          placeholder="Search Recipe"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input type="submit" className="btn" value="Search" />
      </form>

      <div className="recipes">
        {loading
          ? "Loading..."
          : recipes.map((data) => {
              const { recipe } = data;

              return (
                <RecipeCard
                  foodName={recipe.label}
                  foodCategory={recipe.dishType[0]}
                  foodImage={recipe.image}
                  instructions={recipe.url}
                />
              );
            })}
      </div>
    </div>
  );
}

export default App;
