import {writable} from "svelte/store";

const createModalShowState = () => {
    const {subscribe, set} = writable<boolean>(false);
    return {
        subscribe,
        set,
        open: () => set(true),
        close: () => set(false),
    }
}

const createModalAllowCloseState = () => {
    const {subscribe, set} = writable<boolean>(true);
    return {
        subscribe,
        set,
    }
}

export const changePasswordModalState = createModalShowState();
export const changePasswordAllowCloseState = createModalAllowCloseState();
