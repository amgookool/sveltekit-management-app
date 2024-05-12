import type { LayoutServerLoad } from './$types';
// import { ZodError, z } from 'zod';






export const load = (async (event) => {
    const user = event.locals.user;
    return {
        user,

    };
}) satisfies LayoutServerLoad;
