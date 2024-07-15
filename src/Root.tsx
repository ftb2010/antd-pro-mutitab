import { ProConfigProvider } from "@ant-design/pro-components";
import { ThemeProvider } from "antd-style";
import React, { FC } from "react";
import { ConfigProvider } from 'antd';

import App from "./App";



const Root: FC = function () {
  return (
    <ThemeProvider themeMode="dark">
      <ProConfigProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#F08200",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </ProConfigProvider>
    </ThemeProvider>
  );
};

export default Root;
