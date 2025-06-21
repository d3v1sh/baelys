import React, { useState, useMemo, useEffect, useRef } from 'react';
import { removeBackground } from '../action';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';
import ImageProcessing from './ImageProcessing';
import CanvasArea from './CanvasArea';
import TextControls from './TextControls';
import LayerPanel from './LayerPanel';
import Header from './Header';

const Editor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [foregroundImage, setForegroundImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editorStep, setEditorStep] = useState('upload');
  const [imageDimensions, setImageDimensions] = useState({ width: 800, height: 600 });

  // Refs for tracking UI elements that should not trigger deselection
  const textControlsRef = useRef(null);
  const layerPanelRef = useRef(null);
  const canvasAreaRef = useRef(null);

  const selectedText = useMemo(() => {
    return texts.find(t => t.id === selectedTextId);
  }, [texts, selectedTextId]);

  // Enhanced global click handler to deselect text when clicking outside
  useEffect(() => {
    const handleGlobalClick = (event) => {
      // Only deselect if there's a currently selected text
      if (!selectedTextId) return;

      // Get all elements that should prevent deselection
      const protectedElements = [
        textControlsRef.current,
        layerPanelRef.current,
        // Don't include canvasAreaRef here as we want clicks on canvas background to deselect
      ].filter(Boolean);

      // Check if the click was inside any protected area
      const isInsideProtectedArea = protectedElements.some(element => 
        element && element.contains(event.target)
      );

      // Also check for specific UI elements that should not trigger deselection
      const isUIElement = event.target.closest('[role="dialog"]') || 
                         event.target.closest('[data-radix-root]') ||
                         event.target.closest('[data-radix-popper-content-wrapper]') ||
                         event.target.closest('[data-radix-select-content]') ||
                         event.target.closest('[data-radix-popover-content]') ||
                         event.target.closest('.konvajs-content') ||
                         event.target.closest('button') ||
                         event.target.closest('input') ||
                         event.target.closest('textarea') ||
                         event.target.closest('select') ||
                         event.target.closest('[role="listbox"]') ||
                         event.target.closest('[role="option"]') ||
                         event.target.closest('header') ||
                         event.target.closest('a');

      // If the click was outside all protected areas and not on UI elements, deselect
      if (!isInsideProtectedArea && !isUIElement) {
        setSelectedTextId(null);
      }
    };

    // Add event listener to document
    document.addEventListener('mousedown', handleGlobalClick, true);

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick, true);
    };
  }, [selectedTextId]);

  const handleImageUpload = (imageSrc) => {
    setOriginalImage(imageSrc);
    setForegroundImage(null);
    setTexts([]);
    setSelectedTextId(null);
    
    // Get image dimensions
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = imageSrc;
    
    setEditorStep('processing');
    toast.success('Image uploaded successfully!');
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) return;
    setIsLoading(true);
    toast.loading('Removing background...', { id: 'bg-removal' });
    try {
      const foregroundSrc = await removeBackground(originalImage);
      setForegroundImage(foregroundSrc);
      setEditorStep('editing');
      toast.success('Background removed successfully!', { id: 'bg-removal' });
    } catch (error) {
      console.error('Failed to remove background:', error);
      toast.error('Failed to remove background. Please try another image.', { id: 'bg-removal' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (stageRef) => {
    setSelectedTextId(null);
    toast.loading('Preparing download...', { id: 'download' });
    setTimeout(() => {
      const uri = stageRef.toDataURL({ pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'image-with-text.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded successfully!', { id: 'download' });
    }, 100);
  };

  const addText = () => {
    const newText = {
      id: Date.now().toString(),
      text: 'New Text',
      x: imageDimensions.width * 0.3, // 30% from left
      y: imageDimensions.height * 0.25, // 25% from top
      fontSize: Math.min(imageDimensions.width, imageDimensions.height) * 0.08, // 8% of smaller dimension
      fill: '#000000',
      fontFamily: 'Poppins, sans-serif',
      rotation: 0,
      width: imageDimensions.width * 0.4, // 40% of image width
      align: 'center',
      fontStyle: 'normal',
    };
    setTexts([...texts, newText]);
    setSelectedTextId(newText.id);
    toast.success('Text layer added!');
  };

  const handleTextStyleChange = (style) => {
    if (!selectedText) return;

    const currentStyle = selectedText.fontStyle || '';
    let newStyle;

    if (currentStyle.includes(style)) {
      newStyle = currentStyle.replace(style, '').replace('  ', ' ').trim();
    } else {
      newStyle = `${currentStyle} ${style}`.trim();
    }

    setTexts(texts.map(t => t.id === selectedTextId ? { ...t, fontStyle: newStyle } : t));
  };

  const handleTextUpdate = (updates) => {
    if (!selectedTextId) return;
    setTexts(texts.map(t => t.id === selectedTextId ? { ...t, ...updates } : t));
  };

  const handleTextChange = (newAttrs) => {
    setTexts(currentTexts => currentTexts.map(t => t.id === newAttrs.id ? newAttrs : t));
  };

  const handleDeleteText = () => {
    setTexts(texts.filter(t => t.id !== selectedTextId));
    setSelectedTextId(null);
    toast.success('Text layer deleted!');
  };

  const handleLayerReorder = (newTexts) => {
    setTexts(newTexts);
    toast.success('Layers reordered!');
  };

  const resetEditor = () => {
    setOriginalImage(null);
    setForegroundImage(null);
    setTexts([]);
    setSelectedTextId(null);
    setImageDimensions({ width: 800, height: 600 }); // Reset to default
    setEditorStep('upload');
    toast.success('Editor reset!');
  };

  const handleCancelProcessing = () => {
    setOriginalImage(null);
    setEditorStep('upload');
  };

  // Robust deselection handler for canvas clicks
  const handleCanvasDeselect = () => {
    if (selectedTextId) {
      setSelectedTextId(null);
    }
  };

  if (editorStep === 'upload') {
    return (
      <>
      <Header />
      <ImageUpload onImageUpload={handleImageUpload} />
      </>
    );
  }

  if (editorStep === 'processing') {
    return (
      <>
      <Header />
      <ImageProcessing
        originalImage={originalImage}
        isLoading={isLoading}
        onSubmit={handleRemoveBackground}
        onCancel={handleCancelProcessing}
      />
      </>
    );
  }

  return (
    <div className="h-full flex bg-gradient-to-br from-slate-50/30 to-white/30 dark:from-slate-900/30 dark:to-slate-800/30">
      {/* Canvas Area - 75% for more space */}
      <div ref={canvasAreaRef} className="w-[75%] border-r border-slate-200 dark:border-slate-600 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <CanvasArea
          originalImage={originalImage}
          foregroundImage={foregroundImage}
          texts={texts}
          selectedTextId={selectedTextId}
          isLoading={isLoading}
          imageDimensions={imageDimensions}
          onTextSelect={setSelectedTextId}
          onTextChange={handleTextChange}
          onDeselect={handleCanvasDeselect}
          onExport={handleExport}
          onReset={resetEditor}
        />
      </div>
      
      {/* Controls Sidebar - 25% */}
      <div className="w-[25%] bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-l border-slate-200 dark:border-slate-700">
        <div className="h-full flex flex-col p-3 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">


        <div ref={layerPanelRef}>
            <LayerPanel
              texts={texts}
              selectedTextId={selectedTextId}
              onTextSelect={setSelectedTextId}
              onLayerReorder={handleLayerReorder}
              onExport={() => {}} // Export handled by CanvasArea
              onReset={resetEditor}
            />
          </div>

          
          <div ref={textControlsRef}>
            <TextControls
              selectedText={selectedText}
              onAddText={addText}
              onUpdateText={handleTextUpdate}
              onDeleteText={handleDeleteText}
              onStyleChange={handleTextStyleChange}
            />
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default Editor; 