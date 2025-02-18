import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { db, collection, getDocs,updateDoc, doc, query } from "../lib/firebaseConfig";
import { Link } from "react-router";
import { where } from "firebase/firestore";

export default function Home()
{

  //membuat use state

  //use state data student
  const [dataStudent, setDataStudent] = useState([]);

  //useState data koordinator
  const [koordinator, setKoordinator] = useState('');

  const [ukuranKaos, setUkuranKaos] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [jenisKaos, setJenisKaos] = useState('Pendek');
  const [boolKaos, setBoolKaos] = useState(true);
  const [jmlDone, setJmlDone] = useState(0);
  const [percentDone, setPercentDone] = useState(0);

  const [studetnClass, setStudentClass] = useState([]);

  const [mipaRijal, setMipaRijal] = useState([]);

  const [mipaNisa, setMipaNisa] = useState([]);

  const [ipsNisa, setIpsNisa] = useState([]);

  //function untuk membuat list kelas IPS
  const setClass = () =>{
    var class1 = [];
    for (let index = 1; index <= 15; index++) {
      const cc = `12S.${index}` 
      class1.push(cc)
    }
    setStudentClass(class1)
    var class2 = [];
    for (let index = 65; index < 78; index++) {
      const cc = `12S.${String.fromCharCode(index)}`
      class2.push(cc)
    }
    setIpsNisa(class2);
  }

  //function untuk membuat list kelas MIPA
  const setMipaAClass = () =>{
    var class2 = [];
    for (let index = 1; index <= 10; index++) {
      const cc = `12A.${index}`
      class2.push(cc);
    }
    setMipaRijal(class2);
    var class3 = [];
    for (let index = 65; index < 77; index++) {
      const cc = `12A.${String.fromCharCode(index)}`
      class3.push(cc);
    }
    setMipaNisa(class3);
  }

//function untuk mengambil data ke database firestore
  const getData = async () =>{

    const response = await getDocs(collection(db,'students'));
    const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
      setDataStudent(data);
      var dt = 0;
      var tr = 0;
      await data.map((item, index)=>{
        if(item.ukuranKaos != ''){
          dt++;
        }
      })
      const persen = (dt/dataStudent.length)*100;
      setJmlDone(dt);
      setPercentDone(persen);
  }

  const setKaos = (e) => {
    if(e == true)
    {
      setJenisKaos('Pendek')
    }else{
      setJenisKaos('Panjang')
    }
  }


  //mendefinisikan columns untuk data table
  const columns = [
    {name : 'No Induk', selector : row => row.noInduk, sortable : true },
    {name : 'Nama', selector : row => row.nama, sortable : true , grow : 2},
    {name : 'Kelas', selector : row => row.kodeKelas, sortable : true },
    {name : 'Koordinator', selector : row=> row.koordinator},
    {name : 'Ukuran Kaos', selector : row => row.ukuranKaos, sortable : true },
    {name : 'Jenis Kaos', selector : row=> row.jenisKaos },
    {name : 'Aksi', selector : row => (
      <>
        <button type="button" key={row.id} onClick={()=> {
          document.getElementById(`modalUpdate-${row.id}`).showModal()
          setKoordinator(row.koordinator);
          setUkuranKaos(row.ukuranKaos);
        }} className="btn btn-sm" >Edit</button>
        <dialog key={row.nama} id={`modalUpdate-${row.id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-white">Update Data</h3>
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
                  <input type="text" placeholder={koordinator != ''? `${koordinator}` : 'Masukkan koordinator Anda'} value={koordinator} onChange={(e)=> setKoordinator(e.target.value)} id={`admiral-${row.nama}`} className="input input-bordered w-full input-sm max-w-xs text-white"/>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-sm">Ukuran Kaos</span>
                  </div>
                  <input type="text" placeholder={ukuranKaos != '' ? `${ukuranKaos}` : 'Masukkan ukuran kaos Anda'} value={ukuranKaos} onChange={(e)=> setUkuranKaos(e.target.value)} id={`admiral-${row.nama}`} className="input input-bordered w-full input-sm max-w-xs text-white" />
                </label>
                <div class="form-control w-full text-center">
                  <label class="label cursor-pointer">
                    <span class="label-text">Jenis Kaos</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs text-white" value={jenisKaos} onChange={(e)=> setJenisKaos(e.target.value)}>
                    <option className="" value="Pendek" >Pendek</option>
                    <option value="Panjang" >Panjang</option>
                  </select>
                </div>
              
              <div className="modal-action">
                <form method="dialog">
                  <button type="button" onClick={()=> updateData(row.id)} className="btn mx-2 btn-success">Simpan</button>
                  <button onClick={()=> setNull()} className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
      </>
    ) },
  ];

  //function untuk melakukan search
  const search = async (e) =>{
    setSearchQuery(e.target.value);
    var response = await getDocs(query(collection(db,'students'),where('noInduk','==',e.target.value)));
    setDataStudent(response.docs.map(doc => ({...doc.data(), id: doc.id})));

    // setDataStudent(dataStudent.map((student)=> student.noInduk === e.target.value ? {...student, noInduk: e.target.value} : student));
  }

  //function untuk update data
  const updateData = async (id) => {
    await updateDoc(doc(db, 'students',id),{
      koordinator: koordinator,
      ukuranKaos: ukuranKaos,
      jenisKaos : jenisKaos
    });
    setKoordinator('');
    setUkuranKaos('');
    alert('Data Berhasil di update')
    // setDataStudent(dataStudent.map((student) => student.id === id ? { ...student, nama
    //   : student}));
    setSearchQuery('')
    setJenisKaos('Pendek')
    getData();
  }
  const setNull =()=>{
    setKoordinator('');
    setUkuranKaos('');
    getData();
    setSearchQuery('');
    setJenisKaos("Pendek")
  }

  const classFilter = (key) =>{
    if(key != 'all'){
      const filteredData = dataStudent.filter((item)=> item.kodeKelas === key);
      setDataStudent(filteredData);
    }else{
      getData();
    }
  }

  
  useEffect(()=>{
      getData();
      setClass();
      setMipaAClass();
      
  },[])

    return (
        <>
          <div className="navbar bg-base-100 shadow-lg">
                <a className="btn btn-ghost text-xl">Admiral</a>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div className="mx-auto max-w-screen-md p-3">
              <div className="flex flex-wrap justify-center">
                <div className="card bg-base-100 w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Summary!</h2>
                    <p>Persentase yang sudah mengisi </p>
                  </div>
                  <p className="fw-bold text-center mb-4">{jmlDone} / 716 = <span className="text-success">{percentDone.toFixed(1)}%</span></p>
                  {/* <progress className="progress progress-success w-56 h-10 self-center my-4" value={percentDone} max="100"></progress> */}
                  {/* <div className="radial-progress text-success self-center" style={{ "--value": percentDone }} role="progressbar">
                    { percentDone.toFixed(1) }%
                  </div> */}
                </div>
              </div>
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

                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 btn-sm">IPS 1 - 15</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-slate-500 h-52 overflow-auto rounded-box z-[1] w-52 p-2 shadow">
                      <li><button onClick={()=> classFilter('all')} type="button" className="btn btn-ghost btn-sm text-white">All</button></li>
                      {studetnClass.map((item,index)=>(
                        <li key={index}onClick={()=> classFilter(item)} ><a  className="btn btn-ghost btn-sm text-white">{item}</a></li>
                      ))}
                      
                    </ul>
                  </div>

                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 btn-sm">MIPA 1 - 10</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-slate-500 h-52 overflow-auto rounded-box z-[1] w-52 p-2 shadow">
                      <li><button onClick={()=> classFilter('all')} type="button" className="btn btn-ghost btn-sm text-white">All</button></li>
                      {mipaRijal.map((item,index)=>(
                        <li key={index}onClick={()=> classFilter(item)} ><a  className="btn btn-ghost btn-sm text-white">{item}</a></li>
                      ))}
                      
                    </ul>
                  </div>


                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 btn-sm">IPS A - M</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-slate-500 h-52 overflow-auto rounded-box z-[1] w-52 p-2 shadow">
                      <li><button onClick={()=> classFilter('all')} type="button" className="btn btn-ghost btn-sm text-white">All</button></li>
                      {ipsNisa.map((item,index)=>(
                        <li key={index}onClick={()=> classFilter(item)} ><a  className="btn btn-ghost btn-sm text-white">{item}</a></li>
                      ))}
                      
                    </ul>
                  </div>

                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 btn-sm">MIPA A - L</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-slate-500 h-52 overflow-auto rounded-box z-[1] w-52 p-2 shadow">
                      <li><button onClick={()=> classFilter('all')} type="button" className="btn btn-ghost btn-sm text-white">All</button></li>
                      {mipaNisa.map((item,index)=>(
                        <li key={index}onClick={()=> classFilter(item)} ><a  className="btn btn-ghost btn-sm text-white">{item}</a></li>
                      ))}
                      
                    </ul>
                  </div>
                
                </div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                  {/* <button className="btn" onClick={()=>document.getElementById('successModal').showModal()}>open modal</button> */}
                  <dialog id="successModal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg text-center">Hello!</h3>
                      <p className="py-4 text-center">Data Berhasil diperbaharui</p>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                </dialog>
                
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
                    keyField="id"
                    paginationPerPage={15}
                    
                  />
                </div>
                <p className="text-center text-sm"><i>*Data ini berdasarkan data pembayaran buku tahunan dan kaos pada akhir semester kelas 12</i></p>
                {/* <div className="overflow-x-auto">
                    <table className="table table-xs table-zebra">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>No. Induk</th>
                            <th>Nama Lengkap</th>
                            <th>Kode Kelas</th>
                            <th>Koordinator</th>
                            <th>Ukuran Kaos</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataStudent != null ? 
                        
                        dataStudent.map((item, index)=>(
                            <tr key={index} >
                                <td>{index+=1}</td>
                                <td>{item.noInduk}</td>
                                <td>{item.nama}</td>
                                <td>{item.kodeKelas}</td>
                                <td>{item.koordinator}</td>
                                <td>{item.ukuranKaos}</td>
                                <td>
                                  <button type="button" onClick={()=> document.getElementById('modalUpdate').showModal()}  className="btn btn-sm btn-primary">Edit</button>
                                  <dialog id="modalUpdate" className="modal">
                                    <div className="modal-box">
                                      <h3 className="font-bold text-lg text-white">Update Data {item.nama}</h3>
                                      <hr />
                                      <div className="flex flex-row justify-between">
                                        <label className="form-control w-full max-w-xs">
                                          <div className="label">
                                            <span className="label-text text-sm">Nama</span>
                                          </div>
                                          <input type="text" placeholder="Type here" value={item.nama} id={`admiral-${item.nama}`} className="input input-bordered w-full input-sm max-w-xs" disabled />
                                        </label>
                                                    
                                      </div>
                                      <div className="modal-action">
                                        <form method="dialog">
                                          <button className="btn">Close</button>
                                        </form>
                                      </div>
                                    </div>
                                  </dialog>
                                </td>
                            </tr>
                        ))
                        
                        : (
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Littel, Schaden and Vandervort</td>
                                <td>Jabar</td>
                                <td>XL</td>
                                <td>Jabar</td>
                            </tr>
                        )}
                        </tbody>
                        <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>location</th>
                        </tr>
                        </tfoot>
                    </table>
                </div> */}
                <div className="px-2 mx-auto">
                  <h3 className="font-semibold text-center my-7" >FAQ</h3>
                  <div className="collapse collapse-arrow bg-base-200 my-2">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">Bagimana cara filter data per kelas nya?</div>
                    <div className="collapse-content">
                      <p>Ini bisa dilakukan dengan mengklik tombol filter kelas berdasarkan pengelompokkan kelas di atas. Jika ingin berpindah filter, klik <code>All</code> supaya semua data akan muncul.</p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-base-200 my-2">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">Bagaimana mengeceknya jika data sudah diisi?</div>
                    <div className="collapse-content">
                      <p>Hal ini bisa dilakkan dengan mengecek kembali data Anda dengan mencarinya berdasarkan <code>No Induk</code> atau dengan filter kelas </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-base-200 my-2">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">Bagaimana jika data saya tidak ada?</div>
                    <div className="collapse-content">
                      <p>Jika data Anda tidak ada, silahkan hubungi MPK </p>
                    </div>
                  </div>
                </div>
            </div>
        </>
    )
}