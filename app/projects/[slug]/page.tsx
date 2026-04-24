import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import { ProjectPageClient } from '@/components/project-page-client';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Musharraf Shaik`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) notFound();

  const project = projects[idx];
  const nextProject = projects[(idx + 1) % projects.length];

  return <ProjectPageClient project={project} nextProject={nextProject} />;
}
