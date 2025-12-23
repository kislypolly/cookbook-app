import { useParams, Link } from 'react-router-dom'
import { useGetRecipeByIdQuery, useDeleteRecipeMutation } from '../store/api'
import { useAuth } from '../hooks/useAuth'

const RecipePage = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-2xl">
          <div className="text-6xl mb-6">🍳</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Неверный URL</h2>
          <p className="text-gray-600 mb-8">ID рецепта отсутствует</p>
          <Link to="/" className="bg-orange-600 text-white px-8 py-3 rounded-2xl hover:bg-orange-700 transition-all">
            ← Все рецепты
          </Link>
        </div>
      </div>
    )
  }

  const { user } = useAuth()
  const { data: recipe, isLoading, error, isError } = useGetRecipeByIdQuery(id, {
    skip: !id
  })
  const [deleteRecipe] = useDeleteRecipeMutation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (isError || error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-2xl">
          <div className="text-6xl mb-6">🍳</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Рецепт не найден</h2>
          <p className="text-gray-600 mb-8">Проверьте правильность ссылки</p>
          <Link to="/" className="bg-orange-600 text-white px-8 py-3 rounded-2xl hover:bg-orange-700 transition-all">
            ← Все рецепты
          </Link>
        </div>
      </div>
    )
  }

  const handleDelete = async () => {
    if (confirm('Удалить рецепт навсегда?')) {
      try {
        await deleteRecipe(recipe.id).unwrap()
        alert('Рецепт удален!')
        window.location.href = '/'
      } catch (error) {
        alert('Ошибка удаления: ' + error)
      }
    }
  }

  return (
    <div className="recipe-page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-6">
        <Link to="/" className="back-link">
          ← На главную
        </Link>

        {user?.id === recipe.user_id && (
          <div className="flex gap-6 ml-auto">
            <Link 
              to={`/edit/${recipe.id}`}
              className="action-btn btn-edit"
            >
              ✏️ Изменить рецепт
            </Link>
            <button 
              onClick={handleDelete}
              className="action-btn btn-delete"
            >
              🗑️ Удалить
            </button>
          </div>
        )}
      </div>

      <div className="recipe-container">
        <div className="recipe-hero">
          <div className="recipe-hero-content">
            <span className="recipe-hero-emoji">🍲</span>
          </div>
        </div>
        
        <div className="recipe-header">
          <div className="recipe-tags">
            <span className="recipe-tag">{recipe.category?.toUpperCase()}</span>
            <span className="recipe-tag">{recipe.difficulty?.toUpperCase()}</span>
          </div>

          <h1 className="recipe-title">{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>
        </div>

        <div className="recipe-content">
          <div className="recipe-grid">
            <div className="ingredients-section">
              <h3 className="ingredients-title">
                Ингредиенты ({recipe.servings} порций)
              </h3>
              <div className="ingredients-list">
                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="ingredient-number">{index + 1}</span>
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="recipe-info">
              <div className="info-card time-card">
                <h4 className="info-title">⏱️ Время</h4>
                <div className="info-grid">
                  <div className="info-row">
                    <span className="info-label">Подготовка:</span>
                    <span className="info-value">{recipe.prep_time}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Готовка:</span>
                    <span className="info-value">{recipe.cook_time}</span>
                  </div>
                  <div className="time-progress">
                    <div className="time-progress-bar"></div>
                  </div>
                </div>
              </div>

              <div className="info-card servings-card">
                <h4 className="info-title">👥 Порции</h4>
                <div className="text-4xl font-bold text-purple-600">{recipe.servings}</div>
              </div>
            </div>
          </div>

          <div className="steps-section">
            <h3 className="steps-title">Инструкции</h3>
            <div className="steps-list">
              {recipe.instructions?.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <p className="step-text">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipePage
