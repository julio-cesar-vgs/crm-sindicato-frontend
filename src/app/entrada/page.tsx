'use client';

import { MainLayout } from '@/components/MainLayout';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Input, 
  Select, 
  SelectItem, 
  Button, 
  Textarea
} from '@nextui-org/react';
import { useEPI } from '@/context/EPIContext';
import { TipoEPI, CondicaoEPI } from '@/types/epi';
import { useState } from 'react';
import { PackagePlus, Save } from 'lucide-react';


const tiposEPI: TipoEPI[] = [
  'Capacete',
  'Óculos de Proteção',
  'Protetor Auricular',
  'Máscara/Respirador',
  'Luvas',
  'Calçado de Segurança',
  'Cinto de Segurança',
  'Uniforme',
  'Colete Refletivo',
  'Outros'
];

const condicoesEPI: CondicaoEPI[] = [
  'novo',
  'bom',
  'regular',
  'ruim',
  'inutilizado'
];

export default function EntradaPage() {
  const { addEPI } = useEPI();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    tipo: '',
    descricao: '',
    certificado: '',
    dataValidade: undefined as string | undefined,
    condicao: 'novo' as CondicaoEPI,
    fornecedor: '',
    observacoes: ''
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Validar campos obrigatórios
      if (!formData.codigo || !formData.nome || !formData.tipo) {
        alert('Por favor, preencha os campos obrigatórios: Código, Nome e Tipo');
        return;
      }

      addEPI({
        codigo: formData.codigo,
        nome: formData.nome,
        tipo: formData.tipo,
        descricao: formData.descricao,
        certificado: formData.certificado,
        dataValidade: formData.dataValidade ? new Date(formData.dataValidade) : undefined,
        status: 'disponivel',
        condicao: formData.condicao,
        dataEntrada: new Date(),
        fornecedor: formData.fornecedor,
        observacoes: formData.observacoes
      });

      // Limpar formulário
      setFormData({
        codigo: '',
        nome: '',
        tipo: '',
        descricao: '',
        certificado: '',
        dataValidade: undefined,
        condicao: 'novo',
        fornecedor: '',
        observacoes: ''
      });

      alert('EPI cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar EPI:', error);
      alert('Erro ao cadastrar EPI. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <PackagePlus className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Entrada de EPI</h1>
            <p className="text-default-500 mt-1">
              Cadastro de novos Equipamentos de Proteção Individual
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Dados do EPI</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                isRequired
                label="Código do EPI"
                placeholder="Ex: EPI001"
                value={formData.codigo}
                onChange={(e) => setFormData(prev => ({ ...prev, codigo: e.target.value }))}
              />
              
              <Input
                isRequired
                label="Nome do EPI"
                placeholder="Ex: Capacete Class A"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              />

              <Select
                isRequired
                label="Tipo de EPI"
                placeholder="Selecione o tipo"
                selectedKeys={formData.tipo ? [formData.tipo] : []}
                onSelectionChange={(selection) => {
                  const value = Array.from(selection)[0] as string;
                  setFormData(prev => ({ ...prev, tipo: value }));
                }}
              >
                {tiposEPI.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Condição"
                placeholder="Selecione a condição"
                selectedKeys={[formData.condicao]}
                onSelectionChange={(selection) => {
                  const value = Array.from(selection)[0] as CondicaoEPI;
                  setFormData(prev => ({ ...prev, condicao: value }));
                }}
              >
                {condicoesEPI.map((condicao) => (
                  <SelectItem key={condicao} value={condicao}>
                    {condicao.charAt(0).toUpperCase() + condicao.slice(1)}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Certificado/CA"
                placeholder="Ex: CA 12345"
                value={formData.certificado}
                onChange={(e) => setFormData(prev => ({ ...prev, certificado: e.target.value }))}
              />

              <Input
                label="Fornecedor"
                placeholder="Ex: Empresa ABC"
                value={formData.fornecedor}
                onChange={(e) => setFormData(prev => ({ ...prev, fornecedor: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Data de Validade"
                value={formData.dataValidade || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, dataValidade: e.target.value || undefined }))}
              />
            </div>

            <Textarea
              label="Descrição"
              placeholder="Descrição detalhada do EPI..."
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
            />

            <Textarea
              label="Observações"
              placeholder="Observações adicionais..."
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="light"
                onPress={() => setFormData({
                  codigo: '',
                  nome: '',
                  tipo: '',
                  descricao: '',
                  certificado: '',
                  dataValidade: undefined,
                  condicao: 'novo',
                  fornecedor: '',
                  observacoes: ''
                })}
              >
                Limpar
              </Button>
              
              <Button
                color="primary"
                startContent={<Save size={18} />}
                onPress={handleSubmit}
                isLoading={isLoading}
              >
                Cadastrar EPI
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
}
