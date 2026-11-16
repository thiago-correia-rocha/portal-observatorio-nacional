"use client";

// Importa componentes de Layout
import Footer from "@/components/layout/elements/footer";
import Header from "@/components/layout/elements/header";
import Hero from "@/components/home/hero";
import DemographicExplorer from "@/components/home/demographicExplorer";

export default function Home() {

    return (
    <div>
      <main >
          <div >
            <Header />
          </div>
          <div className="relative">
            <Hero theme="demografia"/>
          </div>
          <div className="relative z-20 flex flex-wrap justify-center items-center">
            <DemographicExplorer />
          </div>
          <div className="pt-10">
            <Footer />
          </div>
      </main>
    </div>
  );
}
