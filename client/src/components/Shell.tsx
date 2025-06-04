import type { PropsWithChildren } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Group, Burger, NavLink, Menu, Avatar, Text, UnstyledButton } from '@mantine/core';
import Logo from '@/assets/logo.svg?react';
import './Shell.css';
import { observer } from 'mobx-react';
import { useStore } from '@/store';
import { IconChevronRight, IconLibraryPhoto, IconLogout, IconSettings, IconTags, IconUpload } from '@tabler/icons-react';
import { getRoleName } from '@/utils/getRoleName';
import { Outlet, useLocation, useNavigate } from 'react-router';

export const Shell = observer(({ children }: PropsWithChildren<{}>) => {
    const [isOpen, { toggle }] = useDisclosure();
    const store = useStore();
    const user = store.getCurrentUser();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !isOpen },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between" style={{ width: '100%' }}>
                    <Group gap="sm">
                        <Burger
                            opened={isOpen}
                            onClick={toggle}
                            hiddenFrom="sm"
                        />
                        <Logo className="shell-logo" />
                        <span className="shell-title">Pixen</span>
                    </Group>
                    <Menu shadow="md" width={180} position="bottom-end" withArrow offset={15}>
                        <Menu.Target>
                            <UnstyledButton
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '0 var(--mantine-spacing-md)',
                                    color: 'var(--mantine-color-text)',
                                    cursor: 'pointer',
                                    borderRadius: 'var(--mantine-radius-sm)',
                                }}
                            >
                                <Group>
                                    <Avatar src={user.avatar} radius="xl" size={32} />

                                    <div style={{ flex: 1 }}>
                                        <Text size="sm" fw={500}>
                                            {user.name}
                                        </Text>

                                        <Text c="dimmed" size="xs">
                                            {getRoleName(user.role)}
                                        </Text>
                                    </div>

                                    <IconChevronRight size={16} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconSettings size={14} />}>
                                Settings
                            </Menu.Item>
                            <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={store.logout}>
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="sm">
                <NavLink
                    label="Gallery"
                    leftSection={<IconLibraryPhoto size={16} />}
                    active={location.pathname === '/'}
                    onClick={e => {
                        e.preventDefault();
                        navigate('/');
                    }}
                />
                <NavLink
                    label="Tags"
                    leftSection={<IconTags size={16} />}
                    active={location.pathname.startsWith('/tags')}
                    onClick={e => {
                        e.preventDefault();
                        navigate('/tags');
                    }}
                />
                <NavLink
                    label="Upload"
                    leftSection={<IconUpload size={16} />}
                    active={location.pathname === '/upload'}
                    onClick={e => {
                        e.preventDefault();
                        navigate('/upload');
                    }}
                />
                <NavLink
                    label="Interactive Gallery"
                    leftSection={<IconLibraryPhoto size={16} />}
                    active={location.pathname === '/interactive-gallery'}
                    onClick={e => {
                        e.preventDefault();
                        navigate('/interactive-gallery');
                    }}
                />
            </AppShell.Navbar>
            <AppShell.Main><Outlet /></AppShell.Main>
        </AppShell>
    );
});
