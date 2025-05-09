import PageHeader from '@/components/shared/page-header';
import ScriptureGeneratorClient from '@/components/scripture/scripture-generator-client';
import { Sparkles } from 'lucide-react';

export default function ScriptureGeneratorPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Scripture Message Generator"
        subtitle="Find encouraging and relevant Bible verses for any topic."
        icon={Sparkles}
      />
      <ScriptureGeneratorClient />
    </div>
  );
}
