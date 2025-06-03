import { useEffect, useMemo, useState } from 'react';
import {
    Center,
    Paper,
    Group,
    Stack,
    Loader,
} from '@mantine/core';
import Logo from '@/assets/logo.svg?react';
import './Login.css';
import { UsersList } from './UsersList';
import { PasswordForm } from './PasswordForm';
import type { FrontendUser } from '@shared/types';
import { client } from '@/client';
import _ from 'lodash';

export const Login = () => {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [users, setUsers] = useState<FrontendUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchUsers = async () => {
            const response = await client.auth.getUsers();
            setUsers(response);
            setIsLoading(false);
        };

        fetchUsers();
    }, []);

    const selectedUser = useMemo(() => {
        if (selectedUserId === null) return null;
        return users.find(user => user.id === selectedUserId) || null;
    }, [users, selectedUserId]);

    return (
        <Center h="100vh">
            <Stack align="center" gap="xs">
                <Group h="100%" px="md" mb="md">
                    <Logo className="login-logo" />
                    <span className="login-title">Pixen</span>
                </Group>
                <Paper
                    shadow="md"
                    radius="lg"
                    p="xl"
                    withBorder
                    mah={600}
                    miw={340}
                >
                    {isLoading && (
                        <Center h="100%">
                            <Loader
                                size="md"
                                type="dots"
                                color="blue"
                            />
                        </Center>
                    )}
                    {!isLoading && (
                        <Stack gap="lg" justify="center" align="stretch" h="100%" w="100%">
                            {!selectedUser ? (
                                <UsersList
                                    users={users}
                                    onSelect={setSelectedUserId}
                                />
                            ) : (
                                <PasswordForm
                                    user={selectedUser}
                                    onBack={() => setSelectedUserId(null)}
                                />
                            )}
                        </Stack>
                    )}
                </Paper>
            </Stack>
        </Center>
    );
}
