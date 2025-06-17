"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ReactPlayer from "react-player";

const Galla = () => {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  const images = [
    {
      url1: "https://res.cloudinary.com/donshmlbl/image/upload/v1748973269/ndunda2_s2j2l5.jpg",
      url2: "https://res.cloudinary.com/donshmlbl/image/upload/v1748974498/ndunda5_igh9j2.jpg",
      title: "Mud Fun",
      description: "Unleash the childish you",
    },
    {
      url1: "https://res.cloudinary.com/donshmlbl/image/upload/v1748973964/ndunda3_u3ai3l.jpg",
      url2: "https://res.cloudinary.com/donshmlbl/image/upload/v1748974375/ndunda4_owvmuf.jpg",
      title: "Canopy Walk",
      description: "God's beautiful creation surrounds us",
    },
    {
      url1: "https://res.cloudinary.com/donshmlbl/image/upload/v1748973275/ndunda1_ha1mf5.jpg",
      url2: "https://res.cloudinary.com/donshmlbl/image/upload/v1748973275/ndunda1_ha1mf5.jpg",
      title: "Beautiful Waterfalls",
      description: "The stunning Ndunda Falls",
    },
  ];

  const videos = [
    {
      src: "https://vimeo.com/1093955527",
      thumbnail: "https://res.cloudinary.com/donshmlbl/image/upload/v1750146975/thumb_xony5m.jpg", // Replace with your Cloudinary thumbnail
      title: "Previous Vault Funky",
      description: "Highlights from our vibrant retreat",
    }
    // {
    //   thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    //   title: "Previous Retreat Highlights",
    //   description: "See the joy and fellowship from our last retreat",
    // },
    // {
    //   thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",
    //   title: "Worship by the Falls",
    //   description: "Experience worship in God's natural cathedral",
    // },
  ];

  const [visibleImages, setVisibleImages] = useState(images.map(() => true));
  const [hoveredIndexes, setHoveredIndexes] = useState(images.map(() => false));

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImages((prev) => prev.map((val) => !val));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Experience the Beauty
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get a glimpse of the incredible location where our retreat takes place. 
            From breathtaking waterfalls to serene hiking trails, Camp Ndunda Falls is truly spectacular!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <Button
              onClick={() => setActiveTab("images")}
              variant={activeTab === "images" ? "default" : "ghost"}
              className={`rounded-full px-8 py-3 font-semibold transition-all duration-300 ${
                activeTab === "images"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-purple-600"
              }`}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Photos
            </Button>
            <Button
              onClick={() => setActiveTab("videos")}
              variant={activeTab === "videos" ? "default" : "ghost"}
              className={`rounded-full px-8 py-3 font-semibold transition-all duration-300 ${
                activeTab === "videos"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-purple-600"
              }`}
            >
              <Video className="w-5 h-5 mr-2" />
              Videos
            </Button>
          </div>
        </div>

        {/* Images Gallery */}
        {activeTab === "images" && (
          <Carousel
            className="w-full max-w-6xl mx-auto"
            opts={{
              align: "start",
              slidesToScroll: 1,
              dragFree: true,
              loop: false,
              containScroll: "trimSnaps",
            }}
          >
            <CarouselContent className="-ml-2">
              {images.map((image, index) => {
                const showPrimary = visibleImages[index] && !hoveredIndexes[index];

                return (
                  <CarouselItem
                    key={index}
                    className="basis-[90%] sm:basis-[45%] lg:basis-[30%] px-2"
                  >
                    <div
                      className="rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 relative"
                      onMouseEnter={() =>
                        setHoveredIndexes((prev) => {
                          const updated = [...prev];
                          updated[index] = true;
                          return updated;
                        })
                      }
                      onMouseLeave={() =>
                        setHoveredIndexes((prev) => {
                          const updated = [...prev];
                          updated[index] = false;
                          return updated;
                        })
                      }
                    >
                      <AspectRatio
                        ratio={1}
                        className="rounded-xl overflow-hidden sm:aspect-[1]"
                      >
                        <Image
                          src={image.url1}
                          width={500}
                          height={500}
                          alt={image.title}
                          loading="lazy"
                          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                            showPrimary ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        <Image
                          src={image.url2}
                          width={500}
                          height={500}
                          alt={`${image.title} Alt`}
                          loading="lazy"
                          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                            showPrimary ? "opacity-0" : "opacity-100"
                          }`}
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-20">
                          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                            {image.title}
                          </h3>
                          <p className="text-white/80 text-sm">{image.description}</p>
                        </div>
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        )}

        {/* Videos Gallery */}
        {activeTab === "videos" && (
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {videos.map((video, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <CardContent className="p-0">
                    <AspectRatio ratio={4 / 3}>
                      {video.src ? (
                        <ReactPlayer
                          url={video.src}
                          width="100%"
                          height="100%"
                          controls
                          muted
                          playsinline
                          light={video.thumbnail}
                          playing={false}
                          onError={(e) => console.error("ReactPlayer error:", e)}
                          onReady={() => console.log("ReactPlayer ready")}
                          className="w-full h-full"
                          config={{
                            vimeo: {
                              playerOptions: {
                                preload: true,
                                responsive: true,
                                autoplay: false,
                                badge: false,
                                autopause: false,
                              },
                            },
                          }}
                          aria-label={video.title}
                        />
                      ) : (
                        <div className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer relative">
                          <Image
                            width={500}
                            height={375}
                            src={video.thumbnail}
                            alt={video.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-8 h-8 text-purple-600 ml-1" />
                            </div>
                          </div>
                        </div>
                      )}
                    </AspectRatio>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{video.title}</h3>
                      <p className="text-slate-600">{video.description}</p>
                    </div>
                  </CardContent>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-slate-600 mb-6">
            Can’t wait to experience this amazing place?
          </p>
          <Button
            onClick={() => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Reserve Your Spot Now!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Galla;