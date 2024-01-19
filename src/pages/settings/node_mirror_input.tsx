import { useRef, useState } from 'react';
import {
    type FieldProps,
    Field,
    Input,
    Button,
    makeStyles,
    tokens,
} from '@fluentui/react-components';
import { isHttpUrl } from '@/utils';

const useStackClassName = makeStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginRight: tokens.spacingHorizontalS,
        flexGrow: 1,
    },
    cancelBtn: {
        marginLeft: tokens.spacingHorizontalS,
    }
});

export default function NodeMirrorInput({ nodeMirror, onSave }: {
    nodeMirror: string;
    onSave: (value: string) => void;
}) {
    const classes = useStackClassName();
    const inputRef = useRef<HTMLInputElement>(null);
    const [readOnly, setReadOnly] = useState(true);
    const [validation, setValidation] = useState<{
        msg: string;
        state: FieldProps['validationState'];
    }>({
        msg: '',
        state: 'none',
    });

    const handleSaveOrChange = () => {
        if (readOnly) {
            setReadOnly(false);
            inputRef.current?.focus();
            return;
        }

        const url = inputRef.current?.value ?? '';
        if (isHttpUrl(url)) {
            setValidation({
                msg: '',
                state: 'none',
            });
            setReadOnly(true);
            onSave(url);
        } else {
            setValidation({
                msg: 'Please enter the http url.',
                state: 'error',
            });
        }
    }

    const handleCancel = () => {
        setReadOnly(true);
        if (inputRef.current) {
            inputRef.current.value = nodeMirror;
        }
    }
    
    return (
        <Field
            label="Node dist mirror"
            hint="The http url to download the node dist."
            validationMessage={validation.msg}
            validationState={validation.state}
        >
            <div className={classes.wrapper}>
                <Input
                    ref={inputRef}
                    className={classes.input}
                    readOnly={readOnly}
                    defaultValue={nodeMirror}
                />
                <Button
                    appearance={readOnly ? undefined : 'primary'}
                    onClick={handleSaveOrChange}
                >
                    {readOnly ? 'Change' : 'Save'}
                </Button>
                {
                    !readOnly &&
                    <Button
                        className={classes.cancelBtn}
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                }
            </div>
        </Field>
    );
}
