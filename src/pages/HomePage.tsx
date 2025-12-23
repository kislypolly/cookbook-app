import { Link } from 'react-router-dom'
import { useGetRecipesQuery } from '../store/api'

const HomePage = () => {
  const { data: recipes = [], isLoading, error } = useGetRecipesQuery()

  if (isLoading) {
    return (
      <div className="loader-wrap">
        <div style={{ textAlign: 'center' }}>
          <div className="loader-circle" />
          <p>Ищем вкусные рецепты...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="loader-wrap">
        <div style={{ background: '#fff', padding: 24, borderRadius: 20, maxWidth: 420 }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Ошибка загрузки</h2>
          <pre style={{ fontSize: 12, color: '#b91c1c', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">ВАШ КУЛИНАРНЫЙ ДНЕВНИК</div>
        <h1 className="hero-title">
          Делитесь рецептами с друзьями
          <br />и находите вдохновение
        </h1>
        <p className="hero-sub">
          Храните свои любимые блюда и создавайте коллекцию домашних шедевров.
        </p>
        <div className="hero-buttons">
          <Link to="/create" className="btn-primary">
            🍳 Создать рецепт
          </Link>
          <Link to="/auth" className="btn-ghost">
            Присоединиться
          </Link>
        </div>
      </section>

      {/* Статистика */}
      <section className="stats">
        <div className="stat-card">
          <div className="stat-emoji">📚</div>
          <div className="stat-value">{recipes.length}</div>
          <div className="stat-label">Рецептов</div>
        </div>
        <div className="stat-card">
          <div className="stat-emoji">⚡</div>
          <div className="stat-value">5 мин</div>
          <div className="stat-label">Создание рецепта</div>
        </div>
        <div className="stat-card">
          <div className="stat-emoji">👩‍🍳</div>
          <div className="stat-value">1000+</div>
          <div className="stat-label">Поваров</div>
        </div>
      </section>

      {/* Рецепты / пусто */}
      {recipes.length === 0 ? (
        <section className="empty">
          <div className="empty-emoji">🍽️</div>
          <div className="empty-title">Пока пусто</div>
          <p className="empty-text">Будьте первым, кто добавит свой фирменный рецепт.</p>
          <Link to="/create" className="btn-primary">
            🥄 Первый рецепт
          </Link>
        </section>
      ) : (
        <section>
          <div style={{ marginBottom: 16, fontWeight: 800, fontSize: 22 }}>
            Последние рецепты
          </div>
          <div className="recipes-grid">
            {recipes.map((recipe: any) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="recipe-card"
              >
                <div className="recipe-image">🍲</div>
                <div className="recipe-title">{recipe.title}</div>
                <div className="recipe-desc">
                  {recipe.description || 'Вкусное домашнее блюдо.'}
                </div>
                <div className="recipe-tags">
                  <span className="recipe-tag-pill">
                    {recipe.category || 'Без категории'}
                  </span>
                  <span>⏱ {recipe.prep_time || '30 мин'}</span>
                  <span>👥 {recipe.servings || 2} порц.</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default HomePage
