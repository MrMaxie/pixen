import { Avatar, Button } from '@mantine/core';

type Props = {
    user: {
        id: number;
        name: string;
        avatar: string;
    };
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
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textAlign: 'left',
                gap: 16,
                overflow: 'hidden',
                paddingTop: 8,
                paddingBottom: 8,
                minHeight: 56,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'inherit',
                letterSpacing: 0.5,
                marginBottom: 16,
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
