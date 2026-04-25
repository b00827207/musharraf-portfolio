import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Thesis } from '@/components/thesis';
import { Work } from '@/components/work';
import { Range } from '@/components/range';
import { About } from '@/components/about';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Thesis />
        <Work />
        <Range />
        <About />
      </main>
      <Footer />
    </>
  );
}
