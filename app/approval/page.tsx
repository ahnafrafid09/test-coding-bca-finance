"use client";

import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

export default function ApprovalPengajuan() {
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPengajuan();
  }, []);

  async function fetchPengajuan() {
    setLoading(true);
    const { data, error } = await supabase.from("pengajuan_kredit").select("*");
    if (error) console.error("Gagal mengambil data:", error);
    else setPengajuan(data);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("pengajuan_kredit")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Gagal memperbarui status:", error);
    } else {
      alert(`Pengajuan ${status}`);
      fetchPengajuan();
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Approval Pengajuan Kredit
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nama</th>
              <th className="border p-2">NIK</th>
              <th className="border p-2">Kendaraan</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengajuan.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{item.nama}</td>
                <td className="border p-2">{item.nik}</td>
                <td className="border p-2">{item.namaKendaraan}</td>
                <td className="border p-2 font-bold">
                  {item.status || "Pending"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => updateStatus(item.id, "Disetujui")}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Setujui
                  </button>
                  <button
                    onClick={() => updateStatus(item.id, "Ditolak")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
