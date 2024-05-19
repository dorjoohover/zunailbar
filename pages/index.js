import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Main from "../components/Main/main";

export default function Home() {
  return (
    <main className={`min-h-screen`}>
      <Head>
        <title>Zu Nailbar Salon</title>
      </Head>
      <Main />
    </main>
  );
}
