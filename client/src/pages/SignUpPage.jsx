import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError } from '../store/slices/authSlice'
import { validateEmail, validatePassword } from '../utils/validation'

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, loading, error } = useSelector(state => state.auth)

  useEffect(() => {
    if (token) navigate('/', { replace: true })
  }, [token, navigate])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (password) {
      setPasswordStrength(validatePassword(password))
    } else {
      setPasswordStrength(null)
    }
  }, [password])

  const strengthColor = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!name.trim()) { setFormError('Name is required'); return }
    if (!email.trim()) { setFormError('Email is required'); return }
    if (!validateEmail(email)) { setFormError('Please enter a valid email address'); return }
    if (!password) { setFormError('Password is required'); return }
    if (!passwordStrength?.isValid) { setFormError(passwordStrength?.message || 'Password too weak'); return }
    if (password !== confirmPassword) { setFormError('Passwords do not match'); return }

    dispatch(registerUser({ name, email, password }))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-4">
      <Link to="/" className="text-3xl font-bold mb-4">
        amazon<span className="text-[#febd69]">.in</span>
      </Link>

      <div className="w-[350px] border border-gray-300 rounded-lg p-6">
        <h1 className="text-[28px] font-normal text-[#0F1111] mb-4">Create account</h1>

        {(formError || error) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-sm text-red-700">{formError || error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-bold text-[#0F1111] mb-1">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
              placeholder="First and last name"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-bold text-[#0F1111] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-bold text-[#0F1111] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
              placeholder="At least 8 characters"
            />
            {passwordStrength && (
              <div className="mt-1">
                <div className="flex gap-1 mb-1">
                  <div className={`h-1 flex-1 rounded ${passwordStrength.strength === 'weak' ? strengthColor.weak : 'bg-gray-200'}`} />
                  <div className={`h-1 flex-1 rounded ${passwordStrength.strength === 'medium' ? strengthColor.medium : passwordStrength.strength === 'strong' ? strengthColor.medium : 'bg-gray-200'}`} />
                  <div className={`h-1 flex-1 rounded ${passwordStrength.strength === 'strong' ? strengthColor.strong : 'bg-gray-200'}`} />
                </div>
                <span className={`text-xs ${passwordStrength.strength === 'weak' ? 'text-red-600' : passwordStrength.strength === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {passwordStrength.message}
                </span>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-[#0F1111] mb-1">Re-enter password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-600 mt-1">Passwords must match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-lg text-sm font-medium border border-[#FCD200] disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create your Amazon account'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>

        <hr className="my-4" />

        <p className="text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#007185] hover:text-[#C7511F] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
