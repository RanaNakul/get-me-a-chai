import Btn from "@/components/common/Btn";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center text-center px-8 py-24 md:py-32 text-white border-b-2 border-white border-opacity-10">
        <h1 className="font-bold text-4xl md:text-5xl flex items-center gap-2">
          Buy Me a Chai{" "}
          <span>
            <Image
              className="invert-[0.2] w-[54px] md:w-[88px] h-auto"
              src="./tea.gif"
              alt="tea gif"
              width={100}
              height={100}
              unoptimized
            />
          </span>
        </h1>
        <p className="text-sm md:text-base pb-5">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start now!
        </p>

        <div className=" space-x-4">
          <Link href="/login">
            <Btn text="Get Started" />
          </Link>

          <Link href="/about">
            <Btn text="Learn More" />
          </Link>
        </div>
      </div>

      <div className="pb-24 md:pb-32 py-14 space-y-14 text-center px-4 border-b-2 border-white border-opacity-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center ">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-around container mx-auto ">
          <div className="item space-y-4 flex flex-col items-center justify-center">
            <Image
              className=" bg-slate-400 p-2 rounded-full "
              src="./man.gif"
              alt="man gif"
              width={88}
              height={44}
              unoptimized
            />
            <p className="font-bold">Fund Yourself</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-4 flex flex-col items-center justify-center">
            <Image
              className=" bg-slate-400 p-2 rounded-full "
              src="./coin.gif"
              alt="coin gif"
              width={88}
              height={44}
              unoptimized
            />
            <p className="font-bold">Fund Yourself</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-4 flex flex-col items-center justify-center">
            <Image
              className=" bg-slate-400 p-2 rounded-full "
              src="./group.gif"
              alt="group gif"
              width={88}
              height={44}
              unoptimized
            />
            <p className="font-bold">Fans went to help</p>
            <p>Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="pb-24 md:pb-32 py-14 space-y-14 border-b-2 border-white border-opacity-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center ">Learn more about as</h2>
        <div className="w-[80%] h-[40vh] md:w-[40%] md:h-[50vh]">

        <iframe
        className="w-full h-full"
          src="https://www.youtube.com/embed/QtaorVNAwbI?si=r4t7hDa4_jppt-C9"
          title="YouTube video player"
          style={{ border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        </div>
      </div>
    </>
  );
}
