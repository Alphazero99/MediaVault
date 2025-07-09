import React, { useState, useRef } from 'react';
import { Upload, Image, Video, X } from 'lucide-react';

const UploadPage = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const isValidType = 
        file.type.startsWith('video/') && file.type.includes('mp4') ||
        file.type.startsWith('image/') && ['jpeg', 'jpg', 'png'].some(ext => file.type.includes(ext));
      return isValidType && file.size <= 100 * 1024 * 1024; // 100MB limit
    });
    
    setSelectedFiles(validFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
      const fileId = Date.now() + Math.random();
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const progress = prev[fileId] + Math.random() * 20;
          if (progress >= 100) {
            clearInterval(interval);
            // Add to uploads
            const newUpload = {
              id: fileId,
              name: file.name,
              type: file.type.startsWith('video/') ? 'video' : 'image',
              size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
              uploadDate: new Date().toISOString().split('T')[0],
              url: URL.createObjectURL(file),
              thumbnail: URL.createObjectURL(file)
            };
            onUpload(newUpload);
            return { ...prev, [fileId]: 100 };
          }
          return { ...prev, [fileId]: progress };
        });
      }, 100);
    }

    setTimeout(() => {
      setSelectedFiles([]);
      setUploadProgress({});
    }, 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-6">Upload Media</h2>
        
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            isDragging 
              ? 'border-purple-400 bg-purple-500/10' 
              : 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/5'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="video/mp4,image/jpeg,image/jpg,image/png"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
                <Image className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-white">
              Drop files here or click to browse
            </h3>
            <p className="text-purple-200">
              Supports MP4 videos and JPG/PNG images up to 100MB
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 transform hover:scale-105"
            >
              Choose Files
            </button>
          </div>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Selected Files</h3>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    {file.type.startsWith('video/') ? (
                      <Video className="w-5 h-5 text-purple-400" />
                    ) : (
                      <Image className="w-5 h-5 text-purple-400" />
                    )}
                    <span className="text-white font-medium">{file.name}</span>
                    <span className="text-purple-200 text-sm">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleUpload}
              className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 transform hover:scale-105"
            >
              Upload {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}
            </button>
          </div>
        )}

        {/* Upload Progress */}
        {Object.keys(uploadProgress).length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Uploading...</h3>
            {Object.entries(uploadProgress).map(([id, progress]) => (
              <div key={id} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">Upload Progress</span>
                  <span className="text-purple-200">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-violet-600 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;