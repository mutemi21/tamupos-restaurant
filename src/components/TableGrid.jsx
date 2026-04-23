import { Users } from 'lucide-react'
import { since } from '../utils/format.js'

const STATUS_STYLES = {
  available: 'border-char-200/10 bg-char-800 hover:bg-char-700 text-char-100',
  occupied: 'border-ember-500/40 bg-ember-500/10 hover:bg-ember-500/20 text-ember-100',
  reserved: 'border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-100',
  paying: 'border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-100',
}

const STATUS_LABELS = {
  available: 'Free',
  occupied: 'Open',
  reserved: 'Reserved',
  paying: 'Paying',
}

export default function TableGrid({ tables, onSelect, selectedId, orders }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-semibold">Floor</h2>
        <div className="flex items-center gap-3 text-xs text-char-400">
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${dotColor(k)}`} /> {v}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {tables.map((t) => {
          const order = orders[t.id]
          const selected = selectedId === t.id
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`relative rounded-xl border p-4 text-left transition-all slide-up ${
                STATUS_STYLES[t.status]
              } ${selected ? 'ring-2 ring-ember-500 ring-offset-2 ring-offset-char-900' : ''}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl font-display font-semibold">{t.label}</span>
                <span className="flex items-center gap-1 text-xs opacity-80">
                  <Users size={12} /> {t.seats}
                </span>
              </div>

              {t.status === 'occupied' && t.openedAt && (
                <div className="mt-3 text-xs opacity-80">
                  <div>Open · {since(t.openedAt)}</div>
                  {order?.items?.length > 0 && (
                    <div className="mt-0.5 font-medium">
                      {order.items.reduce((s, i) => s + i.qty, 0)} items
                    </div>
                  )}
                </div>
              )}

              {t.status === 'paying' && (
                <div className="mt-3 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-300 pulse-ring" />
                  Awaiting payment
                </div>
              )}

              {t.status === 'reserved' && (
                <div className="mt-3 text-xs opacity-80">Booked · 7:30 PM</div>
              )}

              {t.status === 'available' && (
                <div className="mt-3 text-xs opacity-50">Tap to open</div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function dotColor(status) {
  return {
    available: 'bg-char-400',
    occupied: 'bg-ember-500',
    reserved: 'bg-sky-400',
    paying: 'bg-fuchsia-400',
  }[status]
}
