import HomeNavbar from "@/components/HomeNavbar";
import HomeSection from "@/components/HomeSection";

export default async function Home() {
  return (
    <div className="home-section">
      <HomeNavbar />
      <HomeSection />
    </div>
  );
}
