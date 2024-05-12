// import { koolkeyzAPIFetch } from "$hooks/apiRequests.hooks";
import {
    dashboardPageHook,
    githubSignInPathHook,
    loginPageHook,
    resetPasswordPageHook,
    rootPageHook
} from "@/hooks/authentication.hooks";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";


export const handle: Handle = sequence(
    rootPageHook,
    loginPageHook,
    githubSignInPathHook,
    dashboardPageHook,
    resetPasswordPageHook
);