import { useContext } from "react";

import { ServiceContext } from "../contexts/ServiceContext.js";

const useService = () => {
  const context = useContext(ServiceContext);

  if (!context)
    throw new Error("CompanyContext must be placed within CompanyProvider.");
  return context;
};

export default useService;
