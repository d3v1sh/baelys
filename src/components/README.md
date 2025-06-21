# Component Structure

This directory contains the refactored image editor components, broken down into smaller, more manageable pieces.

## Main Editor Components

### `Editor.jsx`
- **Purpose**: Main container component that orchestrates the entire editing workflow
- **Responsibilities**: State management, workflow coordination
- **Dependencies**: All sub-components listed below

### `ImageUpload.jsx`
- **Purpose**: Handles the initial image upload step
- **Props**: `onImageUpload(imageSrc)`
- **Features**: Drag & drop interface, file validation

### `ImageProcessing.jsx`
- **Purpose**: Manages the background removal processing step
- **Props**: `originalImage`, `isLoading`, `onRemoveBackground()`, `onCancel()`
- **Features**: Loading states, processing feedback

### `CanvasArea.jsx`
- **Purpose**: Contains the Konva canvas and handles image/text rendering
- **Props**: Multiple props for images, texts, selections, and event handlers
- **Features**: Canvas rendering, export functionality

### `TextControls.jsx`
- **Purpose**: Provides text editing controls and properties panel
- **Props**: `selectedText`, `onAddText()`, `onUpdateText()`, `onDeleteText()`, `onStyleChange()`
- **Features**: Style controls, color picker, font selection, text formatting

### `LayerPanel.jsx`
- **Purpose**: Manages layer ordering and provides export/reset actions
- **Props**: `texts`, `selectedTextId`, `onTextSelect()`, `onLayerReorder()`, `onExport()`, `onReset()`
- **Features**: Drag & drop layer reordering, layer selection

## Canvas Components

### `ImageLayer.jsx`
- **Purpose**: Renders image layers within the Konva canvas
- **Props**: `imageUrl`
- **Features**: Automatic sizing and positioning

### `TextLayer.jsx`
- **Purpose**: Renders interactive text layers within the Konva canvas
- **Props**: `textProps`, `isSelected`, `onSelect()`, `onChange()`
- **Features**: Text transformation, selection handling

## UI Components

The `ui/` directory contains reusable UI components built with shadcn/ui:
- Button, Card, Input, Label, Select, Slider, Tabs, Textarea, Tooltip

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or tested in isolation
3. **Maintainability**: Easier to debug and modify specific features
4. **Scalability**: New features can be added as separate components
5. **Code Organization**: Clear separation of concerns

## Usage

```jsx
import { Editor } from './components';
// or
import Editor from './components/Editor';
```

Each component can also be imported individually for testing or custom implementations. 