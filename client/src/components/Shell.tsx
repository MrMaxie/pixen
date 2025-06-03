import type { PropsWithChildren } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Group, Burger, Skeleton } from '@mantine/core';
import Logo from '@/assets/logo.svg?react';
import './Shell.css';

export const Shell = ({ children }: PropsWithChildren<{}>) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Logo
                        className="shell-logo"
                    />
                    <span className="shell-title">
                        Pixen
                    </span>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                Navbar
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};
