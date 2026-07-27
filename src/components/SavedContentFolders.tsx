import React, { useState } from 'react';
import { FolderHeart, Search, Copy, Eye, Trash2, Check } from 'lucide-react';
import { GeneratedContent } from '../types';

interface SavedContentFoldersProps {
  savedContent: GeneratedContent[];
  setSavedContent: React.Dispatch<React.SetStateAction<GeneratedContent[]>>;
  onPreviewContent: (content: GeneratedContent) => void;
  darkMode: boolean;
}

export const SavedContentFolders: React.FC<SavedContentFoldersProps> = ({
  savedContent,
  setSavedContent,
  onPreviewContent,
  darkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = savedContent.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setSavedContent(savedContent.filter((s) => s.id !== id));
  };

  const handleCopy = (item: GeneratedContent) => {
    const fullText = `${item.caption}\n\n${(item.hashtags || []).join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500 to-rose-500 text-white shadow-md shadow-rose-500/20">
            <FolderHeart size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Saved Content Vault</h2>
            <p className="text-xs text-slate-500">
              Access your library of saved AI captions, reel scripts, and marketing copy.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved content..."
            className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
        </div>
      </div>

      {/* Saved Items List */}
      {filtered.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <FolderHeart size={32} className="mx-auto text-slate-400 mb-2" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">No Saved Content Yet</h3>
          <p className="text-xs text-slate-500 mt-1">Generate captions or scripts in AI Studio and click "Save Folder" to bookmark them here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 uppercase">
                      {item.postType}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">{item.title}</h3>
                  </div>
                  <span className="text-[10px] text-slate-400">{item.createdAt}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-4 leading-relaxed p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-sans mb-3">
                  {item.caption}
                </p>

                {item.hashtags && item.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.hashtags.slice(0, 5).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-medium text-rose-500">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => onPreviewContent(item)}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-500 flex items-center gap-1"
                >
                  <Eye size={14} />
                  <span>IG Preview</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800"
                    title="Delete saved item"
                  >
                    <Trash2 size={15} />
                  </button>

                  <button
                    onClick={() => handleCopy(item)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 flex items-center gap-1"
                  >
                    {copiedId === item.id ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
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
