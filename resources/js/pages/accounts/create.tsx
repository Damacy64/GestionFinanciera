import { Head, useForm } from '@inertiajs/react';
import { store } from '@/routes/cuentas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: '',
        initial_balance: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store());
    }

    return (
        <>
            <Head title="Cuenta | Crear" />
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
                    <Button type="submit">Crear Cuenta</Button>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Crear Cuenta',
            href: '/accounts/create',
        },
    ],
};
