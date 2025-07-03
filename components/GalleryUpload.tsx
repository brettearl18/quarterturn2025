import React, { useRef, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../app/lib/firebase';

interface GalleryUploadProps {
  folder: string; // e.g. 'galleryImages'
  onUpload: (urls: string[]) => void;
  label?: string;
  disabled?: boolean;
  initialUrls?: string[];
}

export default function GalleryUpload({ folder, onUpload, label = 'Upload Gallery Images', disabled, initialUrls = [] }: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const validFiles = Array.from(files).filter(file =>
      ['image/jpeg', 'image/png'].includes(file.type) && file.size <= 10 * 1024 * 1024
    );
    if (validFiles.length !== files.length) {
      setError('Only JPG/PNG files under 10MB are allowed.');
      return;
    }
    if (!auth.currentUser) {
      setError('You must be logged in to upload.');
      return;
    }
    setUploading(true);
    try {
      const storage = getStorage();
      const userId = auth.currentUser.uid;
      const uploadPromises = validFiles.map(file => {
        const storageRef = ref(storage, `${folder}/${userId}/${Date.now()}_${file.name}`);
        return uploadBytesResumable(storageRef, file).then(task => getDownloadURL(task.ref));
      });
      const newUrls = await Promise.all(uploadPromises);
      const allUrls = [...urls, ...newUrls];
      setUrls(allUrls);
      onUpload(allUrls);
    } catch (err) {
      setError('Upload failed.');
    }
    setUploading(false);
  };

  const handleRemove = (url: string) => {
    const updated = urls.filter(u => u !== url);
    setUrls(updated);
    onUpload(updated);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
        disabled={uploading || disabled}
      />
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow text-sm font-semibold mb-2"
        onClick={() => inputRef.current?.click()}
        disabled={uploading || disabled}
      >
        {uploading ? 'Uploading...' : label}
      </button>
      {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
      <div className="flex gap-2 flex-wrap mt-2">
        {urls.map(url => (
          <div key={url} className="relative group">
            <img src={url} alt="Gallery" className="w-20 h-20 object-cover rounded border" />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
              onClick={() => handleRemove(url)}
              title="Remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 