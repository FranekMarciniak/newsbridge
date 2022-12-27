import type { DefaultMantineColor } from '@mantine/core';
import { Navbar as MantineNav } from '@mantine/core';
import type { FC, ReactElement } from 'react';
import React from 'react';
import { IconArticle, IconLogin, IconLogout } from '@tabler/icons';
import NavLink from './NavLink';
import { useSession } from 'next-auth/react';

const Navbar: FC<{ opened: boolean }> = ({ opened }) => {
    const { data, status } = useSession();
    return (
        <MantineNav
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
        >
            <Links
                data={status === 'authenticated' ? loggedData : notLoggedData}
            />
        </MantineNav>
    );
};
export default Navbar;

export interface NavData {
    icon: ReactElement;
    color: DefaultMantineColor;
    label: string;
    href: string;
}

const loggedData: NavData[] = [
    {
        icon: <IconArticle size={16} />,
        color: 'grape',
        label: 'Add Article',
        href: '/article/add',
    },
    {
        icon: <IconLogout size={16} />,
        color: 'blue',
        label: 'Logout',
        href: '/api/auth/signout',
    },
];

const notLoggedData: NavData[] = [
    {
        icon: <IconLogin size={16} />,
        color: 'blue',
        label: 'Login',
        href: '/api/auth/signin',
    },
];
export function Links({ data }: { data: NavData[] }) {
    const links = data.map((link) => <NavLink {...link} key={link.label} />);
    return <div>{links}</div>;
}
