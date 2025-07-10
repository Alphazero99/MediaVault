import React, { useState } from 'react';
import Header from './Header';
import UploadPage from './UploadPage';
import GalleryPage from './GalleryPage';

const Dashboard = ({ user, onLogout }) => {
  const [viewMode, setViewMode] = useState('upload');
  const [uploads, setUploads] = useState([
    {
      id: 1,
      name: 'sample-video.mp4',
      type: 'video',
      size: '15.2 MB',
      uploadDate: '2024-01-15',
      url: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Sample+Video',
      thumbnail: 'https://via.placeholder.com/200x150/6366f1/ffffff?text=Video'
    },
    {
      id: 2,
      name: 'sample-image.jpg',
      type: 'image',
      size: '2.1 MB',
      uploadDate: '2024-01-14',
      url: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Sample+Image',
      thumbnail: 'https://via.placeholder.com/200x150/8b5cf6/ffffff?text=Image'
    }
  ]);

  const addUpload = (newUpload) => {
    setUploads(prev => [newUpload, ...prev]);
  };

  const deleteUpload = (id) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  return (
    <div>
      <Header 
        user={user} 
        onLogout={onLogout} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'upload' ? (
          <UploadPage onUpload={addUpload} />
        ) : (
          <GalleryPage uploads={uploads} onDelete={deleteUpload} onUpload={() => setViewMode('upload')} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;