import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Edit({ account }: { account: Account }) {
    const { data, setData, put, processing, errors } = useForm({
        name: account.name,
        type: account.type,
        initial_balance: account.initial_balance.toString(),
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(`/cuentas/${account.id}`);
    };

    return (
        <>
            <Head title="Cuenta | Editar" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                    <div className="gap-1.5">
                        <Input
                            placeholder="Nombre de la Institución"
                            value={data.name}
                            onChange={e=> setData('name', e.target.value)}
                        >
                        </Input>
                    </div>
                    <div className="gap-1.5">
                        <Input
                            placeholder="Tipo de Cuenta"
                            value={data.type}
                            onChange={e=> setData('type', e.target.value)}
                        >
                        </Input>
                    </div>
                    <div className="gap-1.5">
                            <Input
                                placeholder="Saldo Inicial"
                            value={data.initial_balance}
                            onChange={e=> setData('initial_balance', e.target.value)}
                        >
                        </Input>
                    </div>
                    <Button type="submit" disabled={processing}>
                        Actualizar Cuenta
                    </Button>
                </form>
            </div>
            <div className="w-8/12 p-4">
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {Object.values(errors).join(', ')}</span>
                    </div>
                )}
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Cuentas',
            href: '/cuentas',
        },
        {
            title: 'Editar Cuenta',
            href: '/accounts/edit',
        },
    ],
};

interface Account {
    id: number;
    name: string;
    type: string;
    initial_balance: string | number;
}
