import * as yt from "youtube-search-without-api-key";

export const SearchYt = async () => {
  const videos = await yt.search("RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g");

  console.log(videos);
  return <div></div>;
};
