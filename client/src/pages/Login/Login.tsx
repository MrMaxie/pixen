import { useState } from 'react';
import {
    Center,
    Paper,
    Group,
    Stack,
} from '@mantine/core';
import Logo from '@/assets/logo.svg?react';
import './Login.css';
import { UsersList } from './UsersList';
import { PasswordForm } from './PasswordForm';

// Define a type for user
interface User {
    id: number;
    name: string;
    avatar: string;
}

const users: User[] = [
    {
        id: 1,
        name: 'Alice',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
        id: 2,
        name: 'Bob',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: 3,
        name: 'Charlie',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    },
];

export const Login = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
                    <Stack gap="lg" justify="center" align="stretch" h="100%" w="100%">
                        {!selectedUser ? (
                            <UsersList users={users} onSelect={setSelectedUser} />
                        ) : (
                            <PasswordForm user={selectedUser} onBack={() => setSelectedUser(null)} />
                        )}
                    </Stack>
                </Paper>
            </Stack>
        </Center>
    );
}
