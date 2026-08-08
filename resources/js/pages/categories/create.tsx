import { Head, useForm } from '@inertiajs/react';
import { store } from '@/routes/categorias';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: '',
        color: '',
        icon: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store());
    }

    return (
        <>
            <Head title="Categoria | Crear" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                    <div className="gap-1.5">
                        <Input
                            placeholder="Nombre de la Categoria"
                            value={data.name}
                            onChange={e=> setData('name', e.target.value)}
                        >
                        </Input>
                    </div>
                    <div className="gap-1.5">
                        <Input
                            placeholder="Tipo de Categoria"
                            value={data.type}
                            onChange={e=> setData('type', e.target.value)}
                        >
                        </Input>
                    </div>
                    <div className="gap-1.5">
                            <Input
                                placeholder="Color de la Categoria"
                            value={data.color}
                            onChange={e=> setData('color', e.target.value)}
                        >
                        </Input>
                    </div>
                    <div className="gap-1.5">
                        <Input
                            placeholder="Icono de la Categoria"
                            value={data.icon}
                            onChange={e=> setData('icon', e.target.value)}
                        >
                        </Input>
                    </div>
                    <Button type="submit">Crear Categoria</Button>
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

Create.layout = {
    breadcrumbs: [
        {
            title: 'Categorias',
            href: '/categories',
        },
        {
            title: 'Crear Categoria',
            href: '/categories/create',
        },
    ],
};
