import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';

const Header = () => {
  const githubUrl = 'https://github.com/d3v1sh/baelys';
  const [visitorCount, setVisitorCount] = useState(null);
  const [githubStars, setGithubStars] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <header className="relative z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Site branding */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Bailys Logo" className="w-12 h-12 rounded-xl shadow-lg" />
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold tracking-wider bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent font-['Bebas_Neue',_'Arial_Black',_sans-serif] uppercase drop-shadow-sm">
                  bailys
                </h1>
                <a 
                  href="https://bailys.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors tracking-wide"
                >
                  bailys.co
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4">
            {/* Visitor Counter */}
            <Card className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                {visitorCount === 'badge' ? (
                  // Fallback: Show the badge image directly
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
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <div className="text-sm">
                      <span className="text-slate-600 dark:text-slate-400">visitors: </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {loading ? '...' : visitorCount || '--'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* GitHub Stars */}
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 block hover:opacity-80 transition-opacity cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                console.log('GitHub link clicked!');
              }}
            >
              <Card className="px-3 py-2 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                  </svg>
                  <div className="text-sm">
                    <span className="text-slate-600 dark:text-slate-400">★ </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-400">
                      {loading ? '...' : githubStars || '--'}
                    </span>
                  </div>
                </div>
              </Card>
              
            </a>

            <a href="https://www.producthunt.com/products/baelys?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-baelys" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=981640&theme=light&t=1750647223963" alt="Baelys - AI&#0045;powered&#0032;image&#0032;editor&#0032;for&#0032;stunning&#0032;visuals&#0032;in&#0032;seconds | Product Hunt" style={{width: '200px', height: '40px'}} width="200" height="54" /></a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 