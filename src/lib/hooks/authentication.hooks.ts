import { perform_github_login } from '@/services/authService';
import type { UserTypes } from '@/types/users';
import { redirect, type Handle } from '@sveltejs/kit';

export const rootPageHook: Handle = async ({ event, resolve }) => {
	const url_path = event.url.pathname;
	const refresh_token = event.cookies.get('refresh_token');
	if (url_path == '/' && refresh_token != null) {
        event.url.pathname = '/dashboard';
		return redirect(301, '/dashboard');
	}
    if (url_path == '/' && refresh_token == null) {
        return redirect(301, '/login');
    }
	return await resolve(event);
};


export const loginPageHook: Handle = async ({ event, resolve }) => {
    const refresh_token = event.cookies.get('refresh_token');
    const url_path = event.url.pathname;
    if (refresh_token != null && url_path.startsWith('/login')) {
        return redirect(301, '/dashboard');
    }
    return await resolve(event);



};


export const githubSignInPathHook: Handle = async ({ event, resolve }) => {
    const url_path = event.url.pathname;
    let authorizedUser: UserTypes.AuthorizedUser | null = null;
    // Hook for Github Sign In path
    if (url_path.startsWith('/github') && event.url.searchParams.has('code')) {
        console.log(`Github Sign In Hook: Path ${url_path} with code`);
        // Get the code parameter
        const code = event.url.searchParams.get('code');
        if (code == null) {
            return await resolve(event);
        }
        // Perform the Github Login
        
        try {
            const response = await perform_github_login(code);
            authorizedUser = { ...response.user, accessToken: response.accessToken };
            event.locals.user = authorizedUser;
            event.cookies.set('refresh_token', response.refreshToken,
                {
                    path: '/',
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 30 // 30 days
                })
                await resolve(event);
            return redirect(307, '/dashboard');
        }
        catch (error) {
            const e = error as Error;
            console.error('Github Sign In Hook Error: ', e.message);
            event.locals.user = null;
            event.url.pathname = '/login';
            event.params = { error: e.message };
            return redirect(307, `/login?error=${e.message}`);
        }
    }
    return await resolve(event);
}