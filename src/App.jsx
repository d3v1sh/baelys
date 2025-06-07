import React, { useState } from 'react';
import StickerButtons from './components/StickerButtons';
import StickerCanvas from './components/StickerCanvas';

function App() {
  const [stickers, setStickers] = useState([]);

  const addSticker = (src) => {
    const id = Date.now();
    const defaultX = Math.round(50 / 40) * 40;
    const defaultY = Math.round(50 / 40) * 40;

    setStickers([
      ...stickers,
      { id, src, x: defaultX, y: defaultY }
    ]);
  };

  return (
    <div className="flex justify-center items-center gap-5 p-5 mt-16">
      <StickerButtons onAddSticker={addSticker} />
      <StickerCanvas stickers={stickers} setStickers={setStickers} />
    </div>
  );
}

export default App;
