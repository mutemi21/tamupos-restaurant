import { Clock, Check } from 'lucide-react'
import { since } from '../utils/format.js'

export default function KitchenDisplay({ orders, tables, onMark }) {
  const active = Object.entries(orders)
    .filter(([, o]) => o.items.some((i) => i.sentToKitchen && !i.ready))
    .map(([tableId, o]) => ({
      tableId: Number(tableId),
      label: tables.find((t) => t.id === Number(tableId))?.label,
      sentAt: o.sentAt,
      items: o.items.filter((i) => i.sentToKitchen && !i.ready),
    }))

  if (active.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-char-400 py-20">
        <div className="text-4xl mb-3">🍽️</div>
        <p className="text-sm">No active tickets. Kitchen's clear.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-display font-semibold">Kitchen Display</h2>
        <div className="text-sm text-char-400">{active.length} active ticket{active.length !== 1 ? 's' : ''}</div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {active.map((ticket) => {
          const elapsed = since(ticket.sentAt)
          const late = Date.now() - ticket.sentAt > 15 * 60 * 1000
          return (
            <div
              key={ticket.tableId}
              className={`rounded-xl border p-4 slide-up ${
                late
                  ? 'bg-red-950/40 border-red-500/40'
                  : 'bg-char-800 border-char-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-display font-semibold">
                  Table {ticket.label}
                </div>
                <div
                  className={`text-sm flex items-center gap-1 font-mono ${
                    late ? 'text-red-300' : 'text-char-400'
                  }`}
                >
                  <Clock size={12} /> {elapsed}
                </div>
              </div>
              <ul className="space-y-2 mb-3">
                {ticket.items.map((i, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>
                      <span className="font-mono text-ember-500 mr-2">{i.qty}×</span>
                      {i.name}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onMark(ticket.tableId)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-char-900 font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 text-sm transition"
              >
                <Check size={14} /> Mark Ready
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
