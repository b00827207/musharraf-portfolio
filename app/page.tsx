import { Hero } from '@/components/hero';
import { Thesis } from '@/components/thesis';
import { Trajectory } from '@/components/trajectory';
import { ProjectsGrid } from '@/components/projects-grid';
import { Stack, Marquee, Contact } from '@/components/sections';

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Thesis />
      <Trajectory />
      <Marquee />
      <ProjectsGrid />
      <Stack />
      <Contact />
    </main>
  );
}
