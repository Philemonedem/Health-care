import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
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
              Sign Out
            </h1>
            <p className="text-[#5C6F92] text-base">
              Are you sure you want to sign out?
            </p>
          </div>

          {/* Sign Out Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#EEF2FA]">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#FFF2F2] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <p className="text-[#5C6F92] text-sm mb-6">
                  You'll need to sign in again to access your account.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 px-4 py-3 bg-[#F9FAFC] border border-[#E5ECF6] text-[#5C6F92] rounded-xl hover:bg-[#F2F7FF] hover:border-[#1A5DFF]/20 hover:text-[#1B2E54] transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex-1 gradient-bg text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 hover:scale-[1.02] active:opacity-80 active:scale-[0.98] transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;