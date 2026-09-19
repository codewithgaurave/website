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
  ChevronRight
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorInfo, setErrorInfo] = useState('');
  
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'leads', 'settings'
  const [newPassword, setNewPassword] = useState('');
  const [truePassword, setTruePassword] = useState('zomo123');
  const [settingMsg, setSettingMsg] = useState('');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync password & auth state from memory
  useEffect(() => {
    const savedPin = localStorage.getItem('ZOMO_ADMIN_PASS');
    if(savedPin) setTruePassword(savedPin);
    
    const isLoggedIn = localStorage.getItem('ZOMO_IS_LOGGED_IN');
    if(isLoggedIn === 'true') {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === truePassword) { 
      setIsAuthenticated(true);
      localStorage.setItem('ZOMO_IS_LOGGED_IN', 'true');
      fetchLeads();
    } else {
      setErrorInfo('Invalid Admin Password.');
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const savedPin = localStorage.getItem('ZOMO_ADMIN_PASS') || 'zomo123';
      const res = await fetch('/api/admin/leads', {
        headers: {
          'Authorization': `Bearer ${savedPin}`
        }
      });
      const json = await res.json();
      if (json.success) {
        setLeads(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch leads", err);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
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
        headers: {
          'Authorization': `Bearer ${savedPin}`
        }
      });
      Swal.fire('Deleted!', 'Record has been permanently deleted.', 'success');
    } catch (error) {
      console.error("Failed to delete lead", error);
      fetchLeads();
    }
  };

  const exportToCSV = () => {
    if(leads.length === 0) return alert("No data to export");
    const headers = ["Date", "Name", "Phone", "Email", "Source", "Status"];
    const csvRows = [headers.join(",")];
    
    leads.forEach(lead => {
      const date = new Date(lead.createdAt).toLocaleDateString('en-GB');
      const name = `"${lead.name || '-'}"`;
      const phone = `"${lead.phone}"`;
      const email = `"${lead.email}"`;
      const req = `"${lead.sourceType || 'General'}"`;
      const status = `"${lead.status || 'Pending'}"`;
      csvRows.push([date, name, phone, email, req, status].join(","));
    });
    
    const csvData = new Blob([csvRows.join("\n")], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = `Leads_Export_${new Date().toLocaleDateString('en-GB')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if(newPassword.length < 4) {
      Swal.fire('Error', 'Password must be at least 4 characters long.', 'error');
      return;
    }
    localStorage.setItem('ZOMO_ADMIN_PASS', newPassword);
    setTruePassword(newPassword);
    
    Swal.fire({
      title: 'Password Updated!',
      text: 'Please remember your new password for future logins.',
      icon: 'success',
      confirmButtonColor: '#024a9d'
    });
    
    setNewPassword('');
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'End Session?',
      text: "You will be logged out of the admin panel.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#024a9d',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
         setIsAuthenticated(false);
         setPassword('');
         setActiveTab('dashboard');
         localStorage.removeItem('ZOMO_IS_LOGGED_IN');
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans px-4">
        <div className="w-full max-w-sm bg-white p-8 border border-gray-300 rounded-none shadow-sm">
           <h1 className="text-xl font-bold text-gray-800 mb-6 text-center border-b border-gray-200 pb-4 uppercase">
             Zomocook Admin
           </h1>
           <form onSubmit={handleLogin} className="space-y-4">
             {errorInfo && <div className="p-2 bg-red-50 text-red-700 text-sm border border-red-300">{errorInfo}</div>}
             <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Access Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-400 text-sm focus:outline-none focus:border-blue-700 rounded-none"
                />
             </div>
             <button type="submit" className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-none mt-2 uppercase tracking-wide">
               Login
             </button>
           </form>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' ? true : (lead.status || 'Pending') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const convertedCount = leads.filter(l => l.status === 'Converted').length;
  const pendingCount = leads.filter(l => (l.status || 'Pending') === 'Pending').length;
  const newToday = leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length;

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900 relative">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 1. SIDEBAR (CLASSIC DARK) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col rounded-none shrink-0 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="h-14 flex items-center justify-between px-4 bg-gray-950 border-b border-gray-800 shrink-0">
           <h1 className="text-xl font-black text-white uppercase tracking-wider">
             Zomocook
           </h1>
           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
             <span className="text-2xl font-bold">&times;</span>
           </button>
         </div>
         <div className="flex-1 py-4 flex flex-col overflow-y-auto">
           <div className="px-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 mt-2">Main Navigation</div>
           
           <button 
             onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
             className={`w-full flex items-center justify-between px-5 py-3 font-medium text-sm transition-colors rounded-none outline-none ${activeTab === 'dashboard' ? 'bg-blue-800 text-white border-l-4 border-blue-400' : 'text-gray-300 hover:text-white hover:bg-gray-800 border-l-4 border-transparent'}`}
           >
             <div className="flex items-center gap-3"><LayoutDashboard className="w-4 h-4" /> Overview</div>
             {activeTab === 'dashboard' && <ChevronRight className="w-4 h-4 text-blue-300" />}
           </button>
           
           <button 
             onClick={() => { setActiveTab('leads'); setIsSidebarOpen(false); }}
             className={`w-full flex items-center justify-between px-5 py-3 font-medium text-sm transition-colors rounded-none outline-none ${activeTab === 'leads' ? 'bg-blue-800 text-white border-l-4 border-blue-400' : 'text-gray-300 hover:text-white hover:bg-gray-800 border-l-4 border-transparent'}`}
           >
             <div className="flex items-center gap-3"><Users className="w-4 h-4" /> CRM Database</div>
             {activeTab === 'leads' && <ChevronRight className="w-4 h-4 text-blue-300" />}
           </button>

           <div className="px-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 mt-8">System</div>

           <button 
             onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
             className={`w-full flex items-center justify-between px-5 py-3 font-medium text-sm transition-colors rounded-none outline-none ${activeTab === 'settings' ? 'bg-blue-800 text-white border-l-4 border-blue-400' : 'text-gray-300 hover:text-white hover:bg-gray-800 border-l-4 border-transparent'}`}
           >
             <div className="flex items-center gap-3"><Settings className="w-4 h-4" /> Auth & Config</div>
             {activeTab === 'settings' && <ChevronRight className="w-4 h-4 text-blue-300" />}
           </button>

         </div>
         <div className="p-4 border-t border-gray-800 shrink-0">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 font-bold uppercase tracking-wider text-[11px] transition-colors rounded-none"
           >
             <LogOut className="w-4 h-4" /> Logout Session
           </button>
         </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 w-full lg:w-auto">
        
        {/* TOP HEADER (SQUARE, LIGHT) */}
        <header className="h-14 bg-white border-b border-gray-300 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm z-10">
           <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-1.5 text-gray-600 hover:bg-gray-100 border border-gray-300 focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeDasharray="none" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <span className="font-bold text-gray-800 text-xs sm:text-sm tracking-wide uppercase truncate">
                {activeTab === 'dashboard' ? 'System Overview' : activeTab === 'leads' ? 'Lead Database' : 'Settings'}
              </span>
           </div>
           <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-bold text-gray-500 uppercase tracking-widest border border-gray-300 px-3 py-1 bg-gray-50">Admin User</span>
              <span className="inline-block sm:hidden text-[10px] font-bold text-gray-500 uppercase border border-gray-300 px-2 py-1 bg-gray-50">Admin</span>
           </div>
        </header>

        {/* DYNAMIC CONTENT VIEWS */}
        <div className="flex-1 p-6 overflow-auto">
           
           {/* VIEW: DASHBOARD */}
           {activeTab === 'dashboard' && (
             <div className="animate-in fade-in duration-300">
               <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">At a Glance</h2>
               {/* STATS AREA */}
               <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-5 border border-gray-300 border-t-4 border-t-blue-600 rounded-none shadow-sm flex flex-col">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Contacts</span>
                     <span className="text-3xl font-black text-gray-900 mb-1">{leads.length}</span>
                     <span className="text-xs font-medium text-gray-400">All sources</span>
                  </div>
                  <div className="bg-white p-5 border border-gray-300 border-t-4 border-t-green-600 rounded-none shadow-sm flex flex-col">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Converted / Won</span>
                     <span className="text-3xl font-black text-gray-900 mb-1">{convertedCount}</span>
                     <span className="text-xs font-medium text-gray-400">Paying customers</span>
                  </div>
                  <div className="bg-white p-5 border border-gray-300 border-t-4 border-t-orange-500 rounded-none shadow-sm flex flex-col">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Needs Action</span>
                     <span className="text-3xl font-black text-gray-900 mb-1">{pendingCount}</span>
                     <span className="text-xs font-medium text-gray-400">Follow up required</span>
                  </div>
                  <div className="bg-white p-5 border border-gray-300 border-t-4 border-t-purple-600 rounded-none shadow-sm flex flex-col">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Today</span>
                     <span className="text-3xl font-black text-gray-900 mb-1">{newToday}</span>
                     <span className="text-xs font-medium text-gray-400">In last 24 hrs</span>
                  </div>
               </div>

               {/* QUICK RECENT TABLE */}
               <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Most Recent Activity (Top 5)</h2>
               <div className="bg-white border border-gray-300 overflow-x-auto shadow-sm rounded-none">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 font-bold uppercase text-xs tracking-wider border-b border-gray-300">
                        <th className="px-4 py-3 border-r border-gray-300 w-1/4">Name</th>
                        <th className="px-4 py-3 border-r border-gray-300 w-1/4">Phone</th>
                        <th className="px-4 py-3 border-r border-gray-300 w-1/4">Looking For</th>
                        <th className="px-4 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                       {leads.slice(0, 5).map((lead, i) => (
                          <tr key={i} className="hover:bg-blue-50 transition-colors">
                             <td className="px-4 py-3 border-r border-gray-200 font-bold capitalize">{lead.name || '-'}</td>
                             <td className="px-4 py-3 border-r border-gray-200">{lead.phone}</td>
                             <td className="px-4 py-3 border-r border-gray-200 text-gray-600 truncate max-w-[200px]">{lead.sourceType}</td>
                             <td className="px-4 py-3 text-center">
                               <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border bg-gray-50 text-gray-700 border-gray-300`}>
                                 {lead.status || 'Pending'}
                               </span>
                             </td>
                          </tr>
                       ))}
                       {leads.length === 0 && (
                          <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500 font-medium">No recent activity.</td></tr>
                       )}
                    </tbody>
                  </table>
               </div>
               
               <button onClick={() => setActiveTab('leads')} className="mt-4 text-blue-700 hover:text-blue-900 font-bold text-sm tracking-wide flex items-center gap-1 group">
                 View complete database <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
           )}

           {/* VIEW: CRM / LEADS */}
           {activeTab === 'leads' && (
             <div className="animate-in fade-in duration-300 flex flex-col h-full">
               {/* TABLE CONTROL BAR */}
               <div className="bg-gray-200 border border-gray-300 border-b-0 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-none">
                  <div className="font-bold text-gray-800 text-sm">Data Registry ({filteredLeads.length})</div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                     <div className="relative">
                       <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                       <input 
                         type="text" 
                         placeholder="Search..."
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="pl-8 pr-3 py-1.5 border border-gray-400 text-sm focus:outline-none focus:border-blue-700 bg-white min-w-[200px]"
                       />
                     </div>
                     
                     <select 
                       value={statusFilter} 
                       onChange={(e) => setStatusFilter(e.target.value)}
                       className="py-1.5 px-3 border border-gray-400 text-sm font-medium bg-white focus:outline-none outline-none"
                     >
                       <option value="All">All Statuses</option>
                       <option value="Pending">Pending</option>
                       <option value="Contacted">Contacted</option>
                       <option value="Converted">Converted</option>
                       <option value="Junk">Junk</option>
                     </select>
                     
                     <button onClick={exportToCSV} className="bg-gray-800 hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-wide px-3 py-2 flex items-center gap-2 border border-gray-900 transition-colors">
                        <Download className="w-3.5 h-3.5" /> CSV Export
                     </button>
                     <button onClick={fetchLeads} className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wide px-3 py-2 border border-blue-800 transition-colors">
                        Refresh Sync
                     </button>
                  </div>
               </div>

               {/* CLASSIC SQUARE TABLE */}
               <div className="bg-white border border-gray-300 overflow-x-auto shadow-sm rounded-none border-t-0">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 font-bold uppercase text-xs tracking-wider border-y border-gray-300">
                        <th className="px-4 py-3 border-r border-gray-300">Date Logged</th>
                        <th className="px-4 py-3 border-r border-gray-300">Client Name</th>
                        <th className="px-4 py-3 border-r border-gray-300">Contact Number</th>
                        <th className="px-4 py-3 border-r border-gray-300">Email Address</th>
                        <th className="px-4 py-3 border-r border-gray-300">Source Entry</th>
                        <th className="px-4 py-3 border-r border-gray-300 text-center">Deal Status</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-800 divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-16 text-center text-sm font-semibold text-gray-500">
                            Loading database entries...
                          </td>
                        </tr>
                      ) : filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-16 text-center text-sm font-semibold text-gray-500 bg-gray-50">
                            No records match the active database filters.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead, index) => (
                          <tr key={index} className="hover:bg-blue-50/50 transition-colors border-b border-gray-200">
                            <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                               {new Date(lead.createdAt).toLocaleDateString('en-GB')} <br/>
                               <span className="text-xs text-gray-500">{new Date(lead.createdAt).toLocaleTimeString([], {timeStyle: 'short'})}</span>
                            </td>
                            <td className="px-4 py-3 border-r border-gray-200 font-bold capitalize">
                               {lead.name || 'N/A'}
                            </td>
                            <td className="px-4 py-3 border-r border-gray-200 font-medium">
                               {lead.phone}
                            </td>
                            <td className="px-4 py-3 border-r border-gray-200 text-gray-600 truncate max-w-[150px]" title={lead.email}>
                               {lead.email}
                            </td>
                            <td className="px-4 py-3 border-r border-gray-200">
                               <button 
                                 onClick={() => setSelectedSource(lead.sourceType || 'Form')}
                                 className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-1 text-[11px] font-bold uppercase border border-gray-300 truncate max-w-[120px] inline-block cursor-pointer transition-colors" 
                                 title="Click to view full source"
                               >
                                 {lead.sourceType || 'Form'}
                               </button>
                            </td>
                            <td className="px-4 py-3 border-r border-gray-200 text-center">
                               <select 
                                 value={lead.status || 'Pending'}
                                 onChange={(e) => updateStatus(lead._id, e.target.value)}
                                 className={`text-xs font-bold px-2 py-1 outline-none border cursor-pointer border-gray-400
                                   ${(!lead.status || lead.status === 'Pending') ? 'bg-orange-100 text-orange-900 border-orange-300' : 
                                     lead.status === 'Contacted' ? 'bg-blue-100 text-blue-900 border-blue-300' : 
                                     lead.status === 'Converted' ? 'bg-green-100 text-green-900 border-green-300' : 
                                     'bg-red-100 text-red-900 border-red-300' // Junk
                                   }
                                 `}
                               >
                                  <option value="Pending">Pending</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Converted">Converted</option>
                                  <option value="Junk">Junk</option>
                               </select>
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2">
                                <a 
                                  href={`tel:${lead.phone}`} 
                                  className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-bold text-[11px] uppercase tracking-wide px-2 py-1 border border-green-700 transition-colors"
                                >
                                  <Phone className="w-3 h-3" /> Call
                                </a>
                                <button 
                                  onClick={() => deleteLead(lead._id)}
                                  title="Delete Record"
                                  className="inline-flex items-center gap-1 bg-gray-200 hover:bg-red-600 hover:text-white text-gray-700 font-bold px-2 py-1 border border-gray-400 hover:border-red-700 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
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
           )}

           {/* VIEW: SETTINGS */}
           {activeTab === 'settings' && (
             <div className="animate-in fade-in duration-300">
               <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">System Configuration</h2>
               <div className="bg-white p-6 border border-gray-300 shadow-sm max-w-lg mb-6">
                 <h3 className="font-bold text-gray-800 mb-4 block border-b border-gray-200 pb-2">Change Master Password</h3>
                 
                 {settingMsg && (
                    <div className={`p-3 text-sm font-bold border mb-4 ${settingMsg.includes('Success') ? 'bg-green-50 text-green-700 border-green-300' : 'bg-red-50 text-red-700 border-red-300'}`}>
                      {settingMsg}
                    </div>
                 )}

                 <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                      <input 
                        type="password" 
                        placeholder="Enter new 4+ character PIN..." 
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 focus:border-blue-700 focus:outline-none bg-white text-gray-800" 
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white transition-colors px-4 py-2.5 font-bold tracking-wide uppercase text-sm border border-blue-900 mt-2 hover:shadow-md">
                      Update Secure Password
                    </button>
                 </form>
               </div>
               
               <div className="bg-white p-6 border border-gray-300 shadow-sm max-w-lg">
                 <h3 className="font-bold text-gray-800 mb-3 block border-b border-gray-200 pb-2">Database Tools</h3>
                 <button onClick={exportToCSV} className="w-full bg-gray-800 hover:bg-gray-900 text-white transition-colors px-4 py-2.5 font-bold tracking-wide uppercase text-sm border border-gray-900 flex justify-center items-center gap-2">
                    <Download className="w-4 h-4"/> Download Full CRM Backup (CSV)
                 </button>
               </div>
             </div>
           )}

        </div>
      </main>

      {/* POPUP MODAL FOR SOURCE */}
      {selectedSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
           <div className="bg-white border text-center border-gray-300 shadow-xl max-w-sm w-full p-6 relative">
              <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase text-sm tracking-wide">
                Full Source Entry
              </h3>
              <p className="text-gray-700 font-semibold text-lg leading-relaxed mb-6">
                {selectedSource}
              </p>
              <button 
                onClick={() => setSelectedSource(null)}
                className="bg-gray-900 hover:bg-black text-white font-bold uppercase text-xs tracking-wider px-6 py-2 border border-gray-950 transition-colors w-full cursor-pointer"
              >
                Close
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
