import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export const runtime = "edge";

const GilroyBold = fetch(
  new URL("../../../public/fonts/Gilroy-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const ImageUrl = new URL("../../../public/logo.png", import.meta.url);

export async function GET(req: NextRequest) {
  try {
    const fontBold = await GilroyBold;
    const image = await fetch(ImageUrl).then((res) => res.arrayBuffer());
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");

    if (!title) {
      return new Response("No title provided", { status: 500 });
    }

    const heading =
      title.length > 140 ? `${title.substring(0, 140)}...` : title;

    return new ImageResponse(
      (
        <>
          <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
            <Image
              src={ImageUrl.toString()}
              alt="Notes Buddy Logo"
              width={48}
              height={48}
            />
            <img
              src={`data:image/png;base64,${Buffer.from(image).toString(
                "base64"
              )}`}
              tw="w-12 h-12"
            />
            <p tw="ml-2 font-bold text-2xl">Notes Buddy</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
              Welcome to Notes Buddy
            </div>
            <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">{siteConfig.url}</div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">{siteConfig.links.github}</div>
            </div>
          </div>
        </>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Gilroy",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
