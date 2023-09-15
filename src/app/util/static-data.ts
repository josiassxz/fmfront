export const environment = {
  URL_SERVER_API: 'https://ec2-13-49-243-152.eu-north-1.compute.amazonaws.com:8080'
}

/*============ INICIO COLUNAS EQUIPAMENTOS ===========*/

export const VASOS_PRESSAO_CALDEIRA_COLUMNS = [
  'categoria',
  'inspecaoInterna',
  'pInspecaoInterna',
  'inspecaoExterna',
  'pInspecaoExterna',
  'placaIndentificacao',
  'valvulaSeguranca',
  'indicadorPressao',
  'pmta',
  'fluido',
  'numeroRelatorio',
  'rgi',
  'observacaoRgi',
  'status'
];

export const INDICADORES_PRESSAO_COLUMNS = [
  'numeroLacre',
  'dataCalibracao',
  'proximaCalibracao',
  'roscaConexao',
  'marcaModelo',
  'instrumento',
  'escala',
  'unidadeMedida',
  'tamanho',
  'status'
];

export const VALVULAS_SEGURANCA_COLUMNS = [
  'numeroLacre',
  'dataCalibracao',
  'proximaCalibracao',
  'bitola',
  'marcaModelo',
  'setPointAbertura',
  'unidadeAjuste',
  'status'
];

export const LINHA_VIDA_ELEVADOR_COLUMNS = [
  'numeroRelatorio',
  'inspecao',
  'proxInspecao',
  'numeroSerie',
  'capacidade',
  'placaIndentificacao',
  'status'
];

export const EQUIPAMENTO_COLUMNS = [
  'numeroRelatorio',
  'inspecao',
  'proxInspecao',
  'numeroSerie',
  'placaIndentificacao',
  'status'
];

/*============ FIM COLUNAS EQUIPAMENTOS ===========*/
