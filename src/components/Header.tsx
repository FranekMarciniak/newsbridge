import type { Dispatch, FC, SetStateAction } from 'react';
import {
    Burger,
    Header as MantineHeader,
    MediaQuery,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

interface HeaderProps {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}
const Header: FC<HeaderProps> = ({ opened, setOpened }) => {
    const theme = useMantineTheme();
    return (
        <MantineHeader height={{ base: 50, md: 70 }} p="md">
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>
                <Text size="xl" fw={700} ml="md">
                    NewsRoom
                </Text>
            </div>
        </MantineHeader>
    );
};

export default Header;
