import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchRecipes } from '../store/recipeSlice'
import { Link } from 'react-router-dom'
import { Recipe } from '../types/recipe'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector(state => state.recipes)

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch])

  if (loading) return <div className="text-center py-20">Загрузка...</div>
  if (error) return <div className="text-center py-20 text-red-500">Ошибка: {error}</div>

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-orange-600 mb-6">
          Добро пожаловать в Cookbook!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Откройте для себя лучшие рецепты от наших поваров. 
          Легко, вкусно, с любовью!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((recipe: Recipe) => (
          <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.category}
                </span>
                <span className="text-sm text-gray-500">
                  {recipe.prepTime} + {recipe.cookTime}
                </span>
              </div>
              <Link
                to={`/recipe/${recipe.id}`}
                className="w-full block bg-orange-600 text-white py-2 px-4 rounded-lg text-center hover:bg-orange-700 transition-colors"
              >
                Посмотреть рецепт
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
