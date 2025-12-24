import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetRecipeByIdQuery, useUpdateRecipeMutation } from '../store/api'
import { useAuth } from '../hooks/useAuth'
import { Recipe } from '../types/recipe'

const EditRecipePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const {
    data: recipe,
    isLoading: isRecipeLoading,
    isError,
    error,
  } = useGetRecipeByIdQuery(id!, {
    skip: !id,
  })

  const [updateRecipe, { isLoading: isSaving }] = useUpdateRecipeMutation()

  const [formData, setFormData] = useState<Omit<Recipe, 'id' | 'created_at'>>({
    title: '',
    description: '',
    ingredients: [] as string[],
    instructions: [] as string[],
    prep_time: '',
    cook_time: '30',
    servings: 2,
    category: '',
    difficulty: 'medium',
  })

  // заполняем форму, когда рецепт загрузился
  useEffect(() => {
    if (!recipe) return

    // защита: если рецепт не текущего пользователя — редирект обратно
    if (user && recipe.user_id && recipe.user_id !== user.id) {
      navigate(`/recipes/${id}`)
      return
    }

    setFormData({
      title: recipe.title,
      description: recipe.description || '',
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      prep_time: recipe.prep_time || '',
      cook_time: recipe.cook_time || '30',
      servings: recipe.servings || 2,
      category: recipe.category || '',
      difficulty: recipe.difficulty || 'medium',
    })
  }, [recipe, user, id, navigate])

  const [newIngredient, setNewIngredient] = useState('')
  const [newInstruction, setNewInstruction] = useState('')

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()],
      }))
      setNewIngredient('')
    }
  }

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setFormData((prev) => ({
        ...prev,
        instructions: [...prev.instructions, newInstruction.trim()],
      }))
      setNewInstruction('')
    }
  }

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateRecipe({ id: id!, ...formData }).unwrap()
      navigate(`/recipes/${id}`)
    } catch (error) {
      alert('Ошибка сохранения рецепта')
    }
  }

  if (isRecipeLoading) {
    return (
      <div className="recipe-page">
        <div className="loader">
          <div className="spinner" />
          <p>Загружаем рецепт...</p>
        </div>
      </div>
    )
  }

  if (isError || !recipe) {
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
              <button
                type="button"
                className="back-link"
                onClick={() => navigate('/')}
              >
                ← Все рецепты
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="create-page edit-page">
      <div className="create-header">
        <h1 className="create-title">Редактировать рецепт</h1>
        <p className="create-subtitle">
          Измените данные и сохраните изменения
        </p>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-section">
          <label className="form-label">Название рецепта</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="form-input"
            placeholder="Например: Борщ по-домашнему"
            required
          />
        </div>

        <div className="form-section">
          <label className="form-label">Описание</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="form-textarea"
            rows={4}
            placeholder="Краткое описание блюда..."
          />
        </div>

        <div className="form-grid">
          <div className="form-section">
            <label className="form-label">Время приготовления</label>
            <input
              type="text"
              value={formData.prep_time}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  prep_time: e.target.value,
                }))
              }
              className="form-input"
              placeholder="30 мин"
            />
          </div>

          <div className="form-section">
            <label className="form-label">Порций</label>
            <input
              type="number"
              value={formData.servings}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  servings: Number(e.target.value),
                }))
              }
              className="form-input"
              min="1"
              max="20"
            />
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Категория</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            className="form-input"
            required
          >
            <option value="">Выберите категорию</option>
            <option value="breakfast">Завтрак</option>
            <option value="lunch">Обед</option>
            <option value="dinner">Ужин</option>
            <option value="dessert">Десерт</option>
            <option value="snack">Закуски</option>
          </select>
        </div>

        <div className="ingredients-section-form">
          <div className="section-header">
            <h3 className="section-title">🥬 Ингредиенты</h3>
            <div className="input-group">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="form-input small"
                placeholder="200г муки..."
              />
              <button
                type="button"
                onClick={addIngredient}
                className="btn-small"
                disabled={!newIngredient.trim()}
              >
                Добавить
              </button>
            </div>
          </div>
          <div className="ingredients-list">
            {formData.ingredients.length === 0 ? (
              <div className="empty-list">Ингредиенты будут здесь</div>
            ) : (
              formData.ingredients.map((ingredient, index) => (
                <div key={index} className="list-item">
                  <span>{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="steps-section-form">
          <div className="section-header">
            <h3 className="section-title">👨‍🍳 Шаги приготовления</h3>
            <div className="input-group">
              <input
                type="text"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                className="form-input small"
                placeholder="1. Разогреть сковороду..."
              />
              <button
                type="button"
                onClick={addInstruction}
                className="btn-small"
                disabled={!newInstruction.trim()}
              >
                Добавить
              </button>
            </div>
          </div>
          <div className="steps-list">
            {formData.instructions.length === 0 ? (
              <div className="empty-list">Шаги будут здесь</div>
            ) : (
              formData.instructions.map((instruction, index) => (
                <div key={index} className="list-item">
                  <span className="step-number">{index + 1}</span>
                  <span>{instruction}</span>
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(`/recipes/${id}`)}
            className="btn-secondary"
            disabled={isSaving}
          >
            ← Отмена
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={
              isSaving ||
              !formData.title ||
              formData.ingredients.length === 0 ||
              !formData.category
            }
          >
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditRecipePage
