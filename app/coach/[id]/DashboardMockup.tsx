import React from 'react';

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
      <div className="text-lg font-semibold text-gray-700 mb-2">{title}</div>
      <div className="text-3xl font-bold text-[#4AC1E0]">{value}</div>
    </div>
  );
}

const recentActivities = [
  'You updated your profile',
  'New lead: John Doe',
  'You replied to a lead',
  'Profile viewed by 3 new users',
];

export default function DashboardMockup() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-1">
                <button className="w-full text-left px-4 py-2 rounded-lg bg-[#4AC1E0] text-white">Dashboard</button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Leads & Enquiries</button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Profile</button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card title="Profile Completeness" value="80%" />
              <Card title="New Leads" value={3} />
              <Card title="Profile Views" value={120} />
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <ul className="space-y-2">
                {recentActivities.map((activity, idx) => (
                  <li key={idx} className="text-gray-700 flex items-center">
                    <span className="mr-2 text-[#4AC1E0]">•</span> {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 