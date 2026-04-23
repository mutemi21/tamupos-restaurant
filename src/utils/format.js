export const kes = (n) =>
  'KSh ' + Math.round(n).toLocaleString('en-KE')

export const since = (ts) => {
  const mins = Math.floor((Date.now() - ts) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  return `${h}h ${mins % 60}m`
}

export const nowTime = () =>
  new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })
