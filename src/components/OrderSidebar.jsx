import { Minus, Plus, Trash2, ChefHat, CreditCard } from 'lucide-react'
import { kes } from '../utils/format.js'

export default function OrderSidebar({
  table,
  order,
  onQty,
  onRemove,
  onSendKitchen,
  onCheckout,
  onClear,
}) {
  const items = order?.items || []
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
  const vat = Math.round(subtotal * 0.16) // Kenyan VAT
  const service = Math.round(subtotal * 0.1) // typical 10%
  const total = subtotal + vat + service
  const unsentCount = items.filter((i) => !i.sentToKitchen).reduce((s, i) => s + i.qty, 0)

  if (!table) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center p-8 text-char-400">
        <div className="w-14 h-14 rounded-2xl bg-char-800 flex items-center justify-center mb-4">
          <ChefHat size={24} />
        </div>
        <p className="text-sm">Select a table to start an order</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-char-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-char-400 uppercase tracking-wider">Order</div>
            <div className="text-xl font-display font-semibold mt-0.5">
              Table {table.label}
            </div>
          </div>
          {items.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-char-400 hover:text-char-100 flex items-center gap-1"
            >
              <Trash2 size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-8 text-center text-sm text-char-400">
            Tap items on the menu to add
          </div>
        ) : (
          <ul className="divide-y divide-char-800">
            {items.map((i, idx) => (
              <li key={idx} className="px-4 py-3 slide-up">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {!i.sentToKitchen && (
                        <span className="w-1.5 h-1.5 bg-ember-500 rounded-full" />
                      )}
                      <span className="text-sm font-medium truncate">{i.name}</span>
                    </div>
                    <div className="text-xs text-char-400 mt-0.5 font-mono">
                      {kes(i.price)} each
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    className="text-char-400 hover:text-red-400 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onQty(idx, i.qty - 1)}
                      className="w-7 h-7 bg-char-800 hover:bg-char-700 rounded-md flex items-center justify-center"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center font-mono text-sm">{i.qty}</span>
                    <button
                      onClick={() => onQty(idx, i.qty + 1)}
                      className="w-7 h-7 bg-char-800 hover:bg-char-700 rounded-md flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="font-mono text-sm font-semibold">
                    {kes(i.qty * i.price)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-char-800 p-4 space-y-3">
          <div className="space-y-1 text-sm">
            <Row label="Subtotal" value={kes(subtotal)} muted />
            <Row label="VAT (16%)" value={kes(vat)} muted />
            <Row label="Service (10%)" value={kes(service)} muted />
            <div className="h-px bg-char-800 my-2" />
            <Row label="Total" value={kes(total)} bold />
          </div>

          {unsentCount > 0 ? (
            <button
              onClick={onSendKitchen}
              className="w-full bg-ember-500 hover:bg-ember-600 text-char-900 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <ChefHat size={16} />
              Send {unsentCount} to kitchen
            </button>
          ) : (
            <button
              onClick={() => onCheckout(total)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-char-900 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <CreditCard size={16} />
              Checkout · {kes(total)}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function Row({ label, value, muted, bold }) {
  return (
    <div
      className={`flex items-center justify-between ${muted ? 'text-char-400' : ''} ${
        bold ? 'text-base font-semibold' : ''
      }`}
    >
      <span>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  )
}
