import React, { useState } from 'react';
import { Package, Plus, Sparkles, Copy, Check, Eye, Trash2, X, RefreshCw } from 'lucide-react';
import { Product, BrandSettings } from '../types';

interface ProductLibraryProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  brand: BrandSettings;
  darkMode: boolean;
}

export const ProductLibrary: React.FC<ProductLibraryProps> = ({
  products,
  setProducts,
  brand,
  darkMode,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProductForAi, setSelectedProductForAi] = useState<Product | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCopyResult, setAiCopyResult] = useState<any | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // New Product Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('39.99');
  const [category, setCategory] = useState<Product['category']>('Pantry Sets');
  const [material, setMaterial] = useState('BPA-Free Acrylic Shatterproof Plastic');
  const [capacity, setCapacity] = useState('1.5L Airtight Seals');
  const [dimensions, setDimensions] = useState('18cm x 12cm x 15cm');
  const [colors, setColors] = useState('Crystal Clear, Rose Gold Seal');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name,
      price: parseFloat(price) || 29.99,
      category,
      colors: colors.split(',').map((c) => c.trim()),
      material,
      capacity,
      dimensions,
      stockStatus: 'In Stock',
      description: description || `${name} featuring airtight seals and premium food-grade materials.`,
      benefits: ['Airtight silicone seal lock', 'BPA-free & dishwasher safe', 'Stackable space-saving design'],
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    // Reset Form
    setName('');
    setDescription('');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleGenerateAiDescription = async (product: Product) => {
    setSelectedProductForAi(product);
    setAiLoading(true);
    setAiCopyResult(null);

    try {
      const response = await fetch('/api/ai/product-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          price: product.price,
          material: product.material,
          capacity: product.capacity,
          colors: product.colors,
          benefits: product.benefits,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setAiCopyResult(resData.data);
      }
    } catch (e) {
      console.error('Failed to generate product copy', e);
    } finally {
      setAiLoading(false);
    }
  };

  const copyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <Package size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Product Library</h2>
            <p className="text-xs text-slate-500">
              Manage your food storage container catalog & generate SEO descriptions for Instagram, Website & Meta.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/20"
        >
          <Plus size={16} />
          <span>Add New Container</span>
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div>
              {/* Product Image Frame */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 mb-3 group">
                <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white">
                  {prod.category}
                </span>
              </div>

              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{prod.name}</h3>
                <span className="text-sm font-extrabold text-rose-500">${prod.price.toFixed(2)}</span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{prod.description}</p>

              {/* Specifications Pills */}
              <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">Material:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{prod.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Capacity:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{prod.capacity}</span>
                </div>
              </div>
            </div>

            {/* Product Card Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => handleGenerateAiDescription(prod)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 flex items-center justify-center gap-1 shadow-sm"
              >
                <Sparkles size={14} />
                <span>AI Copy Generator</span>
              </button>

              <button
                onClick={() => handleDeleteProduct(prod.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                title="Delete product"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base">Add New Container Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 7-Piece Modular Airtight Pantry Set"
                  className={`w-full px-3.5 py-2 rounded-xl border ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <option value="Containers">Containers</option>
                    <option value="Meal Prep">Meal Prep</option>
                    <option value="Organisers">Organisers</option>
                    <option value="Airtight Sets">Airtight Sets</option>
                    <option value="Lunch Boxes">Lunch Boxes</option>
                    <option value="Pantry Sets">Pantry Sets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Material</label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="BPA-Free Tritan / Glass"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Capacity</label>
                  <input
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="1.2L, 2.0L Modular"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className={`w-full px-3 py-2 rounded-xl border ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-md shadow-rose-500/20"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Copy Generator Modal for Product */}
      {selectedProductForAi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`w-full max-w-2xl p-6 rounded-3xl border shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-rose-500" />
                <h3 className="font-bold text-base">AI Product Copy: {selectedProductForAi.name}</h3>
              </div>
              <button onClick={() => setSelectedProductForAi(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {aiLoading ? (
              <div className="py-16 text-center space-y-3">
                <RefreshCw size={28} className="animate-spin text-rose-500 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Generating SEO & Social Copy...</p>
              </div>
            ) : aiCopyResult ? (
              <div className="space-y-5 text-xs">
                {/* Instagram Version */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-rose-500">Instagram Version</span>
                    <button
                      onClick={() => copyText(aiCopyResult.instagramVersion, 'ig')}
                      className="font-semibold text-rose-500 hover:underline flex items-center gap-1"
                    >
                      {copiedType === 'ig' ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedType === 'ig' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{aiCopyResult.instagramVersion}</p>
                </div>

                {/* Features & Specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold block mb-2 text-slate-800 dark:text-slate-200">Key Features</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                      {aiCopyResult.features?.map((f: string, i: number) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold block mb-2 text-slate-800 dark:text-slate-200">Website Description</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{aiCopyResult.websiteVersion}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">Unable to generate AI copy.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
