import React from 'react';
import { MdLayers, MdDragIndicator } from 'react-icons/md';
import { HiDownload, HiRefresh } from 'react-icons/hi';
import { FaLayerGroup } from 'react-icons/fa';
import { BsStack } from 'react-icons/bs';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SortableLayerItem = ({ id, name, onSelect, selected }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`p-3 my-2 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-200 border-2 border-dashed ${
        selected 
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-300 dark:border-blue-600 shadow-md' 
          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
      }`}
    >
      <Button 
        variant={selected ? "default" : "ghost"} 
        size="sm" 
        {...attributes} 
        {...listeners} 
        className="cursor-grab p-1 h-8 w-8 hover:bg-slate-200 dark:hover:bg-slate-600"
      >
        <MdDragIndicator size={16} />
      </Button>
      <BsStack size={14} className={`${selected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
      <span className={`flex-grow truncate font-medium ${selected ? 'text-blue-900 dark:text-blue-100' : 'text-slate-700 dark:text-slate-300'}`}>
        {name}
      </span>
    </div>
  );
};

const LayerPanel = ({ 
  texts, 
  selectedTextId, 
  onTextSelect, 
  onLayerReorder,
  onExport,
  onReset
}) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const newTexts = arrayMove(
        texts, 
        texts.findIndex(item => item.id === active.id),
        texts.findIndex(item => item.id === over.id)
      );
      onLayerReorder(newTexts);
    }
  };

  return (
    <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <MdLayers size={18} />
          </div>
          <span className="font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
            Layer Manager
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Foreground Layer */}
        <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border-2 border-dashed border-emerald-200 dark:border-emerald-700 text-center font-semibold text-sm shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <FaLayerGroup className="text-emerald-600 dark:text-emerald-400" size={14} />
            <span className="text-emerald-800 dark:text-emerald-200">Foreground Layer</span>
          </div>
        </div>
        
        {/* Text Layers */}
        <div className="max-h-64 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={texts.map(t => t.id)} strategy={verticalListSortingStrategy}>
              {texts.slice().reverse().map(text => (
                <SortableLayerItem 
                  key={text.id} 
                  id={text.id} 
                  name={text.text.substring(0, 20) + (text.text.length > 20 ? '...' : '')} 
                  onSelect={() => onTextSelect(text.id)} 
                  selected={text.id === selectedTextId} 
                />
              ))}
            </SortableContext>
          </DndContext>
          
          {texts.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <BsStack size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No text layers yet</p>
              <p className="text-xs">Add text to see layers here</p>
            </div>
          )}
        </div>
        
        {/* Background Layer */}
        <div className="p-3 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-600 text-center font-semibold text-sm shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <FaLayerGroup className="text-slate-600 dark:text-slate-400" size={14} />
            <span className="text-slate-800 dark:text-slate-200">Background Layer</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LayerPanel; 