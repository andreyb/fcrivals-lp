
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import appScreen2 from '../assets/screen2.png';
import appScreen3 from '../assets/screen3.png';
import appScreen4 from '../assets/screen4.png';

const StatsPreview = () => {
  return (
    <section id="preview" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">See Your Game in HD</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Visualize the FC journey with your friends. Track progress, spot weaknesses,
            and get the insights to level up your game.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* iOS mockup 1 */}
          <div className="relative mx-auto w-64 h-500px">
            <div className="border-[14px] rounded-[36px] border-gray-800 overflow-hidden shadow-xl relative">
              <div className="absolute top-0 w-1/2 h-[24px] bg-gray-800 left-1/2 transform -translate-x-1/2 rounded-b-[14px] z-10"></div>
              <img
                src={appScreen2}
                alt="Head-to-Head Stats"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* iOS mockup 2 */}
          <div className="relative mx-auto w-64 h-500px">
            <div className="border-[14px] rounded-[36px] border-gray-800 overflow-hidden shadow-xl relative">
              <div className="absolute top-0 w-1/2 h-[24px] bg-gray-800 left-1/2 transform -translate-x-1/2 rounded-b-[14px] z-10"></div>
              <img
                src={appScreen3}
                alt="Adding a match"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* iOS mockup 3 */}
          <div className="relative mx-auto w-64 h-500px">
            <div className="border-[14px] rounded-[36px] border-gray-800 overflow-hidden shadow-xl relative">
              <div className="absolute top-0 w-1/2 h-[24px] bg-gray-800 left-1/2 transform -translate-x-1/2 rounded-b-[14px] z-10"></div>
              <img
                src={appScreen4}
                alt="Adding a match"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsPreview;
