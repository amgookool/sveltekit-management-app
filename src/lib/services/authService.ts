import { KOOLKEYZ_AUTHORIZATION_SERVICE } from "$env/static/private";
import type { UserTypes } from "@/types/users";
import type { RequestEvent } from "@sveltejs/kit";


export const perform_refresh = (event: RequestEvent): Promise<UserTypes.AuthorizationResponse> => {
    const api_refresh_url = `${KOOLKEYZ_AUTHORIZATION_SERVICE}/auth/refresh`;
    const refresh_token = event.cookies.get('refresh_token');
    if (refresh_token == null) {
        throw new Error('Refresh token is null');
    }
    return fetch(api_refresh_url, {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refresh_token }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response: Response) => {
            if (response.ok) {
                return response.json() as Promise<UserTypes.AuthorizationResponse>; // Specify the return type
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Refresh Token not found');
                    default:
                        throw new Error('An error occurred');
                }
            }
        })
        .then((data: UserTypes.AuthorizationResponse) => {
            return data;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const perform_login = (form_data: {
    username: string;
    password: string;
}): Promise<UserTypes.AuthorizationResponse> => {
    const auth_api_url = `${KOOLKEYZ_AUTHORIZATION_SERVICE}/auth/login`;
    return fetch(auth_api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form_data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                switch (response.status) {
                    case 400:
                        throw new Error('Invalid password', { cause: 400 });
                    case 404:
                        throw new Error('Invalid email', { cause: 404 });
                    default:
                        throw new Error('An error occurred', { cause: 500 });
                }
            }
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error Authenticating User")
            throw new Error(error.message);
        });
};

export const perform_logout = (event: RequestEvent): Promise<void> => {
    const auth_api_url = `${KOOLKEYZ_AUTHORIZATION_SERVICE}/auth/logout`;
    const refresh_token = event.cookies.get('refresh_token');
    if (refresh_token == null) {
        throw new Error('Refresh token is null');
    }
    return fetch(auth_api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh_token: refresh_token })
    })
        .then((response) => {
            if (response.ok) {
                return;
            } else {
                throw new Error('An error occurred');
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const perform_password_reset = (form_data: {
    email: string;
}): Promise<{ message: string }> => { // Specify the return type
    const auth_api_url = `${KOOLKEYZ_AUTHORIZATION_SERVICE}/auth/password-reset`;
    return fetch(auth_api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form_data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                switch (response.status) {
                    case 404:
                        return response.json().then((data) => {
                            throw new Error(data.detail as string);
                        });
                    default:
                        throw new Error('An error occurred... Please try again.');
                }
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const validate_password_reset_token = (token: string): Promise<boolean> => {
    const api_url = `${KOOLKEYZ_AUTHORIZATION_SERVICE}/auth/password-reset-verify`;
    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Token is invalid');
                    default:
                        throw new Error('An error occurred');
                }
            }
        })
        .then((data) => {
            console.log(`${data.message} [${token}]`);
            return true;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
}

export const perform_password_reset_change = (form_data: {
    new_password: string;
    token: string;
}): Promise<string> => { // Specify the return type
    const auth_api_url = `${KOOLKEYZ_AUTHORIZATION_SERVICE}/auth/password-reset/${form_data.token}`;
    return fetch(auth_api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_password: form_data.new_password })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Invalid reset token');
                    default:
                        throw new Error('An error occurred');
                }
            }
        })
        .then((data) => {
            return data.message as string;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
}

export const perform_github_login = (code: string): Promise<UserTypes.AuthorizationResponse> => {
    const auth_api_url = `${KOOLKEYZ_AUTHORIZATION_SERVICE}/auth/github-login`;
    return fetch(auth_api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Invalid code');
                    default:
                        throw new Error('An error occurred');
                }
            }
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};