import { cases } from '@/lib/data';
import { CaseFilePage } from '@/components/case-file-page';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return { title: 'Module Not Found · AETHER' };
  return {
    title: `${c.patient} · AETHER`,
    description: c.symptom,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = cases.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const c = cases[idx]!;
  return <CaseFilePage c={c} />;
}
