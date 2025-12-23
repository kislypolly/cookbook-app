import { useAuth } from '../hooks/useAuth'
import { useGetRecipesQuery } from '../store/api'

const ProfilePage = () => {
  const { user, signOut } = useAuth()
  const { data: recipes = [] } = useGetRecipesQuery()

  const myRecipes = recipes.filter(recipe => recipe.author === user?.email)

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">👩‍🍳</div>
        <div className="profile-info">
          <h1 className="profile-name">{user?.email || 'Гость'}</h1>
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-number">{myRecipes.length}</div>
              <div className="stat-label">Рецептов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{recipes.length}</div>
              <div className="stat-label">Всего рецептов</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Мои рецепты</h2>
        {myRecipes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-emoji">🍳</div>
            <div className="empty-title">Пока нет рецептов</div>
            <a href="/create" className="btn-primary">Создать первый рецепт</a>
          </div>
        ) : (
          <div className="recipes-grid">
            {myRecipes.map((recipe) => (
              <a key={recipe.id} href={`/recipe/${recipe.id}`} className="recipe-card">
                <div className="recipe-image">🍲</div>
                <div className="recipe-content">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <div className="recipe-meta">
                    <span>⏱ {recipe.prep_time || '30 мин'}</span>
                    <span>👥 {recipe.servings || 2}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="profile-actions">
        <button onClick={signOut} className="btn-secondary full-width">
          Выйти
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
