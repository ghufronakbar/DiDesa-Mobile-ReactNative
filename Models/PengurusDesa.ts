import { Warga } from "./Warga";

export interface PengurusDesa {
  pengurusDesaAnggotaId: number;
  wargaId: number;
  aksesAdmin: boolean;
  jabatan: string;
  warga: Warga;
}
