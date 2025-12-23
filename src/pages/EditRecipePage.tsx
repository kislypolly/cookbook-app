import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetRecipeByIdQuery, useUpdateRecipeMutation } from '../store/api'
import { useAuth } from '../hooks/useAuth'
import { Recipe } from '../types/recipe'

const EditRecipePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: recipe } = useGetRecipeByIdQuery(id!)
  const [updateRecipe, { isLoading }] = useUpdateRecipeMutation()
  
  const [formData, setFormData] = useState<Omit<Recipe, 'id' | 'created_at'>>({
    title: '',
    description: '',
    ingredients: [],
    steps: [],
    prep_time: '',
    servings: 2,
    category: ''
  })

  useEffect(() => {
    if (recipe && recipe.author !== user?.email) {
      navigate('/recipe/' + id)
    }
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description || '',
        ingredients: recipe.ingredients || [],
        steps: recipe.steps || [],
        prep_time: recipe.prep_time || '',
        servings: recipe.servings || 2,
        category: recipe.category || ''
      })
    }
  }, [recipe, user, id, navigate])

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
      await updateRecipe({ id: id!, ...formData }).unwrap()
      navigate(`/recipe/${id}`)
    } catch (error) {
      alert('Ошибка сохранения')
    }
  }

  if (!recipe) return <div className="loader">Загрузка...</div>

  return (
    <div className="edit-page">
      <div className="create-header">
        <h1 className="create-title">Редактировать рецепт</h1>
        <p className="create-subtitle">Измените данные и сохраните</p>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(`/recipe/${id}`)}
            className="btn-secondary"
          >
            ← Отмена
          </button>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditRecipePage
