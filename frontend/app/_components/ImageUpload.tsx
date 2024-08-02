"use client";

import { Dispatch, SVGProps, SetStateAction, useState } from "react";

export function SolarUploadBoldDuotone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="M22 16v-1c0-2.829 0-4.242-.879-5.121C20.242 9 18.828 9 16 9H8c-2.83 0-4.243 0-5.122.88C2 10.757 2 12.17 2 14.998V16c0 2.828 0 4.242.879 5.121C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.879C22 20.242 22 18.828 22 16Z"
          opacity=".5"
        ></path>
        <path
          fillRule="evenodd"
          d="M12 15.75a.75.75 0 0 0 .75-.75V4.027l1.68 1.961a.75.75 0 1 0 1.14-.976l-3-3.5a.75.75 0 0 0-1.14 0l-3 3.5a.75.75 0 1 0 1.14.976l1.68-1.96V15c0 .414.336.75.75.75Z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}

export default function ImageUpload({
  setImageUrlExt,
}: {
  setImageUrlExt: CallableFunction;
}) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [uploadState, setUploadState] = useState(false);

  return (
    <div className="w-full overflow-hidden col-span-full sm:col-span-1 rounded-[50px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] h-[200px] flex justify-center items-center">
      {!imageUrl ? (
        <div className="flex justify-center relative w-full h-full sm:flex-row flex-col">
          <input
            type="file"
            name="image"
            className="absolute m-0 p-0 w-full h-full opacity-0 outline-none"
            onChange={async (eV) => {
              const fileReader = new FileReader();
              if (eV.target.files) {
                fileReader.readAsDataURL(eV.target.files[0]);
              }
              fileReader.onload = async () => {
                const fileResult = fileReader.result;
                if (typeof fileResult === "string") {
                  const imageBase64 = fileResult.split(",")[1];
                  if (imageBase64) {
                    setUploadState(true);
                    const imageUrl = await fetch("/api/image/upload", {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                      body: JSON.stringify({
                        uploadImage: imageBase64,
                      }),
                    });

                    const resImageUrl = await imageUrl.json();
                    setImageUrl(resImageUrl);
                    setImageUrlExt(resImageUrl);
                    setUploadState(false);
                  }
                }
              };
            }}
          />
          {!uploadState ? (
            <p className="flex flex-col items-center justify-center">
              <SolarUploadBoldDuotone className="text-6xl opacity-60 text-[#03a9f4]" />
              <span className="mt-2 text-[#03a9f4] font-light opacity-60 hidden sm:block">
                upload your beautiful moments
              </span>
            </p>
          ) : (
            <p className="flex flex-col items-center justify-center">
              <img src="/assets/images/R.gif" alt="Uploading" width={350} />
            </p>
          )}
        </div>
      ) : (
        <img src={imageUrl} alt="imageUrl" />
      )}
    </div>
  );
}
