export default function AdminLoginPage() {
  return (
    <div className="min-h-screen w-full bg-canvas flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo or Brand */}
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-accent rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-accent/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-h2 font-display font-bold text-text-primary tracking-tight">Welcome back</h1>
          <p className="text-small text-text-secondary mt-1">Log in to Ekspora Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="w-full bg-surface border border-border-hairline rounded-2xl p-6 shadow-2xl">
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Email</label>
              <input 
                type="email" 
                className="bg-base border border-border-hairline rounded-lg px-4 py-2.5 text-small text-text-primary focus:outline-none focus:border-accent transition-colors w-full" 
                placeholder="admin@ekspora.com" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Password</label>
                <a href="#" className="text-micro text-accent hover:underline decoration-accent/50 underline-offset-2">Forgot?</a>
              </div>
              <input 
                type="password" 
                className="bg-base border border-border-hairline rounded-lg px-4 py-2.5 text-small text-text-primary focus:outline-none focus:border-accent transition-colors w-full" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="button" 
              className="mt-2 w-full bg-text-primary text-base hover:opacity-90 font-bold py-2.5 rounded-lg transition-opacity flex justify-center items-center gap-2"
            >
              Sign In
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-micro text-text-muted">
          Protected by Ekspora Security.
        </p>
      </div>
    </div>
  );
}
