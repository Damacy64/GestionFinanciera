import { Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

export default function Index({ accounts }: { accounts: Account[] }) {
    return (
        <>
            <Head title="Accounts | List" />
            <div className="m-4">
                <Link href="/cuentas/create">
                    <Button>
                        Crear Cuenta
                    </Button>
                </Link>
                {accounts.length > 0 && (
                    <Table>
                        <TableCaption>Lista de sus cuentas</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Institución</TableHead>
                                <TableHead>Cuenta</TableHead>
                                <TableHead>Saldo</TableHead>
                                <TableHead className='text-right'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.map((account) => (
                                <TableRow key={account.id}>
                                    <TableCell className="font-medium">{account.id}</TableCell>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.type}</TableCell>
                                    <TableCell>{account.initial_balance}</TableCell>
                                    <TableCell className="text-right">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Cuentas',
            href: '#',
        },
    ],
};

interface Account {
    id: number;
    name: string;
    type: string;
    initial_balance: number;
}
