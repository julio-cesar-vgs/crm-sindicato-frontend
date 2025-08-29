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
  Textarea,
  Switch,
  Chip
} from '@nextui-org/react';
import { useEPI } from '@/context/EPIContext';
import { useState } from 'react';
import { PackageMinus, Save } from 'lucide-react';


export default function SaidaPage() {
  const { 
    addTransacao, 
    addFuncionario, 
    getEPIsDisponiveis, 
    funcionarios,
    getEPIById 
  } = useEPI();
  
  const [isLoading, setIsLoading] = useState(false);
  const episDisponiveis = getEPIsDisponiveis();
  
  const [formData, setFormData] = useState({
    epiId: '',
    funcionarioId: '',
    responsavel: '',
    setor: '',
    isPermanente: false,
    prazoDevolucao: undefined as string | undefined,
    observacoes: '',
    // Dados do funcionário (caso seja novo)
    novoFuncionario: {
      nome: '',
      cpf: '',
      setor: '',
      cargo: '',
      email: ''
    },
    isNovoFuncionario: false
  });

  const epiSelecionado = formData.epiId ? getEPIById(formData.epiId) : null;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Validar campos obrigatórios
      if (!formData.epiId || !formData.responsavel || !formData.setor) {
        alert('Por favor, preencha os campos obrigatórios');
        return;
      }

      if (!formData.isPermanente && !formData.prazoDevolucao) {
        alert('Para empréstimos temporários, é necessário definir o prazo de devolução');
        return;
      }

      let funcionarioId = formData.funcionarioId;

      // Criar novo funcionário se necessário
      if (formData.isNovoFuncionario && formData.novoFuncionario.nome) {
        addFuncionario(formData.novoFuncionario);
        // Simular ID (na aplicação real seria retornado da função)
        funcionarioId = crypto.randomUUID();
      }

      addTransacao({
        epiId: formData.epiId,
        funcionarioId: funcionarioId || 'temp',
        tipo: 'saida',
        dataTransacao: new Date(),
        responsavel: formData.responsavel,
        setor: formData.setor,
        prazoDevolucao: formData.isPermanente ? undefined : 
          formData.prazoDevolucao ? new Date(formData.prazoDevolucao) : undefined,
        isPermanente: formData.isPermanente,
        observacoes: formData.observacoes,
        condicaoSaida: epiSelecionado?.condicao || 'bom'
      });

      // Limpar formulário
      setFormData({
        epiId: '',
        funcionarioId: '',
        responsavel: '',
        setor: '',
        isPermanente: false,
        prazoDevolucao: undefined,
        observacoes: '',
        novoFuncionario: {
          nome: '',
          cpf: '',
          setor: '',
          cargo: '',
          email: ''
        },
        isNovoFuncionario: false
      });

      alert('Saída de EPI registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
      alert('Erro ao registrar saída. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <PackageMinus className="w-8 h-8 text-warning" />
          <div>
            <h1 className="text-3xl font-bold">Saída/Empréstimo de EPI</h1>
            <p className="text-default-500 mt-1">
              Registro de entrega de EPIs para funcionários
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Dados da Saída</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <Select
                  isRequired
                  label="EPI Disponível"
                  placeholder="Selecione um EPI disponível"
                  selectedKeys={formData.epiId ? [formData.epiId] : []}
                  onSelectionChange={(selection) => {
                    const value = Array.from(selection)[0] as string;
                    setFormData(prev => ({ ...prev, epiId: value }));
                  }}
                >
                  {episDisponiveis.map((epi) => (
                    <SelectItem key={epi.id} value={epi.id}>
                      {epi.codigo} - {epi.nome} ({epi.tipo})
                    </SelectItem>
                  ))}
                </Select>

                {epiSelecionado && (
                  <Card className="bg-default-50">
                    <CardBody className="p-4">
                      <h4 className="font-semibold mb-2">Detalhes do EPI Selecionado</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-default-500">Código:</span> {epiSelecionado.codigo}
                        </div>
                        <div>
                          <span className="text-default-500">Tipo:</span> {epiSelecionado.tipo}
                        </div>
                        <div>
                          <span className="text-default-500">Condição:</span>
                          <Chip size="sm" className="ml-1" color={
                            epiSelecionado.condicao === 'novo' ? 'success' :
                            epiSelecionado.condicao === 'bom' ? 'primary' :
                            epiSelecionado.condicao === 'regular' ? 'warning' : 'danger'
                          }>
                            {epiSelecionado.condicao}
                          </Chip>
                        </div>
                        <div>
                          <span className="text-default-500">Validade:</span> {' '}
                          {epiSelecionado.dataValidade 
                            ? new Date(epiSelecionado.dataValidade).toLocaleDateString('pt-BR')
                            : 'N/A'
                          }
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    isRequired
                    label="Responsável pela Entrega"
                    placeholder="Nome do responsável"
                    value={formData.responsavel}
                    onChange={(e) => setFormData(prev => ({ ...prev, responsavel: e.target.value }))}
                  />
                  
                  <Input
                    isRequired
                    label="Setor"
                    placeholder="Ex: Produção, Manutenção, etc."
                    value={formData.setor}
                    onChange={(e) => setFormData(prev => ({ ...prev, setor: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <Switch
                    isSelected={formData.isPermanente}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, isPermanente: value }))}
                  >
                    Entrega Permanente
                  </Switch>

                  {!formData.isPermanente && (
                    <Input
                      type="date"
                      isRequired
                      label="Prazo de Devolução"
                      value={formData.prazoDevolucao || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, prazoDevolucao: e.target.value || undefined }))}
                    />
                  )}
                </div>

                <Textarea
                  label="Observações"
                  placeholder="Observações sobre a saída..."
                  value={formData.observacoes}
                  onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                />
              </CardBody>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Funcionário</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Switch
                  isSelected={formData.isNovoFuncionario}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, isNovoFuncionario: value }))}
                >
                  Cadastrar novo funcionário
                </Switch>

                {formData.isNovoFuncionario ? (
                  <div className="space-y-3">
                    <Input
                      isRequired
                      size="sm"
                      label="Nome"
                      value={formData.novoFuncionario.nome}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        novoFuncionario: { ...prev.novoFuncionario, nome: e.target.value }
                      }))}
                    />
                    <Input
                      isRequired
                      size="sm"
                      label="CPF"
                      value={formData.novoFuncionario.cpf}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        novoFuncionario: { ...prev.novoFuncionario, cpf: e.target.value }
                      }))}
                    />
                    <Input
                      isRequired
                      size="sm"
                      label="Setor"
                      value={formData.novoFuncionario.setor}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        novoFuncionario: { ...prev.novoFuncionario, setor: e.target.value }
                      }))}
                    />
                    <Input
                      isRequired
                      size="sm"
                      label="Cargo"
                      value={formData.novoFuncionario.cargo}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        novoFuncionario: { ...prev.novoFuncionario, cargo: e.target.value }
                      }))}
                    />
                    <Input
                      size="sm"
                      label="E-mail"
                      type="email"
                      value={formData.novoFuncionario.email}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        novoFuncionario: { ...prev.novoFuncionario, email: e.target.value }
                      }))}
                    />
                  </div>
                ) : (
                  <Select
                    label="Funcionário Existente"
                    placeholder="Selecione um funcionário"
                    selectedKeys={formData.funcionarioId ? [formData.funcionarioId] : []}
                    onSelectionChange={(selection) => {
                      const value = Array.from(selection)[0] as string;
                      setFormData(prev => ({ ...prev, funcionarioId: value }));
                    }}
                  >
                    {funcionarios.map((func) => (
                      <SelectItem key={func.id} value={func.id}>
                        {func.nome} - {func.setor}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            color="primary"
            size="lg"
            startContent={<Save size={20} />}
            onPress={handleSubmit}
            isLoading={isLoading}
            isDisabled={!formData.epiId || !formData.responsavel || !formData.setor}
          >
            Registrar Saída
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
