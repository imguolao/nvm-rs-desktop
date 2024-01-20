import { atom } from 'jotai';
import { store } from './store';

export const errorStatus = atom<{
    err: string;
    modalStatus: boolean;
}>({
    err: '',
    modalStatus: false,
});

export function error(err: string) {
    store.set(errorStatus, {
        err,
        modalStatus: true,
    });
}
