// client/src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  ErrorOutline as ErrorOutlineIcon,
  Science as ScienceIcon,
  Description as DescriptionIcon,
  Business as BusinessIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  MoreVert as MoreVertIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// Componentes para gráficos
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Cores para gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Dados fictícios para os cards
  const summaryData = {
    totalDocumentos: 128,
    documentosPendentes: 12,
    totalEnsaios: 65,
    ensaiosConformes: 58,
    ensaiosNaoConformes: 7,
    naoConformidades: 14,
    fornecedores: 32,
    projetos: 5
  };
  
  // Dados fictícios para gráficos
  const documentosPorTipoData = [
    { name: 'Especificações', value: 42 },
    { name: 'Procedimentos', value: 28 },
    { name: 'Checklists', value: 36 },
    { name: 'Certificados', value: 18 },
    { name: 'Relatórios', value: 22 }
  ];
  
  const ensaiosPorTipoData = [
    { name: 'Solo', value: 20 },
    { name: 'Betão', value: 15 },
    { name: 'Agregados', value: 10 },
    { name: 'Soldadura', value: 5 },
    { name: 'Outros', value: 15 }
  ];
  
  const naoConformidadesPorStatusData = [
    { name: 'Abertas', value: 8 },
    { name: 'Em análise', value: 4 },
    { name: 'Resolvidas', value: 12 },
    { name: 'Fechadas', value: 28 }
  ];
  
  // Dados fictícios para atividades recentes
  const atividadesRecentes = [
    { id: 1, tipo: 'documento', descricao: 'Procedimento de Ensaio de Betão atualizado', responsavel: 'Ana Costa', data: '2023-04-11', status: 'pendente' },
    { id: 2, tipo: 'ensaio', descricao: 'Ensaio de solo realizado em P.K. 15+420', responsavel: 'Carlos Santos', data: '2023-04-10', status: 'conforme' },
    { id: 3, tipo: 'nc', descricao: 'Não conformidade registada na soldadura de carril', responsavel: 'Pedro Oliveira', data: '2023-04-09', status: 'aberta' },
    { id: 4, tipo: 'documento', descricao: 'Especificação Técnica de Carril aprovada', responsavel: 'João Silva', data: '2023-04-08', status: 'aprovado' },
    { id: 5, tipo: 'ensaio', descricao: 'Ensaio de resistência de betão', responsavel: 'Maria Gomes', data: '2023-04-07', status: 'não conforme' }
  ];
  
  // Renderizar ícone com base no tipo de atividade
  const renderActivityIcon = (tipo, status) => {
    switch (tipo) {
      case 'documento':
        return <DescriptionIcon color={status === 'aprovado' ? 'success' : 'action'} />;
      case 'ensaio':
        return <ScienceIcon color={status === 'conforme' ? 'success' : status === 'não conforme' ? 'error' : 'action'} />;
      case 'nc':
        return <ErrorOutlineIcon color="error" />;
      default:
        return <AssignmentIcon />;
    }
  };
  
  // Renderizar chip de status com cor apropriada
  const renderStatusChip = (status) => {
    let color = 'default';
    
    switch (status) {
      case 'aprovado':
      case 'conforme':
        color = 'success';
        break;
      case 'pendente':
      case 'aberta':
        color = 'warning';
        break;
      case 'não conforme':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    
    return <Chip label={status} color={color} size="small" />;
  };
  
  // Componente StatCard para exibir estatísticas
  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card sx={{ height: '100%', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ 
              backgroundColor: color,
              borderRadius: 1,
              p: 1,
              color: 'white'
            }}>
              {icon}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Visão geral do sistema de gestão de qualidade
        </Typography>
      </Box>
      
      {/* Cards de resumo */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Documentos"
            value={summaryData.totalDocumentos}
            icon={<DescriptionIcon />}
            color="#1976d2"
            onClick={() => navigate('/documentos')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Ensaios"
            value={summaryData.totalEnsaios}
            icon={<ScienceIcon />}
            color="#2e7d32"
            onClick={() => navigate('/ensaios')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Não Conformidades"
            value={summaryData.naoConformidades}
            icon={<ErrorOutlineIcon />}
            color="#d32f2f"
            onClick={() => navigate('/nao-conformidades')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Fornecedores"
            value={summaryData.fornecedores}
            icon={<BusinessIcon />}
            color="#ed6c02"
            onClick={() => navigate('/fornecedores')}
          />
        </Grid>
      </Grid>
      
      {/* Gráficos */}
      <Grid container spacing={3}>
        {/* Documentos por tipo */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Documentos por Tipo" 
              action={
                <IconButton aria-label="mais">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentosPorTipoData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {documentosPorTipoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Ensaios por tipo */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Ensaios por Tipo" 
              action={
                <IconButton aria-label="mais">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ensaiosPorTipoData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ensaiosPorTipoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Não conformidades por status */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Não Conformidades por Status" 
              action={
                <IconButton aria-label="mais">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={naoConformidadesPorStatusData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#8884d8" name="Quantidade" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Atividades recentes e ações rápidas */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Atividades recentes */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader 
              title="Atividades Recentes" 
              action={
                <Button
                  endIcon={<NavigateNextIcon />}
                  size="small"
                >
                  Ver todas
                </Button>
              }
            />
            <Divider />
            <List sx={{ pt: 0 }}>
              {atividadesRecentes.map((atividade, index) => (
                <React.Fragment key={atividade.id}>
                  <ListItem 
                    secondaryAction={renderStatusChip(atividade.status)}
                    sx={{ py: 1.5 }}
                  >
                    <Box sx={{ display: 'flex', mr: 2 }}>
                      {renderActivityIcon(atividade.tipo, atividade.status)}
                    </Box>
                    <ListItemText
                      primary={atividade.descricao}
                      secondary={`${atividade.responsavel} • ${new Date(atividade.data).toLocaleDateString()}`}
                    />
                  </ListItem>
                  {index < 3 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;index < atividadesRecentes.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
        
        {/* Ações rápidas */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Ações Rápidas" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate('/documentos/adicionar')}
                  >
                    Novo Documento
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate('/ensaios/adicionar')}
                  >
                    Novo Ensaio
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate('/nao-conformidades/adicionar')}
                  >
                    Nova Não Conformidade
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate('/checklists/adicionar')}
                  >
                    Nova Checklist
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          {/* Projetos ativos */}
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Projetos Ativos" />
            <Divider />
            <List sx={{ pt: 0 }}>
              {[
                { id: 1, nome: 'Ferrovia Setúbal - Fase 1', progresso: 75 },
                { id: 2, nome: 'Ponte Tejo Norte', progresso: 45 },
                { id: 3, nome: 'Túnel Serra da Estrela', progresso: 30 },
                { id: 4, nome: 'Renovação Linha do Norte', progresso: 60 }
              ].map((projeto, index) => (
                <React.Fragment key={projeto.id}>
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary={projeto.nome}
                      secondary={`Progresso: ${projeto.progresso}%`}
                    />
                    <IconButton edge="end" aria-label="ver detalhes" onClick={() => navigate(`/projetos/${projeto.id}`)}>
                      <NavigateNextIcon />
                    </IconButton>
                  </ListItem>
                  {
