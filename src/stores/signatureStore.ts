import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FlourishType } from '../utils/effects';

export type SignatureMode = 'typed' | 'freehand';
export type MonogramFrame = 'none' | 'circle' | 'shield' | 'ribbon';
export type Alignment = 'left' | 'center' | 'right';

export interface TypedSignatureState {
  fullName: string;
  initials: string;
  title: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeight: number;
  slant: number; // italic skew
  baselineOffset: number;
  color: string;
  opacity: number;
  strokeTexture: number; // 0-100
  flourish: FlourishType;
  flourishSize: number;
  flourishOffset: number;
  underline: boolean;
  doubleUnderline: boolean;
  alignment: Alignment;
  rotation: number;
  monogramMode: boolean;
  monogramFrame: MonogramFrame;
  frameStrokeWidth: number;
}

export interface FreehandState {
  penSize: number;
  penColor: string;
  penOpacity: number;
  smoothing: number; // 0-100
  pressure: boolean; // simulate pressure
  showBaseline: boolean;
}

export interface CanvasState {
  width: number;
  height: number;
  pixelRatio: 1 | 2 | 3;
  backgroundColor: string;
  showGrid: boolean;
}

export interface ExportState {
  format: 'png' | 'svg' | 'pdf';
  trim: boolean;
  padding: number;
  includeWatermark: boolean;
}

export interface PresetData {
  id: string;
  name: string;
  description: string;
  typed: Partial<TypedSignatureState>;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  thumbnail: string;
  timestamp: number;
  mode: SignatureMode;
  name: string;
}

export interface SignatureStore {
  // Mode
  mode: SignatureMode;
  setMode: (mode: SignatureMode) => void;

  // Typed signature
  typed: TypedSignatureState;
  updateTyped: (updates: Partial<TypedSignatureState>) => void;

  // Freehand
  freehand: FreehandState;
  updateFreehand: (updates: Partial<FreehandState>) => void;

  // Canvas
  canvas: CanvasState;
  updateCanvas: (updates: Partial<CanvasState>) => void;

  // Export
  export: ExportState;
  updateExport: (updates: Partial<ExportState>) => void;

  // Presets
  presets: PresetData[];
  addPreset: (preset: Omit<PresetData, 'id' | 'timestamp'>) => void;
  removePreset: (id: string) => void;
  applyPreset: (id: string) => void;

  // History
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  restoreFromHistory: (id: string) => void;

  // Freehand drawing data
  lines: Array<{
    points: number[];
    color: string;
    width: number;
    opacity: number;
  }>;
  addLine: (line: { points: number[]; color: string; width: number; opacity: number }) => void;
  clearLines: () => void;
  undoLine: () => void;
  redoLine: () => void;
  undoHistory: typeof useSignatureStore.getState.lines[];
  redoHistory: typeof useSignatureStore.getState.lines[];

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Reset
  reset: () => void;
}

const DEFAULT_TYPED_STATE: TypedSignatureState = {
  fullName: '',
  initials: '',
  title: '',
  fontFamily: 'Sacramento',
  fontSize: 72,
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: 1.2,
  slant: 0,
  baselineOffset: 0,
  color: '#000000',
  opacity: 1,
  strokeTexture: 0,
  flourish: 'none',
  flourishSize: 2,
  flourishOffset: 10,
  underline: false,
  doubleUnderline: false,
  alignment: 'center',
  rotation: 0,
  monogramMode: false,
  monogramFrame: 'none',
  frameStrokeWidth: 3,
};

const DEFAULT_FREEHAND_STATE: FreehandState = {
  penSize: 3,
  penColor: '#000000',
  penOpacity: 1,
  smoothing: 50,
  pressure: true,
  showBaseline: false,
};

const DEFAULT_CANVAS_STATE: CanvasState = {
  width: 600,
  height: 200,
  pixelRatio: 2,
  backgroundColor: 'transparent',
  showGrid: false,
};

const DEFAULT_EXPORT_STATE: ExportState = {
  format: 'png',
  trim: true,
  padding: 20,
  includeWatermark: false,
};

const BUILTIN_PRESETS: PresetData[] = [
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional and formal',
    typed: {
      fontFamily: 'Great Vibes',
      fontSize: 64,
      color: '#1e3a8a',
      flourish: 'underline',
      alignment: 'center',
    },
    timestamp: Date.now(),
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Relaxed and friendly',
    typed: {
      fontFamily: 'Caveat',
      fontSize: 56,
      color: '#000000',
      slant: 1,
      strokeTexture: 20,
    },
    timestamp: Date.now(),
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated and refined',
    typed: {
      fontFamily: 'Allura',
      fontSize: 60,
      color: '#4a5568',
      flourish: 'swoosh-right',
      flourishSize: 3,
      alignment: 'center',
    },
    timestamp: Date.now(),
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong and confident',
    typed: {
      fontFamily: 'Pacifico',
      fontSize: 60,
      fontWeight: 600,
      color: '#000000',
      flourish: 'double-underline',
    },
    timestamp: Date.now(),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple',
    typed: {
      fontFamily: 'Sacramento',
      fontSize: 60,
      color: '#000000',
      letterSpacing: 2,
      alignment: 'left',
    },
    timestamp: Date.now(),
  },
  {
    id: 'doctors-note',
    name: "Doctor's Note",
    description: 'Quick and illegible',
    typed: {
      fontFamily: 'Shadows Into Light',
      fontSize: 52,
      color: '#1e40af',
      slant: 1,
      rotation: -3,
      strokeTexture: 30,
    },
    timestamp: Date.now(),
  },
];

export const useSignatureStore = create<SignatureStore>()(
  persist(
    (set, get) => ({
      mode: 'typed',
      setMode: (mode) => set({ mode }),

      typed: DEFAULT_TYPED_STATE,
      updateTyped: (updates) =>
        set((state) => ({ typed: { ...state.typed, ...updates } })),

      freehand: DEFAULT_FREEHAND_STATE,
      updateFreehand: (updates) =>
        set((state) => ({ freehand: { ...state.freehand, ...updates } })),

      canvas: DEFAULT_CANVAS_STATE,
      updateCanvas: (updates) =>
        set((state) => ({ canvas: { ...state.canvas, ...updates } })),

      export: DEFAULT_EXPORT_STATE,
      updateExport: (updates) =>
        set((state) => ({ export: { ...state.export, ...updates } })),

      presets: BUILTIN_PRESETS,
      addPreset: (preset) =>
        set((state) => ({
          presets: [
            ...state.presets,
            {
              ...preset,
              id: `preset-${Date.now()}`,
              timestamp: Date.now(),
            },
          ],
        })),
      removePreset: (id) =>
        set((state) => ({
          presets: state.presets.filter((p) => p.id !== id),
        })),
      applyPreset: (id) => {
        const preset = get().presets.find((p) => p.id === id);
        if (preset?.typed) {
          set((state) => ({
            typed: { ...state.typed, ...preset.typed },
          }));
        }
      },

      history: [],
      addToHistory: (item) =>
        set((state) => ({
          history: [
            {
              ...item,
              id: `history-${Date.now()}`,
              timestamp: Date.now(),
            },
            ...state.history.slice(0, 9), // Keep last 10
          ],
        })),
      clearHistory: () => set({ history: [] }),
      restoreFromHistory: (id) => {
        // This would require storing full state snapshots
        console.log('Restore from history:', id);
      },

      lines: [],
      addLine: (line) =>
        set((state) => ({
          lines: [...state.lines, line],
          undoHistory: [...state.lines],
          redoHistory: [],
        })),
      clearLines: () =>
        set({
          lines: [],
          undoHistory: [],
          redoHistory: [],
        }),
      undoLine: () =>
        set((state) => {
          if (state.lines.length === 0) return state;
          const newLines = state.lines.slice(0, -1);
          const removed = state.lines[state.lines.length - 1];
          return {
            lines: newLines,
            redoHistory: [...state.redoHistory, removed],
          };
        }),
      redoLine: () =>
        set((state) => {
          if (state.redoHistory.length === 0) return state;
          const toRestore = state.redoHistory[state.redoHistory.length - 1];
          return {
            lines: [...state.lines, toRestore],
            redoHistory: state.redoHistory.slice(0, -1),
          };
        }),
      undoHistory: [],
      redoHistory: [],

      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      reset: () =>
        set({
          typed: DEFAULT_TYPED_STATE,
          freehand: DEFAULT_FREEHAND_STATE,
          canvas: DEFAULT_CANVAS_STATE,
          export: DEFAULT_EXPORT_STATE,
          lines: [],
          undoHistory: [],
          redoHistory: [],
        }),
    }),
    {
      name: 'signature-storage',
      partialize: (state) => ({
        typed: state.typed,
        freehand: state.freehand,
        canvas: state.canvas,
        export: state.export,
        presets: state.presets.filter((p) => !BUILTIN_PRESETS.find((bp) => bp.id === p.id)),
        history: state.history,
        theme: state.theme,
      }),
      merge: (persistedState: any, currentState: SignatureStore) => {
        // Merge persisted state but always include built-in presets
        const customPresets = persistedState?.presets || [];
        return {
          ...currentState,
          ...persistedState,
          presets: [...BUILTIN_PRESETS, ...customPresets],
        };
      },
    }
  )
);
