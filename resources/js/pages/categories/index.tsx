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

export default function Index({ categories }: { categories: Category[] }) {
    return (
        <>
            <Head title="Categories | List" />
            <div className="m-4">
                <Link href="/categorias/create">
                    <Button>
                        Crear Categoria
                    </Button>
                </Link>
                {categories.length > 0 && (
                    <Table>
                        <TableCaption>Lista de sus categorias</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre Categoria</TableHead>
                                <TableHead>Tipo Categoria</TableHead>
                                <TableHead>Color Categoria</TableHead>
                                <TableHead>Icono Categoria</TableHead>
                                <TableHead className='text-right'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.type}</TableCell>
                                    <TableCell>{category.color}</TableCell>
                                    <TableCell>{category.icon}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/cuentas/${category.id}/edit`}>
                                            <Button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</Button>
                                        </Link>
                                        <Link href={`/cuentas/${category.id}/edit`}>
                                            <Button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</Button>
                                        </Link>
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
            title: 'Categorias',
            href: '#',
        },
    ],
};

interface Category {
    id: number;
    name: string;
    type: string;
    color: string;
    icon: string;
}
