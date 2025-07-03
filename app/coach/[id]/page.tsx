"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthContext } from "../../components/AuthProvider";
import { db } from "../../lib/firebase";
import { doc, getDoc, collection, query, where, orderBy, getDocs, setDoc } from "firebase/firestore";
import CoachProfileForm from "../../../components/CoachProfileForm";

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
      <div className="text-lg font-semibold text-gray-700 mb-2">{title}</div>
      <div className="text-3xl font-bold text-[#4AC1E0]">{value}</div>
    </div>
  );
}

export default function CoachDashboard() {
  const { user, loading: authLoading } = useAuthContext();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [coachProfile, setCoachProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileViews, setProfileViews] = useState(120); // Placeholder
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      if (!authLoading) {
        if (!user) {
          router.push('/auth/signin');
          return;
        }
        // Unwrap params.id if it's a promise or array
        const coachId = Array.isArray(params.id) ? params.id[0] : params.id;
        if (user.uid !== coachId) {
          router.push('/');
          return;
        }

        // Check if user has a coach profile in coachProfiles
        const coachDoc = await getDoc(doc(db, 'coachProfiles', user.uid));
        if (!coachDoc.exists()) {
          router.push('/');
          return;
        }

        setCoachProfile(coachDoc.data());
        setLoadingProfile(false);
      }
    };

    checkAuth();
  }, [user, authLoading, params, router]);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!user) return;

      try {
        const leadsQuery = query(
          collection(db, 'coachLeads'),
          where('coachId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(leadsQuery);
        const leadsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setLeads(leadsData);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchLeads();
    }
  }, [user]);

  // Calculate profile completeness (simple example)
  const profileCompleteness = coachProfile ? Math.round(([
    coachProfile.profile?.name,
    coachProfile.profile?.bio,
    coachProfile.profile?.imageUrl,
    coachProfile.professional?.specialties,
    coachProfile.services,
    coachProfile.availability
  ].filter(Boolean).length / 6) * 100) : 0;

  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4AC1E0]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-[#4AC1E0] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("leads")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "leads"
                      ? "bg-[#4AC1E0] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Leads & Enquiries
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-[#4AC1E0] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Profile
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" ? (
              <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card title="Profile Completeness" value={profileCompleteness + '%'} />
                  <Card title="New Leads" value={leads.filter(l => l.status === 'new').length} />
                  <Card title="Profile Views" value={profileViews} />
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="text-gray-500">(Recent activity feed coming soon...)</div>
                </div>
              </div>
            ) : activeTab === "leads" ? (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Leads & Enquiries</h2>
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                ) : leads.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No leads or enquiries yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowLeadModal(true);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{lead.name}</h3>
                            <p className="text-sm text-gray-600">{lead.email}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lead.status === 'new' ? 'bg-green-100 text-green-800' :
                            lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {lead.message}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          {new Date(lead.createdAt?.toDate()).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>
                {coachProfile && (
                  <CoachProfileForm
                    initialData={coachProfile}
                    onSave={async (data) => {
                      try {
                        await setDoc(doc(db, 'coachProfiles', user.uid), data, { merge: true });
                        setCoachProfile(data);
                      } catch (error) {
                        console.error('Error saving profile:', error);
                      }
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Lead Details</h3>
              <button
                onClick={() => setShowLeadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1">{selectedLead.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1">{selectedLead.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1">{selectedLead.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 whitespace-pre-wrap">{selectedLead.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={selectedLead.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value;
                    try {
                      await setDoc(doc(db, 'coachLeads', selectedLead.id), {
                        status: newStatus
                      }, { merge: true });
                      setSelectedLead({ ...selectedLead, status: newStatus });
                      setLeads(leads.map(lead => 
                        lead.id === selectedLead.id 
                          ? { ...lead, status: newStatus }
                          : lead
                      ));
                    } catch (error) {
                      console.error('Error updating status:', error);
                    }
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4AC1E0] focus:ring-[#4AC1E0]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowLeadModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedLead.email}`}
                className="px-4 py-2 bg-[#4AC1E0] text-white rounded-lg hover:bg-[#3aa8c4]"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 