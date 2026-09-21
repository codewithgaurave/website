"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  LogOut, 
  Search, 
  Download,
  Trash2,
  Phone,
  LayoutDashboard,
  Settings,
  ChevronRight,
  UtensilsCrossed,
  Plus,
  Edit2,
  Check,
  X,
  RefreshCw,
  Image as ImageIcon,
  Calendar,
  ChefHat,
  CookingPot,
  ShoppingCart,
  Mail,
  Home,
  Bell,
  Menu as MenuIcon,
  Tag
} from 'lucide-react';
import Swal from 'sweetalert2';

interface MenuItemType {
  _id?: string;
  name: string;
  foodType: 'veg' | 'non-veg';
  cuisine: string;
  category: string;
  cookingCharge: number;
  image: string;
  isActive: boolean;
  createdAt?: string;
}

const CUISINE_OPTIONS = [
  'North Indian',
  'Chinese',
  'South Indian',
  'Continental',
  'Mughlai',
  'Punjabi',
  'Italian',
  'Mexican',
  'Thai',
  'Tandoor',
  'Fast Food',
  'Desserts',
  'Beverages'
];

const CATEGORY_OPTIONS = [
  'Main Course',
  'Starter',
  'Snacks',
  'Bread',
  'Rice',
  'Dessert',
  'Drinks',
  'Breakfast',
  'Sides'
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorInfo, setErrorInfo] = useState('');
  
  // Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu-items' | 'enquiries' | 'offers' | 'settings'>('menu-items');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // CRM Leads state
  const [leads, setLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadSearchTerm, setLeadSearchTerm] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');

  // Menu Items state
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formFoodType, setFormFoodType] = useState<'veg' | 'non-veg'>('veg');
  const [formCuisine, setFormCuisine] = useState('North Indian');
  const [formCategory, setFormCategory] = useState('Main Course');
  const [formCookingCharge, setFormCookingCharge] = useState<number | string>(250);
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200');
  const [formIsActive, setFormIsActive] = useState(true);
  const [isSubmittingMenu, setIsSubmittingMenu] = useState(false);

  // Menu Table Filters
  const [menuSearchTerm, setMenuSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [foodTypeFilter, setFoodTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Settings state
  const [newPassword, setNewPassword] = useState('');
  const [truePassword, setTruePassword] = useState('zomo123');

  // Offers / Coupons state
  const [offers, setOffers] = useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [showAddOfferForm, setShowAddOfferForm] = useState(false);
  const [offerCode, setOfferCode] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerSubtitle, setOfferSubtitle] = useState('');
  const [offerType, setOfferType] = useState<'PERCENTAGE' | 'FLAT'>('PERCENTAGE');
  const [offerDiscountValue, setOfferDiscountValue] = useState<number | string>(20);
  const [offerMinOrderValue, setOfferMinOrderValue] = useState<number | string>(0);
  const [offerIsActive, setOfferIsActive] = useState(true);
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);

  // Sync password & auth state
  useEffect(() => {
    const savedPin = localStorage.getItem('ZOMO_ADMIN_PASS');
    if (savedPin) setTruePassword(savedPin);
    
    const isLoggedIn = localStorage.getItem('ZOMO_IS_LOGGED_IN');
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
      fetchLeads();
      fetchMenuItems();
      fetchOffers();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === truePassword) { 
      setIsAuthenticated(true);
      localStorage.setItem('ZOMO_IS_LOGGED_IN', 'true');
      fetchLeads();
      fetchMenuItems();
      fetchOffers();
    } else {
      setErrorInfo('Invalid Admin Password.');
    }
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const savedPin = localStorage.getItem('ZOMO_ADMIN_PASS') || 'zomo123';
      const res = await fetch('/api/admin/leads', {
        headers: { 'Authorization': `Bearer ${savedPin}` }
      });
      const json = await res.json();
      if (json.success) {
        setLeads(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch leads", err);
    }
    setLoadingLeads(false);
  };

  const fetchMenuItems = async () => {
    setLoadingMenu(true);
    try {
      const res = await fetch('/api/admin/menu-items');
      const json = await res.json();
      if (json.success) {
        setMenuItems(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch menu items", err);
    }
    setLoadingMenu(false);
  };

  const fetchOffers = async () => {
    setLoadingOffers(true);
    try {
      const res = await fetch('/api/offers');
      const json = await res.json();
      if (json.success && Array.isArray(json.offers)) {
        setOffers(json.offers);
      }
    } catch (err) {
      console.error("Failed to fetch offers", err);
    }
    setLoadingOffers(false);
  };

  const resetMenuForm = () => {
    setFormName('');
    setFormFoodType('veg');
    setFormCuisine('North Indian');
    setFormCategory('Main Course');
    setFormCookingCharge(250);
    setFormImage('https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200');
    setFormIsActive(true);
    setEditingItemId(null);
    setShowAddForm(false);
  };

  const handleEditClick = (item: MenuItemType) => {
    setEditingItemId(item._id || null);
    setFormName(item.name);
    setFormFoodType(item.foodType);
    setFormCuisine(item.cuisine);
    setFormCategory(item.category);
    setFormCookingCharge(item.cookingCharge || 0);
    setFormImage(item.image);
    setFormIsActive(item.isActive !== false);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      Swal.fire({ icon: 'warning', title: 'Name Required', text: 'Please enter a dish name.' });
      return;
    }

    setIsSubmittingMenu(true);
    try {
      const payload = {
        name: formName.trim(),
        foodType: formFoodType,
        cuisine: formCuisine,
        category: formCategory,
        cookingCharge: Number(formCookingCharge) || 0,
        image: formImage.trim() || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200',
        isActive: formIsActive
      };

      if (editingItemId) {
        // Update
        const res = await fetch(`/api/admin/menu-items/${editingItemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire({ icon: 'success', title: 'Updated!', text: 'Menu item updated successfully.' });
          fetchMenuItems();
          resetMenuForm();
        } else {
          Swal.fire({ icon: 'error', title: 'Error', text: data.message || 'Failed to update item.' });
        }
      } else {
        // Create
        const res = await fetch('/api/admin/menu-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire({ icon: 'success', title: 'Created!', text: 'New menu item added successfully.' });
          fetchMenuItems();
          resetMenuForm();
        } else {
          Swal.fire({ icon: 'error', title: 'Error', text: data.message || 'Failed to add item.' });
        }
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Network error' });
    }
    setIsSubmittingMenu(false);
  };

  const handleToggleItemStatus = async (item: MenuItemType) => {
    if (!item._id) return;
    const newStatus = !item.isActive;
    // Optimistic update
    setMenuItems(prev => prev.map(m => m._id === item._id ? { ...m, isActive: newStatus } : m));

    try {
      await fetch(`/api/admin/menu-items/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus })
      });
    } catch (err) {
      console.error(err);
      fetchMenuItems();
    }
  };

  const handleDeleteMenuItem = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: 'Delete Item?',
      text: `Are you sure you want to delete "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    setMenuItems(prev => prev.filter(m => m._id !== id));
    try {
      const res = await fetch(`/api/admin/menu-items/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Dish removed permanently.' });
      } else {
        fetchMenuItems();
      }
    } catch (err) {
      console.error(err);
      fetchMenuItems();
    }
  };

  const handleSyncDefaultCatalog = async () => {
    const res = await Swal.fire({
      title: 'Sync Default Menu?',
      text: 'This will seed any missing dishes from standard catalog into the database.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0866ed',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Sync Now'
    });

    if (!res.isConfirmed) return;

    try {
      const resp = await fetch('/api/admin/menu-items/seed', { method: 'POST' });
      const data = await resp.json();
      if (data.success) {
        Swal.fire({ icon: 'success', title: 'Synced!', text: data.message });
        fetchMenuItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    setLeads(prev => prev.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
    try {
      const savedPin = localStorage.getItem('ZOMO_ADMIN_PASS') || 'zomo123';
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${savedPin}`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error("Failed to update status", error);
      fetchLeads(); 
    }
  };

  const deleteLead = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;
    
    setLeads(prev => prev.filter(lead => lead._id !== id));
    try {
      const savedPin = localStorage.getItem('ZOMO_ADMIN_PASS') || 'zomo123';
      await fetch(`/api/admin/leads/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${savedPin}` }
      });
      Swal.fire('Deleted!', 'Record has been permanently deleted.', 'success');
    } catch (error) {
      console.error("Failed to delete lead", error);
      fetchLeads();
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      Swal.fire('Error', 'Password must be at least 4 characters long.', 'error');
      return;
    }
    localStorage.setItem('ZOMO_ADMIN_PASS', newPassword);
    setTruePassword(newPassword);
    
    Swal.fire({
      title: 'Password Updated!',
      text: 'Please remember your new password for future logins.',
      icon: 'success',
      confirmButtonColor: '#0866ed'
    });
    
    setNewPassword('');
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'End Session?',
      text: "You will be logged out of the admin panel.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0866ed',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
         setIsAuthenticated(false);
         setPassword('');
         localStorage.removeItem('ZOMO_IS_LOGGED_IN');
      }
    });
  };

  // Filtered Menu Items
  const filteredMenuItems = menuItems.filter(item => {
    const q = menuSearchTerm.trim().toLowerCase();
    const matchesSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      item.cuisine.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q);
    
    const matchesCuisine = cuisineFilter === 'All' || item.cuisine === cuisineFilter;
    const matchesFoodType = foodTypeFilter === 'All' || item.foodType === foodTypeFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCuisine && matchesFoodType && matchesCategory;
  });

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(leadSearchTerm.toLowerCase()) || 
                          lead.phone?.includes(leadSearchTerm);
    const matchesStatus = leadStatusFilter === 'All' ? true : (lead.status || 'Pending') === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const convertedCount = leads.filter(l => l.status === 'Converted').length;
  const pendingCount = leads.filter(l => (l.status || 'Pending') === 'Pending').length;
  const newToday = leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center font-sans px-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl border border-slate-200">
           <div className="text-center mb-6">
             <div className="text-2xl font-black text-slate-900 tracking-tight">
               Zomo<span className="text-[#0866ed]">Cook</span>
             </div>
             <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Admin Portal</p>
           </div>
           <form onSubmit={handleLogin} className="space-y-4">
             {errorInfo && <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">{errorInfo}</div>}
             <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Access Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#0866ed] rounded-xl focus:bg-white transition-all"
                />
             </div>
             <button type="submit" className="w-full py-3 bg-[#0866ed] hover:bg-[#0652ba] text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer">
               Sign In
             </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900 relative">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 1. SIDEBAR (MATCHING SCREENSHOT) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a1128] flex flex-col shrink-0 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         
         {/* Brand Header */}
         <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
           <div>
             <h1 className="text-2xl font-black text-white tracking-tight">
               Zomo<span className="text-[#ef4444]">Cook</span>
             </h1>
             <p className="text-[11px] text-slate-400 font-semibold tracking-wide">Admin Panel</p>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
             <span className="text-2xl font-bold">&times;</span>
           </button>
         </div>

         {/* Navigation List */}
         <div className="flex-1 py-5 px-3 flex flex-col space-y-1.5 overflow-y-auto">
           
           <button 
             onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
             className={`w-full flex items-center gap-3.5 px-4 py-3 font-bold text-[13.5px] rounded-xl transition-all ${
               activeTab === 'dashboard' 
                 ? 'bg-[#0866ed] text-white shadow-md' 
                 : 'text-slate-300 hover:text-white hover:bg-white/5'
             }`}
           >
             <Home className="w-4 h-4 shrink-0" />
             <span>Dashboard</span>
           </button>

           <button 
             onClick={() => { setActiveTab('menu-items'); setIsSidebarOpen(false); }}
             className={`w-full flex items-center gap-3.5 px-4 py-3 font-bold text-[13.5px] rounded-xl transition-all ${
               activeTab === 'menu-items' 
                 ? 'bg-[#0866ed] text-white shadow-md' 
                 : 'text-slate-300 hover:text-white hover:bg-white/5'
             }`}
           >
             <UtensilsCrossed className="w-4 h-4 shrink-0" />
             <span>Menu Items</span>
           </button>

           <button 
             onClick={() => { setActiveTab('enquiries'); setIsSidebarOpen(false); }}
             className={`w-full flex items-center gap-3.5 px-4 py-3 font-bold text-[13.5px] rounded-xl transition-all ${
               activeTab === 'enquiries' 
                 ? 'bg-[#0866ed] text-white shadow-md' 
                 : 'text-slate-300 hover:text-white hover:bg-white/5'
             }`}
           >
             <Mail className="w-4 h-4 shrink-0" />
             <span>Enquiries / Leads</span>
           </button>

           <button 
             onClick={() => { setActiveTab('offers'); setIsSidebarOpen(false); }}
             className={`w-full flex items-center gap-3.5 px-4 py-3 font-bold text-[13.5px] rounded-xl transition-all ${
               activeTab === 'offers' 
                 ? 'bg-[#0866ed] text-white shadow-md' 
                 : 'text-slate-300 hover:text-white hover:bg-white/5'
             }`}
           >
             <Tag className="w-4 h-4 shrink-0" />
             <span>Offers & Coupons</span>
           </button>

           <button 
             onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
             className={`w-full flex items-center gap-3.5 px-4 py-3 font-bold text-[13.5px] rounded-xl transition-all ${
               activeTab === 'settings' 
                 ? 'bg-[#0866ed] text-white shadow-md' 
                 : 'text-slate-300 hover:text-white hover:bg-white/5'
             }`}
           >
             <Settings className="w-4 h-4 shrink-0" />
             <span>Settings</span>
           </button>
         </div>

         {/* Bottom Logout */}
         <div className="p-4 border-t border-white/10 shrink-0">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-red-400 hover:bg-white/5 font-bold text-[13px] transition-colors rounded-xl cursor-pointer"
           >
             <LogOut className="w-4 h-4" />
             <span>Logout</span>
           </button>
         </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 w-full overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30 shadow-2xs">
           <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-black flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
                <div className="w-9 h-9 rounded-full bg-[#0866ed] text-white flex items-center justify-center font-black text-[13px] shadow-xs">
                  A
                </div>
                <div className="hidden sm:block">
                  <div className="text-[13.5px] font-extrabold text-slate-900 leading-tight">Admin</div>
                </div>
              </div>
           </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-5 sm:p-8 space-y-6">
           
           {/* ================= TAB 1: MENU ITEMS ================= */}
           {activeTab === 'menu-items' && (
             <div className="space-y-6 animate-in fade-in duration-200">
               
               {/* Page Header */}
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">Menu Items</h2>
                   <p className="text-[13px] text-slate-500 font-medium">Add, edit and manage all menu items for the app.</p>
                 </div>

                 <div className="flex items-center gap-2.5">
                   <button
                     type="button"
                     onClick={handleSyncDefaultCatalog}
                     className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[13px] rounded-xl shadow-2xs transition-all cursor-pointer"
                   >
                     <RefreshCw className="w-4 h-4 text-[#0866ed]" />
                     <span>Sync Catalog ({menuItems.length})</span>
                   </button>

                   <button
                     type="button"
                     onClick={() => {
                       if (showAddForm && !editingItemId) {
                         setShowAddForm(false);
                       } else {
                         resetMenuForm();
                         setShowAddForm(true);
                       }
                     }}
                     className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0866ed] hover:bg-[#0652ba] text-white font-extrabold text-[13.5px] rounded-xl shadow-md transition-all cursor-pointer active:scale-[0.99]"
                   >
                     <Plus className="w-4 h-4 stroke-[3]" />
                     <span>{showAddForm && !editingItemId ? 'Close Form' : '+ Add New Menu Item'}</span>
                   </button>
                 </div>
               </div>

               {/* Add / Edit Form Card */}
               {showAddForm && (
                 <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm animate-in slide-in-from-top-4 duration-200">
                   <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                     <h3 className="text-lg font-black text-slate-900">
                       {editingItemId ? 'Edit Menu Item' : 'Add New Menu Item'}
                     </h3>
                     <button
                       type="button"
                       onClick={resetMenuForm}
                       className="text-slate-400 hover:text-slate-600 p-1"
                     >
                       <X className="w-5 h-5" />
                     </button>
                   </div>

                   <form onSubmit={handleSaveMenuItem} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       
                       {/* Column 1: Name, Cuisine, Category */}
                       <div className="space-y-4">
                         <div>
                           <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
                             Item Name <span className="text-red-500">*</span>
                           </label>
                           <input
                             type="text"
                             required
                             value={formName}
                             onChange={(e) => setFormName(e.target.value)}
                             placeholder="e.g. Dal Makhni"
                             className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-[13.5px] font-medium text-slate-900 focus:outline-none focus:border-[#0866ed] focus:ring-1 focus:ring-[#0866ed] transition-all"
                           />
                         </div>

                         <div>
                           <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
                             Cuisine <span className="text-red-500">*</span>
                           </label>
                           <select
                             value={formCuisine}
                             onChange={(e) => setFormCuisine(e.target.value)}
                             className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-[13.5px] font-medium text-slate-900 focus:outline-none focus:border-[#0866ed] focus:ring-1 focus:ring-[#0866ed] transition-all"
                           >
                             {CUISINE_OPTIONS.map(c => (
                               <option key={c} value={c}>{c}</option>
                             ))}
                           </select>
                         </div>

                         <div>
                           <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
                             Meal Category <span className="text-red-500">*</span>
                           </label>
                           <select
                             value={formCategory}
                             onChange={(e) => setFormCategory(e.target.value)}
                             className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-[13.5px] font-medium text-slate-900 focus:outline-none focus:border-[#0866ed] focus:ring-1 focus:ring-[#0866ed] transition-all"
                           >
                             {CATEGORY_OPTIONS.map(cat => (
                               <option key={cat} value={cat}>{cat}</option>
                             ))}
                           </select>
                         </div>
                       </div>

                       {/* Column 2: Food Type, Cooking Charge */}
                       <div className="space-y-4">
                         <div>
                           <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
                             Food Type <span className="text-red-500">*</span>
                           </label>
                           <div className="grid grid-cols-2 gap-2">
                             <button
                               type="button"
                               onClick={() => setFormFoodType('veg')}
                               className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-[13px] font-bold border transition-all cursor-pointer ${
                                 formFoodType === 'veg'
                                   ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                   : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                               }`}
                             >
                               <span>🌿</span>
                               <span>Veg</span>
                             </button>

                             <button
                               type="button"
                               onClick={() => setFormFoodType('non-veg')}
                               className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-[13px] font-bold border transition-all cursor-pointer ${
                                 formFoodType === 'non-veg'
                                   ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                   : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                               }`}
                             >
                               <span>🍗</span>
                               <span>Non-Veg</span>
                             </button>
                           </div>
                         </div>

                         <div>
                           <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
                             Cooking Charge (₹) <span className="text-red-500">*</span>
                           </label>
                           <input
                             type="number"
                             value={formCookingCharge}
                             onChange={(e) => setFormCookingCharge(e.target.value)}
                             placeholder="e.g. 250"
                             className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-[13.5px] font-medium text-slate-900 focus:outline-none focus:border-[#0866ed] focus:ring-1 focus:ring-[#0866ed] transition-all"
                           />
                         </div>
                       </div>

                       {/* Column 3: Item Image & Status */}
                       <div className="space-y-4">
                         <div>
                           <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Item Image</label>
                           <div className="flex items-start gap-3">
                             <img
                               src={formImage || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200'}
                               alt="Preview"
                               className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                             />
                             <div className="flex-1 space-y-1.5">
                               <input
                                 type="text"
                                 value={formImage}
                                 onChange={(e) => setFormImage(e.target.value)}
                                 placeholder="Paste image URL..."
                                 className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium focus:outline-none focus:border-[#0866ed]"
                               />
                               <p className="text-[11px] text-slate-400">
                                 Recommended: 500 × 500 px (JPG, PNG, WebP)
                               </p>
                             </div>
                           </div>
                         </div>

                         <div>
                           <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Status</label>
                           <button
                             type="button"
                             onClick={() => setFormIsActive(!formIsActive)}
                             className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[12.5px] font-extrabold cursor-pointer transition-all ${
                               formIsActive 
                                 ? 'bg-blue-50 text-[#0866ed] border-blue-200' 
                                 : 'bg-slate-100 text-slate-500 border-slate-200'
                             }`}
                           >
                             <span className={`w-3.5 h-3.5 rounded-full ${formIsActive ? 'bg-[#0866ed]' : 'bg-slate-400'}`}></span>
                             <span>{formIsActive ? 'Active' : 'Inactive'}</span>
                           </button>
                         </div>
                       </div>
                     </div>

                     {/* Form Actions */}
                     <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                       <button
                         type="button"
                         onClick={resetMenuForm}
                         className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13.5px] transition-colors cursor-pointer"
                       >
                         Cancel
                       </button>

                       <button
                         type="submit"
                         disabled={isSubmittingMenu}
                         className="px-7 py-2.5 rounded-xl bg-[#0866ed] hover:bg-[#0652ba] text-white font-extrabold text-[13.5px] shadow-md transition-all cursor-pointer disabled:opacity-50"
                       >
                         {isSubmittingMenu ? 'Saving...' : editingItemId ? 'Update Menu Item' : 'Save Menu Item'}
                       </button>
                     </div>
                   </form>
                 </div>
               )}

               {/* Menu Items List Card */}
               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                 
                 {/* Table Filters Bar */}
                 <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                   <h3 className="text-lg font-black text-slate-900">
                     Menu Items List <span className="text-slate-400 font-bold text-[14px]">({filteredMenuItems.length})</span>
                   </h3>

                   <div className="flex flex-wrap items-center gap-2.5">
                     {/* Search Input */}
                     <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                       <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                       <input
                         type="text"
                         value={menuSearchTerm}
                         onChange={(e) => setMenuSearchTerm(e.target.value)}
                         placeholder="Search menu items..."
                         className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-900 focus:outline-none focus:border-[#0866ed] focus:bg-white transition-all"
                       />
                     </div>

                     {/* Cuisine Filter */}
                     <select
                       value={cuisineFilter}
                       onChange={(e) => setCuisineFilter(e.target.value)}
                       className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-[#0866ed] cursor-pointer"
                     >
                       <option value="All">All Cuisines</option>
                       {CUISINE_OPTIONS.map(c => (
                         <option key={c} value={c}>{c}</option>
                       ))}
                     </select>

                     {/* Food Type Filter */}
                     <select
                       value={foodTypeFilter}
                       onChange={(e) => setFoodTypeFilter(e.target.value)}
                       className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-[#0866ed] cursor-pointer"
                     >
                       <option value="All">All Food Types</option>
                       <option value="veg">🌿 Veg</option>
                       <option value="non-veg">🍗 Non-Veg</option>
                     </select>

                     {/* Category Filter */}
                     <select
                       value={categoryFilter}
                       onChange={(e) => setCategoryFilter(e.target.value)}
                       className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-[#0866ed] cursor-pointer"
                     >
                       <option value="All">All Categories</option>
                       {CATEGORY_OPTIONS.map(cat => (
                         <option key={cat} value={cat}>{cat}</option>
                       ))}
                     </select>
                   </div>
                 </div>

                 {/* Table */}
                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="bg-slate-50/80 text-slate-500 font-bold text-[12px] uppercase tracking-wider border-b border-slate-200">
                         <th className="px-5 py-3.5">#</th>
                         <th className="px-5 py-3.5">Image</th>
                         <th className="px-5 py-3.5">Item Name</th>
                         <th className="px-5 py-3.5">Cuisine</th>
                         <th className="px-5 py-3.5">Food Type</th>
                         <th className="px-5 py-3.5">Meal Category</th>
                         <th className="px-5 py-3.5">Cooking Charge (₹)</th>
                         <th className="px-5 py-3.5">Status</th>
                         <th className="px-5 py-3.5 text-center">Action</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 text-[13.5px]">
                       {loadingMenu ? (
                         <tr>
                           <td colSpan={9} className="px-5 py-12 text-center text-slate-500 font-bold">
                             Loading menu items...
                           </td>
                         </tr>
                       ) : filteredMenuItems.length === 0 ? (
                         <tr>
                           <td colSpan={9} className="px-5 py-12 text-center text-slate-400 font-medium">
                             No dishes found matching the criteria.
                           </td>
                         </tr>
                       ) : (
                         filteredMenuItems.map((item, index) => (
                           <tr key={item._id || index} className="hover:bg-slate-50/80 transition-colors">
                             <td className="px-5 py-3.5 font-bold text-slate-400">{index + 1}</td>
                             
                             <td className="px-5 py-3.5">
                               <img
                                 src={item.image}
                                 alt={item.name}
                                 className="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-2xs"
                               />
                             </td>

                             <td className="px-5 py-3.5 font-extrabold text-slate-900">
                               {item.name}
                             </td>

                             <td className="px-5 py-3.5 text-slate-600 font-medium">
                               {item.cuisine}
                             </td>

                             <td className="px-5 py-3.5">
                               {item.foodType === 'non-veg' ? (
                                 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11.5px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                                   <span>🍗</span>
                                   <span>Non-Veg</span>
                                 </span>
                               ) : (
                                 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11.5px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                   <span>🌿</span>
                                   <span>Veg</span>
                                 </span>
                               )}
                             </td>

                             <td className="px-5 py-3.5">
                               <span className={`inline-block px-2.5 py-1 rounded-lg text-[11.5px] font-extrabold border ${
                                 item.category === 'Starter' 
                                   ? 'bg-amber-50 text-amber-700 border-amber-200'
                                   : item.category === 'Main Course'
                                   ? 'bg-blue-50 text-blue-700 border-blue-200'
                                   : item.category === 'Snacks'
                                   ? 'bg-orange-50 text-orange-700 border-orange-200'
                                   : item.category === 'Dessert'
                                   ? 'bg-pink-50 text-pink-700 border-pink-200'
                                   : item.category === 'Drinks'
                                   ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                                   : 'bg-slate-50 text-slate-700 border-slate-200'
                               }`}>
                                 {item.category}
                               </span>
                             </td>

                             <td className="px-5 py-3.5 font-bold text-slate-800">
                               ₹{item.cookingCharge || 0}
                             </td>

                             <td className="px-5 py-3.5">
                               <button
                                 type="button"
                                 onClick={() => handleToggleItemStatus(item)}
                                 className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-extrabold border transition-all cursor-pointer ${
                                   item.isActive !== false
                                     ? 'bg-blue-50 text-[#0866ed] border-blue-200'
                                     : 'bg-slate-100 text-slate-400 border-slate-200'
                                 }`}
                               >
                                 <span className={`w-2 h-2 rounded-full ${item.isActive !== false ? 'bg-[#0866ed]' : 'bg-slate-400'}`}></span>
                                 <span>{item.isActive !== false ? 'Active' : 'Inactive'}</span>
                               </button>
                             </td>

                             <td className="px-5 py-3.5 text-center">
                               <div className="flex items-center justify-center gap-1.5">
                                 <button
                                   type="button"
                                   onClick={() => handleEditClick(item)}
                                   className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#0866ed] flex items-center justify-center transition-colors cursor-pointer"
                                   title="Edit"
                                 >
                                   <Edit2 className="w-4 h-4" />
                                 </button>

                                 <button
                                   type="button"
                                   onClick={() => item._id && handleDeleteMenuItem(item._id, item.name)}
                                   className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                                   title="Delete"
                                 >
                                   <Trash2 className="w-4 h-4" />
                                 </button>
                                </div>
                             </td>
                           </tr>
                         ))
                       )}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           )}

           {/* ================= TAB 2: OVERVIEW / DASHBOARD ================= */}
           {activeTab === 'dashboard' && (
             <div className="space-y-6 animate-in fade-in duration-200">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Overview Dashboard</h2>
               
               <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-blue-600">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Menu Items</span>
                     <div className="text-3xl font-black text-slate-900 mt-1">{menuItems.length}</div>
                     <span className="text-xs font-medium text-slate-400">Configured dishes</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-emerald-600">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enquiries</span>
                     <div className="text-3xl font-black text-slate-900 mt-1">{leads.length}</div>
                     <span className="text-xs font-medium text-slate-400">All sources</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-amber-500">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Needs Action</span>
                     <div className="text-3xl font-black text-slate-900 mt-1">{pendingCount}</div>
                     <span className="text-xs font-medium text-slate-400">Follow up required</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-purple-600">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Today</span>
                     <div className="text-3xl font-black text-slate-900 mt-1">{newToday}</div>
                     <span className="text-xs font-medium text-slate-400">In last 24 hrs</span>
                  </div>
               </div>
             </div>
           )}

           {/* ================= TAB 3: ENQUIRIES / LEADS ================= */}
           {activeTab === 'enquiries' && (
             <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-200">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h3 className="text-lg font-black text-slate-900">
                    Lead Database ({filteredLeads.length})
                  </h3>

                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={leadSearchTerm}
                        onChange={(e) => setLeadSearchTerm(e.target.value)}
                        placeholder="Search leads..."
                        className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-900 focus:outline-none focus:border-[#0866ed]"
                      />
                    </div>

                    <select
                      value={leadStatusFilter}
                      onChange={(e) => setLeadStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Junk">Junk</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-slate-50/80 text-slate-500 font-bold text-[12px] uppercase border-b border-slate-200">
                        <th className="px-5 py-3.5">Name</th>
                        <th className="px-5 py-3.5">Phone</th>
                        <th className="px-5 py-3.5">Source</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.map((lead, i) => (
                        <tr key={lead._id || i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-slate-900 capitalize">{lead.name || '-'}</td>
                          <td className="px-5 py-3.5 text-slate-700">{lead.phone}</td>
                          <td className="px-5 py-3.5 text-slate-500">{lead.sourceType}</td>
                          <td className="px-5 py-3.5">
                            <select
                              value={lead.status || 'Pending'}
                              onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Converted">Converted</option>
                              <option value="Junk">Junk</option>
                            </select>
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <button
                              onClick={() => deleteLead(lead._id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
           )}

           {/* ================= TAB 3.5: OFFERS & COUPONS ================= */}
           {activeTab === 'offers' && (
             <div className="space-y-6 animate-in fade-in duration-200">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">Offers & Coupons</h2>
                   <p className="text-[13px] text-slate-500 font-medium">Create and manage coupon codes for Party Chef & Staff Hiring.</p>
                 </div>
                 <button
                   onClick={() => setShowAddOfferForm(!showAddOfferForm)}
                   className="inline-flex items-center gap-2 bg-[#0866ed] hover:bg-[#0652ba] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
                 >
                   <Plus className="w-4 h-4" />
                   <span>{showAddOfferForm ? 'Close Form' : 'Create New Coupon'}</span>
                 </button>
               </div>

               {/* Create Coupon Form */}
               {showAddOfferForm && (
                 <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4">
                   <h3 className="text-base font-extrabold text-slate-900">Add New Coupon Offer</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1">Coupon Code *</label>
                       <input 
                         type="text"
                         value={offerCode}
                         onChange={(e) => setOfferCode(e.target.value.toUpperCase())}
                         placeholder="e.g. PARTY20"
                         className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold uppercase outline-none focus:border-[#0866ed]"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                       <input 
                         type="text"
                         value={offerTitle}
                         onChange={(e) => setOfferTitle(e.target.value)}
                         placeholder="e.g. Party Chef Discount"
                         className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-[#0866ed]"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Description</label>
                       <input 
                         type="text"
                         value={offerSubtitle}
                         onChange={(e) => setOfferSubtitle(e.target.value)}
                         placeholder="e.g. Get 20% OFF on Chef for Party"
                         className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-[#0866ed]"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1">Discount Type</label>
                       <select
                         value={offerType}
                         onChange={(e) => setOfferType(e.target.value as any)}
                         className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-[#0866ed]"
                       >
                         <option value="PERCENTAGE">Percentage (%)</option>
                         <option value="FLAT">Flat Amount (₹)</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1">Discount Value ({offerType === 'PERCENTAGE' ? '%' : '₹'}) *</label>
                       <input 
                         type="number"
                         value={offerDiscountValue}
                         onChange={(e) => setOfferDiscountValue(e.target.value)}
                         placeholder="20"
                         className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-[#0866ed]"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-1">Min Order Value (₹)</label>
                       <input 
                         type="number"
                         value={offerMinOrderValue}
                         onChange={(e) => setOfferMinOrderValue(e.target.value)}
                         placeholder="0"
                         className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-[#0866ed]"
                       />
                     </div>
                   </div>

                   <div className="flex items-center justify-between pt-2">
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="checkbox"
                         checked={offerIsActive}
                         onChange={(e) => setOfferIsActive(e.target.checked)}
                         className="w-4 h-4 text-[#0866ed] rounded"
                       />
                       <span className="text-xs font-bold text-slate-700">Active (Visible to users)</span>
                     </label>
                     <button
                       type="button"
                       disabled={isSubmittingOffer}
                       onClick={async () => {
                         if (!offerCode.trim() || !offerTitle.trim()) {
                           Swal.fire({ icon: 'warning', title: 'Required Fields', text: 'Please enter Code and Title.' });
                           return;
                         }
                         setIsSubmittingOffer(true);
                         try {
                           const res = await fetch('/api/offers', {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify({
                               code: offerCode.trim().toUpperCase(),
                               title: offerTitle.trim(),
                               subtitle: offerSubtitle.trim() || `${offerDiscountValue}${offerType === 'PERCENTAGE' ? '%' : '₹'} OFF`,
                               offerType,
                               discountValue: Number(offerDiscountValue) || 0,
                               minOrderValue: Number(offerMinOrderValue) || 0,
                               isActive: offerIsActive,
                               status: offerIsActive ? 'ACTIVE' : 'INACTIVE'
                             })
                           });
                           const data = await res.json();
                           if (data.success) {
                             Swal.fire({ icon: 'success', title: 'Coupon Created!', text: `Coupon code '${offerCode}' saved successfully.` });
                             setShowAddOfferForm(false);
                             setOfferCode('');
                             setOfferTitle('');
                             setOfferSubtitle('');
                             fetchOffers();
                           } else {
                             Swal.fire({ icon: 'error', title: 'Failed', text: data.message || 'Error saving coupon.' });
                           }
                         } catch (err: any) {
                           Swal.fire({ icon: 'error', title: 'Error', text: err.message });
                         } finally {
                           setIsSubmittingOffer(false);
                         }
                       }}
                       className="px-6 py-2.5 bg-[#0866ed] hover:bg-[#0652ba] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                     >
                       Save Coupon Offer
                     </button>
                   </div>
                 </div>
               )}

               {/* Offers Table */}
               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                   <h3 className="font-extrabold text-slate-900 text-sm">All Active & Inactive Coupons ({offers.length})</h3>
                   <button onClick={fetchOffers} className="p-2 text-slate-500 hover:text-slate-700">
                     <RefreshCw className="w-4 h-4" />
                   </button>
                 </div>
                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse text-[13.5px]">
                     <thead>
                       <tr className="bg-slate-50/80 text-slate-500 font-bold text-[12px] uppercase border-b border-slate-200">
                         <th className="px-5 py-3.5">Code</th>
                         <th className="px-5 py-3.5">Title / Subtitle</th>
                         <th className="px-5 py-3.5">Discount</th>
                         <th className="px-5 py-3.5">Min Order</th>
                         <th className="px-5 py-3.5">Status</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                       {offers.map((o, i) => (
                         <tr key={o._id || i} className="hover:bg-slate-50 transition-colors">
                           <td className="px-5 py-3.5 font-black text-slate-900 uppercase">
                             <span className="bg-blue-50 text-[#0866ed] px-2.5 py-1 rounded-lg border border-blue-100">
                               {o.code}
                             </span>
                           </td>
                           <td className="px-5 py-3.5">
                             <div className="font-bold text-slate-900">{o.title}</div>
                             <div className="text-[11.5px] text-slate-500">{o.subtitle || '-'}</div>
                           </td>
                           <td className="px-5 py-3.5 font-bold text-emerald-600">
                             {o.discountValue}{o.offerType === 'PERCENTAGE' ? '%' : ' ₹'} OFF
                           </td>
                           <td className="px-5 py-3.5 text-slate-600 font-medium">
                             {o.minOrderValue > 0 ? `₹${o.minOrderValue}` : 'No Min'}
                           </td>
                           <td className="px-5 py-3.5">
                             <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                               o.isActive !== false ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
                             }`}>
                               {o.isActive !== false ? 'Active' : 'Inactive'}
                             </span>
                           </td>
                         </tr>
                       ))}
                       {offers.length === 0 && (
                         <tr>
                           <td colSpan={5} className="px-5 py-8 text-center text-slate-500 font-medium">
                             No coupon offers found. Click "Create New Coupon" to add one!
                           </td>
                         </tr>
                       )}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           )}

           {/* ================= TAB 4: SETTINGS ================= */}
           {activeTab === 'settings' && (
             <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm max-w-lg animate-in fade-in duration-200">
               <h3 className="text-lg font-black text-slate-900 mb-4">Security & Password</h3>
               <form onSubmit={handleUpdatePassword} className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1">New Admin Password</label>
                   <input
                     type="password"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     placeholder="Enter new password"
                     className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0866ed]"
                   />
                 </div>
                 <button
                   type="submit"
                   className="px-6 py-2.5 bg-[#0866ed] hover:bg-[#0652ba] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                 >
                   Update Password
                 </button>
               </form>
             </div>
           )}

        </div>
      </main>
    </div>
  );
}
