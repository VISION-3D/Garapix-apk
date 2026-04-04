import MobileHeader from "./MobileHeader";
import BottomNav from "./BottomNav";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">

      <MobileHeader />

      <main className="pt-16 pb-20">
        {children}
      </main>

      <BottomNav />

    </div>
  );
}