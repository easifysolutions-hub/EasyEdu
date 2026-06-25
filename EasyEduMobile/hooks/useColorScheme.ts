import { useColorScheme as _useColorScheme } from 'react-native';

/**
 * The `useColorScheme` hook from `react-native` returns the current color scheme of the system.
 * We wrap it here to make it easier to theme.
 */
export function useColorScheme() {
    return _useColorScheme();
}
