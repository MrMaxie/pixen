import { ScrollArea, Stack, Text } from '@mantine/core';
import { UserButton } from './UserButton';
import type { FrontendUser } from '@shared/types';

type Props = {
    users: FrontendUser[];
    onSelect: (user: string) => void;
};

export const UsersList = ({ users, onSelect }: Props) => {
    return (
        <>
            <Text size="sm" fw={400} style={{ alignSelf: 'flex-start' }}>
                Select your user:
            </Text>
            <ScrollArea.Autosize mah={300} w="100%" m="0">
                <Stack gap="xs" w="100%">
                    {users.map((user) => (
                        <UserButton
                            key={user.id}
                            user={user}
                            onClick={() => onSelect(user.id)}
                        />
                    ))}
                </Stack>
            </ScrollArea.Autosize>
        </>
    );
};
