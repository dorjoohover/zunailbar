import "../styles/globals.css";
import TopBar from "../components/topbar";
import Footer from "../components/footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Head from "next/head";
import { AuthProvider } from "../contexts/AuthContext";
import { ServiceProvider } from "../contexts/ServiceContext";
import { OrderProvider } from "../contexts/OrderContext";
import { EmployeeProvider } from "../contexts/EmployeeContext";
import { ReportProvider } from "../contexts/ReportContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate="Beauty Salon" />
        <AuthProvider>
          <ServiceProvider>
            <OrderProvider>
              <EmployeeProvider>
                <ReportProvider>
                  <TopBar />
                  {getLayout(<Component {...pageProps} />)}
                  <Footer />
                </ReportProvider>
              </EmployeeProvider>
            </OrderProvider>
          </ServiceProvider>
        </AuthProvider>
      </HelmetProvider>
    </>
  );
}
