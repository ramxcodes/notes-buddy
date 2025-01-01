import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
export const runtime = "edge";

const gilroyBold = fetch(
  new URL("../../../public/fonts/Gilroy-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const logoImage = fetch(
  new URL("../../../public/logo.png", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const fontBold = await gilroyBold;
    const logo = await logoImage;
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");
    if (!title) {
      return new Response("Notes Buddy", { status: 500 });
    }
    const heading =
      title.length > 140 ? `${title.substring(0, 140)}...` : title;
    return new ImageResponse(
      (
        <div tw="flex flex-col p-12 w-full h-full items-start text-black bg-white">
          <div tw="flex flex-col mb-6">
            <div tw="flex items-center">
              <img
                src={`data:image/png;base64,${Buffer.from(logo).toString(
                  "base64"
                )}`}
                alt="Logo"
                tw="w-10 h-10"
              />
              <p tw="ml-4 font-bold text-3xl">Notes Buddy</p>
            </div>
            <p tw="mt-4 text-xl text-gray-700">{siteConfig.description}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
              Notes
            </div>
            <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">
              <span>A website by ramxcodes | web: ramx.in</span>
            </div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">
                <span tw="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </span>
                <span>github.com/ramxcodes</span>
              </div>
            </div>
          </div>
        </div>
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
