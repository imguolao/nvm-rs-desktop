import {
    type TableColumnDefinition,
    createTableColumn,
    TableCellLayout,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridRow,
    DataGridBody,
    DataGridCell,
} from '@fluentui/react-components';

type NodeVersionCell = string

type NPMVersionCell = string;

type ReleaseDateCell = string;

type statusCell = 'Not Installed' | 'Installed' | 'Current';

export type VersionItem = {
    nodeVersion: NodeVersionCell;
    npmVersion: NPMVersionCell;
    releaseDate: ReleaseDateCell;
    status: statusCell;
};

export type VersionDataGridProps = {
    items: VersionItem[];
}

const columns: TableColumnDefinition<VersionItem>[] = [
    createTableColumn<VersionItem>({
        columnId: 'nodeVersion',
        compare: (a, b) => {
            return a.nodeVersion.localeCompare(b.nodeVersion);
        },
        renderHeaderCell: () => {
            return 'Version';
        },
        renderCell: ({ nodeVersion }) => {
            return (
                <TableCellLayout>
                    {nodeVersion}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<VersionItem>({
        columnId: 'npmVersion',
        compare: (a, b) => {
            return a.npmVersion.localeCompare(b.npmVersion);
        },
        renderHeaderCell: () => {
            return 'NPM Version';
        },
        renderCell: ({ npmVersion }) => {
            return (
                <TableCellLayout>
                    {npmVersion}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<VersionItem>({
        columnId: 'releaseDate',
        compare: (a, b) => {
            return a.releaseDate.localeCompare(b.releaseDate);
        },
        renderHeaderCell: () => {
            return 'Release Date';
        },
        renderCell: ({ releaseDate }) => {
            return (
                <TableCellLayout>
                    {releaseDate}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<VersionItem>({
        columnId: 'status',
        renderHeaderCell: () => {
            return 'Status';
        },
        renderCell: ({ status }) => {
            return (
                <TableCellLayout>
                    {status}
                </TableCellLayout>
            );
        },
    }),
];

export const VersionDataGrid = ({ items }: VersionDataGridProps) => {
    return (
        <DataGrid
            items={items}
            columns={columns}
            sortable
            selectionMode="multiselect"
            getRowId={(item: VersionItem) => item.nodeVersion}
            focusMode="composite"
        >
        <DataGridHeader>
                <DataGridRow
                    selectionCell={{
                        checkboxIndicator: { "aria-label": "Select all rows" },
                    }}
                >
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<VersionItem>>
                {({ item, rowId }) => (
                    <DataGridRow<VersionItem>
                        key={rowId}
                        selectionCell={{
                            checkboxIndicator: { "aria-label": "Select row" },
                        }}
                    >
                        {({ renderCell }) => (
                            <DataGridCell>{renderCell(item)}</DataGridCell>
                        )}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
    );
}
