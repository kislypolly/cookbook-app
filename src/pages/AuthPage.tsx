import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AuthPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { signIn, signUp, user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    console.log('Регистрация:', email, password) 
    if (isLogin) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  } catch (error: any) {
    console.error('Полная ошибка:', error)  
    alert(`Ошибка: ${error.message || error}`)
  }
}


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{isLogin ? 'Войти' : 'Регистрация'}</h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Введите данные для входа в аккаунт' 
              : 'Создайте аккаунт для сохранения рецептов'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-section">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-section">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={loading || !email || !password}
          >
            {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="auth-toggle">
          <span>
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-link"
            disabled={loading}
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
