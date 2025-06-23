import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { Download, RefreshCw, Palette, Eye, Github } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import ImageLayer from './ImageLayer';
import TextLayer from './TextLayer';

const CanvasArea = ({ 
  originalImage, 
  foregroundImage,
  texts, 
  selectedTextId, 
  isLoading,
  imageDimensions,
  onTextSelect, 
  onTextChange, 
  onDeselect,
  onExport,
  onReset
}) => {
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const [stageDimensions, setStageDimensions] = useState({ width: 900, height: 700 });
  const githubUrl = 'https://github.com/d3v1sh/baelys';
  const [visitorCount, setVisitorCount] = useState(null);
  const [githubStars, setGithubStars] = useState(null);
  const [loading, setLoading] = useState(true);

  // Calculate canvas dimensions based on image size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && imageDimensions) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth - 64; // Account for padding
        const containerHeight = container.offsetHeight - 64;
        
        // Use actual image dimensions as the base
        const imageWidth = imageDimensions.width;
        const imageHeight = imageDimensions.height;
        
        // Calculate scale to fit within container while maintaining aspect ratio
        const scaleX = containerWidth / imageWidth;
        const scaleY = containerHeight / imageHeight;
        const scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond original size
        
        setStageDimensions({
          width: imageWidth * scale,
          height: imageHeight * scale
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);


    const fetchVisitorCount = async () => {
      try {
        // Try multiple CORS proxy services
        const proxies = [
          'https://corsproxy.io/?',
          'https://cors-anywhere.herokuapp.com/',
          'https://api.codetabs.com/v1/proxy?quest='
        ];
        
        const targetUrl = 'https://visitor-badge.laobi.icu/badge?page_id=d3v1sh';
        
        for (const proxy of proxies) {
          try {
            const response = await fetch(proxy + encodeURIComponent(targetUrl));
            let svgText;
            
            if (proxy.includes('codetabs')) {
              svgText = await response.text();
            } else {
              const data = await response.json();
              svgText = data.contents || data;
            }
            
            // console.log('SVG Response:', svgText);
            
            // Extract the visitor count from the SVG
            const countMatch = svgText.match(/<text[^>]*lengthAdjust="spacing" textLength="140\.0"[^>]*x="606\.0"[^>]*>(\d+)<\/text>/);
            
            // console.log(countMatch, "countMatch");
            
            if (countMatch) {
              setVisitorCount(countMatch[1]);
              return;
            } else {
              // Try alternative regex patterns
              const altMatch1 = svgText.match(/>(\d+)<\/text>(?=(?:(?!<text).)*$)/);
              const altMatch2 = svgText.match(/visitors<\/text>.*?<text[^>]*>(\d+)<\/text>/s);
              
              if (altMatch1) {
                setVisitorCount(altMatch1[1]);
                return;
              } else if (altMatch2) {
                setVisitorCount(altMatch2[1]);
                return;
              }
            }
          } catch (proxyError) {
            console.log(`Proxy ${proxy} failed:`, proxyError);
            continue;
          }
        }
        
        // If all proxies fail, fallback to displaying badge image
        console.log('All proxies failed, using fallback');
        setVisitorCount('badge');
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
        setVisitorCount('--');
      }
    };

    const fetchGithubStars = async () => {
      try {
        // Extract repo info from githubUrl
        const repoPath = githubUrl.replace('https://github.com/', '');
        const response = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (response.ok) {
          const data = await response.json();
          setGithubStars(data.stargazers_count);
          console.log(data.stargazers_count, "githubStars");
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
        setGithubStars('--');
      }
    };

    Promise.all([fetchVisitorCount(), fetchGithubStars()]).finally(() => {
      setLoading(false);
    });


    return () => window.removeEventListener('resize', updateDimensions);
  }, [imageDimensions]);

  const handleExport = () => {
    onExport(stageRef.current);
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onDeselect();
    }
  };

  const selectedText = texts.find(t => t.id === selectedTextId);

  return (
    <div className="h-full flex flex-col">
      {/* Header Card - Improved Layout */}
      <Card className="mb-4 border border-border bg-card shadow-sm">
        <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Bailys Logo" className="w-12 h-12 rounded-xl shadow-lg" />
              <CardTitle className="text-sm font-bold text-foreground">
                bailys.co
              </CardTitle>
            </div>

            {/* Stats - Separated from logo/title */}
            <div className="flex items-center gap-3">
              {/* Visitor Counter */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-secondary/30 border border-border text-xs">
                {visitorCount === 'badge' ? (
                  <img 
                    src="https://visitor-badge.laobi.icu/badge?page_id=d3v1sh" 
                    alt="Visitor Badge"
                    className="h-5"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      setVisitorCount('--');
                    }}
                  />
                ) : (
                  <>
                    <Eye size={12} className="text-muted-foreground" />
                    <span className="text-muted-foreground">visitors:</span>
                    <span className="font-medium text-foreground">
                      {loading ? '...' : visitorCount || '--'}
                    </span>
                  </>
                )}
              </div>

              {/* GitHub Stars */}
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-secondary/30 border border-border text-xs hover:bg-secondary/50 transition-colors"
              >
                <Github size={12} className="text-muted-foreground" />
                <span className="text-muted-foreground">stars:</span>
                <span className="font-medium text-foreground">
                  {loading ? '...' : githubStars || '--'}
                </span>
              </a>

              <a href="https://www.producthunt.com/products/baelys?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-baelys" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=981640&theme=light&t=1750647223963" alt="Baelys - AI&#0045;powered&#0032;image&#0032;editor&#0032;for&#0032;stunning&#0032;visuals&#0032;in&#0032;seconds | Product Hunt" style={{width: '200px', height: '40px'}} width="200" height="54" /></a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleExport} 
              variant="default" 
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 shadow-sm text-xs h-8"
            >
              <Download size={14} className="mr-1.5" /> Download
            </Button>
            <Button 
              onClick={onReset} 
              variant="outline" 
              size="sm"
              className="border border-border hover:border-destructive hover:bg-destructive/10 text-xs h-8"
            >
              <RefreshCw size={14} className="mr-1.5" /> Restart
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      {/* Canvas Card - Maximized */}
      <Card className="flex-grow border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
        <div ref={containerRef} className="p-4 h-full">
          <div className="relative h-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(100,116,139,0.3) 1px, transparent 0)
                `,
                backgroundSize: '24px 24px'
              }}
            />
            
            <div className="relative h-full flex items-center justify-center p-2">
              <div 
                className="relative bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-600 shadow-lg overflow-hidden"
                style={{
                  width: stageDimensions.width,
                  height: stageDimensions.height,
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              >
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
                    <div className="flex flex-col items-center gap-3 text-white">
                      <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin"/>
                      <p className="text-lg font-semibold">Removing background...</p>
                      <div className="w-40 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <Stage 
                  width={stageDimensions.width} 
                  height={stageDimensions.height} 
                  ref={stageRef} 
                  onMouseDown={checkDeselect}
                >
                  <Layer>
                    {originalImage && (
                      <ImageLayer 
                        imageUrl={originalImage} 
                        stageWidth={stageDimensions.width}
                        stageHeight={stageDimensions.height}
                      />
                    )}
                  </Layer>
                  
                  <Layer>
                    {texts
                      .filter((text) => text.id !== selectedTextId)
                      .map((text) => (
                        <TextLayer
                          key={text.id}
                          textProps={text}
                          isSelected={false}
                          onSelect={() => onTextSelect(text.id)}
                          onChange={onTextChange}
                        />
                      ))}
                  </Layer>
                  
                  <Layer listening={false}>
                    {foregroundImage && (
                      <ImageLayer 
                        imageUrl={foregroundImage} 
                        stageWidth={stageDimensions.width}
                        stageHeight={stageDimensions.height}
                      />
                    )}
                  </Layer>
                  
                  {selectedText && (
                    <Layer>
                      <TextLayer
                        key={selectedText.id}
                        textProps={selectedText}
                        isSelected={true}
                        onSelect={() => onTextSelect(selectedText.id)}
                        onChange={onTextChange}
                      />
                    </Layer>
                  )}
                </Stage>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CanvasArea; 