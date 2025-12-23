function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fed7aa 0%, #fb923c 100%)',
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#dc2626', 
        fontSize: '48px', 
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        🍳 Cookbook App
      </h1>
      <p style={{ 
        fontSize: '24px', 
        textAlign: 'center',
        color: '#1f2937'
      }}>
        React + TypeScript + Vite работают! ✅
      </p>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Создайте папки и скажите "готово"
      </p>
    </div>
  )
}

export default App
