import { Link } from 'react-router-dom'
import { useGetRecipesQuery } from '../store/api'

const HomePage = () => {
  const { data: recipes = [], isLoading, error } = useGetRecipesQuery()

  if (isLoading) return <HeroLoader />
  if (error) return <ErrorCard error={error} />

  return (
    <div className="space-y-24 py-20">
      {/* Hero */}
      <div className="text-red-500 text-3xl font-bold">TEST TAILWIND</div>
      <section className="text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent mb-8 leading-tight">
            ВАШ
            <br />
            <span className="text-9xl">🍳</span>
            <br />
            КУЛИНАРНЫЙ
            <br />
            ШЕДЕВР
          </h1>
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12">
            Делитесь рецептами с друзьями и находите вдохновение
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/create" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl">
              🍳 Создать рецепт
            </Link>
            <Link to="/auth" className="bg-white/90 backdrop-blur-xl border border-white/50 px-8 py-4 rounded-2xl font-semibold text-xl shadow-xl hover:shadow-2xl hover:bg-white hover:scale-105 transition-all">
              Присоединиться
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <StatCard icon="📊" number={recipes.length} label="Рецептов" />
        <StatCard icon="⚡" number="5 мин" label="Создание" />
        <StatCard icon="👥" number="1000+" label="Поваров" />
      </section>

      {/* Recipes */}
      {recipes.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-black text-gray-900 mb-4">Популярные рецепты</h2>
              <p className="text-2xl text-gray-600">Лучшее от сообщества</p>
            </div>
            <Link to="/recipes" className="bg-white/90 backdrop-blur-xl px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl">
              Все рецепты →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe: any) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Компоненты (БЕЗ иконок)
const HeroLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-32 h-32 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-8"></div>
      <p className="text-3xl font-bold text-gray-600">Ищем рецепты...</p>
    </div>
  </div>
)

const ErrorCard = ({ error }: any) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl text-center max-w-md border border-white/50">
      <div className="text-6xl mb-6">🥴</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Ошибка</h2>
      <pre className="bg-red-50 p-4 rounded-2xl text-red-800 text-sm mb-6 max-h-40 overflow-auto">{JSON.stringify(error, null, 2)}</pre>
      <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700" onClick={() => window.location.reload()}>
        Попробовать снова
      </button>
    </div>
  </div>
)

const StatCard = ({ icon, number, label }: any) => (
  <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50">
    <div className="text-4xl mb-4">{icon}</div>
    <div className="text-4xl font-black text-gray-900 mb-2">{number}</div>
    <p className="text-xl text-gray-600 font-semibold">{label}</p>
  </div>
)

const EmptyState = () => (
  <div className="text-center py-32">
    <div className="text-9xl mb-8 animate-bounce">🍳</div>
    <h2 className="text-5xl font-black text-gray-900 mb-6">Пока пусто</h2>
    <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
      Будьте первым поваром!
    </p>
    <Link to="/create" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6 px-12 rounded-3xl text-2xl font-bold shadow-2xl hover:from-orange-600 hover:to-orange-700 hover:shadow-3xl hover:scale-105 transition-all">
      🥄 Первый рецепт
    </Link>
  </div>
)

const RecipeCard = ({ recipe }: any) => (
  <Link to={`/recipe/${recipe.id}`} className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group border border-white/50">
    <div className="w-full h-48 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-6">
      <span className="text-5xl opacity-75">🍲</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">{recipe.title}</h3>
    <p className="text-gray-600 mb-6 line-clamp-2">{recipe.description}</p>
    
    <div className="flex flex-wrap gap-3 mb-8">
      <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-xl text-sm font-semibold">
        {recipe.category}
      </span>
      <span className="text-sm text-gray-500">⏱️ {recipe.prep_time}</span>
      <span className="text-sm text-gray-500">👥 {recipe.servings} порц.</span>
    </div>
    
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      <span className="text-lg font-semibold text-gray-900">Посмотреть</span>
      <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
    </div>
  </Link>
)

export default HomePage
