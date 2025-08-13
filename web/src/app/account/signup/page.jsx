import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !confirmPassword || !fullName) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-up. Please try again or use a different method.",
        OAuthCallback: "Sign-up failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-up option. Try another one.",
        EmailCreateAccount:
          "This email can't be used. It may already be registered.",
        Callback: "Something went wrong during sign-up. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin:
          "Invalid email or password. If you already have an account, try signing in instead.",
        AccessDenied: "You don't have permission to sign up.",
        Configuration:
          "Sign-up isn't working right now. Please try again later.",
        Verification: "Your sign-up link has expired. Request a new one.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FBFF] to-[#E8F3FF] font-inter">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;700&family=Bricolage+Grotesque:wght@600;800&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-geist { font-family: 'Geist', sans-serif; }
        .font-bricolage { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .gradient-bg {
          background: linear-gradient(135deg, #1A5DFF 0%, #4D8BFF 100%);
        }
      `}</style>

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <div className="w-5 h-5 bg-white/20 rounded"></div>
              </div>
              <span className="text-[#1B2E54] font-bricolage font-extrabold text-2xl">
                HealthCare+
              </span>
            </div>
            <h1 className="font-geist font-bold text-3xl text-[#1B2E54] mb-2">
              Create Account
            </h1>
            <p className="text-[#5C6F92] text-base">
              Join thousands of patients managing their health online
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 shadow-xl border border-[#EEF2FA]">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1B2E54]">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    required
                    name="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-[#F9FAFC] border border-[#E5ECF6] rounded-xl text-[#1B2E54] placeholder-[#9CA3B0] focus:outline-none focus:ring-2 focus:ring-[#1A5DFF]/20 focus:border-[#1A5DFF] transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1B2E54]">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    required
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[#F9FAFC] border border-[#E5ECF6] rounded-xl text-[#1B2E54] placeholder-[#9CA3B0] focus:outline-none focus:ring-2 focus:ring-[#1A5DFF]/20 focus:border-[#1A5DFF] transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1B2E54]">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 bg-[#F9FAFC] border border-[#E5ECF6] rounded-xl text-[#1B2E54] placeholder-[#9CA3B0] focus:outline-none focus:ring-2 focus:ring-[#1A5DFF]/20 focus:border-[#1A5DFF] transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1B2E54]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    required
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 bg-[#F9FAFC] border border-[#E5ECF6] rounded-xl text-[#1B2E54] placeholder-[#9CA3B0] focus:outline-none focus:ring-2 focus:ring-[#1A5DFF]/20 focus:border-[#1A5DFF] transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-[#1A5DFF] bg-[#F9FAFC] border-[#E5ECF6] rounded focus:ring-[#1A5DFF] focus:ring-2"
                />
                <span className="ml-2 text-sm text-[#5C6F92]">
                  I agree to the{" "}
                  <a href="/terms" className="text-[#1A5DFF] hover:text-[#4D8BFF] transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[#1A5DFF] hover:text-[#4D8BFF] transition-colors">
                    Privacy Policy
                  </a>
                </span>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 hover:scale-[1.02] active:opacity-80 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EEF2FA]">
              <p className="text-center text-sm text-[#5C6F92]">
                Already have an account?{" "}
                <a
                  href={`/account/signin${
                    typeof window !== "undefined" ? window.location.search : ""
                  }`}
                  className="text-[#1A5DFF] hover:text-[#4D8BFF] font-medium transition-colors"
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;