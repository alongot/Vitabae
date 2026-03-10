import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ full_name: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
        setFormData({ full_name: userData.full_name || '' });
      } catch (error) {
        // Redirect if not logged in
        base44.auth.redirectToLogin();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
       await base44.auth.updateMe({ full_name: formData.full_name });
       alert('Profile updated!');
    } catch (error) {
       alert('Failed to update profile');
    } finally {
       setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16">
       <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-3xl font-serif text-center mb-8">My Account</h1>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
             <form onSubmit={handleSave} className="space-y-6">
                <div>
                   <Label>Email</Label>
                   <Input value={user.email} disabled className="bg-gray-50" />
                </div>
                <div>
                   <Label>Full Name</Label>
                   <Input 
                      value={formData.full_name} 
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
                   />
                </div>
                
                <Button type="submit" disabled={saving} className="w-full bg-[#1E2A3A]">
                   {saving ? 'Saving...' : 'Update Profile'}
                </Button>

                <div className="border-t pt-6 mt-6">
                   <Button type="button" variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50" onClick={() => base44.auth.logout()}>
                      Log Out
                   </Button>
                </div>
             </form>
          </div>
       </div>
    </div>
  );
}