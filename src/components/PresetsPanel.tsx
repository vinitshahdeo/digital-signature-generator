import React from 'react';
import { useSignatureStore, PresetData, HistoryItem } from '@/stores/signatureStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const PresetsPanel: React.FC = () => {
  const { presets, applyPreset, history } = useSignatureStore();

  return (
    <div className="space-y-6">
      {/* Presets */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Style Presets
          </CardTitle>
          <CardDescription>Quick start with curated styles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {presets.map((preset: PresetData, index: number) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => applyPreset(preset.id)}
              >
                <div>
                  <div className="font-semibold">{preset.name}</div>
                  <div className="text-xs text-muted-foreground">{preset.description}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* History */}
      {history.length > 0 && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Recent History
            </CardTitle>
            <CardDescription>Last {history.length} signatures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {history.slice(0, 6).map((item: HistoryItem) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-video bg-white dark:bg-slate-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
                >
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt={item.name} className="w-full h-full object-contain p-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Canvas Settings */}
      <CanvasSizeControl />
    </div>
  );
};

const CanvasSizeControl: React.FC = () => {
  const { canvas, updateCanvas } = useSignatureStore();

  const presetSizes = [
    { name: 'Small', width: 300, height: 100 },
    { name: 'Medium', width: 600, height: 200 },
    { name: 'Large', width: 1200, height: 400 },
  ];

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-lg">Canvas Size</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {presetSizes.map((size) => (
            <Button
              key={size.name}
              variant={canvas.width === size.width ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateCanvas({ width: size.width, height: size.height })}
            >
              {size.name}
            </Button>
          ))}
        </div>

        <div className="text-xs text-center text-muted-foreground">
          {canvas.width} × {canvas.height} px
        </div>
      </CardContent>
    </Card>
  );
};

export default PresetsPanel;
