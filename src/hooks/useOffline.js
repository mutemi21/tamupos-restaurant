import { useEffect, useState } from 'react'

// Tracks navigator.onLine but also exposes a manual toggle for demos.
// Mirrors real field conditions where a device thinks it has connectivity
// but the backend can't be reached.
export default function useOffline() {
  const [online, setOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  const [manualOffline, setManualOffline] = useState(false)

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  return {
    isOffline: !online || manualOffline,
    toggleManual: () => setManualOffline((v) => !v),
    manualOffline,
  }
}
