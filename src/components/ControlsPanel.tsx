import React from 'react';
import { useSignatureStore } from '@/stores/signatureStore';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { HANDWRITING_FONTS } from '@/utils/fonts';
import { Palette, Undo2, Redo2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

const COLOR_SWATCHES = [
  { name: 'Black', value: '#000000' },
  { name: 'Blue', value: '#1e3a8a' },
  { name: 'Royal Blue', value: '#1e40af' },
  { name: 'Charcoal', value: '#374151' },
  { name: 'Navy', value: '#0c4a6e' },
];

const ControlsPanel: React.FC = () => {
  const { mode, typed, updateTyped, freehand, updateFreehand, clearLines, undoLine, redoLine } =
    useSignatureStore();

  if (mode === 'freehand') {
    return (
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg">Freehand Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pen Size */}
          <div className="space-y-2">
            <Label>Pen Size: {freehand.penSize}px</Label>
            <Slider
              value={[freehand.penSize]}
              onValueChange={([value]) => updateFreehand({ penSize: value })}
              min={1}
              max={20}
              step={1}
            />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label>Pen Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={freehand.penColor}
                onChange={(e) => updateFreehand({ penColor: e.target.value })}
                className="w-20 h-10 cursor-pointer"
              />
              <div className="flex gap-1">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.value}
                    onClick={() => updateFreehand({ penColor: swatch.value })}
                    className="w-8 h-8 rounded-md border-2 border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: swatch.value }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Opacity */}
          <div className="space-y-2">
            <Label>Opacity: {Math.round(freehand.penOpacity * 100)}%</Label>
            <Slider
              value={[freehand.penOpacity]}
              onValueChange={([value]) => updateFreehand({ penOpacity: value })}
              min={0.1}
              max={1}
              step={0.1}
            />
          </div>

          {/* Smoothing */}
          <div className="space-y-2">
            <Label>Smoothing: {freehand.smoothing}%</Label>
            <Slider
              value={[freehand.smoothing]}
              onValueChange={([value]) => updateFreehand({ smoothing: value })}
              min={0}
              max={100}
              step={5}
            />
          </div>

          {/* Show Baseline */}
          <div className="flex items-center justify-between">
            <Label>Show Baseline</Label>
            <Switch
              checked={freehand.showBaseline}
              onCheckedChange={(checked) => updateFreehand({ showBaseline: checked })}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={undoLine} className="flex-1">
              <Undo2 className="w-4 h-4 mr-2" />
              Undo
            </Button>
            <Button variant="outline" size="sm" onClick={redoLine} className="flex-1">
              <Redo2 className="w-4 h-4 mr-2" />
              Redo
            </Button>
            <Button variant="destructive" size="sm" onClick={clearLines}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Typed mode controls
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-lg">Typed Signature Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={typed.fullName}
            onChange={(e) => updateTyped({ fullName: e.target.value })}
            placeholder="Vinit Shahdeo"
            maxLength={undefined}
          />
        </div>

        {/* Initials */}
        <div className="space-y-2">
          <Label>Initials</Label>
          <Input
            value={typed.initials}
            onChange={(e) => updateTyped({ initials: e.target.value })}
            placeholder="VS"
            maxLength={undefined}
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label>Title (optional)</Label>
          <Input
            value={typed.title}
            onChange={(e) => updateTyped({ title: e.target.value })}
            placeholder="Tech Lead"
            maxLength={undefined}
          />
        </div>

        {/* Monogram Mode */}
        <div className="flex items-center justify-between">
          <Label>Monogram Mode</Label>
          <Switch
            checked={typed.monogramMode}
            onCheckedChange={(checked) => updateTyped({ monogramMode: checked })}
          />
        </div>

        {/* Font Family */}
        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select value={typed.fontFamily} onValueChange={(value) => updateTyped({ fontFamily: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {HANDWRITING_FONTS.map((font) => (
                <SelectItem key={font.family} value={font.family} style={{ fontFamily: font.family }}>
                  {font.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <Label>Font Size: {typed.fontSize}px</Label>
          <Slider
            value={[typed.fontSize]}
            onValueChange={([value]) => updateTyped({ fontSize: value })}
            min={24}
            max={150}
            step={2}
          />
        </div>

        {/* Font Weight */}
        <div className="space-y-2">
          <Label>Font Weight</Label>
          <Select 
            value={typed.fontWeight.toString()} 
            onValueChange={(value) => updateTyped({ fontWeight: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">Light (300)</SelectItem>
              <SelectItem value="400">Regular (400)</SelectItem>
              <SelectItem value="500">Medium (500)</SelectItem>
              <SelectItem value="600">Semi-Bold (600)</SelectItem>
              <SelectItem value="700">Bold (700)</SelectItem>
              <SelectItem value="800">Extra Bold (800)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Letter Spacing */}
        <div className="space-y-2">
          <Label>Letter Spacing: {typed.letterSpacing}px</Label>
          <Slider
            value={[typed.letterSpacing]}
            onValueChange={([value]) => updateTyped({ letterSpacing: value })}
            min={-5}
            max={20}
            step={1}
          />
        </div>

        {/* Line Height */}
        <div className="space-y-2">
          <Label>Line Height: {typed.lineHeight.toFixed(1)}</Label>
          <Slider
            value={[typed.lineHeight]}
            onValueChange={([value]) => updateTyped({ lineHeight: value })}
            min={0.8}
            max={2.0}
            step={0.1}
          />
        </div>

        {/* Slant */}
        <div className="space-y-2">
          <Label>Slant: {typed.slant}°</Label>
          <Slider
            value={[typed.slant]}
            onValueChange={([value]) => updateTyped({ slant: value })}
            min={-15}
            max={15}
            step={1}
          />
        </div>

        {/* Color */}
        <div className="space-y-2">
          <Label>
            <Palette className="w-4 h-4 inline mr-2" />
            Ink Color
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={typed.color}
              onChange={(e) => updateTyped({ color: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
            <div className="flex gap-1">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.value}
                  onClick={() => updateTyped({ color: swatch.value })}
                  className="w-8 h-8 rounded-md border-2 border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: swatch.value }}
                  title={swatch.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Opacity */}
        <div className="space-y-2">
          <Label>Opacity: {Math.round(typed.opacity * 100)}%</Label>
          <Slider
            value={[typed.opacity]}
            onValueChange={([value]) => updateTyped({ opacity: value })}
            min={0.1}
            max={1}
            step={0.1}
          />
        </div>

        {/* Stroke Texture */}
        <div className="space-y-2">
          <Label>Ink Texture: {typed.strokeTexture}%</Label>
          <Slider
            value={[typed.strokeTexture]}
            onValueChange={([value]) => updateTyped({ strokeTexture: value })}
            min={0}
            max={100}
            step={5}
          />
        </div>

        {/* Alignment */}
        <div className="space-y-2">
          <Label>Alignment</Label>
          <Select value={typed.alignment} onValueChange={(value: any) => updateTyped({ alignment: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rotation */}
        <div className="space-y-2">
          <Label>Rotation: {typed.rotation}°</Label>
          <Slider
            value={[typed.rotation]}
            onValueChange={([value]) => updateTyped({ rotation: value })}
            min={-15}
            max={15}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlsPanel;
