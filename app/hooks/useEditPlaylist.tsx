"use client";

import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";

export const useEditPlaylist = (playlistId: string) => {
  const { data: isAllowed } = useQuery("user", () =>
    axios
      .post(`/api/playlist/${playlistId}/user`, {
        playlistId,
      })
      .then((res) => res.data)
  );

  return useMemo(
    () => ({
      isAllowed,
    }),
    [isAllowed]
  );
};
