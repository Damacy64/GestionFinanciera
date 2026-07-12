import { Link } from '@inertiajs/react';
import { BookOpen, ChevronDown, CreditCard, FolderGit2, LayoutGrid, ListFilter, PlusCircle, Settings2 } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavMainSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const mainNavItems: NavItem[] = [
    {
        title: 'Resumen',
        href: dashboard()
    },
    {
        title: 'Categorias',
        href: '#'
    },
    {
        title: 'Transacciones',
        href: '#'
    }
];

const secondaryNavItems: NavItem[] = [
    {
        title: 'BBVA',
        href: '#',
    }, {
        title: 'Nu',
        href: '#'
    }, {
        title: 'Mercado Pago',
        href: '#'
    }
]

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <DropdownMenuSeparator className="my-2 border-t border-sidebar-border/70 dark:border-sidebar-border" />
                <SidebarMenu>
                    {secondaryNavItems.map((account) => (
                        <SidebarMenuItem key={account.title} className="mb-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="w-full justify-between h-10 data-[state=open]:bg-sidebar-accent">
                                        <div className="flex items-center gap-2.5">
                                            <span className="font-medium text-sm">{account.title}</span>
                                        </div>
                                        <ChevronDown className="w-3.5 h-3.5 text-sidebar-foreground/40 shrink-0" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>

                                {/* Opciones desplegables para UNA cuenta en específico */}
                                <DropdownMenuContent className="w-52 bg-neutral-900 border-neutral-800 text-gray-300" align="start" side="right">
                                    <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500">
                                        Gestionar {account.title}
                                    </div>
                                    <DropdownMenuSeparator className="bg-neutral-800" />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-neutral-800 text-white">
                                            <CreditCard className="w-4 h-4" />
                                            <span>Cuenta Debito</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-neutral-800 text-white">
                                            <CreditCard className="w-4 h-4" />
                                            <span>Cuenta Credito</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
