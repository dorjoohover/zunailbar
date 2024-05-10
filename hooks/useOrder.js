import { useContext } from "react";

import { OrderContext } from "../contexts/OrderContext.js";

const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context)
    throw new Error("CompanyContext must be placed within CompanyProvider.");
  return context;
};

export default useOrder;
