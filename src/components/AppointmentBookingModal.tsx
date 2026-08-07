import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../data/mockData';
import { Calendar, Clock, UserCheck, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [serviceType, setServiceType] = useState<'Immigration Info' | 'General Support' | 'Legal Referral' | 'Employment Support' | 'Language Support'>('Immigration Info');
  const [helperId, setHelperId] = useState<string>('user-helper');
  const [date, setDate] = useState<string>('2026-08-18');
  const [timeSlot, setTimeSlot] = useState<string>('11:00');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  if (!isOpen) return null;

  const helpers = DEMO_USERS.filter(u => ['HELPER', 'SUPPORT_STAFF'].includes(u.role));

  const timeSlots = ['09:30', '11:00', '14:30', '16:00', '17:30'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const helperObj = helpers.find(h => h.id === helperId);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: currentUser?.id || 'guest',
          memberName: currentUser?.name || 'Community Member',
          memberEmail: currentUser?.email || 'member@thedesi.news',
          memberPhone: currentUser?.phone || '+351 900 000 000',
          serviceType,
          helperId,
          helperName: helperObj?.name || 'Priya Sharma (Community Helper)',
          date,
          timeSlot,
          notes
        })
      });

      if (res.ok) {
        setConfirmed(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif font-bold text-lg text-white">Book Help Appointment</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="font-serif font-extrabold text-2xl text-stone-900">Appointment Requested!</h3>
            <p className="text-stone-600 text-xs">
              Your request for <strong>{serviceType}</strong> on <strong>{date} at {timeSlot}</strong> has been submitted.
              A TheDesi.news helper will confirm your appointment via email/SMS.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Service Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Select Service Required
              </label>
              <select
                value={serviceType}
                onChange={(e: any) => setServiceType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 font-medium focus:outline-none focus:border-emerald-500"
              >
                <option value="Immigration Info">AIMA & Residency Information</option>
                <option value="General Support">NIF / NISS / SNS Registration Help</option>
                <option value="Legal Referral">Legal & Work Contract Referral</option>
                <option value="Employment Support">Employment & Job Support</option>
                <option value="Language Support">Portuguese Language (PLA) Guidance</option>
              </select>
            </div>

            {/* Helper Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Assigned Helper / Support Staff
              </label>
              <select
                value={helperId}
                onChange={(e) => setHelperId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 font-medium focus:outline-none focus:border-emerald-500"
              >
                {helpers.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.municipality} Hub)
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-500"
                >
                  {timeSlots.map((ts) => (
                    <option key={ts} value={ts}>
                      {ts} WET
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Notes or Documents Details
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly describe what document or procedure you need help with..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-stone-600 hover:text-stone-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow transition"
              >
                {loading ? 'Submitting...' : 'Confirm Appointment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
