import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ManterEmpresasService } from 'src/app/administrador/manter-empresas/manter-empresas.service';
import { ManterEquipamentosService } from 'src/app/administrador/manter-equipamentos/manter-equipamentos.service';
import EmpresaModel from 'src/app/models/empresa.model';
import EquipamentoModel from 'src/app/models/equipamento.model';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  itensChart: any;
  vasosChart: any;
  show = true;
  hoje = new Date().getTime();
  empresa = null
  empresaAtual = null;
  loginCliente = null;
  listaEmpresas: EmpresaModel[] = [];
  equipamentosList = [];
  tags = [];
  filteredItensList = [];
  filteredVasosList = [];
  vasosList = [];
  itensCount = 0;
  vasosCount = 0;

  backgroundItens = [
    '#9e9e9e',
    '#607d8b',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#f44336'
  ];

  backgroundVasos = [
    '#120309',
    '#70163C',
    '#307351',
    '#2E0F15',
    '#95B2B8'
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private empresaService: ManterEmpresasService,
    private equipamentoService: ManterEquipamentosService
  ) {
    const login = localStorageService.getItem('LOGIN');
    if (login && login.id) {
      this.loginCliente = login;
    }
  }

  ngOnInit(): void {
    this.itensChart = new Chart('itensChart', {});
    this.vasosChart = new Chart('vasosChart', {});

    if (this.loginCliente.tipo == 1) {
      this.empresaService.listarEmpresas().subscribe(res => {
        this.listaEmpresas = res;
        this.empresa = res[0].id;
        this.loadAllEmpresas(this.empresa);
      });
    } else {
      this.listaEmpresas = this.loginCliente.empresas;
      this.empresa = this.listaEmpresas[0].id;
      this.loadAllEmpresas(this.empresa);
    }
  }

  loadAllEmpresas(idEmpresa) {
    if (idEmpresa) {
      this.show = false;
      this.empresaAtual = this.empresa;
      this.equipamentoService.listaEquipamentos(idEmpresa).subscribe(res => {
        const countItens = this.newCount('I');
        const countVasos = this.newCount('V');
        this.tags = [];
        this.equipamentosList = res;
        this.equipamentosList.forEach((equip: EquipamentoModel) => {
          if (equip.tipoEquipamento.startsWith('VAS') || equip.tipoEquipamento.startsWith('C') || equip.tipoEquipamento.startsWith('T')) {
            const calcInterno = this.calcularPeriodo(equip.inspecaoInterna, equip.proximaInspecaoInterna);
            const calcExterno = this.calcularPeriodo(equip.inspecaoExterna, equip.proximaInspecaoExterna);

            if (equip.tipoEquipamento.startsWith('VAS') && equip.categoria) {
              countVasos[Number(equip.categoria) - 1].qtd++;
            }
            this.tags.push({
              tag: equip.tagEquipamento, dataInicial: equip.inspecaoInterna, dataFinal: equip.proximaInspecaoInterna,
              periodo: calcInterno, desc: 'Próxima Inspeção Interna'
            });

            this.tags.push({
              tag: equip.tagEquipamento, dataInicial: equip.inspecaoExterna, dataFinal: equip.proximaInspecaoExterna,
              periodo: calcExterno, desc: 'Próxima Inspeção Externa'
            });

            countItens[0].qtd += equip.tipoEquipamento.startsWith('VAS') ? 1 : 0;
            countItens[1].qtd += equip.tipoEquipamento.startsWith('C') ? 1 : 0;
            countItens[2].qtd += equip.tipoEquipamento.startsWith('T') ? 1 : 0;
          } else if (equip.tipoEquipamento.startsWith('L') || equip.tipoEquipamento.startsWith('E')) {
            const calc = this.calcularPeriodo(equip.inspecao, equip.proximaInspecao);
            this.tags.push({
              tag: equip.tagEquipamento, dataInicial: equip.inspecao, dataFinal: equip.proximaInspecao,
              periodo: calc, desc: 'Próxima Inspeção'
            });

            countItens[3].qtd += equip.tipoEquipamento.startsWith('L') ? 1 : 0;
            countItens[4].qtd += equip.tipoEquipamento.startsWith('EL') ? 1 : 0;
            countItens[5].qtd += equip.tipoEquipamento.startsWith('EQ') ? 1 : 0;
          } else {
            const calc = this.calcularPeriodo(equip.dataCalibracao, equip.proximaCalibracao);
            this.tags.push({
              tag: equip.tagEquipamento, dataInicial: equip.dataCalibracao, dataFinal: equip.proximaCalibracao,
              periodo: calc, desc: 'Próxima Calibração'
            });

            countItens[6].qtd += equip.tipoEquipamento === 'INDICADOR' ? 1 : 0;
            countItens[7].qtd += equip.tipoEquipamento === 'INDICADOR_TEMPERATURA' ? 1 : 0;
            countItens[8].qtd += equip.tipoEquipamento.startsWith('VAL') ? 1 : 0;
          }
        })
        this.filteredItensList = countItens.filter(value => value.qtd > 0);
        this.show = true;
        this.itensChart.destroy();
        this.itensChart = this.mountChart('I');
        this.itensCount = this.filteredItensList.map(filt => filt.qtd).reduce((acc, current) => acc + current, 0);

        this.filteredVasosList = countVasos.filter(value => value.qtd > 0);
        this.vasosChart.destroy();
        this.vasosChart = this.mountChart('V');
        this.vasosCount = this.filteredVasosList.map(filt => filt.qtd).reduce((acc, current) => acc + current, 0);
      });
    }
  }

  mountChart(opc: string) {
    const label = opc === 'I' ? this.filteredItensList.map(value => value.descricao) : this.filteredVasosList.map(value => value.descricao);
    const data = opc === 'I' ? this.filteredItensList.map(value => value.qtd) : this.filteredVasosList.map(value => value.qtd);
    return new Chart(opc === 'I' ? 'itensChart' : 'vasosChart', {
      type: 'doughnut',
      data: {
        labels: label,
        datasets: [
          {
            data: data,
            backgroundColor: opc === 'I' ? this.backgroundItens : this.backgroundVasos,
            fill: false
          },
        ]
      },
      options: {
        hover: false,
        legend: {
          display: false
        }
      }
    });
  }

  newCount(opc: string) {
    return opc === 'I' ? [
      { descricao: 'Vaso de pressão', qtd: 0 },
      { descricao: 'Caldeira', qtd: 0 },
      { descricao: 'Tubulação', qtd: 0 },
      { descricao: 'Linha de vida', qtd: 0 },
      { descricao: 'Elevador', qtd: 0 },
      { descricao: 'Equipamento', qtd: 0 },
      { descricao: 'Indicador de pressão', qtd: 0 },
      { descricao: 'Indicador de temperatura', qtd: 0 },
      { descricao: 'Válvula de segurança', qtd: 0 }
    ] : [
      { descricao: 'Categoria I', qtd: 0 },
      { descricao: 'Categoria II', qtd: 0 },
      { descricao: 'Categoria III', qtd: 0 },
      { descricao: 'Categoria IV', qtd: 0 },
      { descricao: 'Categoria V', qtd: 0 }
    ];
  }

  progressBar(calcData) {
    if (calcData <= 50) {
      return { valor: calcData, cor: '#008000' };
    }
    if (calcData <= 75) {
      return { valor: calcData, cor: '#FFFF00' };
    }
    if (calcData < 101) {
      return { valor: calcData, cor: '#FF4500' };
    } else {
      return { valor: 100, cor: '#A71111' };
    }
  }

  calcularPeriodo(dataInicial, dataFinal) {
    const inicio = new Date(dataInicial).getTime();
    const fim = new Date(dataFinal).getTime();
    const atual = this.hoje - inicio;
    const periodo = fim - inicio;
    return (atual * 100) / periodo;
  }
}
