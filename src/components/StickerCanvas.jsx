import React, { useRef } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const DraggableSticker = ({ sticker, onUpdate, onDelete }) => {
  const [image] = useImage(sticker.src);


  const handleDragEnd = (e) => {
    console.log("Dragged to:", e.target.x(), e.target.y());
    const newX = Math.round(e.target.x() / 40) * 40;
    const newY = Math.round(e.target.y() / 40) * 40;
    onUpdate(sticker.id, newX, newY);
  };

  return (
    <KonvaImage
      image={image}
      x={sticker.x}
      y={sticker.y}
      width={60}
      height={60}
      draggable={true}
      onDragEnd={handleDragEnd}
      onDblClick={() => onDelete(sticker.id)}
    />
  );
};

const StickerCanvas = ({ stickers, setStickers }) => {
  const stageRef = useRef();

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = uri;
    link.click();
  };

  const updateSticker = (id, x, y) => {
    const updated = stickers.map((s) =>
      s.id === id ? { ...s, x, y } : s
    );
    setStickers(updated);
  };

  const deleteSticker = (id) => {
    setStickers(stickers.filter((s) => s.id !== id));
  };

 const handleDrop = (e) => {
  e.preventDefault();
  const stickerSrc = e.dataTransfer.getData('stickerSrc');
  if (!stickerSrc) return;

  const stage = stageRef.current;

  // Get mouse position relative to the stage container:
  const stageBox = stage.container().getBoundingClientRect();

  // Calculate pointer position relative to stage content:
  const pointerX = e.clientX - stageBox.left;
  const pointerY = e.clientY - stageBox.top;

  const x = Math.round(pointerX / 40) * 40;
  const y = Math.round(pointerY / 40) * 40;

  const newSticker = {
    id: Date.now(),
    src: stickerSrc,
    x,
    y,
  };

  setStickers((prev) => [...prev, newSticker]);
};


  return (
    <div className="flex flex-col items-center" onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}>
      <Stage
        className="border border-gray-300 rounded shadow-md bg-white"
        width={600}
        height={400}
        ref={stageRef}
      >
        <Layer>
          {stickers.map((s) => (
            <DraggableSticker
              key={s.id}
              sticker={s}
              onUpdate={updateSticker}
              onDelete={deleteSticker}
            />
          ))}
        </Layer>
      </Stage>
      <button
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        onClick={handleDownload}
      >
        Download PNG
      </button>
    </div>
  );
};

export default StickerCanvas;
