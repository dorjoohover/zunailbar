import { useContext } from "react";

import { BookingContext } from "../contexts/BookingContext";

const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context)
    throw new Error("CompanyContext must be placed within CompanyProvider.");
  return context;
};

export default useBooking;
