import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSupabase() {
  const [results, setResults] = useState({})
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('match_results').select('*'),
      supabase.from('settings').select('*'),
    ]).then(([{ data: rData }, { data: sData }]) => {
      if (rData) {
        const m = {}
        rData.forEach(r => { m[r.match_id] = r })
        setResults(m)
      }
      if (sData) {
        const m = {}
        sData.forEach(s => { m[s.key] = s.value })
        setSettings(m)
      }
      setLoading(false)
    })

    const rSub = supabase
      .channel('results')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'match_results' }, ({ eventType, new: n, old: o }) => {
        if (eventType === 'DELETE') {
          setResults(prev => { const x = { ...prev }; delete x[o.match_id]; return x })
        } else {
          setResults(prev => ({ ...prev, [n.match_id]: n }))
        }
      })
      .subscribe()

    const sSub = supabase
      .channel('settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, ({ eventType, new: n }) => {
        if (eventType !== 'DELETE') {
          setSettings(prev => ({ ...prev, [n.key]: n.value }))
        }
      })
      .subscribe()

    return () => { rSub.unsubscribe(); sSub.unsubscribe() }
  }, [])

  return { results, settings, loading }
}
