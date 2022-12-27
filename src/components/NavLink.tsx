import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import type { FC } from 'react';
import React from 'react';
import { NextLink } from '@mantine/next';
import type { NavData } from './Navbar';

const NavLink: FC<NavData> = ({ icon, color, label, href }) => {
    return (
        <UnstyledButton
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[0]
                        : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0],
                },
            })}
            component={NextLink}
            href={href}
            legacyBehavior
        >
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>
                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    );
};
export default NavLink;
