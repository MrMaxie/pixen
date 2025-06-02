import { PasswordInput, Button, Group, Stack } from '@mantine/core';
import { useState } from 'react';
import { UserButton } from './UserButton';

type User = {
    id: number;
    name: string;
    avatar: string;
};

type PasswordFormProps = {
    user: User;
    onBack: () => void;
};

export function PasswordForm({ user, onBack }: PasswordFormProps) {
    const [password, setPassword] = useState('');

    return (
        <>
            <UserButton user={user} />
            <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                autoFocus
                radius="md"
                w="100%"
                withAsterisk
            />
            <Stack gap="xs" mt="md">
                <Button
                    fullWidth
                >
                    Login
                </Button>
                <Button
                    fullWidth
                    color="gray"
                    onClick={onBack}
                >
                    Back
                </Button>
            </Stack>
        </>
    );
}
