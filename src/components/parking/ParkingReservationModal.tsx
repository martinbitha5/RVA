import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CheckCircle, ChevronRight, Car,
  Calendar, Copy, Smartphone, CreditCard,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import type { ParkingLot } from '@/types/database';

interface Props {
  lot: ParkingLot | null;
  open: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;
type PayMethod = 'airtel_money' | 'mpesa' | 'orange_money' | 'card';

const vehicleSchema = z.object({
  plate: z.string().min(3, 'Plaque invalide'),
  fullName: z.string().min(3, 'Nom requis'),
  phone: z.string().min(9, 'Téléphone requis'),
  email: z.string().email('Email invalide').or(z.literal('')),
});

type PayIcon = typeof Smartphone | typeof CreditCard;
const PAY_METHODS: { id: PayMethod; label: string; Icon: PayIcon; dot: string; color: string }[] = [
  { id: 'airtel_money',  label: 'Airtel Money',   Icon: Smartphone,  dot: 'bg-red-500',    color: 'border-red-400 bg-red-50' },
  { id: 'mpesa',         label: 'M-Pesa Vodacom', Icon: Smartphone,  dot: 'bg-green-600',  color: 'border-green-500 bg-green-50' },
  { id: 'orange_money',  label: 'Orange Money',   Icon: Smartphone,  dot: 'bg-orange-500', color: 'border-orange-400 bg-orange-50' },
  { id: 'card',          label: 'Carte bancaire',  Icon: CreditCard,  dot: 'bg-rdc-blue',   color: 'border-rdc-blue bg-blue-50' },
];

function calcTotal(lot: ParkingLot, days: number): number {
  if (days <= 0) return 0;
  if (days === 1) return lot.hourly_rate_usd ? lot.hourly_rate_usd * 24 : (lot.daily_rate_usd ?? 0);
  if (days <= 7) return (lot.daily_rate_usd ?? 0) * days;
  return (lot.weekly_rate_usd ?? 0) * Math.ceil(days / 7);
}

function genCode(): string {
  return `FIH-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}

export function ParkingReservationModal({ lot, open, onClose }: Props) {
  const { t } = useTranslation();
  const [step, setStep]             = useState<Step>(1);
  const [startDate, setStartDate]   = useState('');
  const [endDate, setEndDate]       = useState('');
  const [plate, setPlate]           = useState('');
  const [fullName, setFullName]     = useState('');
  const [phone, setPhone]           = useState('');
  const [email, setEmail]           = useState('');
  const [payMethod, setPayMethod]   = useState<PayMethod>('airtel_money');
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [loading, setLoading]       = useState(false);
  const [confirmCode, setConfirmCode] = useState('');
  const [copied, setCopied]         = useState(false);

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86_400_000))
    : 1;
  const total = lot ? calcTotal(lot, days) : 0;

  function reset() {
    setStep(1); setStartDate(''); setEndDate(''); setPlate('');
    setFullName(''); setPhone(''); setEmail(''); setPayMethod('airtel_money');
    setErrors({}); setConfirmCode('');
  }

  function handleClose() { reset(); onClose(); }

  function goStep2() {
    if (!startDate || !endDate) { setErrors({ date: t('parking.reservation.dateRequired') }); return; }
    if (new Date(endDate) <= new Date(startDate)) { setErrors({ date: t('parking.reservation.dateInvalid') }); return; }
    setErrors({}); setStep(2);
  }

  function goStep3() {
    const result = vehicleSchema.safeParse({ plate, fullName, phone, email: email || '' });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs); return;
    }
    setErrors({}); setStep(3);
  }

  async function handleConfirm() {
    if (!lot) return;
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const code = genCode();
      await supabase.from('parking_reservations').insert({
        user_id: user?.id ?? null,
        parking_lot_id: lot.id,
        vehicle_plate: plate,
        start_at: new Date(startDate).toISOString(),
        end_at: new Date(endDate).toISOString(),
        total_amount_usd: total,
        payment_method: payMethod,
        payment_status: 'paid',
        reservation_code: code,
      } as never);
      setConfirmCode(code);
      setStep(4);
    } catch {
      setErrors({ submit: t('common.error') });
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    void navigator.clipboard.writeText(confirmCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const STEPS = [
    t('parking.reservation.step1'),
    t('parking.reservation.step2'),
    t('parking.reservation.step3'),
    t('parking.reservation.step4'),
  ];

  if (!lot) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-lg gap-0 p-0 overflow-hidden" aria-describedby={undefined}>
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="font-display text-lg">
            {step < 4 ? t('parking.reservation.title', { lot: lot.name }) : t('parking.reservation.confirmed')}
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        {step < 4 && (
          <div className="flex border-b border-border">
            {STEPS.slice(0, 3).map((label, i) => (
              <div
                key={i}
                className={cn(
                  'flex flex-1 flex-col items-center gap-0.5 py-3 text-[10px] font-semibold uppercase tracking-wide',
                  step === i + 1 ? 'text-rdc-blue' : step > i + 1 ? 'text-rdc-green' : 'text-muted-foreground',
                )}
              >
                <div className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold',
                  step === i + 1 ? 'bg-rdc-blue text-white' : step > i + 1 ? 'bg-rdc-green text-white' : 'bg-muted text-muted-foreground',
                )}>
                  {step > i + 1 ? <CheckCircle size={10} /> : i + 1}
                </div>
                <span className="hidden sm:block">{label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="px-6 py-5">
          {/* STEP 1 — Dates */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="font-semibold text-sm text-rdc-anthracite">{lot.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lot.hourly_rate_usd != null ? `$${lot.hourly_rate_usd}/h` : ''}
                  {lot.daily_rate_usd != null ? ` · $${lot.daily_rate_usd}/jour` : ''}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium">{t('parking.reservation.arrival')}</label>
                  <div className="relative">
                    <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="pl-8 text-xs" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">{t('parking.reservation.departure')}</label>
                  <div className="relative">
                    <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="pl-8 text-xs" />
                  </div>
                </div>
              </div>
              {errors.date && <p className="text-xs text-rdc-red">{errors.date}</p>}
              {startDate && endDate && new Date(endDate) > new Date(startDate) && (
                <div className="rounded-lg border border-rdc-blue/20 bg-rdc-blue/5 px-4 py-3 text-sm">
                  <span className="text-muted-foreground">{days} jour{days > 1 ? 's' : ''} — </span>
                  <span className="font-bold text-rdc-blue">${total.toFixed(2)} USD</span>
                </div>
              )}
              <Button onClick={goStep2} className="w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white gap-2">
                {t('common.confirm')} <ChevronRight size={15} />
              </Button>
            </div>
          )}

          {/* STEP 2 — Vehicle */}
          {step === 2 && (
            <div className="space-y-4">
              {[
                { key: 'plate',    label: t('parking.reservation.plate'),    icon: Car,       placeholder: 'AB 1234 CD', val: plate,    set: setPlate },
                { key: 'fullName', label: t('parking.reservation.fullName'), icon: null,      placeholder: 'Jean Kabila', val: fullName, set: setFullName },
                { key: 'phone',    label: t('parking.reservation.phone'),    icon: null,      placeholder: '+243 8X XXX XXXX', val: phone, set: setPhone },
                { key: 'email',    label: `${t('parking.reservation.email')} (${t('common.optional')})`, icon: null, placeholder: 'vous@email.com', val: email, set: setEmail },
              ].map(({ key, label, placeholder, val, set }) => (
                <div key={key}>
                  <label className="mb-1 block text-xs font-medium">{label}</label>
                  <Input value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} className={errors[key] ? 'border-rdc-red' : ''} />
                  {errors[key] && <p className="mt-0.5 text-xs text-rdc-red">{errors[key]}</p>}
                </div>
              ))}
              <div className="flex gap-3 pt-1">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">{t('common.back')}</Button>
                <Button onClick={goStep3} className="flex-1 bg-rdc-blue hover:bg-rdc-blue/85 text-white gap-2">
                  {t('common.confirm')} <ChevronRight size={15} />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 — Payment */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm font-medium">{t('parking.reservation.payMethod')}</p>
              <div className="grid grid-cols-2 gap-2">
                {PAY_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    className={cn(
                      'flex items-center gap-2 rounded-xl border-2 p-3 text-left text-xs font-medium transition-all',
                      payMethod === m.id ? m.color + ' border-opacity-100 shadow-sm' : 'border-border hover:border-muted-foreground/40',
                    )}
                  >
                    <span className={`flex h-4 w-4 flex-shrink-0 rounded-full ${m.dot}`} />
                    {m.label}
                  </button>
                ))}
              </div>

              {payMethod !== 'card' && (
                <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">{t('parking.reservation.mobileMoneyNote')}</p>
                  <p>{t('parking.reservation.mobileMoneyDesc')}</p>
                </div>
              )}

              <div className="rounded-xl border border-rdc-blue/20 bg-rdc-blue/5 px-4 py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('parking.reservation.total')}</span>
                  <span className="font-bold text-rdc-blue text-base">${total.toFixed(2)} USD</span>
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  ≈ {(total * 2800).toLocaleString('fr-FR')} CDF
                </p>
              </div>

              {errors.submit && <p className="text-xs text-rdc-red">{errors.submit}</p>}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">{t('common.back')}</Button>
                <Button onClick={() => void handleConfirm()} disabled={loading} className="flex-1 bg-rdc-blue hover:bg-rdc-blue/85 text-white">
                  {loading ? t('common.loading') : t('parking.reservation.pay')}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4 — Confirmation */}
          {step === 4 && (
            <div className="text-center space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rdc-green/10">
                <CheckCircle size={32} className="text-rdc-green" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-rdc-anthracite">
                  {t('parking.reservation.successTitle')}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{t('parking.reservation.successDesc')}</p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/30 p-5">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=FIH-RSVP-${confirmCode}&color=003DA5&bgcolor=F7F7F2`}
                    alt={`QR Code ${confirmCode}`}
                    className="w-44 h-44 rounded-xl"
                  />
                  <p className="font-mono text-sm font-bold tracking-widest text-rdc-anthracite">
                    {confirmCode}
                  </p>
                </div>
              </div>

              <button
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 text-xs text-rdc-blue hover:text-rdc-blue/80"
              >
                <Copy size={12} />
                {copied ? t('parking.reservation.copied') : t('parking.reservation.copyCode')}
              </button>

              <p className="text-xs text-muted-foreground">{t('parking.reservation.qrNote')}</p>

              <Button onClick={handleClose} className="w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white">
                {t('common.close')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
