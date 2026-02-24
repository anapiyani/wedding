"use client";

import MusicPlayer from "@/components/music-player";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useState } from "react";

const gilroy = localFont({
  variable: "--font-gilroy",
  src: [
    { path: "../../public/fonts/Gilroy.woff2", weight: "400", style: "normal" },
  ],
});

const ttModernoir = localFont({
  variable: "--font-tt-modernoir",
  src: [
    {
      path: "../../public/fonts/TT-Modernoir-Trial.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const lavender = localFont({
  variable: "--font-lavanderia",
  src: [
    {
      path: "../../public/fonts/LavanderiaC.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

const ttRamillas = localFont({
  variable: "--font-tt-ramillas-bold",
  src: [
    {
      path: "../../public/fonts/TT-Ramillas-bold.ttf",
    },
  ],
});

const ttRamillasLight = localFont({
  variable: "--font-tt-ramillas-bold",
  src: [
    {
      path: "../../public/fonts/TT-Ramillas-Trl.ttf",
    },
  ],
});

export default function Home() {
  const targetDate = new Date("2026-04-24T18:00:00+05:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const carouselItems = [
    { type: "video", src: "/wedding-video.mp4" },
    { type: "image", src: "/1.jpg" },
    { type: "image", src: "/2.jpg" },
    { type: "image", src: "/3.jpg" },
    { type: "image", src: "/4.jpg" },
    { type: "image", src: "/5.jpg" },
    { type: "image", src: "/6.jpg" },
    { type: "image", src: "/7.jpg" },
  ];

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % carouselItems.length;
        setIsVideoPlaying(nextSlide === 0);
        return nextSlide;
      });
    }, 50000);

    return () => clearInterval(carouselTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div className="relative h-dvh w-full overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {item.type === "video" ? (
              <video
                autoPlay={index === currentSlide}
                muted
                playsInline
                poster="/video.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={item.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={item.src || "/placeholder.svg"}
                alt={`Wedding carousel ${index}`}
                fill
                className="object-cover"
                priority={index <= 2}
              />
            )}
          </div>
        ))}

        <div className="absolute inset-0 bg-black/30" />
        <MusicPlayer />

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsVideoPlaying(index === 0);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white top-[250px]">
          <div className="max-w-4xl mx-auto space-y-2">
            <div
              className={`text-xl md:text-xl tracking-wider ${ttModernoir.className}`}
            >
              24 АПРЕЛЯ 2026
            </div>
            <div>
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl tracking-wider ${lavender.className}`}
              >
                Adil & Arina
              </h1>
            </div>
          </div>
        </main>
      </div>
      <div className="w-full pt-8 flex justify-center">
        <div className="flex h-full w-full items-center justify-center flex-col">
          <div
            className={`text-3xl md:text-3xl text-center w-[270px] lg:text-4xl tracking-wider ${ttRamillas.className}`}
          >
            Дорогие родные и близкие
          </div>
          <div className="flex mt-4">
            <p className={`text-center w-[316px] ${gilroy.className}`}>
              Мы приглашаем вас на самое важное событие в нашей жизни - нашу
              свадьбу! С нетерпением ждем встречи!
            </p>
          </div>
          <div className="w-full h-full mt-8">
            <Image
              src={"/hands.svg"}
              alt={"handle"}
              className="object-cover w-full h-auto"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full h-full mt-8">
            <Image
              src={"/Date.svg"}
              alt={"handle"}
              className="object-cover w-full h-auto"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full h-full">
            <Image
              src={"/saveDate.svg"}
              alt={"handle"}
              className="object-cover w-full h-auto"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
      <div className="py-16 w-full relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/location.png"
            alt="bg"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" />
        </div>
        <div className="mx-auto w-full max-w-lg px-5">
          <div className=" bg-white text-black shadow-2xl ring-1 ring-black/10 px-6 py-7 md:px-8">
            <h2
              className={`text-4xl text-center tracking-wide ${ttRamillas.className} font-light`}
            >
              ЛОКАЦИЯ
            </h2>

            <div
              className={`mt-5 space-y-2 text-center leading-relaxed ${gilroy.className}`}
            >
              <div>Город Петропавловск</div>
              <div>Улица Конституции Казахстана, 41</div>
              <div className="mx-auto h-px w-40 bg-black/20" />
              <div>Brown Street</div>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href="https://2gis.kz/petropavlovsk/geo/70000001057458735"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center rounded-full absolute bg-black/80 px-5 py-3 text-white transition hover:bg-black/90 ${gilroy.className} w-[230px] text-center justify-center`}
              >
                перейти к карте
              </a>
            </div>
          </div>
          <div className="mt-22 flex items-center justify-center flex-col gap-2">
            <h1 className={`text-4xl text-white ${ttRamillas.className}`}>
              СБОР ГОСТЕЙ
            </h1>
            <h1
              className={`text-4xl text-white font-light ${ttRamillasLight.className}`}
            >
              17:00
            </h1>
          </div>
        </div>
      </div>
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="mt-10 flex justify-center items-center flex-col">
            <h3 className={`text-3xl mb-4 ${ttRamillas.className}`}>
              ДО ТОРЖЕСТВА:
            </h3>
            <div className="flex gap-4">
              {[
                { label: "дней", value: timeLeft.days },
                { label: "часов", value: timeLeft.hours },
                { label: "минут", value: timeLeft.minutes },
                { label: "секунд", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="border border-black px-4 py-2 text-2xl font-bold">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="mt-1 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-full relative">
          <Image
            src="/bottom.jpg"
            alt="Bottom Image"
            width={1920}
            height={500}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>
      </div>
      <div className="w-full flex bg-[#F6F6F6]">
        <div className="py-12 px-9 flex flex-col items-center justify-center gap-4">
          <div>
            <Image
              src="/heart.svg"
              alt="heart"
              width={1920}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <div>
            <p className={`mt-4 text-center ${gilroy.className}`}>
              Вы не просто так получили это приглашение! В особенной для нас
              день мы хотим, чтобы Вы были рядом!
            </p>
          </div>
          <div>
            <h2
              className={`text-2xl mt-4 text-center font-semibold text-[#932434] ${ttRamillas.className}`}
            >
              Ждём Вас с нетерпением!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
