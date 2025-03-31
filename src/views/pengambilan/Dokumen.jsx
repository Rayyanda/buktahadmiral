import { Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { useEffect, useState } from "react";


export default function Dokumen({data})
{

    const [listDiambil, setListDiambil] = useState([]);

    useEffect(()=>{
        setListDiambil(data.pengambilan);
    },[]);

    return (
        <>
        {/* <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Daftar Pengajuan</Text>
                <Text style={[styles.fw_bold,styles.fs_5]} >Nama Penerima : {data.namaPenerima}</Text>
                <Text style={[styles.fw_bold,styles.fs_5]} >Nomor Penerima : {data.nomorPenerima}</Text>
                <Text style={[styles.fw_bold,styles.fs_5]} >Tanggal Pengambilan : {data.tanggalPengambilan}</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.cell}>No Induk</Text>
                        <Text style={styles.cell}>Nama</Text>
                        <Text style={styles.cell}>Kode Kelas</Text>
                        <Text style={styles.cell}>Ukuran Kaos</Text>
                        <Text style={styles.cell}>Jenis Kaos</Text>
                        <Text style={styles.cell}>Koordinator</Text>
                    </View>
                    {listDiambil.map((item) => (
                        <View style={styles.row} key={item.id}>
                            <Text style={styles.cell}>{item.noInduk}</Text>
                            <Text style={styles.cell}>{item.nama}</Text>
                            <Text style={styles.cell}>{item.kodeKelas}</Text>
                            <Text style={styles.cell}>{item.ukuranKaos}</Text>
                            <Text style={styles.cell}>{item.jenisKaos}</Text>
                            <Text style={styles.cell}>{item.koordinator}</Text>
                        </View>
                    ))}
                </View>
                <View>

                </View>
            </Page>
        </Document> */}
        <Document>
            <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Daftar Pengajuan</Text>
            <Text style={styles.subtitle}>Nama Penerima: {data.namaPenerima}</Text>
            <Text style={styles.subtitle}>Nomor Penerima: {data.nomorPenerima}</Text>
            <Text style={styles.subtitle}>Tanggal Pengambilan: {data.tanggalPengambilan}</Text>
            
            <View style={styles.table}>
                <View style={[styles.row, styles.header]}>
                <Text style={styles.cell}>No Induk</Text>
                <Text style={styles.cell}>Nama</Text>
                <Text style={styles.cell}>Kode Kelas</Text>
                <Text style={styles.cell}>Ukuran Kaos</Text>
                <Text style={styles.cell}>Jenis Kaos</Text>
                <Text style={styles.cell}>Koordinator</Text>
                </View>
                {listDiambil.map((item, index) => (
                <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{item.noInduk}</Text>
                    <Text style={styles.cell}>{item.nama}</Text>
                    <Text style={styles.cell}>{item.kodeKelas}</Text>
                    <Text style={styles.cell}>{item.ukuranKaos}</Text>
                    <Text style={styles.cell}>{item.jenisKaos}</Text>
                    <Text style={styles.cell}>{item.koordinator}</Text>
                </View>
                ))}
            </View>
            
            <View style={styles.footer}>
                <View style={styles.signatureBox}>
                <Text>Penerima</Text>
                </View>
                <View style={styles.signatureBox}>
                <Text>Saksi</Text>
                </View>
            </View>
            </Page>
        </Document>

        </>
    )
}

const styles = StyleSheet.create({
    page: { padding: 20 },
    title: { textAlign: "center", fontSize: 16, fontWeight: "bold", marginBottom: 10 },
    subtitle: { fontSize: 12, fontWeight: "bold" },
    table: { display: "table", width: "100%", marginTop: 10, borderWidth: 1, borderColor: "black" },
    row: { flexDirection: "row" },
    header: { backgroundColor: "#EEE", fontWeight: "bold" },
    cell: { padding: 5, fontSize: 10, flex: 1, borderWidth: 1, borderColor: "black", textAlign: "center" },
    footer: { marginTop: 20, flexDirection: "row", justifyContent: "space-between" },
    signatureBox: { borderTopWidth: 1, width: "40%", textAlign: "center", paddingTop: 50, marginTop : 30 }
  });