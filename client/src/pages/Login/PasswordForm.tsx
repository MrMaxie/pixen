import { PasswordInput, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UserButton } from './UserButton';
import type { FrontendUser } from '@shared/types';
import { client } from '@/client';
import { useStore } from '@/store';

type PasswordFormProps = {
    user: FrontendUser;
    onBack: () => void;
};

export const PasswordForm = ({ user, onBack }: PasswordFormProps) => {
    const store = useStore();

    const form = useForm({
        initialValues: {
            password: '',
        },
        validate: {
            password: (value) =>
                value.length < 4
                    ? 'Password must be at least 4 characters'
                    : null,
        },
    });

    const handleSubmit = async (values: { password: string }) => {
        try {
            const response = await client.auth.login({
                id: user.id,
                password: values.password,
            });

            store.setToken(response.token);
        } catch (error) {
            console.error(error);
            form.setFieldError('password', 'Invalid password');
            return;
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <UserButton user={user} />
            <PasswordInput
                label="Password"
                placeholder="Enter your password"
                autoFocus
                radius="md"
                w="100%"
                withAsterisk
                key={form.key('password')}
                {...form.getInputProps('password')}
            />
            <Stack gap="xs" mt="md">
                <Button fullWidth type="submit">
                    Login
                </Button>
                <Button fullWidth variant="subtle" onClick={onBack}>
                    Back
                </Button>
            </Stack>
        </form>
    );
}
