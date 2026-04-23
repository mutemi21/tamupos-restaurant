import { useState, useEffect } from 'react'
import { X, Check, Smartphone, Banknote, CreditCard } from 'lucide-react'
import { kes } from '../utils/format.js'

export default function MpesaModal({ amount, tableLabel, isOffline, onClose, onComplete }) {
  const [method, setMethod] = useState('mpesa')
  const [phone, setPhone] = useState('254712')
  const [stage, setStage] = useState('form') // form | sending | waiting | done | queued
  const [cashGiven, setCashGiven] = useState('')

  useEffect(() => {
    if (stage !== 'sending') return
    const t = setTimeout(() => {
      if (isOffline) {
        setStage('queued')
      } else {
        setStage('waiting')
      }
    }, 900)
    return () => clearTimeout(t)
  }, [stage, isOffline])

  useEffect(() => {
    if (stage !== 'waiting') return
    const t = setTimeout(() => setStage('done'), 2600)
    return () => clearTimeout(t)
  }, [stage])

  const finalize = () => {
    onComplete({ method, amount, phone, queued: stage === 'queued' })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-char-900 border border-char-800 rounded-2xl w-full max-w-md slide-up overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-char-800">
          <div>
            <div className="text-xs text-char-400 uppercase tracking-wider">Checkout</div>
            <div className="text-lg font-display font-semibold">
              Table {tableLabel} · {kes(amount)}
            </div>
          </div>
          {stage === 'form' && (
            <button onClick={onClose} className="text-char-400 hover:text-char-100">
              <X size={18} />
            </button>
          )}
        </div>

        {stage === 'form' && (
          <>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <MethodBtn
                  active={method === 'mpesa'}
                  onClick={() => setMethod('mpesa')}
                  icon={<Smartphone size={16} />}
                  label="M-Pesa"
                />
                <MethodBtn
                  active={method === 'cash'}
                  onClick={() => setMethod('cash')}
                  icon={<Banknote size={16} />}
                  label="Cash"
                />
                <MethodBtn
                  active={method === 'card'}
                  onClick={() => setMethod('card')}
                  icon={<CreditCard size={16} />}
                  label="Card"
                />
              </div>

              {method === 'mpesa' && (
                <div>
                  <label className="text-xs text-char-400 uppercase tracking-wider">
                    Customer phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full bg-char-800 rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-ember-500"
                    placeholder="254712345678"
                  />
                  <p className="text-xs text-char-400 mt-2">
                    An STK push will be sent to this number via Safaricom Daraja.
                  </p>
                </div>
              )}

              {method === 'cash' && (
                <div>
                  <label className="text-xs text-char-400 uppercase tracking-wider">
                    Cash received
                  </label>
                  <input
                    type="number"
                    value={cashGiven}
                    onChange={(e) => setCashGiven(e.target.value)}
                    className="mt-1 w-full bg-char-800 rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-ember-500"
                    placeholder={String(amount)}
                  />
                  {cashGiven && Number(cashGiven) >= amount && (
                    <div className="mt-2 text-sm">
                      Change:{' '}
                      <span className="font-mono text-ember-500 font-semibold">
                        {kes(Number(cashGiven) - amount)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {method === 'card' && (
                <div className="text-sm text-char-400 bg-char-800 rounded-lg p-3">
                  Tap or insert card on the Pesapal terminal.
                </div>
              )}
            </div>

            <div className="p-5 border-t border-char-800">
              <button
                onClick={() => {
                  if (method === 'mpesa') setStage('sending')
                  else setStage('done')
                }}
                className="w-full bg-ember-500 hover:bg-ember-600 text-char-900 font-semibold py-3 rounded-xl transition"
              >
                {method === 'mpesa' ? 'Send STK push' : 'Confirm payment'}
              </button>
            </div>
          </>
        )}

        {stage === 'sending' && <Status title="Sending STK push..." />}

        {stage === 'waiting' && (
          <Status title="Awaiting customer" subtitle={`Push sent to +${phone}`} pulse />
        )}

        {stage === 'queued' && (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center mx-auto">
              <Smartphone size={22} className="text-amber-400" />
            </div>
            <div>
              <div className="font-semibold">Queued for sync</div>
              <p className="text-sm text-char-400 mt-1 max-w-xs mx-auto">
                You are offline. The STK push will be sent as soon as connectivity
                returns.
              </p>
            </div>
            <button
              onClick={finalize}
              className="mt-2 px-4 py-2 bg-char-800 hover:bg-char-700 rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        )}

        {stage === 'done' && (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <Check size={22} className="text-emerald-400" />
            </div>
            <div>
              <div className="font-semibold">Payment received</div>
              <p className="text-sm text-char-400 mt-1">
                {kes(amount)} ·{' '}
                {method === 'mpesa'
                  ? 'M-Pesa ref QZC8K4L2'
                  : method === 'cash'
                  ? 'Cash'
                  : 'Card'}
              </p>
            </div>
            <button
              onClick={finalize}
              className="mt-2 px-4 py-2 bg-ember-500 hover:bg-ember-600 text-char-900 rounded-lg text-sm font-medium"
            >
              Print receipt
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function MethodBtn({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 py-3 rounded-xl border transition ${
        active
          ? 'bg-ember-500 text-char-900 border-ember-500 font-medium'
          : 'bg-char-800 border-char-800 text-char-100 hover:border-char-700'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  )
}

function Status({ title, subtitle, pulse }) {
  return (
    <div className="p-10 text-center">
      <div
        className={`w-14 h-14 rounded-2xl bg-ember-500/10 border border-ember-500/40 flex items-center justify-center mx-auto ${
          pulse ? 'pulse-ring' : ''
        }`}
      >
        <Smartphone size={22} className="text-ember-500" />
      </div>
      <div className="mt-4 font-semibold">{title}</div>
      {subtitle && <div className="text-sm text-char-400 mt-1">{subtitle}</div>}
    </div>
  )
}
