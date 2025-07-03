import React from 'react';

interface StatusProps {
  label: string;
  status: 'ok' | 'warn' | 'error';
  icon?: React.ReactNode;
}

function StatusLight({ label, status, icon }: StatusProps) {
  const color = status === 'ok' ? 'bg-green-500' : status === 'warn' ? 'bg-yellow-400' : 'bg-red-500';
  return (
    <div className="flex items-center gap-1 mr-4">
      <span className={`inline-block w-3 h-3 rounded-full ${color} border border-gray-300`} />
      {icon}
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

const GoogleMapsIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mr-1">
    <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.11 10.74 8.09 11.48.34.25.81.25 1.15 0C13.89 21.74 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C9.14 17.1 5 13.61 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.61-4.14 6.1-7 8.88z" fill="#4285F4"/>
    <circle cx="12" cy="11" r="3" fill="#34A853"/>
  </svg>
);

export default function TrafficLightStatus({
  app = 'ok',
  firestore = 'ok',
  openai = 'ok',
  google = 'ok',
}: {
  app?: 'ok' | 'warn' | 'error';
  firestore?: 'ok' | 'warn' | 'error';
  openai?: 'ok' | 'warn' | 'error';
  google?: 'ok' | 'warn' | 'error';
}) {
  return (
    <div className="flex items-center gap-2">
      <StatusLight label="App" status={app} />
      <StatusLight label="Firestore" status={firestore} />
      <StatusLight label="OpenAI" status={openai} />
      <StatusLight label="Google API" status={google} icon={GoogleMapsIcon} />
    </div>
  );
} 