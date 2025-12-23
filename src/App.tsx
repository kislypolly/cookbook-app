function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fed7aa 0%, #fb923c 100%)',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        color: '#dc2626', 
        fontSize: '48px', 
        marginBottom: '20px'
      }}>
        🍳 Cookbook App v1.0
      </h1>
      <p style={{ 
        fontSize: '24px', 
        color: '#1f2937',
        marginBottom: '20px'
      }}>
        ✅ React + TypeScript + Vite работают!
      </p>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ color: '#ea580c', fontSize: '24px' }}>Следующие шаги:</h2>
        <ol style={{ textAlign: 'left', fontSize: '18px' }}>
          <li>✅ index.html создан</li>
          <li>✅ npm install выполнен</li>
          <li>🔄 Создать папки pages/store/types</li>
          <li>🔄 Добавить Layout + HomePage</li>
        </ol>
      </div>
    </div>
  )
}

export default App
