import {
  BellOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import SmileOutlined from "@ant-design/icons/SmileOutlined";
import { ProLayout, ProLayoutProps } from "@ant-design/pro-components";
import { Dropdown, Tabs } from "antd";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { Link, useOutlet } from "react-router-dom";
import _ from "lodash";

import pages from "../pages";
import "./AppLayout.less";
import PageRouteObject from "../pages/PageRouteObject";
import { ItemType } from "antd/es/menu/interface";
import { MenuInfo } from "rc-menu/lib/interface";

const { } = import.meta.env;

function pagesToRoutes(
  parentPath: string,
  pages: PageRouteObject[],
): ProLayoutProps["route"][] {
  return pages.map((p) => {
    const path = parentPath + "/" + p.path;
    return {
      path,
      name: p.title,
      icon: p.icon || <SmileOutlined />,
      routes: pagesToRoutes(path, p.children ?? []),
    };
  });
}

const route: ProLayoutProps["route"] = {
  path: "/",
  routes: pagesToRoutes("", pages),
};

console.log(route);

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const AppLayout: FC = function () {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const outlet = useOutlet();
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    const currentTab = items.find((item) => item.key === newActiveKey);
    if (currentTab) {
      window.location.hash = currentTab.key;
      if (newActiveKey !== "/" && newActiveKey !== "/main") {
        const newPanes = items.filter((item) => item.key !== "/" && item.key !== "/main");
        if (newPanes.length > 1)
          setItems(newPanes.map((item: any) => item = _.merge(item, { closable: true })))
        else
          setItems(newPanes.map((item: any) => item = _.merge(item, { closable: false })))
      }
    }
  };
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      console.log(targetKey)
      remove(targetKey);
    }
  };

  const remove = (targetKey: TargetKey) => {
    console.log(targetKey, "activeKey:" + activeKey, items)
    const targetIndex = items.findIndex((pane) => pane.key == targetKey);
    const newPanes = items.filter((pane) => pane.key != targetKey);
    if (newPanes.length && targetKey == activeKey && activeKey != "/" && activeKey != "/main") {
      const { key } = newPanes[targetIndex == newPanes.length ? targetIndex - 1 : targetIndex];
      onChange(key);
    }
    if (newPanes.length > 1)
      setItems(newPanes.map((item: any) => item = _.merge(item, { closable: true })))
    else
      setItems(newPanes.map((item: any) => item = _.merge(item, { closable: false })))
  };

  useEffect(() => {
    const companyId = localStorage.getItem('companyId');
    if (!companyId)
      localStorage.setItem('companyId', '303');
  }, []);

  enum OperationType {
    REFRESH = 'refresh',
    CLOSE = 'close',
    CLOSEOTHER = 'close-other',
  }

  type MenuItemType = ItemType & { key: OperationType } | null;

  const menuItems: MenuItemType[] = useMemo(() => [
    {
      label: '关闭其他',
      key: OperationType.CLOSEOTHER,
    },
  ].filter(o => o), [items]);



  // 关闭其他
  const closeOtherTab = (routePath: any) => {
    console.log('routePath', routePath)
    const newPanes = items.filter(tab => tab.key === routePath.path);
    setItems(newPanes.map((item: any) => item = _.merge(item, { closable: false })))
  }



  const menuClick = useCallback(({ key, domEvent }: MenuInfo, tab: any) => {
    domEvent.stopPropagation();
    if (key === OperationType.CLOSEOTHER) {
      closeOtherTab(tab);
    }
  }, [closeOtherTab]);
  const getTabTitle = (path: string) => {
    const pathArr = route.routes.filter((item: any) => item.path == "/main")[0].routes;
    const newPaths = pathArr.filter((item: any) => item.path == path);
    const tab = newPaths[0];
    return (
      <Dropdown
        menu={{ items: menuItems, onClick: (e) => menuClick(e, tab) }}
        trigger={['contextMenu']}
      >
        <div style={{ margin: '-12px 0', padding: '12px 0' }}>
          {tab.icon}&nbsp;&nbsp;
          {tab.name}
        </div>
      </Dropdown>
    );
  };

  useEffect(() => {
    const path = location.pathname;
    if (items.filter(item => item.key === path).length == 0 && outlet) {
      const temp = items;
      temp.push({
        label: path == "/" || path == "/main" ? "" : getTabTitle(path),
        key: path,
        children: <div style={{ marginTop: -35 }}>{outlet}</div>
      });
      if (temp.length > 1)
        setItems(temp.map((item: any) => item = _.merge(item, { closable: true })))
      else
        setItems(temp.map((item: any) => item = _.merge(item, { closable: false })))
    }
    onChange(path);
  }, [location])

  return (
    <ProLayout
      title={'Ant design pro'}
      // logo="react.svg"
      location={location}
      route={route}
      layout="mix"
      splitMenus
      siderWidth={182}
      menuItemRender={(menuItemProps, defaultDom) => {
        return <Link to={menuItemProps.path!}>{defaultDom}</Link>;
      }}
      avatarProps={{
        title: "游客",
        src: null,
        render: (_props, dom) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: "退出登录",
                  onClick: () => {
                    localStorage.removeItem("token");
                  },
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        ),
      }}
      actionsRender={() => [
        <BellOutlined />,
        <QuestionCircleOutlined />,
      ]}
    >
      {/* <Outlet /> */}

      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        items={items}
        onEdit={onEdit}
        hideAdd
      />
    </ProLayout>);
};

export default AppLayout;
