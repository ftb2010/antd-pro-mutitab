import { PageContainer } from "@ant-design/pro-components";
import React, { FC } from "react";
import dayjs from "dayjs";

const Home: FC = function () {
  return <div><PageContainer pageHeaderRender={false}>首页</PageContainer>
    <div>时间：{dayjs().format("YYYY-MM-DD HH:mm:ss")}</div>
  </div>;
};

export default Home;