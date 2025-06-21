import React, { useRef, useEffect, useState } from 'react';
import { Text as KonvaText, Transformer } from 'react-konva';

const TextLayer = ({ textProps, isSelected, onSelect, onChange, onDoubleClick }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleClick = (e) => {
    e.cancelBubble = true;
    onSelect();
  };

  const handleDoubleClick = (e) => {
    e.cancelBubble = true;
    setIsEditing(true);
    if (onDoubleClick) {
      onDoubleClick();
    }
  };

  return (
    <React.Fragment>
      <KonvaText
        onClick={handleClick}
        onTap={handleClick}
        onDblClick={handleDoubleClick}
        onDblTap={handleDoubleClick}
        ref={shapeRef}
        {...textProps}
        draggable
        onDragEnd={(e) => {
          onChange({ ...textProps, x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...textProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            fontSize: textProps.fontSize * scaleX,
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default TextLayer; 