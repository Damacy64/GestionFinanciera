import { Head, Link } from '@inertiajs/react';
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
import { dashboard } from '@/routes';

export default function Show({ account }: { account: Account }) {
    return (
        <>
            <Head title="Cuenta" />
            <div className="m-4">
                {/* {accounts.length > 0 && (
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
                                        <Link href={`/cuentas/${account.id}/edit`}>
                                            <Button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</Button>
                                        </Link>
                                        <Link href={`/cuentas/${account.id}/edit`}>
                                            <Button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )} */}
                <h1>Cuenta: {account.name} Tipo: {account.type}</h1>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Cuenta',
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
