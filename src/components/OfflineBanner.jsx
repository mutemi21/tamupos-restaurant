import { WifiOff, CloudUpload } from 'lucide-react'

export default function OfflineBanner({ isOffline, queueSize, onToggle, manualOffline }) {
  if (!isOffline && queueSize === 0) return null

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2 text-sm border-b ${
        isOffline
          ? 'bg-amber-950/60 border-amber-900 text-amber-100'
          : 'bg-emerald-950/60 border-emerald-900 text-emerald-100'
      }`}
    >
      <div className="flex items-center gap-2">
        {isOffline ? <WifiOff size={14} /> : <CloudUpload size={14} />}
        <span className="font-medium">
          {isOffline ? 'Offline mode' : 'Back online — syncing'}
        </span>
        {queueSize > 0 && (
          <span className="text-xs opacity-80">
            · {queueSize} transaction{queueSize !== 1 ? 's' : ''} queued
          </span>
        )}
      </div>
      <button
        onClick={onToggle}
        className="text-xs px-2 py-0.5 rounded border border-current opacity-70 hover:opacity-100 transition"
      >
        {manualOffline ? 'Restore' : 'Simulate offline'}
      </button>
    </div>
  )
}
