import { useState } from "react";

function MainComponent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      // For now, simulate sending password reset email
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white/20 rounded"></div>
                </div>
                <span className="text-[#1B2E54] font-bricolage font-extrabold text-2xl">
                  HealthCare+
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#EEF2FA] text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="font-geist font-bold text-2xl text-[#1B2E54] mb-3">
                Check Your Email
              </h1>
              <p className="text-[#5C6F92] text-base mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-[#5C6F92] text-sm mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setSuccess(false)}
                  className="w-full gradient-bg text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 hover:scale-[1.02] active:opacity-80 active:scale-[0.98] transition-all duration-200"
                >
                  Try Again
                </button>
                <a
                  href="/account/signin"
                  className="block w-full px-4 py-3 bg-[#F9FAFC] border border-[#E5ECF6] text-[#5C6F92] rounded-xl hover:bg-[#F2F7FF] hover:border-[#1A5DFF]/20 hover:text-[#1B2E54] transition-all duration-200"
                >
                  Back to Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              Reset Password
            </h1>
            <p className="text-[#5C6F92] text-base">
              Enter your email to receive a password reset link
            </p>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 shadow-xl border border-[#EEF2FA]">
            <div className="space-y-6">
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
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EEF2FA]">
              <p className="text-center text-sm text-[#5C6F92]">
                Remember your password?{" "}
                <a
                  href="/account/signin"
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