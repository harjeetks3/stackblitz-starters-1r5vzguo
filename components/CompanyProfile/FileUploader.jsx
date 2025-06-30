// components/CompanyProfile/FileUploader.jsx
// File upload component for compliance documents and certificates
// Handles file selection, upload progress, and file management

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { api } from '../../lib/api';
import { useToast } from '../../hooks/useToast';
import { v4 as uuidv4 } from 'uuid';

export default function FileUploader({ 
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.png", 
  maxSize = 5, // MB
  onFileUpload,
  existingFiles = [],
  disabled = false,
  linkedEntity = 'general_document',
  linkedId = null
}) {
  const { addToast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState(existingFiles);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Update local state when existingFiles prop changes
  useEffect(() => {
    setFiles(existingFiles);
  }, [existingFiles]);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file selection
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Process selected files
  const handleFiles = async (fileList) => {
    setError(null);
    const newFiles = Array.from(fileList);
    
    for (const file of newFiles) {
      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        continue;
      }
      
      // Validate file type
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const acceptedExtensions = acceptedTypes.split(',').map(type => 
        type.trim().replace('.', '')
      );
      
      if (!acceptedExtensions.includes(fileExtension)) {
        setError(`File ${file.name} is not an accepted file type. Please upload ${acceptedTypes}.`);
        continue;
      }
      
      try {
        setUploading(true);
        
        // Create FormData for multipart upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('linkedEntity', linkedEntity);
        formData.append('linkedId', linkedId || uuidv4());

        // Upload file to Supabase via API
        const response = await api('/api/files', {
          method: 'POST',
          body: formData,
          headers: {
            // Let the browser set the Content-Type for FormData
            'Content-Type': undefined,
          },
        });
        
        console.log('File upload response:', response);
        
        if (!response.success) {
          throw new Error(response.error || 'Upload failed');
        }
        
        const newFile = {
          id: response.file.id,
          name: response.file.name,
          size: response.file.size,
          type: response.file.type,
          filePath: response.file.filePath,
          signedUrl: response.file.signedUrl,
          uploadedAt: response.file.uploadedAt || new Date().toISOString()
        };
        
        setFiles(prev => [...prev, newFile]);
        addToast('File uploaded successfully!', 'success');
        
        if (onFileUpload) {
          onFileUpload(newFile);
        }
      } catch (error) {
        console.error('Upload failed:', error);
        setError(`Failed to upload ${file.name}: ${error.message}`);
        addToast(`Failed to upload file: ${error.message}`, 'error');
      } finally {
        setUploading(false);
      }
    }
  };

  // Remove file
  const removeFile = async (fileId, filePath) => {
    try {
      // Call API to delete file from storage and database
      await api(`/api/files?filePath=${encodeURIComponent(filePath)}`, {
        method: 'DELETE',
      });

      const updatedFiles = files.filter(file => file.id !== fileId);
      setFiles(updatedFiles);
      addToast('File removed successfully!', 'success');
      
      // Notify parent component
      if (onFileUpload) {
        onFileUpload(null, { id: fileId, filePath });
      }
    } catch (error) {
      console.error('Failed to remove file:', error);
      setError(`Failed to remove file: ${error.message}`);
      addToast(`Failed to remove file: ${error.message}`, 'error');
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!disabled && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled || uploading}
          />
          
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {acceptedTypes.replace(/\./g, '').toUpperCase()} up to {maxSize}MB
            </p>
          </div>
          
          {uploading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Uploading...</p>
            </div>
          )}
          
          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              <AlertCircle className="inline-block w-4 h-4 mr-1" />
              {error}
            </div>
          )}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files</h4>
          {files.map((file) => (
            <div key={file.id || file.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {file.signedUrl && (
                  <a 
                    href={file.signedUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1 text-blue-600 hover:text-blue-800 rounded"
                    title="View file"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </a>
                )}
                <CheckCircle className="h-5 w-5 text-green-500" />
                {!disabled && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id, file.filePath)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}