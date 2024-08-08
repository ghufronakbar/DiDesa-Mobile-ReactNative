import { CalonKetua } from "./CalonKetua";

export interface Pemilihan {
  pemilihanKetuaId: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  judul: string;
  deskripsi: string;
  _count: {
    calonKetua: number;
  };
  isVoted: boolean;
  isVoteable: boolean;
  status: "Sedang Berlangsung" | "Selesai" | "Belum Berlangsung";
  calonKetua: CalonKetua[];
}
