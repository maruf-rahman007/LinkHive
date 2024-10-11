// components/MenuBar.tsx
"use client"
const MenuBar = () => {
    return (
      <div className=" mt-4 flex flex-col bg-gray-200 p-4 rounded-md w-full md:w-1/4">
        <button className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Links
        </button>
        <button className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Appear
        </button>
        <button className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Settings
        </button>
        <button className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Share
        </button>
      </div>
    );
  };
  
  export default MenuBar;
  