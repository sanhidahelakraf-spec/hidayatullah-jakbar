// Utility untuk mengubah tanggal dari Supabase (format ISO: "2026-07-06" atau
// "2026-07-06T12:34:56.000Z") menjadi format Indonesia yang enak dibaca: "06 Juli 2026"

const BULAN_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/**
 * @param dateStr  tanggal dari Supabase (date atau timestamptz)
 * @param withTime jika true, tambahkan jam (untuk data seperti riwayat donasi)
 */
export function formatDate(dateStr: string, withTime: boolean = false): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr; // fallback kalau formatnya tidak dikenali

  const formatted = `${String(d.getDate()).padStart(2, '0')} ${BULAN_ID[d.getMonth()]} ${d.getFullYear()}`;

  if (!withTime) return formatted;

  const jam = String(d.getHours()).padStart(2, '0');
  const menit = String(d.getMinutes()).padStart(2, '0');
  return `${formatted}, ${jam}:${menit} WIB`;
}
