import { invoke } from '@tauri-apps/api/tauri';

export type Message<T> = {
    data: T;
    success: boolean;
    message?: string;
}

export type NodeVersion = {
    version: string;
}

export enum INVOKE_HANDLER {
    nodeVersion = 'get_node_version',
}

export type DataType = {
    [INVOKE_HANDLER.nodeVersion]: NodeVersion;
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

export async function getNodeVersion() {
    return await callInvokeHandler<NodeVersion>(INVOKE_HANDLER.nodeVersion);
}
