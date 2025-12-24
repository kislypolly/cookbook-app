import { Link } from 'react-router-dom'
import { useGetFavoritesQuery } from '../store/api'
import { useAuth } from '../hooks/useAuth'

const FavoritesPage = () => {
  const { user } = useAuth()
  const { data: recipes, isLoading, isError } = useGetFavoritesQuery(undefined, {
    skip: !user,
  })

  if (!user) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-emoji">⭐</div>
          <h2 className="empty-title">Войдите, чтобы увидеть избранное</h2>
          <p className="empty-subtitle">
            Избранные рецепты привязаны к вашему аккаунту.
          </p>
          <Link to="/auth" className="btn-primary">
            Войти
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="loader">
        <div className="spinner" />
        <p>Загружаем избранные рецепты...</p>
      </div>
    )
  }

  if (isError || !recipes) {
    return (
      <div className="empty-state">
        <div className="empty-emoji">⚠️</div>
        <h2 className="empty-title">Ошибка загрузки избранного</h2>
      </div>
    )
  }

  if (!recipes.length) {
    return (
      <div className="empty-state">
        <div className="empty-emoji">☆</div>
        <h2 className="empty-title">Пока нет избранных рецептов</h2>
        <p className="empty-subtitle">
          Нажимайте на звёздочку на страничке рецепта, чтобы добавить его сюда.
        </p>
        <Link to="/" className="btn-primary">
          На главную
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero-title">Избранные рецепты</h1>
        <p className="hero-subtitle">
          Все рецепты, которые вы отметили звёздочкой.
        </p>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="recipe-card"
          >
            <div className="recipe-image">⭐</div>
            <div className="recipe-content">
              <h3 className="recipe-title">{recipe.title}</h3>
              {recipe.description && (
                <p className="recipe-description">{recipe.description}</p>
              )}
              <div className="recipe-meta">
                <span>{recipe.category}</span>
                <span>{recipe.cook_time}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
