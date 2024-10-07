// system import
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, Modal } from "antd";
import moment from "moment";

// global state
import useService from "../../hooks/useService";
import useBooking from "../../hooks/useBooking";
import useArtist from "../../hooks/useArtist";
import useTimetable from "../../hooks/useTimetable";
import useAuth from "../../hooks/useAuth";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import Cards from "../../components/card/Card";
import RatingForm from "../../components/customer-bookings/ratingForm";
import RateButton from "../../components/customer-bookings/button";
import UpdateCustomerBooking from "../../components/customer-bookings/updateCustomerBooking";

const render = ({ data, events }) => {
  //   console.log("data services", data);
  // console.log("render");
  const checkArtistId = (ArtistId) => {
    var one = "";
    data?.artist_list.forEach((element) => {
      if (element?.id === ArtistId) {
        // userSet.push(userId);
        one = element?.firstName;
      }
    });
    return one;
  };
  const checkServiceId = (ServiceId) => {
    var one = "";
    data?.just_service_list.forEach((element) => {
      if (element?.id === ServiceId) {
        // userSet.push(userId);
        one = element?.serviceName;
      }
    });
    return one;
  };

  const dataDetails = [...data?.bookingList];
  return (
    <div className="min-h-screen min-[350px]:px-12">
      <Head>
        <title>Захиалгын түүх</title>
      </Head>
      <div className="grid grid-cols-1 gap-4 min-[1200px]:mx-12">
        <table
          className="border-2 text-center w-full text-sm"
          //   style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead className="border-2">
            <tr>
              <th className="border-2">№</th>
              <th className="border-2">Артист нэр</th>
              <th className="border-2">Үйлчилгээний нэр</th>
              <th className="border-2">Огноо</th>
              <th className="border-2">Эхлэх цаг</th>
              <th className="border-2">Дуусах цаг</th>
              <th className="border-2">Үнэлгээ</th>
              <th className="border-2">Устгах</th>
              {/* <th className="border-2">Өөрчлөх</th> */}
            </tr>
          </thead>
          <tbody>
            {dataDetails.length > 0 &&
              dataDetails.map((item, index) => {
                return (
                  <tr
                    // className="grid grid-flow-col auto-cols-max gap-4 border-2 p-4"
                    key={index}
                  >
                    <td className="border-2">{index + 1}.</td>
                    <td className="border-2">{checkArtistId(item.artistId)}</td>
                    <td className="border-2">
                      {checkServiceId(item.serviceId)}
                    </td>
                    <td className="border-2">{item.date}</td>
                    <td className="border-2">{item.startTime}</td>
                    <td className="border-2">{item.endTime}</td>
                    <td className="border-2">
                      <Button
                        onClick={() =>
                          events.handleFormData({
                            header: "Үнэлгээ өгөх",
                            formType: "rateBookingForm",
                            form: "put",
                            data: item,
                          })
                        }
                        type="primary"
                        ghost
                      >
                        Үнэлгээ өгөх
                      </Button>
                    </td>
                    <td className="border-2">
                      <Button
                        onClick={() =>
                          events.handleFormData({
                            header: "Захиалга устгах",
                            formType: "deleteOrderForm",
                            message:
                              item?.date +
                              "огноотой " +
                              item?.startTime +
                              " цагтай " +
                              " >> захиалгыг" +
                              "-г устгах уу?",
                            data: {
                              id: item?.id,
                            },
                          })
                        }
                        type="primary"
                        danger
                      >
                        Устгах
                      </Button>
                    </td>
                    {/* <td className="border-2">
                      <Button
                        onClick={() =>
                          events.handleFormData({
                            header: "Захиалга өөрчлөх",
                            formType: "updateOrderForm",
                            form: "put",
                            // data: {
                            //   id: item?.id,
                            //   date: item?.ognoo,
                            //   time: item?.time,
                            // },
                            data: { item },
                          })
                        }
                        type="primary"
                        ghost
                      >
                        Өөрчлөх
                      </Button>
                    </td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal
        // title={"Үнэлгээ өгөх форм"}
        centered
        // open={data?.modal?.modalState}
        title={data?.form?.header}
        open={data?.form?.visible}
        onCancel={() => events.handleCloseModal()}
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {events.handleFormRender(data?.form?.formType, data, events)}
        {/* <RatingForm
          data={data?.modal?.modalData}
          artist_list={data?.artist_list}
          // timetable_list={data?.timetable_list}
          just_service_list={data?.just_service_list}
          events={events}
        /> */}
      </Modal>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const auth = useAuth();
  const service = useService();
  const timetable = useTimetable();
  const booking = useBooking();
  const artist = useArtist();
  const [modal, setModal] = useState({ modalState: false, modalData: "" });
  useEffect(() => {
    service.loadAllServicesByGroups();
    service.loadAllServices();
    artist.loadAllArtist();
    auth.loadBookingsByCustomerId(initialData?.customer?.id);
    // auth.getRatingByCustomerId(initialData?.customer?.id);
    // console.log("presentation");
  }, []);
  if (typeof window !== "undefined") {
    const detail = localStorage.getItem("beauty_detail");
    const initialData1 = detail === "undefined" ? null : detail;
    var initialData = initialData1 === null ? {} : JSON.parse(initialData1);
  }

  const [mainForm, setMainForm] = useState({
    formType: "",
    data: "",
    visible: false,
    header: "",
    message: "",
  });
  const handleFormData = (e) => {
    setMainForm({
      func: e.form,
      header: e.header,
      data: e.data,
      visible: true,
      formType: e.formType,
      message: e.message,
      // id: auth?.state?.loggedInCompany,
    });
  };

  const handleFormRender = (type, data, events) => {
    // console.log("data", data?.form?.data);
    // console.log(data?.form?.data?.type)
    switch (type) {
      // ORDER
      case "rateBookingForm":
        return (
          <RatingForm
            data={data?.form?.data}
            artist_list={data?.artist_list}
            just_service_list={data?.just_service_list}
            events={events}
          />
        );
      case "updateOrderForm":
        return <UpdateCustomerBooking data={data} events={events} />;
      case "deleteOrderForm":
        return (
          <div>
            {data?.form?.message}
            <div className="my-3 flex">
              <Button
                onClick={() => {
                  handleDeleteOrder(data?.form?.data?.id);
                }}
                type="primary"
                danger
              >
                Тийм
              </Button>
            </div>
          </div>
        );
      default:
        return <div>hi</div>;
    }
  };

  // const handleOnClick = (item) => {
  //   // console.log("handleOnClick", item);
  //   setModal(true);
  //   setModal({
  //     ...modal,
  //     modalState: true,
  //     modalData: item,
  //   });
  // };
  const handleCloseModal = () => {
    // setModal({
    //   ...modal,
    //   modalState: false,
    //   modalData: "",
    // });
    setMainForm({
      visible: false,
    });
  };
  const handleOnFinish = (values) => {
    handleCloseModal();
    auth.rateArtist(values);
  };
  const loadTimeTable = (value) => {
    console.log("loadTimeTable", value);
    timetable.getArtistTimetableById(value);
  };

  const loadArtistByService = (value) => {
    artist.loadArtistByService(value);
  };

  const handleDeleteOrder = async (value) => {
    await booking.DeleteOrder(value);
    setMainForm({
      visible: false,
    });
    auth.loadBookingsByCustomerId(ю?.customer?.id);
  };
  const handleUpdateOrder = async (value) => {
    await booking.UpdateOrder(value);
    setMainForm({
      visible: false,
    });
    auth.loadBookingsByCustomerId(initialData?.customer?.id);
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
        Захиалгын түүх
      </h1>
      <DataDisplayer
        error={auth?.state?.message}
        status={auth?.state?.status}
        data={{
          form: mainForm,
          service_list: service?.state?.list,
          just_service_list: service?.state1?.just_service_list,
          modal: modal,
          artist_list: artist?.state?.list,
          artistsByService: artist?.state?.artistsByService,
          timetable_list: timetable?.state?.list,
          bookingList: auth.state.bookingsListByCustomerId,
        }}
        render={render}
        // tr={t}
        events={{
          // handleClick: handleOnClick,
          handleCloseModal: handleCloseModal,
          handleOnFinish: handleOnFinish,
          loadTimeTable: loadTimeTable,
          loadArtistByService: loadArtistByService,
          handleFormData: handleFormData,
          handleFormRender: handleFormRender,
          handleDeleteOrder: handleDeleteOrder,
          handleUpdateOrder: handleUpdateOrder,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
