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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold"
        >
          ← На главную
        </Link>

        {user?.id === recipe.user_id && (
          <div className="flex gap-3 ml-auto">
            <Link 
              to={`/edit/${recipe.id}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              ✏️ Изменить рецепт
            </Link>
            <button 
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🗑️ Удалить
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="h-96 bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
          <span className="text-6xl opacity-20">🍲</span>
        </div>
        
        <div className="p-12">
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-orange-100 text-orange-800 px-6 py-3 rounded-2xl text-lg font-semibold">
              {recipe.category?.toUpperCase()}
            </span>
            <span className="bg-blue-100 text-blue-800 px-6 py-3 rounded-2xl text-lg font-semibold">
              {recipe.difficulty?.toUpperCase()}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {recipe.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl">
            {recipe.description}
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                  🛒
                </span>
                Ингредиенты ({recipe.servings} порций)
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <span className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center text-lg font-bold mr-4">
                      {index + 1}
                    </span>
                    <span className="text-lg">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 p-8 rounded-2xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">⏱️ Время</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Подготовка:</span>
                    <span className="font-semibold">{recipe.prep_time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Готовка:</span>
                    <span className="font-semibold">{recipe.cook_time}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-8 rounded-2xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">👥 Порции</h4>
                <div className="text-4xl font-bold text-purple-600">{recipe.servings}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                📋
              </span>
              Инструкции
            </h3>
            <div className="space-y-6">
              {recipe.instructions?.map((step, index) => (
                <div key={index} className="flex space-x-6">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed">{step}</p>
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
