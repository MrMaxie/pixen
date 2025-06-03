import { Avatar, Button } from '@mantine/core';
import type { FrontendUser } from '@shared/types';

type Props = {
    user: FrontendUser;
    onClick?: () => void;
};

export const UserButton = ({ user, onClick }: Props) => {
    const isInteractive = !!onClick;
    return (
        <Button
            variant={isInteractive ? 'default' : 'default'}
            fullWidth
            size="md"
            radius="md"
            h={56}
            lts={0.5}
            fw={500}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textAlign: 'left',
                gap: 16,
                pointerEvents: isInteractive ? undefined : 'none',
            }}
            onClick={onClick}
            tabIndex={isInteractive ? 0 : -1}
        >
            <Avatar
                src={user.avatar}
                size={40}
                radius="xl"
                mr="sm"
            />
            <span
                style={{
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {user.name}
            </span>
        </Button>
    );
};
