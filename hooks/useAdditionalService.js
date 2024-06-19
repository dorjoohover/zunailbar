import { useContext } from "react";

import { AdditionalServiceContext } from "../contexts/AdditionalServiceContext";

const useAdditionalService = () => {
  const context = useContext(AdditionalServiceContext);

  if (!context)
    throw new Error("CompanyContext must be placed within CompanyProvider.");
  return context;
};

export default useAdditionalService;
