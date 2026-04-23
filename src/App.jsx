import { useState, useMemo } from 'react'
import { Utensils, ChefHat, Activity, WifiOff } from 'lucide-react'
import { initialTables, menu } from './data/menu.js'
import useOffline from './hooks/useOffline.js'
import useLocalStorage from './hooks/useLocalStorage.js'
import { nowTime } from './utils/format.js'

import TableGrid from './components/TableGrid.jsx'
import MenuPanel from './components/MenuPanel.jsx'
import OrderSidebar from './components/OrderSidebar.jsx'
import MpesaModal from './components/MpesaModal.jsx'
import KitchenDisplay from './components/KitchenDisplay.jsx'
import OfflineBanner from './components/OfflineBanner.jsx'

export default function App() {
  const [view, setView] = useState('floor') // floor | kitchen
  const [tables, setTables] = useLocalStorage('tamupos-rest-tables', initialTables)
  const [orders, setOrders] = useLocalStorage('tamupos-rest-orders', {
    2: {
      items: [
        { ...menu.find((m) => m.id === 'm2'), qty: 2, sentToKitchen: true },
        { ...menu.find((m) => m.id === 's1'), qty: 3, sentToKitchen: true },
        { ...menu.find((m) => m.id === 'd1'), qty: 2, sentToKitchen: true },
      ],
      sentAt: Date.now() - 1000 * 60 * 9,
    },
    4: {
      items: [
        { ...menu.find((m) => m.id === 'n2'), qty: 1, sentToKitchen: true },
        { ...menu.find((m) => m.id === 's4'), qty: 2, sentToKitchen: true },
        { ...menu.find((m) => m.id === 'd3'), qty: 3, sentToKitchen: true },
      ],
      sentAt: Date.now() - 1000 * 60 * 4,
    },
  })
  const [selectedId, setSelectedId] = useState(null)
  const [checkoutFor, setCheckoutFor] = useState(null)
  const [queue, setQueue] = useState([])

  const { isOffline, toggleManual, manualOffline } = useOffline()
  const selected = tables.find((t) => t.id === selectedId)

  const addItem = (item) => {
    if (!selectedId) return
    setOrders((prev) => {
      const existing = prev[selectedId]?.items || []
      const idx = existing.findIndex((i) => i.id === item.id && !i.sentToKitchen)
      const items =
        idx >= 0
          ? existing.map((i, j) => (j === idx ? { ...i, qty: i.qty + 1 } : i))
          : [...existing, { ...item, qty: 1, sentToKitchen: false }]
      return { ...prev, [selectedId]: { ...prev[selectedId], items } }
    })
    markOpen(selectedId)
  }

  // Lightweight "AI" order parser — real version would hit Claude with the menu.
  const parseAiOrder = (text) => {
    if (!selectedId) return
    const normalized = text.toLowerCase()
    const tokens = normalized.split(/[,\n]+/).map((t) => t.trim()).filter(Boolean)
    const matched = []
    tokens.forEach((t) => {
      const qtyMatch = t.match(/^(\d+)\s*(.+)/)
      const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1
      const term = qtyMatch ? qtyMatch[2] : t
      const item = menu.find((m) => {
        const name = m.name.toLowerCase()
        return term.split(' ').every((w) => name.includes(w))
      })
      if (item) matched.push({ item, qty })
    })
    matched.forEach(({ item, qty }) => {
      for (let i = 0; i < qty; i++) addItem(item)
    })
  }

  const markOpen = (id) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === id && t.status === 'available'
          ? { ...t, status: 'occupied', openedAt: Date.now() }
          : t
      )
    )
  }

  const updateQty = (idx, qty) => {
    setOrders((prev) => {
      const items = [...prev[selectedId].items]
      if (qty < 1) items.splice(idx, 1)
      else items[idx] = { ...items[idx], qty }
      return { ...prev, [selectedId]: { ...prev[selectedId], items } }
    })
  }

  const removeItem = (idx) => updateQty(idx, 0)

  const sendToKitchen = () => {
    setOrders((prev) => ({
      ...prev,
      [selectedId]: {
        ...prev[selectedId],
        items: prev[selectedId].items.map((i) => ({ ...i, sentToKitchen: true })),
        sentAt: Date.now(),
      },
    }))
  }

  const markReady = (tableId) => {
    setOrders((prev) => ({
      ...prev,
      [tableId]: {
        ...prev[tableId],
        items: prev[tableId].items.map((i) => ({ ...i, ready: true })),
      },
    }))
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status: 'paying' } : t))
    )
  }

  const startCheckout = (total) => setCheckoutFor({ table: selected, total })

  const completePayment = (tx) => {
    if (tx.queued) {
      setQueue((q) => [...q, tx])
    }
    // close out table
    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedId ? { ...t, status: 'available', openedAt: null } : t
      )
    )
    setOrders((prev) => {
      const copy = { ...prev }
      delete copy[selectedId]
      return copy
    })
    setSelectedId(null)
    setCheckoutFor(null)
  }

  const clearOrder = () => {
    setOrders((prev) => {
      const copy = { ...prev }
      delete copy[selectedId]
      return copy
    })
    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedId ? { ...t, status: 'available', openedAt: null } : t
      )
    )
    setSelectedId(null)
  }

  const occupancy = useMemo(
    () => tables.filter((t) => t.status === 'occupied' || t.status === 'paying').length,
    [tables]
  )

  return (
    <div className="grain min-h-screen flex flex-col bg-char-900 text-char-50">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-char-800 bg-char-900">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ember-500 flex items-center justify-center">
              <span className="text-char-900 font-bold text-sm">t.</span>
            </div>
            <div>
              <div className="font-display font-semibold text-base leading-tight">
                TamuPOS
              </div>
              <div className="text-[10px] text-char-400 uppercase tracking-wider leading-tight">
                Restaurant · Kilimani
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-1 p-1 bg-char-800 rounded-lg">
            <TabBtn active={view === 'floor'} onClick={() => setView('floor')} icon={<Utensils size={14} />} label="Floor" />
            <TabBtn active={view === 'kitchen'} onClick={() => setView('kitchen')} icon={<ChefHat size={14} />} label="Kitchen" />
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-char-400">
            <Activity size={14} />
            <span>{occupancy}/{tables.length} tables open</span>
          </div>
          <div className="font-mono text-char-400">{nowTime()}</div>
          <div className="pl-4 border-l border-char-800">
            <div className="text-xs text-char-400">Cashier</div>
            <div className="text-sm font-medium">Wanjiru N.</div>
          </div>
        </div>
      </header>

      <OfflineBanner
        isOffline={isOffline}
        queueSize={queue.length}
        onToggle={toggleManual}
        manualOffline={manualOffline}
      />

      {/* Body */}
      {view === 'floor' ? (
        <div className="flex-1 grid grid-cols-[1fr_360px_380px] min-h-0">
          {/* Tables */}
          <div className="overflow-y-auto p-6">
            <TableGrid
              tables={tables}
              orders={orders}
              onSelect={setSelectedId}
              selectedId={selectedId}
            />
          </div>

          {/* Menu */}
          <div className="border-l border-char-800 bg-char-900 min-h-0">
            <MenuPanel onAdd={addItem} onAiParse={parseAiOrder} />
          </div>

          {/* Order */}
          <div className="border-l border-char-800 bg-char-900 min-h-0">
            <OrderSidebar
              table={selected}
              order={selected ? orders[selected.id] : null}
              onQty={updateQty}
              onRemove={removeItem}
              onSendKitchen={sendToKitchen}
              onCheckout={startCheckout}
              onClear={clearOrder}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <KitchenDisplay orders={orders} tables={tables} onMark={markReady} />
        </div>
      )}

      {checkoutFor && (
        <MpesaModal
          amount={checkoutFor.total}
          tableLabel={checkoutFor.table.label}
          isOffline={isOffline}
          onClose={() => setCheckoutFor(null)}
          onComplete={completePayment}
        />
      )}
    </div>
  )
}

function TabBtn({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition ${
        active ? 'bg-char-900 text-ember-500 font-medium' : 'text-char-400 hover:text-char-100'
      }`}
    >
      {icon} {label}
    </button>
  )
}
