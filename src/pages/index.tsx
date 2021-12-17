import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const fetchData = () => {
  return axios
    .get("https://random-data-api.com/api/users/random_user")
    .then((res) => {
      const results = `${res.data.first_name} ${res.data.last_name}`;
      console.log(results);
      return {
        name: results,
        avatar: `${res.data.avatar}`,
      };
    });
};

export default function MainPage() {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [clipboardText, setClipboardText] = useState(`Copy to clipboard`);

  useEffect(() => {
    fetchData().then((apiUser) => {
      setUser(apiUser.name);
      setAvatar(decodeURI(apiUser.avatar));
    });
  }, []);

  return (
    <>
      <head>
        <title>Random User - UnusualAbsurd</title>
        <link rel="shortcut icon" href="https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png" />
      </head>
      <body>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md items-center space-x-1 backdrop-blur">
            <div className="flex-shrink-0 flex justify-center items-center">
              <Image
                src={
                  `${avatar}` ||
                  decodeURI(
                    "https://robohash.org/eumautmaxime.png?size=300x300\u0026set=set1"
                  )
                }
                height={56}
                width={56}
                alt="avatar"
              ></Image>
            </div>
            <h1 className="px-5 py-1 text-3xl flex justify-center items-center text-black-500  border-indigo-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-5555dd-200 focus:ring-offset-2">
              {user}
            </h1>
            <button
              className="px-6 py-2 text-sm justify-start items-start text-indigo-500 font-semibold rounded-full border border-indigo-500 hover:bg-indigo-500 hover:text-gray-50 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-5555dd-200 focus:ring-offset-2"
              onClick={() => {
                fetchData().then((apiUser) => {
                  setUser(apiUser.name);
                  setAvatar(apiUser.avatar);
                });
              }}
            >
              Random User
            </button>
            <button
              className="px-6 py-2 text-sm justify-end items-end text-orange-500 font-semibold rounded-full border border-orange-500 hover:bg-orange-500 hover:text-gray-50 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-5555dd-200 focus:ring-offset-2"
              onClick={() => {
                navigator.clipboard.writeText(user);
                setClipboardText("Copied the name!");

                setTimeout(() => {
                  setClipboardText("Copy to clipboard");
                }, 2000);
              }}
            >
              {clipboardText}
            </button>
            <div className="whitespace-pre-line"></div>
            <div className="flex-shrink-1 flex justify-center items-center p-1">
              <Link
                href="https://github.com/UnusualAbsurd/random-user"
                passHref
              >
                <button className="px-3 py-1 text-sm text-black font-semibold rounded-full border border-black hover:border-transparent hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                  🐈 Source Code
                </button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

/**
 * const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [clipboardText, setClipboardText] = useState(`Copy to clipboard`);

  useEffect(() => {
    fetchData().then((apiUser) => {
      setUser(apiUser.name);
      setAvatar(decodeURI(apiUser.avatar));
    });
  }, []);
 */
