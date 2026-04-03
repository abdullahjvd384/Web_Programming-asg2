import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/authSlice";
import { toast } from "sonner";
import api from "@/lib/api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email) e.email = "Enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Enter your password";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    try {
      const { data } = await api.post("/auth/login", { email, password });
      dispatch(login({
        user: { id: data._id, name: data.name, email: data.email },
        token: data.token,
      }));
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed. Please try again.");
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
        <h1 className="text-2xl font-normal text-card-foreground mb-4">Sign in</h1>

        {serverError && (
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-card-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border border-border rounded text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.email && <p className="text-amazon-deal text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-bold text-card-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border border-border rounded text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.password && <p className="text-amazon-deal text-xs mt-1">{errors.password}</p>}
          </div>
          <button type="submit" disabled={loading} className="amazon-btn w-full py-2">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </div>
      <div className="w-full max-w-sm mt-6">
        <div className="relative">
          <hr className="border-border" />
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            New to Amazon?
          </span>
        </div>
        <Link to="/signup" className="mt-4 block w-full text-center py-1.5 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
          Create your Amazon account
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
