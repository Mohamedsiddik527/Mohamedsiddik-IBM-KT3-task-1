import React, { useEffect, useState } from 'react'
import { getUsers, createUser } from './api'

export default function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    setError(null)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const user = await createUser({ name, email })
      setUsers(prev => [user, ...prev])
      setName('')
      setEmail('')
    } catch (err) {
      setError(err.message || 'Failed to create user')
    }
  }

  return (
    <div className="container">
      <h1>Users</h1>

      <form onSubmit={handleSubmit} className="user-form">
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          type="email"
        />
        <button type="submit">Create</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="user-list">
        {users.map(u => (
          <li key={u._id || u.id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>

      {!loading && users.length === 0 && <p>No users yet.</p>}
    </div>
  )
}