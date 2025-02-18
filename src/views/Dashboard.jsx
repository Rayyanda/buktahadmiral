import * as XLSX from "xlsx";
import { db, getDocs, collection, addDoc, setDoc, doc } from "../lib/firebaseConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Dashboard()
{
    const [dataStudent, setDataStudent] = useState([]);


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
      
          const sheetName = workbook.SheetNames[0]; // Ambil sheet pertama
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
      
          console.log("Data dari Excel :", jsonData);

          setDataStudent(jsonData);
      
          // Upload ke Firebase
          const collectionRef = collection(db, "sutdents"); // Ganti dengan nama koleksi Firestore-mu
          for (const item of jsonData) {

            const docItem = {
                'noInduk': item.noinduk,
                'nama': item.nama,
                'kodeKelas' : item.kode_kelas,
                'koordinator' : '',
                'ukuranKaos' : '',
            }

            await setDoc(doc(db, 'students',item.noinduk), docItem);
            console.log(`${docItem.nama} berhasil di upload`);
          }
          
          alert("Data berhasil dikirim ke Firebase!");
        };
      
        reader.readAsArrayBuffer(file);
      };

    //function untuk export xls
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataStudent);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
        XLSX.writeFile(workbook, "data.xlsx");
      };
      

    const getData = async () =>{
        const response = await getDocs(collection(db,'students'));
        setDataStudent(response.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    useEffect(()=>{
        getData();
    },[])


    return (
        <>
            <div className="navbar bg-base-100 shadow-lg">
                <a className="btn btn-ghost text-xl">Admin</a>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div className="mx-auto max-w-screen-xl">
                <div className="flex my-4 flex-row align-middle">
                    <Link to={'/'} className="btn btn-secondary" >Kembali</Link>
                    {/* <button className="btn btn-primary m-1" onClick={()=>document.getElementById('modalAddFromFile').showModal()}>Tambah File</button> */}
                    <button type="button" className="btn m-1 btn-success" onClick={()=> document.getElementById('modalAddOne').showModal()}>Tambah Data</button>
                    <button type="button" onClick={()=> exportToExcel()} className="btn btn-primary">Export</button>
                </div>
                <dialog id="modalAddFromFile" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Upload File Excel</h3>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="flex flex-row justify-between align-middle">
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="file" onChange={(e)=> handleFileUpload(e)} className="grow" placeholder="Search" />
                                    {/* <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd" />
                                    </svg> */}
                                </label>
                            </div>
                            {/* <button type="button" className="btn btn-secondary mx-1">Kirim</button> */}
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <dialog id="modalAddOne" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Data Baru</h3>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <div className="overflow-x-hidden">
                    <table className="table table-md">
                        <thead>
                        <tr>
                            <th></th>
                            <th>No. Induk</th>
                            <th>Nama Lengkap</th>
                            <th>Kode Kelas</th>
                            <th>Koordinator</th>
                            <th>Ukuran Kaos</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        
                        dataStudent.map((item, index)=>(
                            <tr key={index} >
                                <td>{index+=1}</td>
                                <td>{item.noInduk}</td>
                                <td>{item.nama}</td>
                                <td>{item.kodeKelas}</td>
                                <td>{item.koordinator}</td>
                                <td>{item.ukuranKaos}</td>
                                <td><button type="button" className="btn">Edit</button></td>
                            </tr>
                        ))
                        
                        }
                        </tbody>
                       
                    </table>
                </div>
            </div>
        </>
    )
}