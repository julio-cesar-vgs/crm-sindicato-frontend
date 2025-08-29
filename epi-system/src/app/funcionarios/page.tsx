'use client';

import { MainLayout } from '@/components/MainLayout';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Input, 
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination
} from '@nextui-org/react';
import { useEPI } from '@/context/EPIContext';
import { Funcionario } from '@/types/epi';
import { useState, useMemo } from 'react';
import { Users, UserPlus, Search, Edit, Trash, Eye } from 'lucide-react';

export default function FuncionariosPage() {
  const { funcionarios, addFuncionario, updateFuncionario, deleteFuncionario } = useEPI();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    setor: '',
    cargo: '',
    email: ''
  });

  const rowsPerPage = 10;

  const filteredFuncionarios = useMemo(() => {
    return funcionarios.filter(func => {
      return !searchTerm || 
        func.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        func.cpf.includes(searchTerm) ||
        func.setor.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [funcionarios, searchTerm]);

  const paginatedFuncionarios = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredFuncionarios.slice(start, end);
  }, [filteredFuncionarios, page]);

  const totalPages = Math.ceil(filteredFuncionarios.length / rowsPerPage);

  const handleSubmit = () => {
    if (!formData.nome || !formData.cpf || !formData.setor || !formData.cargo) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    if (editingFuncionario) {
      updateFuncionario(editingFuncionario.id, formData);
    } else {
      addFuncionario(formData);
    }

    // Limpar formulário
    setFormData({
      nome: '',
      cpf: '',
      setor: '',
      cargo: '',
      email: ''
    });
    setEditingFuncionario(null);
    onClose();
  };

  const openEditModal = (funcionario: Funcionario) => {
    setEditingFuncionario(funcionario);
    setFormData({
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      setor: funcionario.setor,
      cargo: funcionario.cargo,
      email: funcionario.email || ''
    });
    onOpen();
  };

  const openNewModal = () => {
    setEditingFuncionario(null);
    setFormData({
      nome: '',
      cpf: '',
      setor: '',
      cargo: '',
      email: ''
    });
    onOpen();
  };

  const handleDelete = () => {
    if (selectedFuncionario) {
      deleteFuncionario(selectedFuncionario.id);
      setSelectedFuncionario(null);
      onDeleteClose();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Funcionários</h1>
              <p className="text-default-500 mt-1">
                Gerenciamento de funcionários cadastrados
              </p>
            </div>
          </div>

          <Button
            color="primary"
            startContent={<UserPlus size={18} />}
            onPress={openNewModal}
          >
            Novo Funcionário
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardBody>
            <div className="flex space-x-4">
              <Input
                className="flex-1"
                label="Buscar"
                placeholder="Nome, CPF ou setor"
                startContent={<Search size={18} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                onPress={() => {
                  setSearchTerm('');
                  setPage(1);
                }}
              >
                Limpar
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Tabela de funcionários */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              Funcionários Cadastrados ({filteredFuncionarios.length})
            </h3>
          </CardHeader>
          <CardBody>
            <Table aria-label="Tabela de funcionários">
              <TableHeader>
                <TableColumn>NOME</TableColumn>
                <TableColumn>CPF</TableColumn>
                <TableColumn>SETOR</TableColumn>
                <TableColumn>CARGO</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>AÇÕES</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedFuncionarios.map((funcionario) => (
                  <TableRow key={funcionario.id}>
                    <TableCell className="font-medium">{funcionario.nome}</TableCell>
                    <TableCell className="font-mono">{funcionario.cpf}</TableCell>
                    <TableCell>{funcionario.setor}</TableCell>
                    <TableCell>{funcionario.cargo}</TableCell>
                    <TableCell>{funcionario.email || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="light"
                          startContent={<Eye size={16} />}
                          onPress={() => {
                            setSelectedFuncionario(funcionario);
                            onViewOpen();
                          }}
                        >
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          startContent={<Edit size={16} />}
                          onPress={() => openEditModal(funcionario)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          startContent={<Trash size={16} />}
                          onPress={() => {
                            setSelectedFuncionario(funcionario);
                            onDeleteOpen();
                          }}
                        >
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={setPage}
                  showControls
                />
              </div>
            )}
          </CardBody>
        </Card>

        {/* Modal de criar/editar funcionário */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {editingFuncionario ? 'Editar Funcionário' : 'Novo Funcionário'}
                </ModalHeader>
                <ModalBody className="space-y-4">
                  <Input
                    isRequired
                    label="Nome Completo"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  />
                  <Input
                    isRequired
                    label="CPF"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
                  />
                  <Input
                    isRequired
                    label="Setor"
                    placeholder="Ex: Produção, Manutenção"
                    value={formData.setor}
                    onChange={(e) => setFormData(prev => ({ ...prev, setor: e.target.value }))}
                  />
                  <Input
                    isRequired
                    label="Cargo"
                    placeholder="Ex: Operador, Supervisor"
                    value={formData.cargo}
                    onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                  />
                  <Input
                    label="E-mail"
                    type="email"
                    placeholder="funcionario@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={handleSubmit}>
                    {editingFuncionario ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Modal de visualização */}
        <Modal isOpen={isViewOpen} onClose={onViewClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  Detalhes do Funcionário
                </ModalHeader>
                <ModalBody>
                  {selectedFuncionario && (
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-default-500">Nome:</span><br />
                        <span className="font-medium">{selectedFuncionario.nome}</span>
                      </div>
                      <div>
                        <span className="text-default-500">CPF:</span><br />
                        <span className="font-medium">{selectedFuncionario.cpf}</span>
                      </div>
                      <div>
                        <span className="text-default-500">Setor:</span><br />
                        <span className="font-medium">{selectedFuncionario.setor}</span>
                      </div>
                      <div>
                        <span className="text-default-500">Cargo:</span><br />
                        <span className="font-medium">{selectedFuncionario.cargo}</span>
                      </div>
                      {selectedFuncionario.email && (
                        <div>
                          <span className="text-default-500">E-mail:</span><br />
                          <span className="font-medium">{selectedFuncionario.email}</span>
                        </div>
                      )}
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>Fechar</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Modal de exclusão */}
        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <h3 className="text-danger">Confirmar Exclusão</h3>
                </ModalHeader>
                <ModalBody>
                  <p>Tem certeza que deseja excluir o funcionário <strong>{selectedFuncionario?.nome}</strong>?</p>
                  <p className="text-danger text-sm">Esta ação não pode ser desfeita.</p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="danger" onPress={handleDelete}>
                    Excluir
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </MainLayout>
  );
}
