import { useParams, Link } from 'react-router-dom'
import { useGetRecipeByIdQuery, useDeleteRecipeMutation } from '../store/api'
import { useAuth } from '../hooks/useAuth'

const RecipePage = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <div className="recipe-page">
        <div className="recipe-container">
          <div className="recipe-hero">
            <div className="recipe-hero-content">
              <span className="recipe-hero-emoji">🍳</span>
              <h1 className="recipe-title">Неверный URL</h1>
              <p className="recipe-description-large">ID рецепта отсутствует</p>
              <Link to="/" className="back-link">
                ← Все рецепты
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { user } = useAuth()
  const { data: recipe, isLoading, error, isError } = useGetRecipeByIdQuery(id, {
    skip: !id,
  })
  const [deleteRecipe] = useDeleteRecipeMutation()

  if (isLoading) {
    return (
      <div className="recipe-page">
        <div className="loader">
          <div className="spinner" />
          <p>Загружаем рецепт...</p>
        </div>
      </div>
    )
  }

  if (isError || error || !recipe) {
    return (
      <div className="recipe-page">
        <div className="recipe-container">
          <div className="recipe-hero">
            <div className="recipe-hero-content">
              <span className="recipe-hero-emoji">🍳</span>
              <h1 className="recipe-title">Рецепт не найден</h1>
              <p className="recipe-description-large">
                Проверьте правильность ссылки
              </p>
              <Link to="/" className="back-link">
                ← Все рецепты
              </Link>
            </div>
          </div>
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
      } catch (err) {
        alert('Ошибка удаления: ' + err)
      }
    }
  }

  return (
    <div className="recipe-page">
      <div className="header-buttons">
        <Link to="/" className="back-link">
          ← На главную
        </Link>

        {user?.id === recipe.user_id && (
          <div className="buttons-group">
            <Link
              to={`/recipe/${recipe.id}/edit`}
              className="action-btn btn-edit"
            >
              ✏️ Изменить рецепт
            </Link>
            <button onClick={handleDelete} className="action-btn btn-delete">
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
          {recipe.category && (
            <span className="recipe-category">
              {recipe.category.toUpperCase()}
            </span>
          )}

          <h1 className="recipe-title-main">{recipe.title}</h1>

          {recipe.description && (
            <p className="recipe-description-large">{recipe.description}</p>
          )}
        </div>

        <div className="recipe-content">
          <div className="recipe-extra">
            <section className="ingredients-section">
              <h2 className="ingredients-title">
                Ингредиенты ({recipe.servings} порций)
              </h2>
              <div className="ingredients-list">
                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <div className="ingredient-number">{index + 1}</div>
                    <div>{ingredient}</div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="recipe-info">
              <div className="info-card">
                <h3 className="info-title">Информация</h3>
                <div className="info-grid">
                  <div className="info-row">
                    <span className="info-label">Время готовки</span>
                    <span className="info-value">
                      {recipe.cook_time}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Порции</span>
                    <span className="info-value">{recipe.servings}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section className="steps-section">
            <h2 className="steps-title">Инструкции</h2>
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
          </section>
        </div>
      </div>
    </div>
  )
}

export default RecipePage
