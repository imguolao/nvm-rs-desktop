import { open } from '@tauri-apps/api/dialog';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
    type SelectProps,
    Field,
    Input,
    Button,
    Select,
    makeStyles,
    tokens,
} from '@fluentui/react-components';
import {
    type DesktopConfig,
    configAtom,
} from '@/atoms/config';
import { isString } from '@/utils';
import NodeMirrorInput from './node_mirror_input';

const themes: DesktopConfig['theme'][] = ['light', 'dark', 'system']; 

const useStackClassName = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: tokens.spacingVerticalL,
    },
    storageWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    storageInput: {
        marginRight: tokens.spacingHorizontalS,
        flexGrow: 1,
    }
});

export default function Settings() {
    const [config, setConfig] = useAtom(configAtom);
    const classes = useStackClassName();

    const handleDirChange = async () => {
        const baseDir = await open({ directory: true });
        if (isString(baseDir)) {
            setConfig({
                ...config,
                baseDir,
            });
        }
    }

    const handleThemeChange: SelectProps['onChange']  = (_event, data) => {
        setConfig({
            ...config,
            theme: data.value as DesktopConfig['theme'],
        });
    }

    return (
        <>
            <Link to={'/'}>go back to the home page</Link>
            <div className={classes.root}>
                <NodeMirrorInput
                    nodeMirror={config.nodeDistMirror}
                    onSave={nodeDistMirror => setConfig({ ...config, nodeDistMirror })}
                />
                <Field
                    label="File storage location"
                    hint="Storing downloaded node files."
                >
                    <div className={classes.storageWrapper}>
                        <Input 
                            readOnly
                            className={classes.storageInput}
                            value={config.baseDir}
                        />
                        <Button onClick={handleDirChange}>Change</Button>
                    </div>
                </Field>
                <Field label="Theme">
                    <Select
                        value={config.theme}
                        onChange={handleThemeChange}
                    >
                        { themes.map(t => <option key={t}>{ t }</option>) }
                    </Select>
                </Field>
            </div>
        </>
    );
}
