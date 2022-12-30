import type { FC, ReactNode, VFC } from 'react';
import { useState } from 'react';
import { AppShell, Center, Footer, Text, useMantineTheme } from '@mantine/core';
import Navbar from './Navbar';
import Header from './Header';
import Head from 'next/head';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={<Navbar opened={opened} />}
            footer={
                <Footer height={60} p="md">
                    <Center>Developed by Franek Marciniak</Center>
                </Footer>
            }
            header={<Header setOpened={setOpened} opened={opened} />}
        >
            <Head>
                <title>NewsRoom</title>
            </Head>
            {children}
        </AppShell>
    );
};

export default Layout;
