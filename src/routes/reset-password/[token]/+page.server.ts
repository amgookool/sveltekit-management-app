import { perform_password_reset_change } from '@/services/authService';
import type { Actions, PageServerLoad } from './$types';
import { ZodError, z } from 'zod';
import { fail, type RequestEvent } from '@sveltejs/kit';

interface resetPasswordFormType {
	password: string;
	confirmPassword: string;
}


const resetPasswordUpdateFormSchema = z
	.object({
		password: z
			.string({
				required_error: 'Password is required',
				invalid_type_error: 'Password must be a string of alphanumeric characters'
			})
			.min(1, { message: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.trim()
			.refine((value) => /[\W_]/.test(value),
				'Password must contain a special character'
			)
			.refine((value) => /(?=.*[a-z])(?=.*[A-Z])/.test(value),
				'Password must contain a capital letter'
			),
		confirmPassword: z
			.string({
				required_error: 'Confirm password is required',
				invalid_type_error: 'Password must be a string of alphanumeric characters'
			})
			.min(1, { message: 'Confirm password is required' })
			.min(8, { message: 'Confirm Password must be at least 8 characters' })
			.trim()
			.refine((value) => /[\W_]/.test(value),
				'Password must contain a special character'
			)
			.refine((value) => /(?=.*[a-z])(?=.*[A-Z])/.test(value),
				'Password must contain a capital letter'
			),
	})
	.superRefine(({ password, confirmPassword }, ctx: z.RefinementCtx) => {
		if (password != confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});


const processResetFormEvent = async (event: RequestEvent) => {
	const formData = Object.fromEntries(await event.request.formData());
	try {
		const validatedFormData = resetPasswordUpdateFormSchema.parse(formData);
		return {
			success: true,
			data: validatedFormData,
			errors: null
		};
	} catch (e) {
		if (e instanceof ZodError) {
			const { fieldErrors: errors } = e.flatten();
			return {
				success: false,
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

export const actions: Actions = {
	default: async (event) => {
		const pathURL = event.url.pathname.split('/');
		const token = pathURL.reverse()[0];
		const processedForm = await processResetFormEvent(event);
		if (!processedForm?.success) {
			return processedForm;
		}
		const { password } = processedForm.data as resetPasswordFormType;

		try {
			const message = await perform_password_reset_change({
				new_password: password,
				token: token
			});
			return {
				success: true,
				status: 200,
				message: message
			};
		} catch (err: unknown) {
			const error = err as Error;
			console.error(error);
			return fail(error.cause as number, { error: error.message });
		}
	}
};
