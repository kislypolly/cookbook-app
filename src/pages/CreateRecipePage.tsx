import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateRecipeMutation } from '../store/api'
import { Recipe } from '../types/recipe'

const CreateRecipePage = () => {
  const navigate = useNavigate()
  const [createRecipe, { isLoading }] = useCreateRecipeMutation()
  
  const [formData, setFormData] = useState<Omit<Recipe, 'id' | 'created_at'>>({
    title: '',
    description: '',
    ingredients: [] as string[],
    steps: [] as string[],
    prep_time: '',
    servings: 2,
    category: ''
  })

  const [newIngredient, setNewIngredient] = useState('')
  const [newStep, setNewStep] = useState('')

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient.trim()]
      })
      setNewIngredient('')
    }
  }

  const addStep = () => {
    if (newStep.trim()) {
      setFormData({
        ...formData,
        steps: [...formData.steps, newStep.trim()]
      })
      setNewStep('')
    }
  }

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    })
  }

  const removeStep = (index: number) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createRecipe(formData).unwrap()
      navigate('/')
    } catch (error) {
      alert('Ошибка создания рецепта')
    }
  }

  return (
    <div className="create-page">
      <div className="create-header">
        <h1 className="create-title">Новый рецепт</h1>
        <p className="create-subtitle">Заполните форму и сохраните свой рецепт</p>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-section">
          <label className="form-label">Название рецепта</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="form-input"
            placeholder="Например: Борщ по-домашнему"
            required
          />
        </div>

        <div className="form-section">
          <label className="form-label">Описание</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
              className="form-input"
              placeholder="30 мин"
            />
          </div>

          <div className="form-section">
            <label className="form-label">Порций</label>
            <input
              type="number"
              value={formData.servings}
              onChange={(e) => setFormData({ ...formData, servings: Number(e.target.value) })}
              className="form-input"
              min="1"
              max="20"
            />
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Категория</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="form-input"
            placeholder="Супы, Выпечка, Десерты..."
          />
        </div>
        <div className="form-section">
          <label className="form-label">Категория</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

        <div className="ingredients-section">
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

        <div className="steps-section">
          <div className="section-header">
            <h3 className="section-title">👨‍🍳 Шаги приготовления</h3>
            <div className="input-group">
              <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                className="form-input small"
                placeholder="1. Разогреть сковороду..."
              />
              <button
                type="button"
                onClick={addStep}
                className="btn-small"
                disabled={!newStep.trim()}
              >
                Добавить
              </button>
            </div>
          </div>
          <div className="steps-list">
            {formData.steps.length === 0 ? (
              <div className="empty-list">Шаги будут здесь</div>
            ) : (
              formData.steps.map((step, index) => (
                <div key={index} className="list-item">
                  <span className="step-number">{index + 1}</span>
                  <span>{step}</span>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
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
            onClick={() => navigate('/')}
            className="btn-secondary"
            disabled={isLoading}
          >
            ← Отмена
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !formData.title || formData.ingredients.length === 0}
          >
            {isLoading ? 'Сохранение...' : 'Создать рецепт'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateRecipePage
