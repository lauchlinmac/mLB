import React, { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [updated, setUpdated] = useState('')

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const load = () => {
      fetch(
        `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=team,linescore,venue`
      )
        .then(r => r.json())
        .then(d => {
          setGames(d.dates?.[0]?.games || [])
          setLoading(false)
          setUpdated(new Date().toLocaleTimeString())
        })
        .catch(() => setLoading(false))
    }

    load()
    const t = setInterval(load, 10000)
    return () => clearInterval(t)
  }, [])

  const filtered = useMemo(() => {
    return games.filter(g =>
      `${g.teams.away.team.name} ${g.teams.home.team.name}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [games, query])

  return (
    <div style={{ padding: 16, background: '#000', minHeight: '100vh' }}>
      <h1>Diamond Beast v4 OMEGA</h1>
      <p>ESPN Killer Mode • Live MLB</p>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search teams, players, odds, weather..."
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <p>Last updated: {updated || 'Loading...'}</p>

      {loading && <p>Loading games...</p>}

      {filtered.map(g => (
        <div key={g.gamePk} style={{ border: '1px solid #333', padding: 12, marginTop: 10 }}>
          <div>{g.status?.detailedState}</div>
          <div>{g.venue?.name}</div>

          <div>
            {g.teams.away.team.name} — {g.teams.away.score ?? '-'}
          </div>
          <div>
            {g.teams.home.team.name} — {g.teams.home.score ?? '-'}
          </div>
        </div>
      ))}
    </div>
  )
}
