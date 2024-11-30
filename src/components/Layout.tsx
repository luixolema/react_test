import {BookOutlined, LogoutOutlined, StarOutlined, UserOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, theme} from 'antd';
import {useState} from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {useNavigate} from "react-router-dom";
import DynamicRoutes, {PATHS} from "../commun/routes.tsx";
import {cognitoAuthConfig} from "../commun/cognitoConfig.ts";

const {Header, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Books', PATHS.books, <BookOutlined/>),
    getItem('Favorites', PATHS.favorites, <StarOutlined/>),
    getItem('Profile', PATHS.profile, <UserOutlined/>),
    getItem('LogOut', 'logout', <LogoutOutlined/>),
];

function logOut() {
    const clientId = cognitoAuthConfig.client_id;
    const logoutUri = window.location.origin;
    const cognitoDomain = cognitoAuthConfig.cognitoDomain;
    localStorage.removeItem(`oidc.user:${cognitoAuthConfig.authority}:${cognitoAuthConfig.client_id}`);
    sessionStorage.clear();
    window.location.replace(`${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`);
    return;
}

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    let screenMap = useBreakpoint();
    const navigate = useNavigate();

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    let handelSelect = (item: MenuItem) => {
        if (item?.key === 'logout') {
            logOut();
            return <></>
        }
        navigate(item?.key as string);
    };

    return (
        <div className="h-full w-full flex">
            {screenMap.lg && <div className="h-full">
                <Sider className="min-h-screen" collapsible collapsed={collapsed}
                       onCollapse={(value) => setCollapsed(value)}>
                    <Menu theme="dark" onSelect={handelSelect} defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
            </div>}
            <div className="h-screen flex-grow flex flex-col overflow-auto">
                <div className="header">
                    {!screenMap.lg &&
                        <Header className="flex-grow items-center">
                            <div className="demo-logo"/>
                            <Menu
                                onSelect={handelSelect}
                                theme="dark"
                                mode="horizontal"
                                items={items}
                                className="min-w-0 flex-grow"
                            />
                        </Header>}
                </div>
                <div className="flex-grow flex flex-col h-full w-full">
                    <div className="flex-grow"
                         style={{
                             background: colorBgContainer,
                             borderRadius: borderRadiusLG,
                         }}
                    >
                        {DynamicRoutes}
                    </div>
                    <div className="footer py-3">
                        <div className="text-center text-gray-700 font-light text-xs">
                            LEMA ©{new Date().getFullYear()} Created by Luis Ernesto Macias Avila
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};