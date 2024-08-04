import { Warga } from "./Warga";

export interface Komentar {
    komentarId: number;
    isi: string;
    tanggal: string;
    isDeleteable: boolean;
    warga: Warga    
}