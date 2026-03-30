import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../store/slices/authSlice'
import { validateEmail } from '../utils/validation'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { token, loading, error } = useSelector(state => state.auth)

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true })
    }
  }, [token, navigate, from])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!email.trim()) { setFormError('Email is required'); return }
    if (!validateEmail(email)) { setFormError('Please enter a valid email address'); return }
    if (!password) { setFormError('Password is required'); return }

    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-4">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold mb-4">
        amazon<span className="text-[#febd69]">.in</span>
      </Link>

      {/* Sign In Card */}
      <div className="w-[350px] border border-gray-300 rounded-lg p-6">
        <h1 className="text-[28px] font-normal text-[#0F1111] mb-4">Sign in</h1>

        {(formError || error) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-sm text-red-700">{formError || error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-[#0F1111] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-[#0F1111]">Password</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#007185]"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-lg text-sm font-medium border border-[#FCD200] disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </div>

      {/* New to Amazon */}
      <div className="w-[350px] mt-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-500">New to Amazon?</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <Link
          to="/signup"
          className="block w-full text-center bg-white border border-gray-300 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium"
        >
          Create your Amazon account
        </Link>
      </div>
    </div>
  )
}

export default SignInPage
