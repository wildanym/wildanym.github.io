import { Outlet } from "react-router";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { FloatingThemeToggle } from "@/components/layout/FloatingThemeToggle";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

export function MainLayout() {
  return (
    <div className='flex min-h-screen flex-col pb-16 md:pb-0'>
      <ScrollProgress />
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <MobileNav />
      <FloatingThemeToggle />
    </div>
  );
}
