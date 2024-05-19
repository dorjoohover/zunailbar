import { useContext } from "react";

import { ManagerContext } from "../contexts/ManagerContext";

const useManager = () => {
  const context = useContext(ManagerContext);

  if (!context)
    throw new Error("AuthContext must be placed within AuthProvider.");

  return context;
};

export default useManager;
