import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-white" />
            <span className="text-xl font-heading font-bold tracking-tight text-white">SecureVision</span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Setting the global standard for optical precision and AI-driven security. Protect what matters most with uncompromising quality.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6 tracking-wide font-heading">Product</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Specifications</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Installation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Compare Models</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6 tracking-wide font-heading">Support</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Software Updates</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} SecureVision Technologies Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Legal</a>
        </div>
      </div>
    </footer>
  );
}
