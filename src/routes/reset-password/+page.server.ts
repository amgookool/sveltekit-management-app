import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { ZodError, z } from 'zod';
import { perform_password_reset } from '@/services/authService';
import { fail } from '@sveltejs/kit';

const resetPasswordFormSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required',
			invalid_type_error: 'Email must be a string of alphanumeric characters'
		})
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email must be a valid email address' })
});

const processResetFormEvent = async (event: RequestEvent) => {
	const formData = Object.fromEntries(await event.request.formData());
	try {
		const validatedFormData = resetPasswordFormSchema.parse(formData);
		return {
			success: true,
			data: validatedFormData,
			errors: null
		};
	} catch (e) {
		if (e instanceof ZodError) {
			const { fieldErrors: errors } = e.flatten();
			const { email } = formData;
			return {
				success: false,
				data: {
					email: email,
				},
				errors
			};
		}
	}
};

export const load = (async () => {
	return {
		props: {
			title: 'Koolkeyz Management - Reset Password'
		}
	};
}) satisfies PageServerLoad;

interface resetRequestResponse {
	message: string;
}

export const actions: Actions = {
	default: async (event) => {
		const processedForm = await processResetFormEvent(event);
		let resetMessage: resetRequestResponse;
		if (!processedForm?.success) {
			return processedForm;
		}
		const { email } = processedForm.data as { email: string };
		try {
			resetMessage = await perform_password_reset({
				email: email
			});
			if (resetMessage == null) {
				return fail(404, { error: 'Failed to authenticate user' });
			}
		} catch (err: unknown) {
			const error = err as Error;
			console.error(error);
			return fail(error.cause as number, { error: error.message });
		}
		return {
			success: true,
			data: { message: resetMessage.message, email: email },
			errors: null
		};
	}
};
