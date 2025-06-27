import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabase'

const SignUp = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Password tidak sama!')
      return
    }

    // Simpan ke tabel Supabase register
    const { data, error: insertError } = await supabase
      .from('register')
      .insert([
        {
          name,
          phone,
          email,
          password
        }
      ])

    if (insertError) {
      console.error(insertError)
      setError('Gagal menyimpan ke database.')
      return
    }

    // Simulasi penyimpanan lokal (optional)
    localStorage.setItem('userName', name)
    localStorage.setItem('userPhone', phone)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('userPassword', password)
    localStorage.setItem('isLoggedIn', 'true')

    navigate('/signin')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="p-8 w-full max-w-sm"
      >
        <h2 className="text-3xl font-serif text-center mb-10">Create Account</h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Nama */}
        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* No HP */}
        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-gray-700 mb-2">
            No. HP
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Email */}
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

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#B38E66] text-white rounded-sm hover:bg-[#a37f58] transition"
        >
          Sign Up
        </button>

        <div className="mt-6 text-center">
          <Link to="/signin" className="text-sm text-black hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
