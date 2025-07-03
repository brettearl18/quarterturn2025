import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { db } from '../app/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface EnquiryFormModalProps {
  open: boolean;
  onClose: () => void;
  coachId: string;
  coachName?: string;
  user?: { name: string; email: string } | null;
}

export default function EnquiryFormModal({ open, onClose, coachId, coachName, user }: EnquiryFormModalProps) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone('');
    setMessage('');
    setConsent(false);
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setError('You must agree to the privacy policy.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'coachLeads'), {
        coachId,
        coachName: coachName || '',
        name,
        email,
        phone,
        message,
        createdAt: serverTimestamp(),
        status: 'New',
      });
      setSuccess(true);
      resetForm();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Transition.Root show={open} as={Dialog} onClose={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">×</button>
            <Dialog.Title className="text-xl font-bold mb-4">Contact {coachName || 'Coach'}</Dialog.Title>
            {success ? (
              <div className="text-green-600 font-semibold text-center py-8">
                Thank you! Your enquiry has been sent.<br />The coach will get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input type="text" className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input type="email" className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone (optional)</label>
                  <input type="tel" className="w-full border rounded px-3 py-2" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <textarea className="w-full border rounded px-3 py-2 min-h-[80px]" value={message} onChange={e => setMessage(e.target.value)} required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="consent" checked={consent} onChange={e => setConsent(e.target.checked)} required />
                  <label htmlFor="consent" className="text-xs text-gray-600">I agree to the <a href="/privacy" target="_blank" className="underline">privacy policy</a>.</label>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2 disabled:opacity-50" disabled={loading}>{loading ? 'Sending...' : 'Send Enquiry'}</button>
              </form>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
} 