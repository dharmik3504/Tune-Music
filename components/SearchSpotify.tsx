import { useEffect, useState } from "react";

export const SearchSpotify=()=>{
    const [accessToken, setAccessToken] = useState("");
    const getdata=async ()=>{
        const data= await fetch("api/spotify/redirect",{
            method:"POST"
        })
    }

    
    
}