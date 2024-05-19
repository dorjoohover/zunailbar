import { useContext } from "react";

import { ArtistContext } from "../contexts/ArtistContext";

const useArtist = () => {
  const context = useContext(ArtistContext);

  if (!context)
    throw new Error("AuthContext must be placed within AuthProvider.");

  return context;
};

export default useArtist;
