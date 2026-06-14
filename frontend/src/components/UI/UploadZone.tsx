import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Music, Video, FileAudio, FileVideo, X, AlertCircle } from 'lucide-react';
import { ACCEPTED_FILE_TYPES } from '../../types';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  isAnalyzing: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ 
  onFileSelect, 
  selectedFile, 
  onClear,
  isAnalyzing 
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.wav', '.mp3', '.m4a', '.flac'],
      'video/*': ['.mp4', '.avi', '.mov', '.webm']
    },
    maxFiles: 1,
    disabled: isAnalyzing
  });

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('audio/')) {
      return <FileAudio className="h-12 w-12 text-primary-400" />;
    }
    return <FileVideo className="h-12 w-12 text-primary-400" />;
  };

  const getFileTypeLabel = (file: File) => {
    if (file.type.startsWith('audio/')) {
      return 'Audio';
    }
    return 'Video';
  };

  if (selectedFile) {
    return (
      <div className="relative">
        <div className="card flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {getFileIcon(selectedFile)}
            <div>
              <p className="text-white font-medium">{selectedFile.name}</p>
              <p className="text-slate-400 text-sm">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {getFileTypeLabel(selectedFile)}
              </p>
            </div>
          </div>
          <button
            onClick={onClear}
            disabled={isAnalyzing}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {isAnalyzing && (
          <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500 mb-3" />
              <p className="text-primary-400 font-medium">Analyzing...</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? 'border-primary-500 bg-primary-500/10'
          : isDragReject
          ? 'border-red-500 bg-red-500/10'
          : 'border-slate-600 hover:border-primary-500 hover:bg-slate-800/50'
      } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center">
        <div className={`p-4 rounded-full mb-4 ${isDragActive ? 'bg-primary-500/20' : 'bg-slate-700'}`}>
          {isDragReject ? (
            <AlertCircle className="h-10 w-10 text-red-400" />
          ) : (
            <Upload className={`h-10 w-10 ${isDragActive ? 'text-primary-400' : 'text-slate-400'}`} />
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          {isDragActive ? 'Drop your file here' : 'Drag & drop your media'}
        </h3>
        
        <p className="text-slate-400 mb-4">
          or click to browse from your computer
        </p>
        
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2 text-slate-400">
            <Music className="h-4 w-4" />
            <span>Audio</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <Video className="h-4 w-4" />
            <span>Video</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-xs mt-4">
          Supported formats: WAV, MP3, M4A, FLAC, MP4, AVI, MOV, WebM
        </p>
      </div>
    </div>
  );
};

export default UploadZone;

