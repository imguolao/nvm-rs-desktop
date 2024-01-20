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
    const [currValue, setCurrValue] = useState(nodeMirror);
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

        if (isHttpUrl(currValue)) {
            setValidation({
                msg: '',
                state: 'none',
            });
            setReadOnly(true);
            onSave(currValue);
        } else {
            setValidation({
                msg: 'Please enter the http url.',
                state: 'error',
            });
        }
    }

    const handleCancel = () => {
        setReadOnly(true);
        setCurrValue(nodeMirror);
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
                    value={currValue}
                    onChange={(_ev, { value }) => setCurrValue(value)}
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
