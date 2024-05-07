import { perform_refresh } from '@/services/authService';
import type { RequestEvent } from '@sveltejs/kit';
import type { UserTypes } from '@/types/users';

export const generate_locals_user = async (
	event: RequestEvent
): Promise<UserTypes.AuthorizedUser | null> => {
	try {
		const api_response = await perform_refresh(event);
		const { accessToken, user } = api_response;
		const authorizedUser: UserTypes.AuthorizedUser = {
			...user,
			accessToken: accessToken
		};
		return authorizedUser;
	} catch (error: unknown) {
		const err = error as Error;
		throw new Error(err.message);
	}
};
