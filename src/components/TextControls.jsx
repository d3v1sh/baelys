import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { 
  MdTextFields, 
  MdColorize, 
  MdFormatAlignCenter, 
  MdFormatAlignLeft, 
  MdFormatAlignRight, 
  MdFormatBold, 
  MdFormatItalic, 
  MdFormatUnderlined,
  MdRotateRight,
  MdAdd
} from 'react-icons/md';
import { 
  RiDeleteBin6Line, 
  RiPaletteLine,
  RiTextSpacing
} from 'react-icons/ri';
import { 
  BsType,
  BsFonts,
  BsTextareaResize
} from 'react-icons/bs';
import { 
  IoColorPaletteOutline,
  IoText
} from 'react-icons/io5';
import { 
  AiOutlineFormatPainter,
  AiOutlineBgColors
} from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TIKTOK_FONTS } from '@/constants/fonts';

const TextControls = ({ 
  selectedText, 
  onAddText, 
  onUpdateText, 
  onDeleteText,
  onStyleChange
}) => {
  if (!selectedText) {
    return (
      <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <IoText size={18} />
            </div>
            <span className="font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
              Text Studio
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={onAddText} 
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-md transition-all duration-200 hover:shadow-lg h-12"
          >
            <MdAdd size={20} className="mr-2"/> Add New Text Layer
          </Button>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-600">
            <div className="text-center">
              <BsType size={32} className="mx-auto mb-2 text-slate-400 dark:text-slate-500" />
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Click to add your first text layer!</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Add text and customize it with our tools</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Add Text Button */}
      <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <IoText size={18} />
            </div>
            <span className="font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
              Text Studio
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={onAddText} 
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 shadow-md transition-all duration-200 hover:shadow-lg h-12"
          >
            <MdAdd size={20} className="mr-2"/> Add New Text Layer
          </Button>
        </CardContent>
      </Card>
      <p className="h-2"/>

      {/* Text Properties */}
      <Card className="flex-grow border-2  border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white">
                <AiOutlineFormatPainter size={18} />
              </div>
              <span className="font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
                Properties
              </span>
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={onDeleteText}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-md"
                  >
                    <RiDeleteBin6Line size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Text Layer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-700 border-2 border-dashed border-slate-200 dark:border-slate-600">
              <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                <IoText size={16} className="mr-1" />
                Content
              </TabsTrigger>
              <TabsTrigger value="style" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                <RiPaletteLine size={16} className="mr-1" />
                Style
              </TabsTrigger>
              <TabsTrigger value="effects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white">
                <AiOutlineBgColors size={16} className="mr-1" />
                Effects
              </TabsTrigger>
              <TabsTrigger value="advance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                <MdRotateRight size={16} className="mr-1" />
                Advanced
              </TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="flex flex-col gap-4 pt-4">
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <BsTextareaResize size={14} />
                  Text Content
                </Label>
                <Textarea 
                  value={selectedText.text} 
                  onChange={(e) => onUpdateText({ text: e.target.value })} 
                  rows="4"
                  placeholder="Enter your text here..."
                  className="border-2 border-dashed border-slate-200 dark:border-slate-600 focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-slate-800"
                />
              </div>
              
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <BsFonts size={14} />
                  Font Family
                </Label>
                <Select 
                  onValueChange={(value) => onUpdateText({ fontFamily: value })} 
                  value={selectedText.fontFamily}
                >
                  <SelectTrigger className="border-2 border-dashed border-slate-200 dark:border-slate-600 focus:border-blue-400 dark:focus:border-blue-500 h-12">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent 
                    className="max-h-80" 
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onPointerDownOutside={(e) => {
                      // Allow clicking on select content without deselecting text
                      const target = e.target;
                      if (target.closest('[data-radix-select-content]') || 
                          target.closest('[role="option"]') || 
                          target.closest('[role="listbox"]')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {/* Group fonts by category */}
                    {Object.entries(
                      TIKTOK_FONTS.reduce((acc, font) => {
                        if (!acc[font.category]) acc[font.category] = [];
                        acc[font.category].push(font);
                        return acc;
                      }, {})
                    ).map(([category, fonts]) => (
                      <div key={category}>
                        <div className="px-2 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-600">
                          {category}
                        </div>
                        {fonts.map(font => (
                          <SelectItem key={font.name} value={font.value} className="font-medium py-3 pl-4">
                            <div className="flex items-center gap-3">
                              <span style={{ fontFamily: font.value }} className="text-lg font-semibold">Aa</span>
                              <div className="flex flex-col">
                                <span className="font-medium">{font.name}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{font.category}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <RiTextSpacing size={14} />
                  Font Size
                </Label>
                <div className="flex items-center gap-2">
                  <Slider 
                    value={[selectedText.fontSize || 16]} 
                    onValueChange={([value]) => onUpdateText({ fontSize: value })} 
                    min={8} 
                    max={120} 
                    step={1} 
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={selectedText.fontSize || 16}
                    onChange={(e) => onUpdateText({ fontSize: parseInt(e.target.value) || 16 })}
                    min="8"
                    max="120"
                    className="w-20 border-2 border-dashed border-slate-200 dark:border-slate-600 focus:border-blue-400 dark:focus:border-blue-500 text-center"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600">px</span>
                </div>
              </div>
            </TabsContent>
            
            {/* Style Tab */}
            <TabsContent value="style" className="flex flex-col gap-4 pt-4">
              <div className="grid gap-3">
                <Label className="flex items-center gap-2 font-semibold">
                  <IoColorPaletteOutline size={14} />
                  Text Color
                </Label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Label className="text-xs font-medium min-w-[50px]">Opacity</Label>
                    <Slider 
                      value={[selectedText.fillOpacity || 100]} 
                      onValueChange={([value]) => onUpdateText({ fillOpacity: value })} 
                      min={0} 
                      max={100} 
                      step={1} 
                      className="flex-1"
                    />
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[45px] text-center">
                      {selectedText.fillOpacity || 100}%
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-16 h-10 p-1 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
                        style={{ backgroundColor: selectedText.fill || '#000000' }}
                      >
                        <div className="w-full h-full rounded-sm border border-white/20" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3" align="end">
                      <HexColorPicker 
                        color={selectedText.fill || '#000000'} 
                        onChange={(color) => onUpdateText({ fill: color })} 
                        style={{ width: '200px', height: '150px' }}
                      />
                      <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs font-mono text-center">
                        {selectedText.fill || '#000000'}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-3">
                <Label className="flex items-center gap-2 font-semibold">
                  <MdColorize size={14} />
                  Stroke Color
                </Label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Label className="text-xs font-medium min-w-[50px]">Opacity</Label>
                    <Slider 
                      value={[selectedText.strokeOpacity || 100]} 
                      onValueChange={([value]) => onUpdateText({ strokeOpacity: value })} 
                      min={0} 
                      max={100} 
                      step={1} 
                      className="flex-1"
                    />
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[45px] text-center">
                      {selectedText.strokeOpacity || 100}%
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-16 h-10 p-1 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
                        style={{ backgroundColor: selectedText.stroke || '#000000' }}
                      >
                        <div className="w-full h-full rounded-sm border border-white/20" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3" align="end">
                      <HexColorPicker 
                        color={selectedText.stroke || '#000000'} 
                        onChange={(color) => onUpdateText({ stroke: color })} 
                        style={{ width: '200px', height: '150px' }}
                      />
                      <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs font-mono text-center">
                        {selectedText.stroke || '#000000'}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <MdFormatBold size={14} />
                  Stroke Width
                </Label>
                <div className="flex items-center gap-2">
                  <Slider 
                    value={[selectedText.strokeWidth || 0]} 
                    onValueChange={([value]) => onUpdateText({ strokeWidth: value })} 
                    min={0} 
                    max={4} 
                    step={0.1} 
                    className="flex-1"
                  />
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[55px] text-center">
                    {(selectedText.strokeWidth || 0).toFixed(1)}px
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Effects Tab */}
            <TabsContent value="effects" className="flex flex-col gap-4 pt-4">
              <div className="grid gap-3">
                <Label className="flex items-center gap-2 font-semibold">
                  <AiOutlineBgColors size={14} />
                  Shadow Color
                </Label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Label className="text-xs font-medium min-w-[50px]">Opacity</Label>
                    <Slider 
                      value={[selectedText.shadowOpacity || 100]} 
                      onValueChange={([value]) => onUpdateText({ shadowOpacity: value })} 
                      min={0} 
                      max={100} 
                      step={1} 
                      className="flex-1"
                    />
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[45px] text-center">
                      {selectedText.shadowOpacity || 100}%
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-16 h-10 p-1 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
                        style={{ backgroundColor: selectedText.shadowColor || '#000000' }}
                      >
                        <div className="w-full h-full rounded-sm border border-white/20" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3" align="end">
                      <HexColorPicker 
                        color={selectedText.shadowColor || '#000000'} 
                        onChange={(color) => onUpdateText({ shadowColor: color })} 
                        style={{ width: '200px', height: '150px' }}
                      />
                      <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs font-mono text-center">
                        {selectedText.shadowColor || '#000000'}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <RiTextSpacing size={14} />
                  Shadow Blur
                </Label>
                <div className="flex items-center gap-2">
                  <Slider 
                    value={[selectedText.shadowBlur || 0]} 
                    onValueChange={([value]) => onUpdateText({ shadowBlur: value })} 
                    min={0} 
                    max={50} 
                    step={1} 
                    className="flex-1"
                  />
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[60px] text-center">
                    {selectedText.shadowBlur || 0}px
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <MdFormatAlignLeft size={14} />
                  Shadow X Offset
                </Label>
                <div className="flex items-center gap-2">
                  <Slider 
                    value={[selectedText.shadowOffsetX || 0]} 
                    onValueChange={([value]) => onUpdateText({ shadowOffsetX: value })} 
                    min={-50} 
                    max={50} 
                    step={1} 
                    className="flex-1"
                  />
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[60px] text-center">
                    {selectedText.shadowOffsetX || 0}px
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <MdFormatAlignCenter size={14} />
                  Shadow Y Offset
                </Label>
                <div className="flex items-center gap-2">
                  <Slider 
                    value={[selectedText.shadowOffsetY || 0]} 
                    onValueChange={([value]) => onUpdateText({ shadowOffsetY: value })} 
                    min={-50} 
                    max={50} 
                    step={1} 
                    className="flex-1"
                  />
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[60px] text-center">
                    {selectedText.shadowOffsetY || 0}px
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advance" className="flex flex-col gap-4 pt-4">
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <RiTextSpacing size={14} />
                  Letter Spacing
                </Label>
                <div className="flex items-center gap-2">
                  <Slider 
                    value={[selectedText.letterSpacing || 0]} 
                    onValueChange={([value]) => onUpdateText({ letterSpacing: value })} 
                    min={-5} 
                    max={20} 
                    step={0.1} 
                    className="flex-1"
                  />
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[60px] text-center">
                    {(selectedText.letterSpacing || 0).toFixed(1)}px
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <MdRotateRight size={14} />
                  Rotation
                </Label>
                <div className="flex items-center gap-2">
                  <Slider 
                    value={[selectedText.rotation || 0]} 
                    onValueChange={([value]) => onUpdateText({ rotation: value })} 
                    min={-180} 
                    max={180} 
                    step={1} 
                    className="flex-1"
                  />
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[60px] text-center">
                    {selectedText.rotation || 0}°
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <BsTextareaResize size={14} />
                  Line Height
                </Label>
                <div className="flex items-center gap-2">
                  <Slider 
                    value={[selectedText.lineHeight || 1]} 
                    onValueChange={([value]) => onUpdateText({ lineHeight: value })} 
                    min={0.5} 
                    max={3} 
                    step={0.1} 
                    className="flex-1"
                  />
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 min-w-[60px] text-center">
                    {(selectedText.lineHeight || 1).toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <MdFormatAlignCenter size={14} />
                  Text Alignment
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={selectedText.align === 'left' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateText({ align: 'left' })}
                    className={selectedText.align === 'left' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : ''}
                  >
                    <MdFormatAlignLeft size={16} />
                  </Button>
                  <Button
                    variant={selectedText.align === 'center' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateText({ align: 'center' })}
                    className={selectedText.align === 'center' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : ''}
                  >
                    <MdFormatAlignCenter size={16} />
                  </Button>
                  <Button
                    variant={selectedText.align === 'right' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateText({ align: 'right' })}
                    className={selectedText.align === 'right' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : ''}
                  >
                    <MdFormatAlignRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-semibold">
                  <MdFormatBold size={14} />
                  Text Decoration
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={selectedText.fontStyle === 'bold' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateText({ fontStyle: selectedText.fontStyle === 'bold' ? 'normal' : 'bold' })}
                    className={selectedText.fontStyle === 'bold' ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' : ''}
                  >
                    <MdFormatBold size={16} />
                  </Button>
                  <Button
                    variant={selectedText.fontStyle === 'italic' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateText({ fontStyle: selectedText.fontStyle === 'italic' ? 'normal' : 'italic' })}
                    className={selectedText.fontStyle === 'italic' ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' : ''}
                  >
                    <MdFormatItalic size={16} />
                  </Button>
                  <Button
                    variant={selectedText.textDecoration === 'underline' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateText({ textDecoration: selectedText.textDecoration === 'underline' ? '' : 'underline' })}
                    className={selectedText.textDecoration === 'underline' ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' : ''}
                  >
                    <MdFormatUnderlined size={16} />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default TextControls; 