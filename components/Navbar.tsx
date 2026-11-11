'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, Sun, Moon, Menu, X, Sparkles, Zap, Building, Grid, Film, Milestone, BookOpen, Calculator } from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  onOpenAddModal,
  isDark,
  onToggleTheme,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'AI Buyer Hub', icon: Building },
    { href: '/models', label: 'Models Matrix', icon: Grid },
    { href: '/ugi', label: 'UGI AI Studio', icon: Film },
    { href: '/agi', label: 'AGI Milestones', icon: Milestone },
    { href: '/papers', label: 'Research Papers', icon: BookOpen },
    { href: '/calculator', label: 'Cost Lab', icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Building className="w-4 h-4" />
          </div>
          <span className="flex items-center gap-1.5">
            <span>NEXUS AI</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Agency Hub
            </span>
          </span>
        </Link>

        {/* Multi-Page Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/80 dark:border-indigo-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions & Theme toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <Link
            href="/#live-gemini-advisor"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Consult Gemini</span>
          </Link>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 active:scale-95"
            aria-label="Add new AI information"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Spec</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
