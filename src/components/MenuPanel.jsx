import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { categories, menu } from '../data/menu.js'
import { kes } from '../utils/format.js'

export default function MenuPanel({ onAdd, onAiParse }) {
  const [cat, setCat] = useState('mains')
  const [query, setQuery] = useState('')
  const [aiInput, setAiInput] = useState('')
  const [aiOpen, setAiOpen] = useState(false)

  const filtered = menu.filter((m) => {
    if (query) return m.name.toLowerCase().includes(query.toLowerCase())
    return m.category === cat
  })

  const submitAi = () => {
    if (!aiInput.trim()) return
    onAiParse(aiInput)
    setAiInput('')
    setAiOpen(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search + AI parser */}
      <div className="p-4 border-b border-char-800 space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-char-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu..."
              className="w-full bg-char-800 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-char-400 border border-transparent focus:border-ember-500 focus:outline-none transition"
            />
          </div>
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 transition ${
              aiOpen
                ? 'bg-ember-500 text-char-900'
                : 'bg-char-800 hover:bg-char-700 text-ember-100'
            }`}
            title="AI order parser"
          >
            <Sparkles size={14} /> AI
          </button>
        </div>

        {aiOpen && (
          <div className="slide-up flex gap-2">
            <input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitAi()}
              placeholder='Try "2 pilau, 1 chapati, 2 tusker"'
              className="flex-1 bg-char-900 border border-ember-500/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ember-500"
              autoFocus
            />
            <button
              onClick={submitAi}
              className="px-3 py-2 bg-ember-500 hover:bg-ember-600 text-char-900 text-sm font-medium rounded-lg transition"
            >
              Parse
            </button>
          </div>
        )}
      </div>

      {/* Categories */}
      {!query && (
        <div className="flex gap-1.5 p-3 border-b border-char-800 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition flex items-center gap-1.5 ${
                cat === c.id
                  ? 'bg-ember-500 text-char-900 font-medium'
                  : 'bg-char-800 text-char-100 hover:bg-char-700'
              }`}
            >
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 gap-2 content-start">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => onAdd(item)}
            className="group text-left bg-char-800 hover:bg-char-700 rounded-xl p-3 border border-char-800 hover:border-ember-500/50 transition"
          >
            <div className="text-sm font-medium leading-tight">{item.name}</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-ember-500 font-semibold font-mono text-sm">
                {kes(item.price)}
              </span>
              {item.prepMin && (
                <span className="text-[10px] text-char-400">{item.prepMin} min</span>
              )}
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center text-sm text-char-400 py-10">
            No items found for "{query}"
          </div>
        )}
      </div>
    </div>
  )
}
