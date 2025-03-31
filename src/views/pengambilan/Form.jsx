import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { db, collection, getDocs,updateDoc, doc, query } from "../../lib/firebaseConfig";
import { isMobile } from "react-device-detect";
import { setDoc, where } from "firebase/firestore";
import Swal from "sweetalert2";
import { Link } from "react-router";


export default function Form()
{

    //function untuk mengambil data ke database firestore
      const getData = async () =>{
    
        const response = await getDocs(collection(db,'students'));
        const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
          setDataStudent(data);
        
      }

      //useState data koordinator
    const [koordinator, setKoordinator] = useState('');
      
    const [domisili, setDomisili] = useState('');
      
    const [ukuranKaos, setUkuranKaos] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [jenisKaos, setJenisKaos] = useState('Pendek');

    const [pengajuan, setPengajuan] = useState([]);
    const [namaPenerima, setNamaPenerima] = useState('');
    const [nomorPenerima, setNomorPenerima] = useState('');
    const [tanggalPengambilan, setTanggalPengambilan] = useState('');

    const removeData = (noInduk) => {
        setPengajuan(prevPengajuan => prevPengajuan.filter(item => item.noInduk !== noInduk));
    };
    

    //function add to form
    const addData = async (noInduk, nama, kodeKelas, koordinator, ukuranKaos, jenisKaos, domisili) => {
        setPengajuan(prevPengajuan=> {
            // Cek apakah ada data dengan noInduk yang sama
            const isDuplicate = prevPengajuan.some(item => item.noInduk === noInduk);
            
            if (isDuplicate) {
                //Swal.fire('Error','Data dengan No Induk tersebu sudah ada!','error');
                alert("Data dengan No Induk tersebut sudah ada!");
                return prevPengajuan; // Tidak menambahkan data baru
            }
    
            // Jika tidak ada duplikat, tambahkan data baru
            return [
                ...prevPengajuan,
                { noInduk, nama, kodeKelas, koordinator, ukuranKaos, jenisKaos, domisili }
            ];
        });
    };



      //function untuk melakukan search
  const search = async (e) =>{
    setSearchQuery(e.target.value);
    console.log(e.target.value);
    var response = await getDocs(query(collection(db,'students'),where('noInduk','==',e.target.value)));
    setDataStudent(response.docs.map(doc => ({...doc.data(), id: doc.id})));

    // setDataStudent(dataStudent.map((student)=> student.noInduk === e.target.value ? {...student, noInduk: e.target.value} : student));
  }

    //use state data student
      const [dataStudent, setDataStudent] = useState([]);

    //mendefinisikan columns untuk data table
  const columns = [
    {name : 'No Induk', selector : row => row.noInduk, sortable : true },
    {name : 'Nama', selector : row => row.nama, sortable : true , grow : 2},
    // {name : 'Kelas', selector : row => row.kodeKelas, sortable : true },
    // {name : 'Koordinator', selector : row=> row.koordinator},
    // {name : 'Domisili', selector : row=> row.domisili},
    {name : 'Ukuran Kaos', selector : row => row.ukuranKaos, sortable : true },
    {name : 'Jenis Kaos', selector : row=> row.jenisKaos },
    // {name : 'Aksi', selector: row=> (
    // <>
    //   <button type="button" onClick={()=> Swal.fire('Restricted','Akses edit telah ditutup.\nSilahkan hubungi MPK untuk informasi selanjutnya','error')} className="btn btn-ghost btn-outline btn-sm">Closed</button>
    // </>)}
    {name : 'Aksi', selector : row => (
      <>
        <button type="button" onClick={()=> addData(row.noInduk,row.nama,row.kodeKelas, row.koordinator, row.ukuranKaos, row.jenisKaos, row.domisili)} className="btn btn-primary btn-sm mr-1">
            Tambah
        </button>
        <button type="button" key={row.id} onClick={()=> {
          document.getElementById(`modalUpdate-${row.id}`).showModal()
          setKoordinator(row.koordinator);
          setUkuranKaos(row.ukuranKaos);
          setDomisili(row.domisili);
        }} className="btn btn-success btn-sm" >Lihat</button>
        <dialog key={row.nama} id={`modalUpdate-${row.id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-white">Detail Data</h3>
              <hr />
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-sm">Nama</span>
                  </div>
                  <input type="text" placeholder="Type here" value={row.nama} id={`admiral-${row.nama}`} className="input input-bordered w-full input-sm max-w-xs" disabled />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-sm">Kelas</span>
                  </div>
                  <input type="text" placeholder="Type here" value={row.kodeKelas} id={`admiral-${row.nama}`} className="input input-bordered w-full input-sm max-w-xs" disabled />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-sm">Koordinator</span>
                  </div>
                  <input type="text" disabled placeholder={koordinator != ''? `${koordinator}` : 'Masukkan koordinator Anda'} value={koordinator}  id={`admiral-${row.nama}`} className="input input-bordered w-full input-sm max-w-xs text-white"/>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-sm">Domisili</span>
                  </div>
                  <input type="text" disabled placeholder={domisili != ''? `${domisili}` : 'Masukkan Domisili Anda'} value={domisili}  id={`admiral-${row.nama}`} className="input input-bordered w-full input-sm max-w-xs text-white"/>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-sm">Ukuran Kaos</span>
                  </div>
                  <input type="text" disabled placeholder={ukuranKaos != '' ? `${ukuranKaos}` : 'Masukkan ukuran kaos Anda'} value={ukuranKaos}  id={`admiral-${row.nama}`} className="input input-bordered w-full input-sm max-w-xs text-white" />
                </label>
                <div className="form-control w-full text-center">
                  <label className="label cursor-pointer">
                    <span className="label-text">Jenis Kaos</span>
                  </label>
                  <select disabled className="select select-bordered w-full max-w-xs text-white" value={jenisKaos}>
                    <option className="s" value="Pendek" >Pendek</option>
                    <option value="Panjang" >Panjang</option>
                  </select>
                  
                </div>
              
              <div className="modal-action">
                {/* <button type="button" onClick={()=> addData(row.noInduk,row.nama,row.kodeKelas, row.koordinator, row.ukuranKaos, row.jenisKaos, row.domisili)} className="btn btn-primary">
                    Tambah
                </button> */}
                <form method="dialog">
                  <button onClick={()=> setNull()} className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
      </>
    ) },
  ];


  const columnsPengajuan = [
    {name : 'No Induk', selector : row => row.noInduk, sortable : true },
    {name : 'Nama', selector : row => row.nama, sortable : true , grow : 2},
    // {name : 'Kelas', selector : row => row.kodeKelas, sortable : true },
    // {name : 'Koordinator', selector : row=> row.koordinator},
    // {name : 'Domisili', selector : row=> row.domisili},
    {name : 'Ukuran Kaos', selector : row => row.ukuranKaos, sortable : true },
    {name : 'Jenis Kaos', selector : row=> row.jenisKaos },
    {name : 'Aksi', selector : row=> (
        <button type="button" onClick={()=> removeData(row.noInduk)} className="btn btn-warning">
            Hapus
        </button>
    )}
  ];

  const addPengajuan = async () => {
    try {
        if (namaPenerima != '' && nomorPenerima != '' && tanggalPengambilan != '') {
            const docItem = {
                'namaPenerima' : namaPenerima,
                'nomorPenerima' : nomorPenerima,
                'tanggalPengambilan' : tanggalPengambilan,
                'pengambilan' : pengajuan
            };
            await setDoc(doc(db,'pengajuan',`doc-${namaPenerima}${nomorPenerima}`), docItem);
            Swal.fire('Berhasil','Pengajuan berhasil dibuat','success');
            setPengajuan([]);
        }
    } catch (error) {
        Swal.fire('Error',`Ada data kosong : ${error}`,'error');
    }
  }
  const setNull =()=>{
    setKoordinator('');
    setUkuranKaos('');
    getData();
    setSearchQuery('');
    setJenisKaos("Pendek");
    setDomisili('');
  }

  useEffect(()=>{
    getData()
  },[]);


    return (
        <>
            <div className={isMobile ? 'mx-auto max-w-screen-md p-3' : 'mx-auto max-w-screen-xl p-3'} >
                <div className="flex my-4 items-center flex-wrap flex-row">
                    <label className="input input-bordered flex items-center gap-2">
                    <input type="text" onChange={(e)=> search(e)} value={searchQuery} className="grow w-40 input-sm" placeholder="Nomor Induk" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                    </svg>
                    </label>
                    <button type="button" className="btn btn-primary mx-2 btn-sm" onClick={()=> getData()} >Refresh</button>
                    <Link to={'/pengambilan'} className="btn btn-success my-2 btn-sm" >Data Ajuan</Link>
                </div>
                <div className="overflow-y-auto">
                    <DataTable 
                    title="Data Admiral"
                    columns={columns}
                    data={dataStudent}
                    pagination
                    highlightOnHover
                    responsive
                    striped={true}
                    className="bg-slate-500"                
                    fixedHeaderScrollHeight="200px"
                    paginationPerPage={5}                
                    />
                </div>
                <hr />
                <h1 className="text-xl font-bold" >Pengajuan</h1>
                <div className="flex flex-row flex-wrap my-2 align-text-top">
                    <label className="input  input-bordered flex items-center gap-2 mr-2 mb-2">
                        <span className="label">Nama Penerima</span>
                        <input type="text" value={namaPenerima} onChange={(e)=> setNamaPenerima(e.target.value)} className="" placeholder="......" />
                    </label>
                    <label className="input  input-bordered flex items-center gap-2 mr-2 mb-2">
                        <span className="label">No. Wa</span>
                        <input type="text" className="" value={nomorPenerima} onChange={(e)=> setNomorPenerima(e.target.value)}  placeholder="0812xxxxx" />
                    </label>
                    <label className="input  input-bordered flex items-center gap-2 mr-2 mb-2">
                        <span className="label">Tanggal Pengambilan </span>
                        <input type="date" value={tanggalPengambilan} onChange={(e)=> setTanggalPengambilan(e.target.value)} className="" placeholder="URL" />
                    </label>
                </div>
                <div className="overflow-y-auto">
                    <DataTable
                    title="Pengajuan"
                    columns={columnsPengajuan}
                    data={pengajuan}
                    pagination
                    highlightOnHover
                    responsive
                    striped={true}
                    className="bg-slate-500"
                    fixedHeaderScrollHeight="200px"
                    paginationPerPage={20}

                    />
                </div>
                <button type="button" className="btn btn-primary my-2" onClick={()=> addPengajuan()} >Buat Ajuan</button>
            </div>
        </>
    )
}