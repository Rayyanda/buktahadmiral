import { Link } from "react-router";

export default function Kaos()
{
    return (
        <>
            <div className="p-5 min-h-80">
                <Link className="btn btn-outline btn-secondary my-5" to={'/'} >Kembali</Link>
                <div className="carousel carousel-vertical rounded-box h-96">
                    <div className="carousel-item h-full">
                        <img src="./images/kaos-1.jpg" />
                    </div>
                    <div className="carousel-item h-full">
                        <img src="./images/kaos-2.jpg" />
                    </div>
                    <div className="carousel-item h-full">
                        <img src="./images/kaos-3.jpg" />
                    </div>
                    
                </div>
            </div>
        </>
    )
}