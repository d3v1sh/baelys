import { Toaster } from '@/components/ui/sonner';
import Editor from './Editor';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="h-screen flex flex-col">
        <div className="flex-1">
          <Editor />
        </div>
      </div>
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--foreground))',
          },
        }}
      />
    </div>
  );
}

export default Home; 