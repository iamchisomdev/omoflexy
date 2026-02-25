import { useState, useEffect } from "react";
import { authAPI } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image/logo1.jpg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Check if user already has a valid session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include", // ✅ IMPORTANT
        });

        if (res.ok) {
          navigate("/admin/dashboard");
        }
      } catch (err) {
        // not logged in → do nothing
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authAPI.login(email, password);

      console.log("LOGIN RESPONSE:", data);

      // ✅ No token needed — session is stored in cookie
      if (data?.message === "Login successful") {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin/dashboard");
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col inter">
      {/* Header */}
      <div className="p-6">
        <img src={Logo} alt="Logo" className="w-28 h-28 object-contain" />
      </div>

      {/* Form */}
      <div className="flex-1 flex items-start justify-center pt-12">
        <div className="w-full max-w-md px-6">
          <div className="border border-[#EDEDED] rounded-[6px] p-8 shadow-sm">
            
            <div className="mb-8 text-center">
              <h1 className="text-[18px] font-semibold text-[#544F4F] mb-2">
                Login
              </h1>
              <p className="text-sm text-gray-500">
                Enter your login details to continue
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-900 text-sm"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-900 text-sm"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-2.5 rounded-md hover:bg-gray-900 transition text-sm mt-6 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;