import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
} from '@fluentui/react-components';
import { http } from '@/http';
import { versionURLAtom } from '@/atoms/config';
import { type VersionItem, VersionDataGrid } from './data_grid';

// import { error } from '@/atoms/error';
// error(err?.message ?? 'Sorry, an unexpected error has occurred.');

export type VersionData = {
    version: string;
    date: string;
    npm: string;
}

async function getVersionList (url: string): Promise<Record<string, VersionItem[]>> {
    const data = await http<VersionData[]>(url, {
        method: 'get',
        headers: {
            'User-Agent': 'nvm_rs_desktop'
        },
    });

    if (!data) {
        return {};
    }

    const result: Record<string, VersionItem[]> = {};
    data.forEach(({ version, npm, date }) => {
        const versionKey = version.split('.')[0].slice(1);
        if (Number(versionKey) <= 0) {
            return;
        }

        result[versionKey] ??= [];
        result[versionKey].push({
            nodeVersion: version,
            npmVersion: npm,
            releaseDate: date,

            // TODO:
            status: 'Not Installed',
        });
    });

    return result;
}

export const VersionCollapse = () => {
    const [url] = useAtom(versionURLAtom);
    const [versionList, setVersionList] = useState<Record<string, VersionItem[]>>({});

    useEffect(() => {
        const updateVersonList = async () => {
            const result = await getVersionList(url);
            result && setVersionList(result);
        }

        updateVersonList();
    }, []);

    return (
        <Accordion collapsible>
            {Object.keys(versionList).sort((a, b) => Number(b) - Number(a)).map(key => (
                <AccordionItem value={key} key={key}>
                    <AccordionHeader>v{key}</AccordionHeader>
                    <AccordionPanel>
                        <VersionDataGrid items={versionList[key]} />
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
