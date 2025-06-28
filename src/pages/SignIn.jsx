import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const role = localStorage.getItem('role');
      const userEmail = localStorage.getItem('userEmail');
      const userPassword = localStorage.getItem('userPassword');

      if (isLoggedIn && role === 'user') {
        // cek ulang ke Supabase
        const { data, error } = await supabase
          .from('register')
          .select('*')
          .eq('email', userEmail)
          .eq('password', userPassword)
          .single();

        if (data && !error) {
          navigate('/dashboarduser');
        } else {
          // kalau tidak ada di Supabase, paksa logout
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('role');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userPassword');
        }
      } else if (isLoggedIn && role === 'admin') {
        navigate('/');
      }
    };

    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // admin login
    const adminEmail = 'admin@buttonscarves.com';
    const adminPassword = 'admin123';

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'admin');
      navigate('/');
      return;
    }

    // cek ke Supabase untuk user biasa
    const { data, error: queryError } = await supabase
      .from('register')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (queryError || !data) {
      setError('Email atau password salah, atau belum terdaftar.');
      return;
    }

    // simpan data user ke localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', 'user');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    navigate('/dashboarduser');
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
