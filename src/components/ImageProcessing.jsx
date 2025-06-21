import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdCancel, MdArrowForward, MdSettings, MdInfo } from 'react-icons/md';
import { RiText, RiImageEditLine, RiPaletteLine } from 'react-icons/ri';
import { HiSparkles, HiLightBulb } from 'react-icons/hi';
import { IoText, IoColorPalette } from 'react-icons/io5';
import { FiLayers } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ImageProcessing = ({ originalImage, isLoading, onSubmit, onCancel }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
      {/* Enhanced Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 20px 20px, 20px 20px'
        }}
      />
      
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-pink-600/20 rounded-full blur-xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 dark:from-slate-200 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight mb-4">
            Text Design Studio
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Transform your images with beautiful text overlays and typography effects
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              { icon: RiPaletteLine, text: "Custom Styling", color: "from-pink-500 to-rose-600" },
              { icon: FiLayers, text: "Layer Effects", color: "from-blue-500 to-cyan-600" },
              { icon: IoColorPalette, text: "Color Palette", color: "from-emerald-500 to-teal-600" }
            ].map((badge, index) => (
              <div key={index} className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${badge.color} text-white rounded-full shadow-lg text-sm font-medium`}>
                <badge.icon className="w-4 h-4" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* Left Side - Image Preview & Settings */}
          <div className="flex-1 space-y-6">
            {/* Image Preview Card */}
            <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10"></div>
              
              <CardHeader className="relative z-10 text-center pb-4 border-b border-dashed border-slate-200 dark:border-slate-600">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <RiImageEditLine className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent font-bold">
                    Image Canvas
                  </span>
                  <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-md">
                    <HiLightBulb className="w-4 h-4 text-white" />
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8 relative z-10">
                <div className="relative group">
                  {/* Enhanced Image container */}
                  <div className="relative overflow-hidden rounded-3xl border-4 border-dashed border-slate-200 dark:border-slate-600 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-6 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl"></div>
                    
                    <img 
                      src={originalImage} 
                      alt="Preview" 
                      className="relative z-10 w-full max-w-3xl max-h-[45vh] mx-auto rounded-2xl shadow-2xl object-contain border-4 border-white dark:border-slate-600 transition-transform duration-300 group-hover:scale-[1.02]" 
                    />
                    
                    {/* Enhanced overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-slate-900/5 rounded-3xl pointer-events-none"></div>
                    <div className="absolute inset-0 shadow-inner rounded-3xl pointer-events-none"></div>
                  </div>
                  
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl animate-pulse"></div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl animate-pulse delay-100"></div>
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-2xl animate-pulse delay-200"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-2xl animate-pulse delay-300"></div>
                  
                  {/* Corner highlights */}
                  <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-sm"></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-md"></div>
                </div>
              </CardContent>
            </Card>

           
          </div>

          {/* Right Side - Action Panel */}
          <div className="xl:w-80 w-full">
            <Card className="border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 shadow-2xl rounded-3xl overflow-hidden sticky top-8">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10"></div>
              
              <CardHeader className="relative z-10 text-center pb-4 border-b-2 border-dashed border-slate-200 dark:border-slate-600">
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Ready to Continue?
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Apply your text design to the image
                </p>
              </CardHeader>
              
              <CardContent className="relative z-10 p-8 space-y-6">
                {/* Info Panel */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500 rounded-full shadow-md">
                      <MdInfo className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">
                        Text Preview
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Your text will be overlaid on the image with the selected styling options.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={onSubmit}
                  disabled={isLoading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-500 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 px-8 py-6 text-lg font-bold group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                      <span>Processing Magic...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-4 relative z-10">
                      <HiSparkles className="h-5 w-5 animate-pulse" />
                      <span>Continue to Editor</span>
                      <MdArrowForward className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
                
                {/* Cancel Button */}
                <Button
                  onClick={onCancel}
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 px-6 py-4 text-base font-semibold shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-3">
                    <MdCancel className="h-5 w-5" />
                    <span>Cancel & Go Back</span>
                  </div>
                </Button>

                {/* Progress indicator */}
                <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span>Progress</span>
                    <span>Ready to submit</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full w-full transition-all duration-500 shadow-inner"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageProcessing; 