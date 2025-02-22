import { Link } from "react-router";

export default function Preview()
{
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <h1 className="text-5xl font-bold text-center">Coming Soon</h1>
                        <p className="py-6 text-center">
                            <Link className="btn btn-outline btn-secondary" to={'/'} >Kembali</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}