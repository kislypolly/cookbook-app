import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipe } from '../features/recipes/recipesSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../store';

interface Props {
  recipe: Recipe;
}

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const isOwner = user?.id === recipe.user_id;

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{recipe.ingredients.slice(0, 3).join(', ')}...</p>
      {isOwner && (
        <div className="card-actions">
          <Link to={`/edit/${recipe.id}`}>✏️ Изменить</Link>
          <button onClick={() => dispatch(deleteRecipe(recipe.id))}>🗑️ Удалить</button>
        </div>
      )}
    </div>
  );
};
