import type { AppProps } from 'next/app';
import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { emotionCache } from '../utils/emotion-cache';
import { SessionProvider } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import Layout from '../components/Layout';
import React, { useState } from 'react';
import { NotificationsProvider } from '@mantine/notifications';

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = () =>
        setColorScheme((colorScheme) =>
            colorScheme === 'dark' ? 'light' : 'dark'
        );

    return (
        <SessionProvider>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{ colorScheme }}
                    withGlobalStyles
                    withNormalizeCSS
                    emotionCache={emotionCache}
                >
                    <NotificationsProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </SessionProvider>
    );
};
export default trpc.withTRPC(App);
