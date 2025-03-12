"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PengajuanKredit() {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tanggalLahir: "",
    statusPerkawinan: "",
    pasangan: "",
    dealer: "",
    namaKendaraan: "",
    tipeKendaraan: "",
    warnaKendaraan: "",
    hargaKendaraan: "",
    asuransi: "",
    downPayment: "",
    lamaKredit: "",
    angsuranPerBulan: "",
    ktp: null,
    buktiBayar: null,
    formPengajuan: null,
    kartuKeluarga: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("pengajuan_kredit")
      .insert([formData]);

    if (error) console.error(error);
    else alert("Pengajuan berhasil dikirim!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <Image src="/logo.png" alt="BCA Finance" className="w-40 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-4 text-center">
        Form Pengajuan Kredit
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nama"
          type="text"
          placeholder="Nama"
          value={formData.nama}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="nik"
          type="text"
          placeholder="NIK"
          value={formData.nik}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="tanggalLahir"
          type="date"
          value={formData.tanggalLahir}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="statusPerkawinan"
          value={formData.statusPerkawinan}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Status Perkawinan</option>
          <option value="Lajang">Lajang</option>
          <option value="Menikah">Menikah</option>
        </select>
        <input
          name="dealer"
          type="text"
          placeholder="Dealer"
          value={formData.dealer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="namaKendaraan"
          type="text"
          placeholder="Nama Kendaraan"
          value={formData.namaKendaraan}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="hargaKendaraan"
          type="number"
          placeholder="Harga Kendaraan"
          value={formData.hargaKendaraan}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="downPayment"
          type="number"
          placeholder="Down Payment"
          value={formData.downPayment}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="angsuranPerBulan"
          type="number"
          placeholder="Angsuran Per Bulan"
          value={formData.angsuranPerBulan}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div>
          <label>Upload KTP</label>
          <input
            name="ktp"
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Upload Bukti Bayar</label>
          <input
            name="buktiBayar"
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Kirim Pengajuan
        </button>
      </form>
    </div>
  );
}
