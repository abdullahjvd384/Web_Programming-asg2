import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/authSlice";
import { toast } from "sonner";
import api from "@/lib/api";

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

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Enter your name";
    if (!email) e.email = "Enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Enter a password";
    else if (password.length < 8) e.password = "Minimum 8 characters required";
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

  const fields = [
    { label: "Your name", value: name, set: setName, key: "name", type: "text" },
    { label: "Email", value: email, set: setEmail, key: "email", type: "email" },
    { label: "Password", value: password, set: setPassword, key: "password", type: "password", hint: "At least 8 characters" },
    { label: "Re-enter password", value: confirmPassword, set: setConfirmPassword, key: "confirmPassword", type: "password" },
  ];

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
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-sm font-bold text-card-foreground">{f.label}</label>
              <input
                type={f.type}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 border border-border rounded text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {f.hint && !errors[f.key] && <p className="text-xs text-muted-foreground mt-0.5">{f.hint}</p>}
              {errors[f.key] && <p className="text-amazon-deal text-xs mt-0.5">{errors[f.key]}</p>}
            </div>
          ))}
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
