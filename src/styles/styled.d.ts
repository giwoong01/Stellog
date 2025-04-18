import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            background: string;
            text: string;
            textSecondary: string;
        };
        icon: {
            iconDefault: string;
            iconActive: string;
            iconSelectedWidth: string;
            iconSelectedHeight: string;
            iconDefaultWidth: string;
            iconDefaultHeight: string;
            subIconSelectedWidth: string;
            subIconSelectedHeight: string;
            subIconDefaultWidth: string;
            subIconDefaultHeight: string;
            loginKakaoIconWidth: string;
            loginKakaoIconHeight: string;
            loginGoogleIconWidth: string;
            loginGoogleIconHeight: string;
        };
        fontSizes: {
            small: string;
            medium: string;
            large: string;
            selectedText: string;
            unSelectedText: string;
            subTextSelected: string;
            subTextDefault: string;
        };
    }
}