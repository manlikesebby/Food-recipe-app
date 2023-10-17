const RecipeCard = ({foodName, foodCategory, foodImage, instructions}) =>{
    

    return (
        <div className="card">
        <img className="card-image" src={foodImage} />
        <div className="card-body">
          <span className="category">{foodCategory}</span>
          <h3>{foodName}</h3>
          <a href={instructions} target="_blank">
            Instructions
          </a>
        </div>
      </div>

    )
}
export default RecipeCard;