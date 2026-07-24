import { useState } from "react";
import { useNavigate } from "react-router-dom";

// hardcoded login credentials
const VALID_EMAIL = "admin@example.com";
const VALID_PASSWORD = "admin123";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("ERR: both fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("ERR: enter a valid email");
      return;
    }

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem("token", "fake-jwt-token-12345");
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");
    } else {
      setError("ERR: invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink flex items-center justify-center px-4 transition-colors">
      <div
        className="fixed inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "#0D1117",
        }}
      ></div>

      <div className="bg-white dark:bg-surface w-full max-w-sm relative z-10 border border-ink/10 dark:border-edge">
        <div className="flex items-center justify-between px-4 py-2 border-b border-ink/10 dark:border-edge  dark:bg-surface2">
          <span className="text-ink text-xs tracking-widest">AUTH.LOG</span>
          <span className="w-2 h-2 rounded-full bg-terminal dark:bg-terminal-light"></span>
        </div>

        <div className="p-8">
          <p className="font-serif italic text-muted dark:text-muted-light text-sm mb-1">
            record access requires credentials
          </p>
          <h1 className="text-2xl font-semibold text-ink dark:text-paper mb-6 tracking-tight">
            employee_index<span className="text-signal">.</span>login
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs text-muted dark:text-muted-light mb-1 tracking-widest">
                EMAIL
              </label>
              <input
                type="text"
                className="w-full bg-transparent border border-muted/50 dark:border-paper/20 rounded-none px-3 py-2 text-ink dark:text-paper outline-none focus:border-signal text-sm placeholder:text-muted dark:placeholder:text-muted-light"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs text-muted dark:text-muted-light mb-1 tracking-widest">
                PASSWORD
              </label>
              <input
                type="password"
                className="w-full bg-transparent border border-muted/50 dark:border-paper/20 rounded-none px-3 py-2 text-ink dark:text-paper outline-none focus:border-signal text-sm placeholder:text-muted dark:placeholder:text-muted-light"
                placeholder="admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-rust dark:text-rust-light text-xs mb-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-signal dark:bg-signal text-ink dark:text-ink py-2 text-sm tracking-widest hover:bg-ink hover:text-white transition-colors"
            >
              CONNECT &gt;
            </button>
          </form>

          <p className="text-xs text-muted dark:text-muted-light mt-5 text-center">
            hint: admin@example.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
