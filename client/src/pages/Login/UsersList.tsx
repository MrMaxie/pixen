import { Stack, Text } from '@mantine/core';
import { UserButton } from './UserButton';

type User = {
    id: number;
    name: string;
    avatar: string;
};

type Props = {
    users: User[];
    onSelect: (user: User) => void;
};

export const UsersList = ({ users, onSelect }: Props) => {
    return (
        <>
            <Text size="sm" fw={400} style={{ alignSelf: 'flex-start' }}>
                Select your user:
            </Text>
            <Stack gap="xs" w="100%">
                {users.map((user) => (
                    <UserButton
                        key={user.id}
                        user={user}
                        onClick={() => onSelect(user)}
                    />
                ))}
            </Stack>
        </>
    );
};
