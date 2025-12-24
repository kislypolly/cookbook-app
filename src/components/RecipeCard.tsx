import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteRecipe } from '../store/recipeSlice'
import type { RootState, AppDispatch } from '../store'
import type { Recipe } from '../types/recipe'

interface Props {
  recipe: Recipe
}

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const isOwner = user?.id === recipe.user_id

  const handleDelete = () => {
    dispatch(deleteRecipe(recipe.id))
  }

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{recipe.ingredients.slice(0, 3).join(', ')}...</p>
      {isOwner && (
        <div className="card-actions">
          <Link to={`/edit/${recipe.id}`}>✏️ Изменить</Link>
          <button type="button" onClick={handleDelete}>🗑️ Удалить</button>
        </div>
      )}
    </div>
  )
}
