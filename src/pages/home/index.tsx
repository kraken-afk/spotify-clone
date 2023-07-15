import { type ReactElement, useContext } from "react";
// import CredentialContext from "~/context/CredentialContext";
// import useFetchSpotify from ~/hooks/useFetchSpotify";
import NavBar from "./NavBar";
import greetTime from "~/libs/greetTime";
import "~/styles/utils.scss";
import YourPlaylists from "./YourPlaylists";

export default function Home(): ReactElement {
  // // const token = useContext(CredentialContext) as Credential;
  // // const { data, isLoading } = useFetchSpotify("https://api.spotify.com/v1/me", token, { method: "GET" });

  // // if (isLoading)
  // //   return <h1>Loading..</h1>;

  //   console.log(data);

 return (
   <>
     <NavBar profile="https://picsum.photos/24" />
     <div className="pt-[4rem] px-2">
      <h2 className="sub-title mb-8">{greetTime()}, Paul.</h2>

      {/* Your playlist section */}
      <YourPlaylists />

     </div>
   </>
 );
}

// https://picsum.photos/200