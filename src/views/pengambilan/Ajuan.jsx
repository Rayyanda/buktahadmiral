import { useEffect, useState } from "react"
import { db, getDocs,collection } from "../../lib/firebaseConfig";
import { isMobile } from "react-device-detect";
import { Link } from "react-router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Dokumen from "./Dokumen";
export default function Ajuan()
{

    const [dataPengambilan, setDataPengambilan] = useState([]);

    //get data
    const getData = async () =>{
        const response = await getDocs(collection(db,'pengajuan'));
        const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
        setDataPengambilan(data);
    }

    useEffect(()=>{
        getData();
    },[]);
    

    return (
        <>
            <div className={isMobile ? 'mx-auto max-w-screen-md p-3' : 'mx-auto max-w-screen-xl p-3'} >
                <h1 className="text-2xl">Data Pengajuan</h1>
                <Link to={'/form'} className="btn btn-success my-2" >Buat Ajuan</Link>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 min-h-full">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Nama Penerima</th>
                            <th>Nomor Penerima</th>
                            <th>Tanggal Pengambilan</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataPengambilan.map((item, index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.namaPenerima}</td>
                                <td>{item.nomorPenerima}</td>
                                <td>{item.tanggalPengambilan}</td>
                                <td>
                                    <PDFDownloadLink className="btn btn-secondary" document={<Dokumen data={item} />} fileName={`Ajuan-${item.namaPenerima}.pdf`} >
                                        PDF
                                    </PDFDownloadLink>
                                    {/* <button type="button" className="btn btn-secondary" >PDF</button> */}
                                </td>
                            </tr>
                        ))}
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}