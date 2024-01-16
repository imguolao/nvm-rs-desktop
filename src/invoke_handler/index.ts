import { invoke } from '@tauri-apps/api/tauri';

export type Message<T> = {
    data: T;
    success: boolean;
    message?: string;
}

// src-tauri\src\config.rs(10)
export type DesktopConfig = {
    // https://nodejs.org/dist/ mirror
    node_dist_mirror: string;

    // The root directory of nvm-rs desktop installations.
    base_dir: string;
}

export enum INVOKE_HANDLER {
    // src-tauri\src\invoke_handler.rs(12)
    desktopConfig = 'get_desktop_config',
}

export type DataType = {
    [INVOKE_HANDLER.desktopConfig]: DesktopConfig;
}

export async function callInvokeHandler<T extends DataType[keyof DataType]>(
    handlerName: INVOKE_HANDLER,
): Promise<T | null> {
    try {
        const { success, data, message } = await invoke<Message<T>>(handlerName);
        if (!success) {
            // TODO: need i18n
            throw new Error(message ?? 'Sorry, an unexpected error has occurred.');
        }

        return data;
    } catch (err) {
        // TODO: need to pop-up a window to show errors.
        return null;
    }
}
