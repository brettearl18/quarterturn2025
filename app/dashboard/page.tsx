export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#4AC1E0]">Welcome to your Dashboard!</h1>
        <p className="text-lg text-gray-700 mb-6">You are signed in. Here you can manage your profile, view your activity, and access exclusive features.</p>
        {/* Add more dashboard widgets or links here as you build out features */}
      </div>
    </div>
  );
} 