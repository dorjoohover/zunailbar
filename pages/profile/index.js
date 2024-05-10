import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { Alert, Button, Form, Input, Select, Modal, message } from "antd";
import ProfileForm from "../../components/profile/index";

export default function Profile() {
  const router = useRouter();
  const user = useAuth();
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const detail = localStorage.getItem("beauty_detail");
    const initialData1 = detail === "undefined" ? null : detail;
    var initialData = initialData1 === null ? {} : JSON.parse(initialData1);
  }
  useEffect(() => {
    if (!localStorage.getItem("beauty_detail")) {
      router.push("/");
      message.error("Та нэвтэрч орно уу!");
    }
  }, []);
  const handleOnClick = (value) => {
    user.UpdateUser(value);
  };
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="px-12 my-12">
        <div className="max-w-[450px]">
          <ProfileForm data={initialData} handleOnClick={handleOnClick} />
          {/* <h3 className="text-2xl">PROFILE</h3>
        <div>firstName: {initialData?.user?.firstName}</div>
        <div>password: {initialData?.user?.lastName}</div>
        <div>password: {initialData?.user?.password}</div>
        <div>email: {initialData?.user?.email}</div>
        <div>phone: {initialData?.user?.phone}</div> */}
        </div>
      </div>
    </div>
  );
}
