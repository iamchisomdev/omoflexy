import { useState } from 'react'
import { authAPI } from '../../utils/api' // Adjust path based on your folder structure
import { useNavigate } from 'react-router-dom' // If you're using React Router
import Logo from '../../assets/image/logo1.jpg' // Adjust path to your logo image

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() // If you're using React Router

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await authAPI.login(email, password, navigate)

      // If backend returned session info, store tokens
      if (data && data.session) {
        localStorage.setItem('accessToken', data.session.access_token)
        localStorage.setItem('refreshToken', data.session.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    } catch (err) {
      setError(err.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col inter">
      {/* Header with Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="flex flex-col leading-tight">
            <img src={Logo} alt="Logo" className="w-30 h-30 object-contain" />
          </div>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="flex-1 flex items-start justify-center pt-12">
        <div className="w-full max-w-md px-6">
          <div className="border border-[#EDEDED] rounded-[6px] p-8 shadow-sm">
            {/* Form Header */}
            <div className="mb-8 text-center">
              <h1 className="text-[18px] font-700 text-[#544F4F] mb-2">Login</h1>
              <p className="text-sm text-gray-500">Enter your login details to continue</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                  required
                  disabled={loading}
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-2.5 rounded-md hover:bg-gray-900 transition-colors font-medium text-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage