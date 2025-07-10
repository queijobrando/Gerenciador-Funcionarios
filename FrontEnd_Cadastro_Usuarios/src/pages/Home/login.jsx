import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Preencha todos os campos');
      return;
    }
    setLoading(true);
    console.log(credentials)
    try {
      await login(credentials);
      navigate('/'); // ou para a rota protegida desejada
    } catch {
      setError('Usuário ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px #0001', minWidth: 320 }}>
        <h2>Login</h2>
        <div style={{ marginBottom: 16 }}>
          <label>Usuário</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
            autoComplete="username"
            disabled={loading}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
            autoComplete="current-password"
            disabled={loading}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;