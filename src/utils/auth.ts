export const TOKEN_KEY = 'admin_token';

export function setToken(token: string) {
    try {
        if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
        console.warn('Failed to set token', e);
    }
}

export function getToken(): string | null {
    try {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(TOKEN_KEY);
    } catch (e) {
        console.warn('Failed to get token', e);
        return null;
    }
}

export function removeToken() {
    try {
        if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
        console.warn('Failed to remove token', e);
    }
}

export function isLoggedIn() {
    return !!getToken();
}
