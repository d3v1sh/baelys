import React from 'react';
import { HiUpload, HiPhotograph } from 'react-icons/hi';
import { RiImageAddLine, RiDragDropLine } from 'react-icons/ri';
import { MdCloudUpload } from 'react-icons/md';
import { BsImages } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ImageUpload = ({ onImageUpload }) => {
  // Function to scale up small images while maintaining aspect ratio
  const scaleImageIfNeeded = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const originalWidth = img.width;
        const originalHeight = img.height;
        
        // Define minimum dimensions - scale up if either dimension is smaller
        const MIN_WIDTH = 800;
        const MIN_HEIGHT = 600;
        
        // Check if image needs scaling
        const needsScaling = originalWidth < MIN_WIDTH || originalHeight < MIN_HEIGHT;
        
        if (!needsScaling) {
          // Image is already large enough, return as-is
          resolve(imageSrc);
          return;
        }
        
        // Calculate scale factor to reach minimum size while maintaining aspect ratio
        const scaleX = MIN_WIDTH / originalWidth;
        const scaleY = MIN_HEIGHT / originalHeight;
        const scaleFactor = Math.max(scaleX, scaleY); // Use larger scale to ensure both dimensions meet minimum
        
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(originalHeight * scaleFactor);
        
        // Create canvas to scale the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Use high-quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw scaled image
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        // Convert to data URL with high quality
        const scaledImageSrc = canvas.toDataURL('image/png', 0.95);
        
        console.log(`Image scaled from ${originalWidth}x${originalHeight} to ${newWidth}x${newHeight} (scale factor: ${scaleFactor.toFixed(2)})`);
        
        resolve(scaledImageSrc);
      };
      
      img.onerror = () => {
        // If there's an error loading the image, return original
        resolve(imageSrc);
      };
      
      img.src = imageSrc;
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const originalImageSrc = event.target.result;
        // Scale the image if needed before passing to onImageUpload
        const scaledImageSrc = await scaleImageIfNeeded(originalImageSrc);
        onImageUpload(scaledImageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 p-4">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)
          `,
          backgroundSize: '30px 30px'
        }}
      />
      
      <Card className="relative z-10 w-full max-w-2xl text-center py-6 px-6 border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/30 rounded-3xl backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl">
                <HiPhotograph className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg">
                <MdCloudUpload className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent mb-1">
                Upload Your Image
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Start creating amazing designs with background removal
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="image-upload" className="cursor-pointer block group">
            <div className="relative overflow-hidden border-3 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-700/50 hover:from-blue-50 dark:hover:from-blue-900/20 hover:to-indigo-50 dark:hover:to-indigo-900/20 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 group-hover:shadow-xl">
              {/* Animated background pattern */}
              <div 
                className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)
                  `,
                  backgroundSize: '20px 20px',
                  animation: 'float 6s ease-in-out infinite'
                }}
              />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full mb-4 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-800 dark:group-hover:to-indigo-800 transition-all duration-300 shadow-lg">
                  <RiDragDropLine className="w-8 h-8 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </div>
                <div className="space-y-2 mb-4">
                  <p className="font-bold text-lg text-slate-800 dark:text-slate-200">
                    Drag & drop your image here
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    or click to browse files
                  </p>
                  <div className="flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                    <div className="flex items-center gap-1">
                      <BsImages size={12} />
                      <span>JPG, PNG</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <span>Up to 10MB</span>
                  </div>
                </div>
                <Button 
                  as="span" 
                  size="default" 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 text-base font-semibold"
                >
                  <RiImageAddLine size={18} className="mr-2" />
                  Select Image File
                </Button>
              </div>
            </div>
          </Label>
          
          <Input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-600">
            {[
              { icon: MdCloudUpload, title: "Instant Upload", desc: "Fast & secure" },
              { icon: HiPhotograph, title: "Any Format", desc: "All image types" },
              { icon: RiImageAddLine, title: "High Quality", desc: "Original quality" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-3 rounded-xl bg-gradient-to-br from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-700/50 border border-dashed border-slate-200 dark:border-slate-600">
                <div className="inline-flex p-1.5 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-500 rounded-lg mb-1">
                  <feature.icon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                </div>
                <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 mb-0.5">{feature.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default ImageUpload; 