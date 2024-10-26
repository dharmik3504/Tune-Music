export const Transfer = () => {
  return (
    <div >
      
      <div className="container mx-auto bg-[rgb(36,42,72)] rounded-2xl h-374px w-816px">

      <div className=" flex justify-center items-center text-4xl m-5 p-5 font-bold">YouTube Playlist</div>
      <div className="flex justify-evenly ">
        <div className="items-center">

        <button className="bg-blue-900  rounded-full  p-5 m-12  font-bold">
          Load from YouTube account
        </button>
        </div>
        <div className=" flex flex-col items-center ">
          <div className="border m-4 h-10"></div>
          <span className="text-center text-2xl">OR</span> 
          <div className="border m-4 h-10"></div>
        </div>
        
        <div className="flex flex-col m-10 ">
            <div>
            <span  className="font-bold mb-10 ">Copy YouTube playlist URL and paste here:</span>
            </div>
            <div>
                <input type="text" placeholder="Paste YouTube playlist URL here" className="bg-white w-full p-3 mt-2" />
            </div>
            <div>
                <button className="bg-blue-300 rounded-full w-full mt-3 p-3 font-bold">Load from URL</button>
            </div>
        </div>  
      </div>
      
      </div>
    </div>
  );
};
