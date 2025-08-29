'use client';

import { MainLayout } from '@/components/MainLayout';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { useEPI } from '@/context/EPIContext';
import { Package, PackageCheck, PackageX, AlertTriangle } from 'lucide-react';

export default function Home() {
  const { epis, getEPIsDisponiveis, getEPIsEmprestados, getEPIsVencidos } = useEPI();
  
  const episDisponiveis = getEPIsDisponiveis();
  const episEmprestados = getEPIsEmprestados();
  const episVencidos = getEPIsVencidos();
  
  const stats = [
    {
      title: 'Total de EPIs',
      value: epis.length,
      icon: Package,
      color: 'primary' as const
    },
    {
      title: 'Disponíveis',
      value: episDisponiveis.length,
      icon: PackageCheck,
      color: 'success' as const
    },
    {
      title: 'Emprestados',
      value: episEmprestados.length,
      icon: PackageX,
      color: 'warning' as const
    },
    {
      title: 'Vencidos',
      value: episVencidos.length,
      icon: AlertTriangle,
      color: 'danger' as const
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard - Sistema de EPIs</h1>
          <p className="text-default-500 mt-1">
            Visão geral do controle de Equipamentos de Proteção Individual
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardBody className="flex flex-row items-center space-x-4 p-4">
                  <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                    <Icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">{stat.title}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">EPIs Emprestados Recentemente</h3>
            </CardHeader>
            <CardBody>
              {episEmprestados.length > 0 ? (
                <div className="space-y-2">
                  {episEmprestados.slice(0, 5).map((epi) => (
                    <div key={epi.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{epi.nome}</p>
                        <p className="text-sm text-default-500">{epi.codigo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-default-500">{epi.tipo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-default-500 text-center py-4">
                  Nenhum EPI emprestado no momento
                </p>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">EPIs com Validade Próxima</h3>
            </CardHeader>
            <CardBody>
              {episVencidos.length > 0 ? (
                <div className="space-y-2">
                  {episVencidos.slice(0, 5).map((epi) => (
                    <div key={epi.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{epi.nome}</p>
                        <p className="text-sm text-default-500">{epi.codigo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-danger">
                          {epi.dataValidade ? new Date(epi.dataValidade).toLocaleDateString('pt-BR') : 'N/A'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-default-500 text-center py-4">
                  Nenhum EPI vencido
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

