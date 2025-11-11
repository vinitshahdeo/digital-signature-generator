import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useSignatureStore } from '@/stores/signatureStore';
import { exportSignature, generateFileName } from '@/utils/export';
import Konva from 'konva';
import { Download, FileImage, FileType, FileText } from 'lucide-react';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stageRef: React.RefObject<Konva.Stage>;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ open, onOpenChange, stageRef }) => {
  const { typed, canvas, export: exportSettings, updateExport } = useSignatureStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!stageRef.current) return;

    setIsExporting(true);
    try {
      const fileName = generateFileName(
        typed.fullName,
        typed.initials,
        { width: canvas.width, height: canvas.height },
        canvas.pixelRatio,
        exportSettings.format
      );

      await exportSignature(stageRef.current, {
        ...exportSettings,
        width: canvas.width,
        height: canvas.height,
        pixelRatio: canvas.pixelRatio,
        fileName,
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Signature</DialogTitle>
          <DialogDescription>
            Configure export settings for your signature
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Format */}
          <div className="space-y-2">
            <Label>Format</Label>
            <Select
              value={exportSettings.format}
              onValueChange={(value: 'png' | 'svg' | 'pdf') =>
                updateExport({ format: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    PNG (Transparent)
                  </div>
                </SelectItem>
                <SelectItem value="svg">
                  <div className="flex items-center gap-2">
                    <FileType className="w-4 h-4" />
                    SVG (Vector)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    PDF (Document)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pixel Ratio (for PNG) */}
          {exportSettings.format === 'png' && (
            <div className="space-y-2">
              <Label>Resolution</Label>
              <Select
                value={canvas.pixelRatio.toString()}
                onValueChange={(value) =>
                  useSignatureStore.getState().updateCanvas({
                    pixelRatio: parseInt(value) as 1 | 2 | 3,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1× (Standard)</SelectItem>
                  <SelectItem value="2">2× (Retina)</SelectItem>
                  <SelectItem value="3">3× (Ultra HD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Auto Trim */}
          <div className="flex items-center justify-between">
            <Label>Auto-trim transparent area</Label>
            <Switch
              checked={exportSettings.trim}
              onCheckedChange={(checked) => updateExport({ trim: checked })}
            />
          </div>

          {/* Padding */}
          {exportSettings.trim && (
            <div className="space-y-2">
              <Label>Padding: {exportSettings.padding}px</Label>
              <Slider
                value={[exportSettings.padding]}
                onValueChange={([value]) => updateExport({ padding: value })}
                min={0}
                max={64}
                step={4}
              />
            </div>
          )}

          {/* Dimensions Display */}
          <div className="p-3 bg-muted rounded-lg text-sm">
            <div className="font-semibold mb-1">Export Dimensions</div>
            <div className="text-muted-foreground">
              {canvas.width} × {canvas.height} px
              {canvas.pixelRatio > 1 && ` @ ${canvas.pixelRatio}×`}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
