import { notFound } from 'next/navigation';
import { cases } from '@/lib/data';
import { CaseFilePage } from '@/components/case-file-page';

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const c = cases.find((x) => x.slug === params.slug);
  if (!c) return { title: 'Case not found' };
  return {
    title: `Case File ${c.caseNumber} · ${c.patient} — Musharraf Shaik`,
    description: c.symptom,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const idx = cases.findIndex((x) => x.slug === params.slug);
  if (idx === -1) {
    notFound();
  }
  const c = cases[idx];
  const next = cases[(idx + 1) % cases.length];
  return <CaseFilePage caseFile={c} next={next} />;
}
