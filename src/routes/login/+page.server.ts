import { GITHUB_OAUTH_CLIENT_ID } from '$env/static/private';
import { perform_login } from '@/services/authService';
import type { UserTypes } from '@/types/users';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError, z } from 'zod';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

const loginFormSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.min(1, { message: 'Email is required' })
		.max(255, { message: 'Email must be at most 255 characters.' })
		.email({ message: 'Email must be a valid email address' }),
	password: z
		.string({
            message: 'Password is required',
			required_error: 'Password is required'
		})
        .min(1, { message: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters.' })
		.max(64, { message: 'Password must be at most 64 characters.' })
		.trim()
});

const processLoginFormEvent = async (event: RequestEvent) => {
	const formData = Object.fromEntries(await event.request.formData());
	try {
		const validatedFormData = loginFormSchema.parse(formData);
		return {
			success: true,
			data: validatedFormData,
			errors: null
		};
	} catch (e) {
		if (e instanceof ZodError) {
			console.log(e.flatten())
			const { fieldErrors: errors } = e.flatten();
			const { email } = formData;
			return {
				success: false,
				data: {
					email: email,
					password: ''
				},
				errors
			};
		}
	}
};

export const load = (async () => {
	return {
		props: {
			title: 'Koolkeyz Management - Login',
			github_signin_url: `https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENT_ID}`
		}
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async (event) => {
		let authResponse: UserTypes.AuthorizationResponse;
		const processedForm = await processLoginFormEvent(event);
		if (!processedForm?.success) {
			return processedForm;
		}
		const { email, password } = processedForm.data as { email: string; password: string };
		try {
			authResponse = await perform_login({
				username: email,
				password: password
			});
			if (authResponse == null) {
				return fail(404, { error: 'Failed to authenticate user' });
			}
		} catch (err: unknown) {
			const error = err as Error;
			console.error(error);
			return fail(error.cause as number, { error: error.message });
		}
		const { user, accessToken, refreshToken } = authResponse;
		event.locals.user = { ...user, accessToken };
		event.cookies.set('refresh_token', refreshToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true
		});
		return redirect(302, '/dashboard');
	}
};
