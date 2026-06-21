"use client";

import { useState, useTransition } from 'react';
import { Search, Plus, Pencil, Trash2, X, FolderGit2, Loader2, Upload } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { createCategory, deleteCategory, updateCategory } from '@/app/actions/admin';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

export default function CategoriesClient({ initialCategories }: { initialCategories: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      startTransition(async () => {
        try {
          await deleteCategory(id);
          toast.success('Category deleted successfully');
        } catch (error) {
          toast.error('Failed to delete category');
        }
      });
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsUploading(true);
    
    try {
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const annualVolume = formData.get('annualVolume') as string;
      const mainMarkets = formData.get('mainMarkets') as string;
      const file = formData.get('imageFile') as File;
      let imageUrl = editingCategory?.imageUrl || '';

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
          if (!name) return;
        
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        if (editingCategory) {
          await updateCategory(editingCategory.id, {
            name,
            slug,
            description,
            imageUrl,
            annualVolume,
            mainMarkets,
          });
          toast.success('Category updated successfully');
        } else {
          await createCategory({
            name,
            slug,
            description,
            imageUrl,
            annualVolume,
            mainMarkets,
          });
          toast.success('Category added successfully');
        }
        
        setIsModalOpen(false);
        setEditingCategory(null);
        } catch (error: any) {
          toast.error(error.message || (editingCategory ? 'Failed to update category' : 'Failed to add category'));
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
        <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Categories</h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-zinc-500" />
              </div>
              <input 
                type="text" 
                placeholder="Search categories..." 
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>
          </div>
          
          <button 
            onClick={() => {
              setEditingCategory(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm shrink-0"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-zinc-900/30 border border-white/10 rounded-xl overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-900/50 border-b border-white/10 text-zinc-400 font-medium">
                <tr>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Category Name</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Description</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Total Products</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-none">
                {initialCategories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-zinc-500">No categories found.</td>
                  </tr>
                )}
                {initialCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-zinc-900/40 transition-colors group">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-zinc-800 flex-shrink-0 flex items-center justify-center border border-white/5 shadow-inner overflow-hidden">
                          {category.imageUrl ? (
                            <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                          ) : (
                            <FolderGit2 size={16} className="text-zinc-600" />
                          )}
                        </div>
                        <span className="font-medium text-white">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-zinc-400 truncate max-w-xs">{category.description || '-'}</td>
                    <td className="py-3 px-4 text-zinc-300">
                      <span className="bg-zinc-800 text-zinc-300 py-1 px-2.5 rounded-md text-xs border border-white/5 font-medium">
                        {category.products?.length || 0} Products
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-3 text-zinc-400">
                        <button 
                          onClick={() => {
                            setEditingCategory(category);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" 
                          aria-label="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
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
              Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{initialCategories.length}</span> of <span className="font-medium text-white">{initialCategories.length}</span> categories
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

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <form 
            action={handleSubmit}
            className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200"
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
              <h2 className="text-xl font-bold text-white tracking-tight">{editingCategory ? "Edit Category" : "Add New Category"}</h2>
              <button 
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
                }}
                className="text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5 p-1.5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Category Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    defaultValue={editingCategory?.name || ''}
                    placeholder="e.g. Organic Spices" 
                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Annual Volume</label>
                    <input 
                      type="text" 
                      name="annualVolume"
                      defaultValue={editingCategory?.annualVolume || ''}
                      placeholder="e.g. 50 MT" 
                      className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Main Markets</label>
                    <input 
                      type="text" 
                      name="mainMarkets"
                      defaultValue={editingCategory?.mainMarkets || ''}
                      placeholder="e.g. EU, US, France" 
                      className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Category Image</label>
                  <div className="relative group cursor-pointer">
                    <input 
                      type="file" 
                      name="imageFile"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 rounded-xl bg-zinc-900/50 group-hover:bg-zinc-900 group-hover:border-blue-400/50 transition-all">
                      <Upload className="text-zinc-500 mb-2 group-hover:text-blue-400 transition-colors" size={24} />
                      <p className="text-sm text-zinc-300 font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-zinc-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                      {editingCategory?.imageUrl && (
                         <div className="mt-4 flex items-center gap-2 text-xs text-blue-400">
                           <span className="truncate max-w-[200px]">Current: {editingCategory.imageUrl.split('/').pop()}</span>
                         </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Description</label>
                  <textarea 
                    rows={4}
                    name="description"
                    defaultValue={editingCategory?.description || ''}
                    placeholder="Brief description about the category..." 
                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none custom-scrollbar leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-white/10 bg-zinc-950 flex-shrink-0 rounded-b-2xl">
              <button 
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
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
                ) : (editingCategory ? 'Save Changes' : 'Save Category')}
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
