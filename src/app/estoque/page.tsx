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
  Chip,
  Pagination,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/react';
import { useEPI } from '@/context/EPIContext';
import { EPI, TipoEPI } from '@/types/epi';
import { useState, useMemo } from 'react';
import { Package, Search, Filter, Eye, Trash } from 'lucide-react';



export default function EstoquePage() {
  const { epis, deleteEPI } = useEPI();
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedEPI, setSelectedEPI] = useState<EPI | null>(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const rowsPerPage = 10;

  const filteredEPIs = useMemo(() => {
    return epis.filter(epi => {
      const matchesSearch = !searchTerm || 
        epi.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        epi.codigo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTipo = !tipoFilter || epi.tipo === tipoFilter;
      const matchesStatus = !statusFilter || epi.status === statusFilter;
      
      return matchesSearch && matchesTipo && matchesStatus;
    });
  }, [epis, searchTerm, tipoFilter, statusFilter]);

  const paginatedEPIs = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredEPIs.slice(start, end);
  }, [filteredEPIs, page]);

  const totalPages = Math.ceil(filteredEPIs.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'success';
      case 'emprestado': return 'warning';
      case 'manutencao': return 'secondary';
      case 'baixado': return 'danger';
      default: return 'default';
    }
  };

  const getCondicaoColor = (condicao: string) => {
    switch (condicao) {
      case 'novo': return 'success';
      case 'bom': return 'primary';
      case 'regular': return 'warning';
      case 'ruim': return 'danger';
      case 'inutilizado': return 'danger';
      default: return 'default';
    }
  };

  const handleDelete = () => {
    if (selectedEPI) {
      deleteEPI(selectedEPI.id);
      setSelectedEPI(null);
      onDeleteClose();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Package className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Estoque de EPIs</h1>
            <p className="text-default-500 mt-1">
              Controle e visualização do inventário de EPIs
            </p>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                label="Buscar"
                placeholder="Código ou nome do EPI"
                startContent={<Search size={18} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <Input
                label="Filtrar por Tipo"
                placeholder="Digite um tipo"
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
              />

              <Input
                label="Filtrar por Status"
                placeholder="Digite um status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />

              <Button
                startContent={<Filter size={18} />}
                onPress={() => {
                  setSearchTerm('');
                  setTipoFilter('');
                  setStatusFilter('');
                  setPage(1);
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Tabela de EPIs */}
        <Card>
          <CardHeader className="flex justify-between">
            <h3 className="text-lg font-semibold">
              EPIs Cadastrados ({filteredEPIs.length})
            </h3>
          </CardHeader>
          <CardBody>
            <Table aria-label="Tabela de EPIs">
              <TableHeader>
                <TableColumn>CÓDIGO</TableColumn>
                <TableColumn>NOME</TableColumn>
                <TableColumn>TIPO</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>CONDIÇÃO</TableColumn>
                <TableColumn>VALIDADE</TableColumn>
                <TableColumn>AÇÕES</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedEPIs.map((epi) => (
                  <TableRow key={epi.id}>
                    <TableCell className="font-mono font-medium">{epi.codigo}</TableCell>
                    <TableCell>{epi.nome}</TableCell>
                    <TableCell>{epi.tipo}</TableCell>
                    <TableCell>
                      <Chip 
                        color={getStatusColor(epi.status)}
                        size="sm"
                      >
                        {epi.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        color={getCondicaoColor(epi.condicao)}
                        size="sm"
                      >
                        {epi.condicao}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      {epi.dataValidade 
                        ? new Date(epi.dataValidade).toLocaleDateString('pt-BR')
                        : 'N/A'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="light"
                          startContent={<Eye size={16} />}
                          onPress={() => {
                            setSelectedEPI(epi);
                            onOpen();
                          }}
                        >
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          startContent={<Trash size={16} />}
                          onPress={() => {
                            setSelectedEPI(epi);
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

        {/* Modal de detalhes */}
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <h3>Detalhes do EPI - {selectedEPI?.codigo}</h3>
                </ModalHeader>
                <ModalBody>
                  {selectedEPI && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-default-500">Nome:</span><br />
                          <span className="font-medium">{selectedEPI.nome}</span>
                        </div>
                        <div>
                          <span className="text-default-500">Tipo:</span><br />
                          <span className="font-medium">{selectedEPI.tipo}</span>
                        </div>
                        <div>
                          <span className="text-default-500">Status:</span><br />
                          <Chip color={getStatusColor(selectedEPI.status)} size="sm">
                            {selectedEPI.status}
                          </Chip>
                        </div>
                        <div>
                          <span className="text-default-500">Condição:</span><br />
                          <Chip color={getCondicaoColor(selectedEPI.condicao)} size="sm">
                            {selectedEPI.condicao}
                          </Chip>
                        </div>
                        <div>
                          <span className="text-default-500">Data de Entrada:</span><br />
                          <span className="font-medium">
                            {new Date(selectedEPI.dataEntrada).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div>
                          <span className="text-default-500">Validade:</span><br />
                          <span className="font-medium">
                            {selectedEPI.dataValidade 
                              ? new Date(selectedEPI.dataValidade).toLocaleDateString('pt-BR')
                              : 'N/A'
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-default-500">Certificado:</span><br />
                          <span className="font-medium">{selectedEPI.certificado || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-default-500">Fornecedor:</span><br />
                          <span className="font-medium">{selectedEPI.fornecedor || 'N/A'}</span>
                        </div>
                      </div>
                      
                      {selectedEPI.descricao && (
                        <div>
                          <span className="text-default-500">Descrição:</span><br />
                          <p className="mt-1">{selectedEPI.descricao}</p>
                        </div>
                      )}
                      
                      {selectedEPI.observacoes && (
                        <div>
                          <span className="text-default-500">Observações:</span><br />
                          <p className="mt-1">{selectedEPI.observacoes}</p>
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
                  <p>Tem certeza que deseja excluir o EPI <strong>{selectedEPI?.codigo} - {selectedEPI?.nome}</strong>?</p>
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
