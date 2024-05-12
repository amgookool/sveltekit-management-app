import { perform_github_login, perform_refresh, validate_password_reset_token } from '@/services/authService';
import { redirect, type Handle } from '@sveltejs/kit';
// import { error } from '@sveltejs/kit';
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

export const dashboardPageHook: Handle = async ({ event, resolve }) => {
    const url_path = event.url.pathname;
    if (url_path.startsWith('/dashboard')) {
        try {
            const { user, accessToken } = await perform_refresh(event)
            event.locals.user = { ...user, accessToken };
        }
        catch (err) {
            console.error(err);
            throw redirect(301, '/login')
        }
        return await resolve(event);
    }
    return await resolve(event)
}

export const resetPasswordPageHook: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/reset-password') && event.cookies.get('refresh_token')) {
        return redirect(301, '/dashboard')
    }
    if (event.url.pathname.startsWith('/reset-password') && !event.cookies.get('refresh_token')) {
        const split_path = event.url.pathname.split('/');
        if (split_path.length > 2 && split_path.length < 4) {
            const passwordToken = split_path.slice(-1)[0];
            console.log(passwordToken);
            try {
                const isValid = await validate_password_reset_token(passwordToken);
                if (isValid) {
                    console.log('Password Reset Hook: Token is valid');
                    return await resolve(event);
                }
            }
            catch (err: unknown) {
                const error_ = err as Error;
                console.error('Password Reset Hook Error: ', error_.message);
                const message = `${error_.message}`
                event.url.pathname = '/reset-password?error=' + message;
                return redirect(307, `/reset-password?error=${message}`);
                // error(404, {message: message})
            }
        }

    }
    return await resolve(event);
}

export const githubSignInPathHook: Handle = async ({ event, resolve }) => {
    const url_path = event.url.pathname;
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
            event.cookies.set('refresh_token', response.refreshToken,
                {
                    path: '/',
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 30 // 30 days
                })
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