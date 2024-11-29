import {BookOutlined, LogoutOutlined, StarOutlined, UserOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, theme} from 'antd';
import {useState} from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {useNavigate} from "react-router-dom";
import DynamicRoutes, {PATHS} from "../commun/routes.tsx";
import {cognitoAuthConfig} from "../commun/cognitoConfig.ts";

const {Header, Content, Footer, Sider} = Layout;

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
            return;
        }
        navigate(item?.key as string);
    };

    return (
        <Layout className="h-screen w-screen">
            {screenMap.lg &&
                <Sider collapsible breakpoint="lg" collapsed={collapsed}
                       onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical"/>
                    <Menu theme="dark" mode="inline" items={items} onClick={handelSelect}/>
                </Sider>
            }
            <Layout>
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
                    </Header>
                }
                <Content className="my-0 mx-4">
                    <div className="my-4 mx-0 p-6 min-h-96"
                         style={{
                             background: colorBgContainer,
                             borderRadius: borderRadiusLG,
                         }}
                    >
                        {DynamicRoutes}
                    </div>
                </Content>
                <Footer className="text-center">
                    LEMA ©{new Date().getFullYear()} Created by Luis Ernesto Macias Avila
                </Footer>
            </Layout>
        </Layout>
    );
};