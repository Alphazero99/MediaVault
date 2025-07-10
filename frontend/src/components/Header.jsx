import React from 'react';
import { Upload, Plus, Eye, User, LogOut } from 'lucide-react';

const Header = ({ user, onLogout, viewMode, setViewMode }) => {
  // New logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', { method: 'GET', credentials: 'include' });
      if(response.ok){
        onLogout();
      }
    } catch (e) {
      // Optionally handle error
      console.log(e)
    }
   
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">MediaVault</h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setViewMode('upload')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'upload' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-purple-200 hover:text-white hover:bg-purple-600/20'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Upload</span>
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'gallery' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-purple-200 hover:text-white hover:bg-purple-600/20'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Gallery</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-purple-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-purple-600/20"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;