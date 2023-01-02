import React from 'react';

const HerosHome = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="text-center">
                <span className="absolute z-[2] text-black -translate-x-[5.5rem] mt-12 text-4xl font-bold max-2xl:hidden">
                    iPhone 14
                </span>
                <span className="absolute z-[2] text-black -translate-x-[8.5rem] mt-24 text-2xl max-2xl:hidden">
                    Grande y extragrande.
                </span>
                <img src="hero_iphone14.jpg" alt="iPhone 14" />
            </div>
            <div className="text-center">
                <span className="absolute z-[2] text-white -translate-x-[8rem] mt-12 text-4xl font-bold max-2xl:hidden">
                    iPhone 14 Pro
                </span>
                <span className="absolute z-[2] text-white -translate-x-[6.2rem] mt-24 text-2xl max-2xl:hidden">
                    Se pasa de Pro.
                </span>
                <img src="hero_iphone14pro.jpg" alt="iPhone 14 Pro" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full lg:mt-4 gap-4 lg:px-4 ">
                <img className="w-full" src="home_grid1.webp" alt="" />
                <img src="home_grid2.webp" alt="" />
            </div>
        </div>
    );
};

export default HerosHome;
