import React from "react";

const Auth = ({ children }) => {
  return (
    <div className="rounded-sm bg-gray-50 ">
      <div className="flex items-center justify-center px-4 py-9 2xl:container sm:px-6 md:px-10 md:py-12 xl:px-20 2xl:mx-auto">
        <div className="ml-8 md:mt-0 md:w-1/2 lg:ml-16 xl:w-1/3 hidden sm:block">
          <div className="flex items-start">
            <p className="pl-2.5 text-xl font-bold leading-7 text-gray-600 sm:text-3xl">
              auth_login_title
            </p>
          </div>
          <div className="mt-2 flex items-start">
            {/* <p className="pl-2.5 text-lg leading-7 text-gray-600 sm:text-lg">
              {t("auth_login_description")}
            </p> */}
          </div>
        </div>
        <div className="max-w-[700px] rounded-3xl bg-white  px-4 py-6 shadow-xl sm:px-10 sm:py-10 md:w-1/2 lg:w-6/12 lg:px-12 xl:w-1/3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Auth;
