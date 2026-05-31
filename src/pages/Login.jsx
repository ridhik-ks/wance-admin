import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, LogIn, BadgeCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 w-full max-w-[448px]">
        {/* Identity Header */}
        <div className="text-center mb-gap-lg">
          <div className="inline-flex items-center justify-center p-3 bg-sidebar-bg rounded-xl mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">Wance Admin</h1>
          <p className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">Internal Access Portal</p>
        </div>

        {/* Auth Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
          <div className="px-10 py-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-body-strong text-body-strong text-on-surface-variant block" htmlFor="email">
                  Corporate Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-outline" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@wance.internal"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/60"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-body-strong text-body-strong text-on-surface-variant block" htmlFor="password">
                    Security Token / Password
                  </label>
                  <a className="font-label-md text-label-md text-primary hover:underline transition-all" href="#">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-outline" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-10 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary font-body-strong text-body-strong py-3.5 rounded-lg hover:bg-surface-tint active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Sign in to Admin Dashboard
                  <LogIn size={18} />
                </button>
              </div>

              {/* Trust/Policy Text */}
              <div className="pt-4 flex flex-col items-center gap-4">
                <div className="h-[1px] w-full bg-outline-variant/30" />
                <div className="flex items-center gap-2 text-on-surface-variant/60 font-caption text-caption">
                  <BadgeCheck size={14} />
                  Session authorized for Internal IP range 10.2.x.x
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
          <p className="font-caption text-caption text-on-surface-variant/60">
            © 2024 Wance Technologies Inc.
          </p>
          <div className="flex gap-4">
            <a className="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors" href="#">Compliance Policy</a>
            <a className="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors" href="#">Help Desk</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
