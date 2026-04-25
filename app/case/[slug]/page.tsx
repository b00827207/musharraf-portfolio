import { cases, CaseFile } from '@/lib/data';
import { notFound } from 'next/navigation';
import { CaseDetail } from '@/components/case-detail';

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
  if (!c) return { title: 'Case Not Found' };
  return {
    title: `${c.patient} — Musharraf Shaik`,
    description: c.symptom,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = cases.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const c: CaseFile = cases[idx]!;
  return <CaseDetail c={c} />;
}
