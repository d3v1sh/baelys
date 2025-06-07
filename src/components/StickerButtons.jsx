import React from 'react';
//import sticker1 from '../assets/smily.png';
const STICKER_URLS = [
  "https://cdn-icons-png.flaticon.com/512/742/742751.png",
  "https://cdn-icons-png.flaticon.com/512/742/742752.png",
  "https://cdn-icons-png.flaticon.com/512/742/742753.png",
    //sticker1, // Local sticker
];

const StickerButtons = ({ onAddSticker }) => {
  return (
    <div className="flex flex-col gap-3">
      {STICKER_URLS.map((src, index) => (
        <img
          key={index}
          src={src}
          width={50}
          height={50}
          alt={`sticker-${index}`}
          className="cursor-pointer hover:scale-110 transition-transform duration-200"
          onDragStart={(e) => e.dataTransfer.setData('stickerSrc', src)}
          onClick={() => onAddSticker(src)}
        />
      ))}
    </div>
  );
};

export default StickerButtons;
