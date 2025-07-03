"use client";
import { useState, useEffect, Fragment } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where, orderBy, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Dialog, Transition } from '@headlessui/react';
import CoachProfileForm from '../../components/CoachProfileForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthContext } from "../components/AuthProvider";

const SIDEBAR_ITEMS = [
  { key: 'leads', label: 'Leads/Enquiries' },
  { key: 'profile', label: 'Profile' },
];

interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: { seconds: number } | Date;
  status?: string;
}

function EnquiryDetailModal({ open, onClose, lead, onMarkResponded, onArchive }) {
  if (!lead) return null;
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">×</button>
                <Dialog.Title className="text-xl font-bold mb-2">Enquiry from {lead.name}</Dialog.Title>
                <div className="mb-4 flex flex-col gap-1 text-sm">
                  <span><span className="font-semibold">Email:</span> <a href={`mailto:${lead.email}`} className="text-blue-600 underline">{lead.email}</a></span>
                  {lead.phone && <span><span className="font-semibold">Phone:</span> {lead.phone}</span>}
                  <span><span className="font-semibold">Date:</span> {lead.createdAt && (lead.createdAt instanceof Date ? lead.createdAt.toLocaleString() : new Date(lead.createdAt.seconds * 1000).toLocaleString())}</span>
                  <span><span className="font-semibold">Status:</span> <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${lead.status === 'Responded' ? 'bg-green-100 text-green-700' : lead.status === 'Archived' ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-700'}`}>{lead.status || 'New'}</span></span>
                </div>
                <div className="mb-6">
                  <div className="font-semibold mb-1">Message:</div>
                  <div className="bg-gray-50 rounded p-3 text-gray-700 whitespace-pre-line">{lead.message}</div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => window.open(`mailto:${lead.email}`)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">Reply</button>
                  <button onClick={onMarkResponded} className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200">Mark as Responded</button>
                  <button onClick={onArchive} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">Archive</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function CoachRedirect() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      } else {
        router.push(`/coach/${user.uid}`);
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4AC1E0]"></div>
    </div>
  );
} 