import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Modal, Input } from "antd";
import moment from "moment";

// global state
import useService from "../../hooks/useService";
import useBooking from "../../hooks/useBooking";
import useArtist from "../../hooks/useArtist";
import useTimetable from "../../hooks/useTimetable";
// import useAuth from "../hooks/useAuth";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import Cards from "../../components/card/Card";
import ServiceForm from "../../components/form/serviceForm";

const render = ({ data, events }) => {
  const { Search } = Input;
  const [searchValue, setSearchValue] = useState("");

  const filterNames = (service) => {
    return service.serviceName
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  };

  const filteredData = data?.service_list.map((item) => ({
    ...item,
    services: item.services.filter(filterNames),
  }));

  return (
    <div className="min-h-screen min-[350px]:px-12">
      <Head>
        <title>Үйлчилгээнүүд</title>
      </Head>
      <div className="my-5 .font-bold"></div>
      <Search
        className="min-[1200px]:mx-12 min-w-[300px]"
        placeholder="Хайх"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        style={{
          width: 200,
        }}
      />
      <div className="grid grid-cols-1 gap-4 min-[1200px]:mx-12">
        {filteredData.length > 0 &&
          filteredData.map((item, index) => {
            return (
              <div key={item.id}>
                <div className="font-black text-3xl text-center mb-4">
                  {item.serviceGroupName !== "defaultServices" &&
                    item.serviceGroupName}
                </div>
                <div className="grid place-items-center gap-3 font-Montserrat sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {item.services.map((service) => (
                    <div className="w-full" key={service.id}>
                      <Cards
                        data={{
                          id: service?.id,
                          image1: service?.image1,
                          status: service?.status,
                          serviceName: service?.serviceName,
                          price: service?.price,
                          duration: service?.duration,
                          userDetail: data?.userDetail,
                        }}
                        events={events}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <Modal
        title={"Үйлчилгээ авах форм"}
        centered
        open={data?.modal?.modalState}
        onCancel={() => events.handleCloseModal()}
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: { none: "none" } } }}
      >
        <ServiceForm
          data={data?.modal?.modalData}
          artist_list={data?.artist_list}
          timetable_list={data?.timetable_list}
          artistsByService={data?.artistsByService}
          events={events}
        />
      </Modal>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const service = useService();
  const timetable = useTimetable();
  const booking = useBooking();
  const artist = useArtist();
  const [modal, setModal] = useState({ modalState: false, modalData: "" });

  useEffect(() => {
    service.loadAllServicesByGroups();
    artist.loadAllArtist();
  }, []);

  if (typeof window !== "undefined") {
    const detail = localStorage.getItem("beauty_detail");
    const initialData1 = detail === "undefined" ? null : detail;
    var userDetail = initialData1 === null ? {} : JSON.parse(initialData1);
  }

  const handleOnClick = (serviceId, serviceName, price, duration) => {
    setModal(true);
    setModal({
      ...modal,
      modalState: true,
      modalData: {
        serviceId: serviceId,
        name: serviceName,
        price: price,
        duration: duration,
      },
    });
  };

  const handleCloseModal = () => {
    setModal({
      ...modal,
      modalState: false,
      modalData: "",
    });
  };

  const handleOnFinish = (values) => {
    handleCloseModal();
    let timeString = values?.time.format("HH:00:00");
    let originalTime = moment(timeString, "HH:mm:ss");
    let updatedTime = originalTime.add(values?.duration, "hours");
    let formattedUpdatedTime = updatedTime.format("HH:mm:ss");

    booking.createBooking(
      values?.customerId,
      values?.serviceId,
      values?.artistId,
      values?.date.format("YYYY-MM-DD"),
      values?.time.format("HH:00:00"),
      formattedUpdatedTime
    );
  };

  const loadTimeTable = (value) => {
    timetable.getArtistTimetableById(value);
  };

  const loadArtistByService = (value) => {
    artist.loadArtistByService(value);
  };

  return (
    <React.Fragment>
      <h1
        className="mb-2 pt-4"
        style={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        Үйлчилгээнүүд
      </h1>
      <DataDisplayer
        error={service?.state?.message}
        status={service?.state?.status}
        data={{
          service_list: service?.state?.list,
          modal: modal,
          artist_list: artist?.state?.list,
          artistsByService: artist?.state?.artistsByService,
          timetable_list: timetable?.state?.list,
          userDetail: userDetail,
        }}
        render={render}
        events={{
          handleClick: handleOnClick,
          handleCloseModal: handleCloseModal,
          handleOnFinish: handleOnFinish,
          loadTimeTable: loadTimeTable,
          loadArtistByService: loadArtistByService,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Presentation;
