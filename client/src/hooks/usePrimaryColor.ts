import { useMantineTheme } from '@mantine/core';

export function usePrimaryColor() {
    const theme = useMantineTheme();
    return theme.colors[theme.primaryColor]?.[6] || theme.primaryColor;
}
