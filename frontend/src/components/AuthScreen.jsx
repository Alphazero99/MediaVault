import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const AuthScreen = ({ onLogin }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    const endpoint = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/signin';
    const payload = { username, email, password };
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');
      if (isLogin) {
        onLogin(data);
      } else {
        setSuccess('Signup successful! Please sign in.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/20">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">MediaVault</h1>
            <p className="text-purple-200">Secure media storage platform</p>
          </div>

          {!showAuth ? (
            <div className="space-y-4">
              <button
                onClick={() => { setShowAuth(true); setIsLogin(true); setSuccess(''); setError(''); }}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </button>
              <button
                onClick={() => { setShowAuth(true); setIsLogin(false); setSuccess(''); setError(''); }}
                className="w-full bg-gray-700/50 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600/50 transition-all duration-200 border border-purple-500/30"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-700/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-red-400 text-sm">{error}</div>}
              {success && <div className="text-green-400 text-sm">{success}</div>}
              <button
                onClick={handleAuth}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? (isLogin ? 'Signing In...' : 'Signing Up...') : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
              <button
                onClick={() => { setShowAuth(false); setSuccess(''); setError(''); }}
                className="w-full text-purple-300 hover:text-purple-200 transition-colors duration-200"
                disabled={loading}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;