"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function ProductSlider({
  images,
  altContent,
}: {
  images: string[];
  altContent: string;
}) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="relative w-full aspect-square bg-white/40 dark:bg-black/20 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-4">
                <Image
                  src={img}
                  alt={`${altContent} image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain p-2"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black border-none" />
            <CarouselNext className="right-2 bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black border-none" />
          </>
        )}
      </Carousel>
    </div>
  );
}
