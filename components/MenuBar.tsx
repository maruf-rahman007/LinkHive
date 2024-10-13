// components/MenuBar.tsx
"use client";

import { useRouter } from "next/navigation";

const MenuBar = () => {
  const router = useRouter();

  const onClickHandler = (route: string) => {
    router.push(route); // Use the passed route directly
  };

  return (
    <div className="flex flex-col md:flex-col bg-gray-200 p-2 md:p-4 rounded-[30px] h-auto md:h-[600px] w-full md:w-[100px] justify-between items-center shadow-lg">
      <button onClick={() => onClickHandler('/user/links')} className="p-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 mb-1 md:mb-2">
        Links
      </button>
      <button onClick={() => onClickHandler('/user/appear')} className="p-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 mb-1 md:mb-2">
        Appear
      </button>
      <button onClick={() => onClickHandler('/user')} className="p-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 mb-1 md:mb-2">
        Settings
      </button>
      <button onClick={() => onClickHandler('/share')} className="p-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 mb-1 md:mb-2">
        Share
      </button>
    </div>
  );
};

export default MenuBar;
