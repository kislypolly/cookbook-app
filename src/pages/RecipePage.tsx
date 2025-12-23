return (
  <div className="recipe-page">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-6">
      <Link to="/" className="back-link">
        ← На главную
      </Link>

      {user?.id === recipe.user_id && (
        <div className="flex gap-3 ml-auto">
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
                  <div className="time-progress-bar" />
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
