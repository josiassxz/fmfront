export class InstrumentosEnum {
    public static readonly  MANOMETRO = new InstrumentosEnum("1", 'Manômetro');
    public static readonly TRANSMISSOR_PRESSAO = new InstrumentosEnum("2", 'Transmissor de Pressão');
    public static readonly MANOVACUOMETRO = new InstrumentosEnum("3", 'Manovacuômetro');
    public static readonly TRANSMISSOR_TEMPERATURA = new InstrumentosEnum("4", 'Transmissor de Temperatura');
    public static readonly PRESSOSTATO = new InstrumentosEnum("5", 'Pressostato');
    public static readonly TERMOMETRO = new InstrumentosEnum("6", 'Termômetro');


    constructor(public id: string, public descricao: string) {}

    public static getValues(): InstrumentosEnum[] {
      return [this.MANOMETRO, this.TRANSMISSOR_PRESSAO, this.MANOVACUOMETRO, this.PRESSOSTATO];
    }

    public static getValuesTemperatura(): InstrumentosEnum[]{
      return [this.TERMOMETRO, this.TRANSMISSOR_TEMPERATURA]
    }

    public static toEnum(id: string): InstrumentosEnum {
      return this.getValues().find(p => p.id === id);
    }
  }
