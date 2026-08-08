import { Suspense } from "react";
import { Outlet } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { FloatingThemeToggle } from "@/components/layout/FloatingThemeToggle";
import { BackgroundMotif } from "@/components/layout/BackgroundMotif";
import { BackToTop } from "@/components/layout/BackToTop";

export function MainLayout() {
  return (
    <div className='flex min-h-screen flex-col pb-16 md:pb-0'>
      <a
        href='#main'
        className='sr-only z-[70] rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4'
      >
        Lompat ke konten utama
      </a>
      <BackgroundMotif />
      <Header />
      <main id='main' className='flex-1'>
        <Suspense
          fallback={
            <div className='flex min-h-40 items-center justify-center text-sm text-ink-soft dark:text-ink-dark-soft'>
              Memuat…
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
      <BackToTop />
      <FloatingThemeToggle />
    </div>
  );
}
