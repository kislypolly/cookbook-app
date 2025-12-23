import { Link } from 'react-router-dom'
import { useGetRecipesQuery } from '../store/api'
import { Recipe } from '../types/recipe'

const HomePage = () => {
  const { data: recipes = [], isLoading, error } = useGetRecipesQuery({ limit: 9 })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Загрузка рецептов из Supabase...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-800 p-8 rounded-2xl text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Ошибка загрузки</h2>
          <p>{JSON.stringify(error)}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
          Рецепты от пользователей
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {recipes.length} рецептов в базе Supabase. Добавьте свой!
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍳</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Рецептов пока нет</h2>
          <Link 
            to="/create" 
            className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-orange-700 hover:to-orange-800 transition-all inline-block"
          >
            🥄 Быть первым!
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe: Recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="h-64 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center group-hover:from-orange-200 group-hover:to-yellow-200 transition-all">
                <span className="text-4xl opacity-50">🍲</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">{recipe.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{recipe.description || 'Вкусный рецепт домашней кухни'}</p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold
