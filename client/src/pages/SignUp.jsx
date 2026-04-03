import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/authSlice";
import { toast } from "sonner";
import api from "@/lib/api";

const getPasswordStrength = (password) => {
  if (!password) return null;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;

  if (score <= 2) return { label: "Weak", color: "bg-red-500", textColor: "text-red-600", checks };
  if (score <= 3) return { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-600", checks };
  return { label: "Strong", color: "bg-green-500", textColor: "text-green-600", checks };
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Enter your name";
    if (!email) e.email = "Enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Enter a password";
    else if (password.length < 8) e.password = "Minimum 8 characters required";
    else if (!/[A-Z]/.test(password)) e.password = "Must include an uppercase letter";
    else if (!/[0-9]/.test(password)) e.password = "Must include a number";
    if (password !== confirmPassword) e.confirmPassword = "Passwords must match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      dispatch(login({
        user: { id: data._id, name: data.name, email: data.email },
        token: data.token,
      }));
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-card flex flex-col items-center">
      <Link to="/" className="mt-6 mb-4">
        <span className="text-amazon-dark font-bold text-3xl">amazon.in</span>
      </Link>
      <div className="w-full max-w-sm border border-border rounded-lg p-6">
        <h1 className="text-2xl font-normal text-card-foreground mb-4">Create account</h1>

        {serverError && (
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-bold text-card-foreground">Your name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border border-border rounded text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.name && <p className="text-amazon-deal text-xs mt-0.5">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-card-foreground">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border border-border rounded text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.email && <p className="text-amazon-deal text-xs mt-0.5">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-card-foreground">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border border-border rounded text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.password && <p className="text-amazon-deal text-xs mt-0.5">{errors.password}</p>}

            {strength && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  <div className={`h-1.5 flex-1 rounded-full ${strength.label !== null ? strength.color : "bg-border"}`} />
                  <div className={`h-1.5 flex-1 rounded-full ${strength.label === "Medium" || strength.label === "Strong" ? strength.color : "bg-border"}`} />
                  <div className={`h-1.5 flex-1 rounded-full ${strength.label === "Strong" ? strength.color : "bg-border"}`} />
                </div>
                <p className={`text-xs font-medium ${strength.textColor}`}>
                  Password strength: {strength.label}
                </p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                  <li className={strength.checks.length ? "text-amazon-green" : ""}>
                    {strength.checks.length ? "✓" : "○"} At least 8 characters
                  </li>
                  <li className={strength.checks.uppercase ? "text-amazon-green" : ""}>
                    {strength.checks.uppercase ? "✓" : "○"} Uppercase letter
                  </li>
                  <li className={strength.checks.lowercase ? "text-amazon-green" : ""}>
                    {strength.checks.lowercase ? "✓" : "○"} Lowercase letter
                  </li>
                  <li className={strength.checks.number ? "text-amazon-green" : ""}>
                    {strength.checks.number ? "✓" : "○"} Number
                  </li>
                  <li className={strength.checks.special ? "text-amazon-green" : ""}>
                    {strength.checks.special ? "✓" : "○"} Special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-bold text-card-foreground">Re-enter password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border border-border rounded text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.confirmPassword && <p className="text-amazon-deal text-xs mt-0.5">{errors.confirmPassword}</p>}
            {confirmPassword && password !== confirmPassword && !errors.confirmPassword && (
              <p className="text-amazon-deal text-xs mt-0.5">Passwords must match</p>
            )}
          </div>

          <button type="submit" disabled={loading} className="amazon-btn w-full py-2">
            {loading ? "Creating account..." : "Create your Amazon account"}
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
        <hr className="my-4 border-border" />
        <p className="text-sm text-foreground">
          Already have an account? <Link to="/signin" className="amazon-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
