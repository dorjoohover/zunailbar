import React from "react";
import { Drawer } from "antd";
import { Layout, Space } from "antd";

const { Header, Footer, Sider, Content } = Layout;

// import useSettings from "../hooks/useSettings";

const Main = ({ children }) => {
  return (
    <Layout
      className="h-[140vh]"
      // style={{
      //   background: "#7A9CA5",
      // }}
    >
      <Content>
        <div className="mx-auto w-[90%] rounded-xl   px-3 .text-center font-Montserrat shadow-2xl max-[639px]:px-2 max-[400px]:mx-0">
          <div className=".my-32 p-2 max-[400px]:p-0 .bg-[#7A9CA5]">
            {children}{" "}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Main;
