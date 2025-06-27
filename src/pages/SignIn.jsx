import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // admin email
    const adminEmail = 'admin@buttonscarves.com';
    const adminPassword = 'admin123';

    // user biasa
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    // cek admin
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'admin');
      navigate('/');
      return;
    }

    // cek user biasa
    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'user');
      navigate('/dashboarduser');
      return;
    }

    setError('Email atau password salah!');
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#fef7f1] to-[#e0cfc1] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-serif text-center mb-10 text-[#5A3E36]">
          Login
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-[#5A3E36] mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-[#e0cfc1] rounded focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-[#5A3E36] mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-[#e0cfc1] rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#B38E66] text-white rounded hover:bg-[#a37f58] transition"
        >
          Sign In
        </button>

        <div className="mt-6 text-center">
          <Link to="/signup" className="text-sm text-[#5A3E36] hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
