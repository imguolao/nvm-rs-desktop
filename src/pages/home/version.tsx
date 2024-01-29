import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
} from '@fluentui/react-components';
import { http } from '@/http';
import { versionURLAtom } from '@/atoms/config';

async function getVersionList(url: string) {
    const list = await http(url, {
        method: 'get',
        headers: {
            'User-Agent': 'nvm_rs_desktop'
        },
    });

    // TODO: format

    return list;
}

export const VersionCollapse = () => {
    const [url] = useAtom(versionURLAtom);

    useEffect(() => {
        const result = getVersionList(url);
        // TODO: log
        console.log(result);
    }, []);
    
    return (
        <Accordion collapsible>
            <AccordionItem value="1">
                <AccordionHeader>Accordion Header 1</AccordionHeader>
                <AccordionPanel>
                    <div>Accordion Panel 1</div>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="2">
                <AccordionHeader>Accordion Header 2</AccordionHeader>
                <AccordionPanel>
                    <div>Accordion Panel 2</div>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="3">
                <AccordionHeader>Accordion Header 3</AccordionHeader>
                <AccordionPanel>
                    <div>Accordion Panel 3</div>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
