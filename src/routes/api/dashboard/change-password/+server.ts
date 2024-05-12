import type { RequestHandler, RequestEvent } from './$types';
import { KOOLKEYZ_API_SERVICE } from '$env/static/private';
import { perform_refresh } from '@/services/authService';

export const POST: RequestHandler = async (event: RequestEvent) => {
    const requestBody = await event.request.formData();
    const response = await  perform_refresh(event);
    const accessToken = response.accessToken;
    return fetch(`${KOOLKEYZ_API_SERVICE}/dashboard/change-password`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
};