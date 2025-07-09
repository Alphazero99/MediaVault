import React from 'react';
import { Upload, Image, Video, Eye, Trash2 } from 'lucide-react';

const GalleryPage = ({ uploads, onDelete, onUpload }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Gallery</h2>
        <div className="text-purple-200">
          {uploads.length} file{uploads.length !== 1 ? 's' : ''}
        </div>
      </div>

      {uploads.length === 0 ? (
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-12 text-center border border-purple-500/20">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No uploads yet</h3>
          <p className="text-purple-200 mb-6">Start by uploading your first media file</p>
          <button
            onClick={onUpload}
            className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 transform hover:scale-105"
          >
            Upload Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploads.map((upload) => (
            <div key={upload.id} className="bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400 transition-all duration-200 transform hover:scale-105">
              <div className="aspect-video bg-gray-700 relative overflow-hidden">
                {upload.type === 'video' ? (
                  <video
                    src={upload.url}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                  />
                ) : (
                  <img
                    src={upload.url}
                    alt={upload.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {upload.type === 'video' ? (
                        <Video className="w-4 h-4 text-purple-400" />
                      ) : (
                        <Image className="w-4 h-4 text-purple-400" />
                      )}
                      <span className="text-white font-medium text-sm truncate">
                        {upload.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-purple-200 mb-4">
                  <span>{upload.size}</span>
                  <span>{upload.uploadDate}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.open(upload.url, '_blank')}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onDelete(upload.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;