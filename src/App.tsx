import React, { useRef, useEffect } from 'react';
import { Moon, Sun, RotateCcw, Download, HelpCircle, Pen, Type } from 'lucide-react';
import { useSignatureStore } from './stores/signatureStore';
import SignatureCanvas from './components/SignatureCanvas';
import ControlsPanel from './components/ControlsPanel';
import PresetsPanel from './components/PresetsPanel';
import ExportDialog from './components/ExportDialog';
import { Button } from './components/ui/button';
import { TooltipProvider } from './components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import Konva from 'konva';
import { motion } from 'framer-motion';

function App() {
  const { mode, setMode, theme, toggleTheme, reset, typed } = useSignatureStore();
  const stageRef = useRef<Konva.Stage>(null);
  const [showExport, setShowExport] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        // Undo
        if (mode === 'freehand') {
          useSignatureStore.getState().undoLine();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        // Redo
        if (mode === 'freehand') {
          useSignatureStore.getState().redoLine();
        }
      } else if (e.key === 'e' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setShowExport(true);
      } else if (e.key === 'r' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, reset]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Header */}
        <header className="glass-effect border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                >
                  <Pen className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Digital Signature Generator
                  </h1>
                  <p className="text-sm text-muted-foreground">Create transparent signature PNGs</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
                  <TabsList>
                    <TabsTrigger value="typed" className="gap-2">
                      <Type className="w-4 h-4" />
                      Typed
                    </TabsTrigger>
                    <TabsTrigger value="freehand" className="gap-2">
                      <Pen className="w-4 h-4" />
                      Freehand
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                <Button variant="outline" size="icon" onClick={reset}>
                  <RotateCcw className="w-4 h-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={() => setShowHelp(!showHelp)}>
                  <HelpCircle className="w-4 h-4" />
                </Button>

                <Button 
                  onClick={() => setShowExport(true)} 
                  className="gap-2"
                  disabled={mode === 'typed' && !typed.fullName && !typed.initials}
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Help Banner */}
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800"
          >
            <div className="container mx-auto px-4 py-3">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Shortcuts:</strong> Cmd/Ctrl+Z (Undo), Shift+Cmd/Ctrl+Z (Redo), E (Export), R (Reset).
                <strong className="ml-4">Note:</strong> Signatures created here are for personalization, not legal documents.
              </p>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Panel - Controls */}
            <div className="col-span-12 lg:col-span-3">
              <ControlsPanel />
            </div>

            {/* Center - Canvas */}
            <div className="col-span-12 lg:col-span-6">
              <div className="glass-effect rounded-2xl p-6 min-h-[500px]">
                <SignatureCanvas stageRef={stageRef} />
              </div>
            </div>

            {/* Right Panel - Presets */}
            <div className="col-span-12 lg:col-span-3">
              <PresetsPanel />
            </div>
          </div>
        </div>

        {/* Export Dialog */}
        <ExportDialog
          open={showExport}
          onOpenChange={setShowExport}
          stageRef={stageRef}
        />

        {/* Footer */}
        <footer className="border-t bg-background/50 backdrop-blur-sm mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">✨</span>
                  <span>vibe-coded by</span>
                  <a
                    href="https://github.com/vinitshahdeo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    @vinitshahdeo
                  </a>
                </motion.span>
              </div>

              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/vinitshahdeo/digital-signature-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Star on GitHub
                </motion.a>

                <motion.a
                  href="https://twitter.com/vinitshahdeo"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                  aria-label="Follow on Twitter"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/vinitshahdeo"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors"
                  aria-label="Connect on LinkedIn"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/40 text-center text-xs text-muted-foreground">
              <p>
                Made with <span className="text-red-500">❤️</span> using React, TypeScript & Tailwind CSS •{' '}
                <a
                  href="https://github.com/vinitshahdeo/digital-signature-generator/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  MIT License
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

export default App;
