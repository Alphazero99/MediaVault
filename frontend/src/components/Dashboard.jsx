import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const AuthScreen = ({ onLogin }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (email, password) => {
    // Simulate API call
    setTimeout(() => {
      onLogin({ email, name: email.split('@')[0] });
    }, 1000);
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
                onClick={() => { setShowAuth(true); setIsLogin(true); }}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </button>
              <button
                onClick={() => { setShowAuth(true); setIsLogin(false); }}
                className="w-full bg-gray-700/50 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600/50 transition-all duration-200 border border-purple-500/30"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-700/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
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
                />
              </div>
              <button
                onClick={() => handleAuth('user@example.com', 'password')}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 transform hover:scale-105"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
              <button
                onClick={() => setShowAuth(false)}
                className="w-full text-purple-300 hover:text-purple-200 transition-colors duration-200"
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