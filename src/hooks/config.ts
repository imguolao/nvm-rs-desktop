import { atomWithStorage } from 'jotai/utils';
import { type Theme } from '@tauri-apps/api/window';
import { homeDir, dataDir, join } from '@tauri-apps/api/path';

export type DesktopConfig = {
    // https://nodejs.org/dist/ mirror
    nodeDistMirror: string;

    // The root directory of nvm-rs desktop installations.
    baseDir: string;

    // The theme of application. 
    theme: Theme | 'system';
}

const CONFIG_KEY = 'desktop_config';
const initValue = getConfigFromLocalStorge() ?? {
    nodeDistMirror: 'https://nodejs.org/dist/',
    baseDir: '',
    theme: 'system',
};

export const configAtom = atomWithStorage<DesktopConfig>(CONFIG_KEY, initValue);

export async function getDefaultBaseDir() {
    const baseDirPref = await homeDir() ?? await dataDir();
    return await join(baseDirPref, '.nvm_rs_desktop');
}

function getConfigFromLocalStorge() {
    const configStr = window.localStorage.getItem(CONFIG_KEY);
    return configStr ? JSON.parse(configStr) as DesktopConfig : null;
}
