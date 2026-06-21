"use client";

import { useState, useTransition } from 'react';
import { Search, Filter, Plus, Pencil, Trash2, X, UploadCloud, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { createProduct, deleteProduct, updateProduct } from '@/app/actions/admin';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

export default function ProductsClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const selectedCategory = searchParams.get('category');

  const handleCategoryFilter = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory === categoryId) {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
    setIsFiltersOpen(false);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
    setIsFiltersOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      startTransition(async () => {
        try {
          await deleteProduct(id);
          toast.success('Product deleted successfully');
        } catch (error) {
          toast.error('Failed to delete product');
        }
      });
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsUploading(true);
    
    try {
      const name = formData.get('name') as string;
      const categoryId = formData.get('categoryId') as string;
      const description = formData.get('description') as string;
      const moq = formData.get('moq') as string;
      const status = formData.get('status') as string;
      const file = formData.get('imageFile') as File;
      let imageUrl = editingProduct?.imageUrl || '';

      if (file && file.size > 0) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey) throw new Error("Supabase credentials missing");

        const supabase = createClient(supabaseUrl, supabaseKey);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage.from('products').upload(fileName, file);
        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
        
        const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      startTransition(async () => {
        try {
          if (!name || !categoryId) return;
        
        if (editingProduct) {
          await updateProduct(editingProduct.id, {
            name,
            categoryId,
            description,
            moq,
            imageUrl,
            status,
          });
          toast.success('Product updated successfully');
        } else {
          await createProduct({
            name,
            categoryId,
            description,
            moq,
            imageUrl,
            status,
          });
          toast.success('Product added successfully');
        }
        
        setIsModalOpen(false);
        setEditingProduct(null);
        } catch (error: any) {
          toast.error(error.message || (editingProduct ? 'Failed to update product' : 'Failed to add product'));
        } finally {
          setIsUploading(false);
        }
      });
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header Section */}
        <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Products</h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-zinc-500" />
              </div>
              <input 
                type="text" 
                placeholder="Search products..." 
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-transparent border ${selectedCategory ? 'border-white/40 text-white' : 'border-white/10 text-zinc-300'} rounded-lg hover:bg-zinc-900 hover:text-white transition-colors text-sm font-medium shrink-0 relative`}
              >
                <Filter size={16} />
                Filters
                {selectedCategory && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                    1
                  </span>
                )}
              </button>

              {isFiltersOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsFiltersOpen(false)}></div>
                  <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-950 border border-white/10 rounded-xl shadow-2xl z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 px-1">Category</h4>
                        <div className="flex flex-col max-h-48 overflow-y-auto custom-scrollbar pr-1">
                          {categories.map((cat, idx) => {
                            const isSelected = selectedCategory === cat.id;
                            return (
                              <div key={cat.id} className={`${idx !== categories.length - 1 ? 'border-b border-white/5' : ''}`}>
                                <button 
                                  onClick={() => handleCategoryFilter(cat.id)}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${isSelected ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
                                >
                                  <span className="truncate pr-2 text-left">{cat.name}</span>
                                  {isSelected && <Check size={12} className="text-emerald-500 shrink-0" />}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-3">
                        <button 
                          onClick={resetFilters}
                          className="w-full py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-transparent hover:bg-zinc-900 border border-transparent hover:border-white/10 rounded-lg transition-colors"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm shrink-0"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

      {/* Data Table */}
      <div className="bg-zinc-900/30 border border-white/10 rounded-xl overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-900/50 border-b border-white/10 text-zinc-400 font-medium">
              <tr>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Product</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">SKU / ID</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Category</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Stock / MOQ</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Status</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-none">
              {initialProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">No products found.</td>
                </tr>
              )}
              {initialProducts.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-900/40 transition-colors group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-zinc-800 flex-shrink-0 flex items-center justify-center border border-white/5 shadow-inner overflow-hidden">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={16} className="text-zinc-600" />
                        )}
                      </div>
                      <span className="font-medium text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-400 font-mono text-xs">{product.id.split('-')[0]}</td>
                  <td className="py-3 px-4 text-zinc-300">{product.category?.name || '-'}</td>
                  <td className="py-3 px-4 text-zinc-300">{product.moq || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      product.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : product.status === 'draft' 
                          ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-3 text-zinc-400">
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" 
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        disabled={isPending}
                        className="p-1.5 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50" 
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-white/10 bg-zinc-900/20">
          <span className="text-xs text-zinc-400">
            Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{initialProducts.length}</span> of <span className="font-medium text-white">{initialProducts.length}</span> products
          </span>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 border border-white/10 rounded-md hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 border border-white/10 rounded-md hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <form 
            action={handleSubmit}
            className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200"
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
              <h2 className="text-xl font-bold text-white tracking-tight">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button 
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProduct(null);
                }}
                className="text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5 p-1.5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Col: Form Fields */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-5">
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">General Information</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Product Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        defaultValue={editingProduct?.name || ''}
                        placeholder="e.g. Premium Robusta Coffee" 
                        className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">MOQ</label>
                        <input 
                          type="text" 
                          name="moq"
                          defaultValue={editingProduct?.moq || ''}
                          placeholder="e.g. 100 kg" 
                          className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Category</label>
                        <select name="categoryId" required defaultValue={editingProduct?.categoryId || ''} className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all appearance-none cursor-pointer">
                          <option value="">Select Category...</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Product Image</label>
                        <div className="relative group cursor-pointer">
                          <input 
                            type="file" 
                            name="imageFile"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 rounded-xl bg-zinc-900/50 group-hover:bg-zinc-900 group-hover:border-blue-400/50 transition-all">
                            <UploadCloud className="text-zinc-500 mb-2 group-hover:text-blue-400 transition-colors" size={24} />
                            <p className="text-sm text-zinc-300 font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-zinc-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                            {editingProduct?.imageUrl && (
                               <div className="mt-4 flex items-center gap-2 text-xs text-blue-400">
                                 <span className="truncate max-w-[200px]">Current: {editingProduct.imageUrl.split('/').pop()}</span>
                               </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 pt-6 border-t border-white/5">
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product Details</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Description</label>
                      <textarea 
                        rows={8}
                        name="description"
                        required
                        defaultValue={editingProduct?.description || ''}
                        placeholder="Detailed product description, origin, processing method, and specifications..." 
                        className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none custom-scrollbar leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Col: Status */}
                <div className="space-y-8">
                  
                  <div className="space-y-5">
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</h3>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 text-sm text-zinc-300 cursor-pointer p-3 rounded-lg border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                        <input type="radio" name="status" value="active" className="w-4 h-4 accent-emerald-500 bg-zinc-900 border-white/10" defaultChecked={!editingProduct || editingProduct.status === 'active'} /> 
                        <div>
                          <p className="font-medium text-white">Active</p>
                          <p className="text-xs text-zinc-500">Product is visible to buyers</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-zinc-300 cursor-pointer p-3 rounded-lg border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                        <input type="radio" name="status" value="draft" className="w-4 h-4 accent-white bg-zinc-900 border-white/10" defaultChecked={editingProduct?.status === 'draft'} /> 
                        <div>
                          <p className="font-medium text-white">Draft</p>
                          <p className="text-xs text-zinc-500">Hide product from catalog</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-white/10 bg-zinc-950 flex-shrink-0 rounded-b-2xl">
              <button 
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProduct(null);
                }}
                className="px-5 py-2.5 text-sm font-medium text-zinc-300 border border-white/10 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Cancel
              </button>
                <button 
                  type="submit"
                  disabled={isPending || isUploading}
                  className="flex items-center justify-center min-w-[140px] px-5 py-2.5 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors shadow-sm disabled:opacity-50"
                >
                  {(isPending || isUploading) ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      {isUploading ? 'Uploading Image...' : 'Saving Data...'}
                    </>
                  ) : (editingProduct ? 'Save Changes' : 'Save Product')}
                </button>
            </div>
          </form>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #3f3f46;
        }
      `}} />
    </div>
  );
}
