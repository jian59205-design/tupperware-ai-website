import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Copy, Check, Sparkles } from 'lucide-react';
import { BrandSettings, GeneratedContent } from '../types';

interface InstagramPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: BrandSettings;
  content?: GeneratedContent | null;
  captionText?: string;
  hashtags?: string[];
  imageUrl?: string;
  postType?: string;
  darkMode?: boolean;
}

export const InstagramPreviewModal: React.FC<InstagramPreviewModalProps> = ({
  isOpen,
  onClose,
  brand,
  content,
  captionText: directCaption,
  hashtags: directHashtags = [],
  imageUrl: directImageUrl,
  postType: directPostType = 'Instagram Post',
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const captionText = content?.caption || directCaption || '';
  const hashtags = content?.hashtags || directHashtags || [];
  const postType = content?.postType || directPostType || 'Instagram Post';

  const handleCopy = () => {
    const fullText = `${captionText}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const defaultImage = directImageUrl || 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-[32px] overflow-hidden bg-black/60 backdrop-blur-2xl border border-white/10 text-white shadow-2xl transition-all">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-pink-400" />
            <span className="font-bold text-sm text-white">Instagram Simulator</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Realistic Instagram Frame */}
        <div className="p-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-950/90 shadow-lg">
            {/* IG Post Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold border-2 border-slate-950">
                    {brand.businessName ? brand.businessName.charAt(0) : 'T'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">
                      {brand.instagramUsername?.replace('@', '') || 'freshluxekitchen'}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-sky-500 flex items-center justify-center text-white text-[8px] font-bold">✓</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Original Audio • Sponsored</span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-white">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* IG Media Frame */}
            <div className="relative aspect-square bg-slate-900 flex items-center justify-center overflow-hidden group">
              <img
                src={defaultImage}
                alt="Post Preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold tracking-wide border border-white/10">
                {postType}
              </div>
            </div>

            {/* IG Action Icons */}
            <div className="flex items-center justify-between p-3.5 pb-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`transition-transform active:scale-125 cursor-pointer ${liked ? 'text-rose-500' : 'text-slate-200'}`}
                >
                  <Heart size={22} className={liked ? 'fill-rose-500 text-rose-500' : ''} />
                </button>
                <button className="text-slate-200 hover:opacity-75 cursor-pointer">
                  <MessageCircle size={22} />
                </button>
                <button className="text-slate-200 hover:opacity-75 cursor-pointer">
                  <Send size={22} />
                </button>
              </div>
              <button
                onClick={() => setSaved(!saved)}
                className={`cursor-pointer ${saved ? 'text-pink-400' : 'text-slate-200'}`}
              >
                <Bookmark size={22} className={saved ? 'fill-pink-400' : ''} />
              </button>
            </div>

            {/* IG Likes Count */}
            <div className="px-3.5 text-xs font-semibold text-slate-200">
              Liked by <span className="font-bold text-white">pantry_enthusiast</span> and <span className="font-bold text-white">1,842 others</span>
            </div>

            {/* IG Caption Body */}
            <div className="p-3.5 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
              <span className="font-bold mr-2 text-white">
                {brand.instagramUsername?.replace('@', '') || 'freshluxekitchen'}
              </span>
              {captionText}

              {hashtags.length > 0 && (
                <div className="mt-2 text-pink-400 font-medium flex flex-wrap gap-1">
                  {hashtags.join(' ')}
                </div>
              )}
            </div>

            {/* IG Comment Input bar */}
            <div className="px-3.5 py-2.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
              <span>Add a comment...</span>
              <span className="text-pink-400 font-semibold cursor-pointer">Post</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-4 px-6 border-t border-white/10 bg-white/5">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 shadow-md shadow-pink-900/30 active:scale-95 transition-all cursor-pointer"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? 'Copied Full Text!' : 'Copy Caption & Hashtags'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

