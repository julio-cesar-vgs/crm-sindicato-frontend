'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Card, CardBody, Button } from '@nextui-org/react';
import { 
  Package, 
  PackagePlus, 
  PackageMinus, 
  RotateCcw, 
  FileText, 
  Users,
  BarChart3,
  Settings
} from 'lucide-react';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/',
    icon: BarChart3
  },
  {
    label: 'Cadastro de EPI',
    href: '/entrada',
    icon: PackagePlus
  },
  {
    label: 'Empréstimo/Saída',
    href: '/saida',
    icon: PackageMinus
  },
  {
    label: 'Devolução',
    href: '/devolucao',
    icon: RotateCcw
  },
  {
    label: 'Estoque de EPIs',
    href: '/estoque',
    icon: Package
  },
  {
    label: 'Funcionários',
    href: '/funcionarios',
    icon: Users
  },
  {
    label: 'Relatórios',
    href: '/relatorios',
    icon: FileText
  },
  {
    label: 'Configurações',
    href: '/configuracoes',
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Card className="h-full min-h-screen w-64 rounded-none border-r">
      <CardBody className="p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center">Sistema EPI</h2>
          <p className="text-sm text-default-500 text-center mt-1">
            Gestão de Equipamentos de Proteção Individual
          </p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "solid" : "light"}
                color={isActive ? "primary" : "default"}
                className="w-full justify-start"
                startContent={<Icon size={18} />}
                onPress={() => router.push(item.href)}
              >
                {item.label}
              </Button>
            );
          })}
        </nav>
      </CardBody>
    </Card>
  );
}
