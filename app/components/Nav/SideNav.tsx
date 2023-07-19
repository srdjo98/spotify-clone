"use client";

import { useSnackBar } from "@/app/contexts/useSnackBar";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import EastSharpIcon from "@mui/icons-material/EastSharp";
import HouseIcon from "@mui/icons-material/House";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import WestSharpIcon from "@mui/icons-material/WestSharp";
import { Playlist } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

const SideNav = () => {
  const [isExtended, setIsExtended] = useState(false);
  const { notify } = useSnackBar();
  const router = useRouter();
  const { data: session } = useSession();
  const { isLoading, data, refetch } = useQuery("playlists", () =>
    axios.get("/api/playlists")
  );
  const playlists: Playlist[] = data?.data;

  const handleExtend = () => {
    setIsExtended(!isExtended);
  };

  const handleCreate = () => {
    axios.post("/api/playlist").then((response) => {
      router.push(`/playlist/${response.data.id}`);
      refetch();
    });
  };

  const handleDeletePlaylist = (playlistId: string) => {
    axios
      .post(`/api/playlist/${playlistId}`, {
        playlistId,
      })
      .then(() => {
        notify({
          message: "Successfully deleted",
        });
        router.push("/");
        refetch();
      });
  };

  return (
    <>
      <div className={`${isExtended ? "w-[35%]" : "w-[15%]"} h-[100hv]`}>
        <div className="pt-5 pl-12">
          <Image
            src={`/../public/images/spotilogo.png`}
            height={150}
            width={150}
            alt="spotify"
          />
        </div>
        <div className="pl-12 pt-11">
          <div
            className="font-bold text-lg pb-5 cursor-pointer flex"
            onClick={() => router.push("/")}
          >
            <HouseIcon fontSize="large" />
            <div className="pl-4 pt-1">Home</div>
          </div>
          <div
            className="font-bold text-lg pb-5 cursor-pointer flex"
            onClick={() => router.push("/search")}
          >
            <SearchIcon fontSize="large" />
            <div className="pl-4 pt-1">Search</div>
          </div>
          {session?.user && (
            <>
              <div className="font-bold text-lg pb-5 cursor-pointer flex justify-between">
                <div className="flex">
                  <LibraryMusicIcon fontSize="large" />
                  <div className="pl-4 pt-1">Your Library</div>
                </div>
                <div>
                  <AddSharpIcon className="mr-2" onClick={handleCreate} />
                  {isExtended ? (
                    <WestSharpIcon onClick={handleExtend} />
                  ) : (
                    <EastSharpIcon onClick={handleExtend} />
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                {isLoading && <p>Loading..</p>}
                {playlists &&
                  !isLoading &&
                  playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="flex justify-between pb-4"
                    >
                      <div
                        className="flex gap-6"
                        onClick={() => router.push(`/playlist/${playlist.id}`)}
                      >
                        <Image
                          src={`/../public/images/${playlist.imageUrl}`}
                          width={35}
                          height={35}
                          alt={playlist.title}
                          className="rounded-md"
                        />
                        {playlist.title}
                      </div>
                      {isExtended && (
                        <div className="flex">
                          <div className="pr-2">{playlist.description}</div>
                          <div>
                            <DeleteIcon
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => handleDeletePlaylist(playlist.id)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideNav;
