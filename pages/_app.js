import "../styles/globals.css";
import TopBar from "../components/topbar";
import Footer from "../components/footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Head from "next/head";
import { AuthProvider } from "../contexts/AuthContext";
import { ManagerProvider } from "../contexts/ManagerContext";
import { ServiceProvider } from "../contexts/ServiceContext";
import { TimetableProvider } from "../contexts/TimetableContext";
import { BookingProvider } from "../contexts/BookingContext";
import { ArtistProvider } from "../contexts/ArtistContext";
import { ReportProvider } from "../contexts/ReportContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate="Beauty Salon" />
        <AuthProvider>
          <ManagerProvider>
            <ServiceProvider>
              <TimetableProvider>
                <BookingProvider>
                  <ArtistProvider>
                    <ReportProvider>
                      <TopBar />
                      {getLayout(<Component {...pageProps} />)}
                      <Footer />
                    </ReportProvider>
                  </ArtistProvider>
                </BookingProvider>
              </TimetableProvider>
            </ServiceProvider>
          </ManagerProvider>
        </AuthProvider>
      </HelmetProvider>
    </>
  );
}
