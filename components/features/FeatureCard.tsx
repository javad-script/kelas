import { ComponentType } from 'react';

import Link from 'next/link';

export type FeatureCardProps = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  gradient: string;
  color: string;
};

export function FeatureCard({ label, icon: Icon, href, color, gradient }: FeatureCardProps) {
  return (
    <Link href={href}>
      <div
        className={`rounded-2xl bg-card dark:bg-radial p-1 ${gradient} to-transparent backdrop-blur-lg border border-white/5 shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] py-3 w-full inline-flex items-center justify-between gap-3 flex-col`}
      >
        <div className={`rounded-xl  size-12 ${color} flex items-center justify-center`}>
          <Icon className='size-6 text-white stroke-2' />
        </div>
        <p className='text-sm sm:text-base text-center'>{label}</p>
      </div>
    </Link>
  );
}
