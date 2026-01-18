
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_COLLABORATORS, containerVariants, itemVariants } from '../constants.ts';
import { 
  Users, Plus, Shield, ShieldAlert, ShieldCheck, Mail, Calendar, 
  MoreHorizontal, Search, Loader2, CheckCircle2, X, UserMinus, 
  History, Activity, Key
} from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { cn } from '../components/ui/Aceternity.tsx';

export const Collaborators: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<'form' | 'loading' | 'success'>('form');

  // Monitor URL parameters for action triggers
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'invite') {
      setShowInviteModal(true);
    }
  }, [location]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <ShieldAlert size={14} className="text-red-400" />;
      case 'Editor': return <ShieldCheck size={14} className="text-primary-400" />;
      default: return <Shield size={14} className="text-neutral-400" />;
    }
  };

  const handleRoleChange = (id: string) => {
    setUpdatingId(id);
    setTimeout(() => {
      setUpdatingId(null);
    }, 2000);
  };

  const handleInvite = () => {
    setInviteStatus('loading');
    setTimeout(() => setInviteStatus('success'), 2000);
    setTimeout(() => {
      setShowInviteModal(false);
      setInviteStatus('form');
    }, 4000);
  };

  const filteredCollaborators = MOCK_COLLABORATORS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">Operator Mesh</h1>
          <p className="text-neutral-500 mt-2 text-lg">Manage identity silos and access tiers across your organization.</p>
        </div>
        <Button variant="glow" size="lg" className="rounded-2xl h-12 active:scale-95" onClick={() => setShowInviteModal(true)}>
          <Plus size={20} className="mr-2" /> Invite Operator
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {[
           { label: 'Total Mesh Operators', value: '24', icon: Users, color: 'text-primary-400', trend: '+2 this week' },
           { label: 'Privileged Access', value: '4', icon: ShieldAlert, color: 'text-red-400', trend: 'No changes' },
           { label: 'Identity Health', value: 'Optimal', icon: ShieldCheck, color: 'text-green-400', trend: 'Verified' }
         ].map(stat => (
           <div key={stat.label} className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-3xl backdrop-blur-md group hover:border-primary-500/30 transition-all active:scale-[0.98] cursor-default">
              <div className="flex items-center justify-between mb-6">
                 <div className={cn("p-3 rounded-2xl bg-neutral-950 border border-neutral-800 transition-colors group-hover:bg-primary-500/5", stat.color)}>
                    <stat.icon size={20} />
                 </div>
                 <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{stat.trend}</span>
              </div>
              <p className="text-4xl font-display font-bold text-white">{stat.value}</p>
              <p className="text-sm font-medium text-neutral-500 mt-1 uppercase tracking-wider">{stat.label}</p>
           </div>
         ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="p-6 border-b border-neutral-800/60 bg-neutral-950/20 flex items-center gap-4">
           <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Filter by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:border-primary-500 outline-none transition-all"
              />
           </div>
        </div>

        <div className="px-8 py-5 grid grid-cols-12 gap-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] border-b border-neutral-800/60">
          <div className="col-span-5">Identity Profile</div>
          <div className="col-span-2">Access Tier</div>
          <div className="col-span-3">Mesh Integration</div>
          <div className="col-span-2 text-right">Operations</div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="divide-y divide-neutral-800/60">
          {filteredCollaborators.map((user) => (
            <motion.div 
              key={user.id}
              variants={itemVariants}
              className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-neutral-800/30 transition-colors group"
            >
              <div className="col-span-5 flex items-center gap-4">
                <div className="relative">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-white font-bold text-sm border border-neutral-600 shadow-xl group-hover:scale-110 transition-transform">
                    {user.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-neutral-900 bg-green-500 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-neutral-200 truncate group-hover:text-primary-400 transition-colors">{user.name}</p>
                  <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5"><Mail size={10} /> {user.email}</p>
                </div>
              </div>

              <div className="col-span-2">
                <button 
                  onClick={() => handleRoleChange(user.id)}
                  disabled={updatingId === user.id}
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all hover:bg-neutral-800 active:scale-90",
                    updatingId === user.id ? "bg-primary-500/10 border-primary-500/30 text-primary-400" : "bg-neutral-900 border-neutral-800 text-neutral-400"
                  )}
                >
                  {updatingId === user.id ? <Loader2 size={12} className="animate-spin" /> : getRoleIcon(user.role)}
                  {updatingId === user.id ? 'Syncing...' : user.role}
                </button>
              </div>

              <div className="col-span-3 flex items-center gap-6">
                 <div className="flex flex-col">
                   <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Joined</span>
                   <span className="text-xs text-neutral-400 font-medium">{user.joinedAt}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Pulse</span>
                   <div className="flex items-center gap-1 mt-0.5">
                      {[1,1,1,0.5,0.8].map((v, i) => (
                        <div key={i} className="w-1 rounded-full bg-primary-500/40" style={{ height: v * 10 }} />
                      ))}
                   </div>
                 </div>
              </div>

              <div className="col-span-2 text-right flex justify-end gap-2">
                <button className="p-2.5 text-neutral-600 hover:text-white hover:bg-neutral-800 rounded-xl transition-all opacity-0 group-hover:opacity-100 active:scale-75"><Activity size={18} /></button>
                <button className="p-2.5 text-neutral-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 active:scale-75"><UserMinus size={18} /></button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => inviteStatus !== 'loading' && setShowInviteModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
               {inviteStatus === 'form' && (
                 <div className="p-8">
                   <div className="h-14 w-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-6">
                      <Key size={28} />
                   </div>
                   <h2 className="text-2xl font-display font-bold text-white mb-2">Invite Operator</h2>
                   <p className="text-neutral-500 text-sm mb-8 leading-relaxed">Provision access to the Lumina mesh. Ensure the operator identity is verified externally.</p>
                   
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
                         <input type="email" className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3.5 text-white outline-none focus:border-primary-500 transition-all placeholder:text-neutral-700" placeholder="operator@lumina.ai" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Initial Access Tier</label>
                         <div className="grid grid-cols-3 gap-2">
                            {['Viewer', 'Editor', 'Admin'].map(role => (
                              <button key={role} className="py-2.5 rounded-xl border border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-500 hover:text-white hover:border-neutral-600 transition-all active:scale-95 active:bg-neutral-800">
                                {role}
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-4 mt-10">
                      <Button variant="secondary" className="flex-1 h-12 rounded-2xl active:scale-95" onClick={() => setShowInviteModal(false)}>Cancel</Button>
                      <Button variant="primary" className="flex-1 h-12 rounded-2xl active:scale-95" onClick={handleInvite}>Send Invitation</Button>
                   </div>
                 </div>
               )}

               {inviteStatus === 'loading' && (
                 <div className="p-12 flex flex-col items-center text-center">
                    <Loader2 size={48} className="text-primary-500 animate-spin mb-6" />
                    <h2 className="text-2xl font-display font-bold text-white mb-2">Syncing Identity...</h2>
                    <p className="text-neutral-500 text-sm">Validating mesh credentials and generating temporal access keys.</p>
                 </div>
               )}

               {inviteStatus === 'success' && (
                 <div className="p-12 flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-6 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                       <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-2">Invitation Transmitted</h2>
                    <p className="text-neutral-500 text-sm">The operator has been provisioned and will appear in the mesh once identity is verified.</p>
                 </div>
               )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
