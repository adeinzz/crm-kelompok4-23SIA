import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const storedEmail = localStorage.getItem('userEmail')
    const storedPassword = localStorage.getItem('userPassword')

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/')
    } else {
      setError('Email atau password salah!')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="p-8 w-full max-w-sm"
      >
        <h2 className="text-3xl font-serif text-center mb-10">Login</h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute right-2 top-2 text-xs text-gray-500 hover:underline cursor-pointer">
              Forgot?
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#B38E66] text-white rounded-sm hover:bg-[#a37f58] transition"
        >
          Sign In
        </button>

        <div className="mt-6 text-center">
          <Link to="/signup" className="text-sm text-black hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignIn
