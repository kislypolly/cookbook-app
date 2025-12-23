import { Link } from 'react-router-dom'
import { useGetRecipesQuery } from '../store/api'
import { ArrowRight, Clock, Users, Tag } from 'lucide-react'

const HomePage = () => {
  const { data: recipes = [], isLoading, error } = useGetRecipesQuery()

  if (isLoading) return <HeroLoader />
  if (error) return <ErrorCard error={error} />

  return (
    <div className="space-y-24 py-20">
      {/* Hero Section */}
      <section className="text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 bg-clip-text text-transparent mb-8 leading-tight">
            ВАШ
            <br />
            <span className="text-9xl">🍳</span>
            <br />
            КУЛИНАРНЫЙ
            <br />
            ШЕДЕВР
          </h1>
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12">
            Делитесь рецептами с друзьями и находите вдохновение в кулинарных идеях сообщества
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/create" className="btn-primary text-xl flex items-center space-x-3">
              <PlusCircle className="w-7 h-7" />
              <span>Создать рецепт</span>
            </Link>
            <Link to="/auth" className="glass px-8 py-4 rounded-2xl font-semibold text-xl border-2 border-primary-200 hover:border-primary-400">
              Присоединиться бесплатно
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <StatCard icon={<Users className="w-16 h-16 text-primary-500" />} number={recipes.length} label="Рецептов" />
        <StatCard icon={<Clock className="w-16 h-16 text-secondary-500" />} number="5 мин" label="Быстрое создание" />
        <StatCard icon={<Tag className="w-16 h-16 text-green-500" />} number="1000+" label="Активных поваров" />
      </section>

      {/* Recipes Grid */}
      {recipes.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
              <div>
                <h2 className="text-5xl font-black text-gray-900 mb-4">Популярные рецепты</h2>
                <p className="text-2xl text-gray-600">Лучшее от сообщества поваров</p>
              </div>
              <Link to="/recipes" className="glass px-8 py-4 rounded-2xl font-semibold hover:shadow-xl">
                Все рецепты →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// Компоненты
const HeroLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-32 h-32 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin-slow mx-auto mb-8"></div>
      <p className="text-3xl font-bold text-gray-600 animate-pulse">Ищем вкусные рецепты...</p>
    </div>
  </div>
)

const ErrorCard = ({ error }: any) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="glass p-12 rounded-3xl text-center max-w-md">
      <div className="text-6xl mb-6">🥴</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Что-то пошло не так</h2>
      <pre className="bg-red-50 p-4 rounded-2xl text-red-800 text-sm mb-6">{JSON.stringify(error, null, 2)}</pre>
      <button className="btn-primary" onClick={() => window.location.reload()}>
        Попробовать снова
      </button>
    </div>
  </div>
)

const StatCard = ({ icon, number, label }: any) => (
  <div className="glass p-8 rounded-3xl text-center hover:shadow-2xl transition-all">
    <div className="mb-4">{icon}</div>
    <div className="text-4xl font-black text-gray-900 mb-2">{number}</div>
    <p className="text-xl text-gray-600 font-semibold">{label}</p>
  </div>
)

const EmptyState = () => (
  <div className="text-center py-32">
    <div className="text-9xl mb-8 animate-bounce">🍳</div>
    <h2 className="text-5xl font-black text-gray-900 mb-6">Пока пусто...</h2>
    <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
      Будьте первым, кто поделится своим фирменным рецептом!
    </p>
    <Link to="/create" className="btn-primary text-2xl px-12 py-6">
      🥄 Создать первый рецепт
    </Link>
  </div>
)

const RecipeCard = ({ recipe }: any) => (
  <Link to={`/recipe/${recipe.id}`} className="glass p-8 rounded-3xl card-hover group">
    <div className="w-full h-48 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-6">
      <span className="text-5xl opacity-75">🍲</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">{recipe.title}</h3>
    <p className="text-gray-600 mb-6 line-clamp-2">{recipe.description}</p>
    
    <div className="flex flex-wrap gap-3 mb-8">
      <span className="bg-primary-100 text-primary-800 px-4 py-2 rounded-xl text-sm font-semibold">
        {recipe.category}
      </span>
      <span className="text-sm text-gray-500 flex items-center">
        ⏱️ {recipe.prep_time}
      </span>
      <span className="text-sm text-gray-500 flex items-center">
        👥 {recipe.servings} порц.
      </span>
    </div>
    
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      <span className="text-lg font-semibold text-gray-900">Посмотреть</span>
      <ArrowRight className="w-6 h-6 text-primary-500 group-hover:translate-x-2 transition-transform" />
    </div>
  </Link>
)

export default HomePage
