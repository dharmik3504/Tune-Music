import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SearchYTProps {
  code: string;
}

export const SearchYT = (props: SearchYTProps) => {
  const [accessToken, setAccessToken] = useState("");
  const [soruce, setSoruce] = useState("");
  const handleClick = async () => {
    if (soruce) {
      const token = await fetch(
        "/api/youtube/redirect?code=4/0AQlEd8x53Ex6P7YknuqaFSaN0t2EYehWM60DbDX0xszZ5ue35yssY1kPzdo1dS8i39prEw&scope=https://www.googleapis.com/auth/youtube",
        {
          method: "post",
        }
      );

      if (token.status == 200) {
        const data = await token.json();
        setAccessToken(data.accessToken);

        const { items } = await getYTplaylistData(data.accessToken);
        console.log(items);
        for (var i = 0; i < items.length; i++) {
          const videoId = items[i].contentDetails.videoId;
          const name = items[i].snippet.title;
          const description = items[i].snippet.description;

          console.log(videoId);
        }
      } else {
        return "something went wrong";
      }

      // const token = await getAccessToken(props.code);
    }
  };
  const checkIfUserHaveSignIn = async () => {
    const res = await fetch("/api/youtube/redirect");

    return await res.json();
  };
  const getYTplaylistData = async (accessToken: string) => {
    const URL = "https://youtube.googleapis.com/youtube/v3/playlistItems?";
    const params = new URLSearchParams();
    params.append("part", "snippet,contentDetails,id");
    params.append("maxResults", "50");
    params.append("playlistId", "RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g");
    const res = await fetch(URL + params, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return await res.json();
  };
  useEffect(() => {
    if (props.code) {
      // getYTplaylistData(props.code);
    }
  });

  return (
    <div>
      <Label className="m-2">Copy youtube playlist URL and paste here:</Label>
      <Input
        type="text"
        value={soruce}
        placeholder="Paste YT playlist URL here"
        className="border border-red-600"
        onChange={(e) => {
          setSoruce(e.target.value);
        }}
      />
      <Button className="m-2" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};
