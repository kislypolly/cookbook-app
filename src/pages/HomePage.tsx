import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchRecipes } from '../store/recipeSlice'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector(state => state.recipes)

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch])

  if (loading) return <div className="text-center py-20 text-xl">Загрузка рецептов...</div>
  if (error) return <div className="text-center py-20 text-red-500 text-xl">Ошибка: {error}</div>

  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
          Добро пожаловать в Cookbook!
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Сотни проверенных рецептов от лучших поваров. 
          Легко, вкусно, с любовью приготовлено для вас!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500'
              }}
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">{recipe.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-2">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {recipe.category}
                </span>
                <span className="text-sm text-gray-500">
                  ⏱️ {recipe.prepTime} + {recipe.cookTime}
                </span>
                <span className="text-sm text-gray-500">
                  👥 {recipe.servings} порц.
                </span>
              </div>
              
              <Link
                to={`/recipe/${recipe.id}`}
                className="w-full block bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-6 rounded-xl text-lg font-semibold text-center hover:from-orange-700 hover:to-orange-800 transition-all duration-300"
              >
                🍽️ Посмотреть рецепт
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
