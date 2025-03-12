import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";

interface Pengajuan {
  id: number;
  nama: string;
  nik: string;
  tanggalLahir: string;
  statusPerkawinan: string;
  dealer: string;
  namaKendaraan: string;
  hargaKendaraan: number;
  downPayment: number;
  angsuranPerBulan: number;
  status: string;
}

export default function ApprovalPengajuan() {
  const [pengajuanList, setPengajuanList] = useState<Pengajuan[]>([]);

  useEffect(() => {
    fetchPengajuan();
  }, []);

  const fetchPengajuan = async () => {
    const { data, error } = await supabase.from("pengajuan_kredit").select("*");
    if (error) console.error(error);
    else setPengajuanList(data);
  };

  const approvePengajuan = async (id: number) => {
    const { error } = await supabase
      .from("pengajuan_kredit")
      .update({ status: "Approved" })
      .eq("id", id);

    if (error) console.error(error);
    else {
      alert("Pengajuan berhasil diapprove!");
      fetchPengajuan();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Approval Pengajuan Kredit
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama</th>
            <th className="border p-2">NIK</th>
            <th className="border p-2">Kendaraan</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pengajuanList.map((pengajuan) => (
            <tr key={pengajuan.id} className="text-center">
              <td className="border p-2">{pengajuan.nama}</td>
              <td className="border p-2">{pengajuan.nik}</td>
              <td className="border p-2">{pengajuan.namaKendaraan}</td>
              <td className="border p-2">
                Rp {pengajuan.hargaKendaraan.toLocaleString()}
              </td>
              <td className="border p-2">{pengajuan.status}</td>
              <td className="border p-2">
                {pengajuan.status !== "Approved" && (
                  <button
                    onClick={() => approvePengajuan(pengajuan.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
