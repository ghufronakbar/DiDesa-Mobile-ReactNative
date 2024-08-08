import { Warga } from "./Warga";

export interface CalonKetua {
  calonKetuaId: number;
  deskripsi: string;
  _count: {
    vote: number;
  };
  warga: Warga;
}
