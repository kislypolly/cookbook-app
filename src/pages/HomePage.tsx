import { Link } from 'react-router-dom'
import { useGetRecipesQuery } from '../store/api'

const HomePage = () => {
  const { data: recipes = [], isLoading } = useGetRecipesQuery()

  if (isLoading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <div>Загружаем рецепты...</div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Cookbook</h1>
        <p className="hero-subtitle">
          Сохраняйте любимые рецепты, делитесь с друзьями и находите вдохновение в кулинарии
        </p>
        <div className="hero-buttons">
          <Link to="/create" className="btn-primary">
            + Новый рецепт
          </Link>
          <Link to="/auth" className="btn-secondary">
            Войти
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <div className="stat-number">{recipes.length}</div>
          <div className="stat-label">Рецептов</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5 мин</div>
          <div className="stat-label">Создание рецепта</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Пользователей</div>
        </div>
      </section>

      {/* Recipes or Empty */}
      {recipes.length === 0 ? (
        <section className="empty-state">
          <div className="empty-emoji">🍳</div>
          <h2 className="empty-title">Начните с первого рецепта</h2>
          <p className="empty-subtitle">Добавьте свой любимый рецепт и создайте свою кулинарную коллекцию</p>
          <Link to="/create" className="btn-primary">Создать первый рецепт</Link>
        </section>
      ) : (
        <>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px' }}>
            Последние рецепты
          </h2>
          <div className="recipes-grid">
            {recipes.map((recipe: any) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card">
                <div className="recipe-image">🍲</div>
                <div className="recipe-content">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-description">
                    {recipe.description || 'Вкусный домашний рецепт'}
                  </p>
                  <div className="recipe-meta">
                    <span>⏱ {recipe.prep_time || '30 мин'}</span>
                    <span>👥 {recipe.servings || 2} порц.</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default HomePage
