import { CodeGenerator } from '@/components/code-generator';
import { Bot } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
          <Bot size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-primary">
          Code Muse
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Your personal AI for code generation. Describe what you want to build
          in plain English, select a language, and let Code Muse write the code
          for you.
        </p>
      </div>

      <div className="mt-12">
        <CodeGenerator />
      </div>
    </main>
  );
}