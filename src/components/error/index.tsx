import { useAtom } from 'jotai';
import {
    type DialogProps,
    Dialog,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogTrigger,
    DialogBody,
    Button,
    makeStyles,
    tokens,
} from '@fluentui/react-components';
import { errorStatus } from '@/atoms/error';
import { ErrorCircle24Regular as ErrorIcon } from '@fluentui/react-icons';

const useStackClassName = makeStyles({
    body: {
        width: '50%',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        color: tokens.colorPaletteRedForeground1,
    },
    icon: {
        fontSize: tokens.fontSizeBase600,
    }
});

export default function ErrorModal() {
    const [status, setStatus] = useAtom(errorStatus);
    const classes = useStackClassName();
    const handleChange: DialogProps['onOpenChange'] = (_event, data) => {
        setStatus({
            ...status,
            modalStatus: data.open,
        });
    }

    return (
        <Dialog
        modalType="alert"
        open={status.modalStatus}
        onOpenChange={handleChange}
      >
        <DialogSurface className={classes.body}>
          <DialogBody>
            <DialogTitle className={classes.title}>
                <ErrorIcon className={classes.icon} />
                Error
            </DialogTitle>
            <DialogContent>{status.err}</DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button>Got it</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    );
};
