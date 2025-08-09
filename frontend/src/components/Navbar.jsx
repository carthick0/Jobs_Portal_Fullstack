import { Link } from "react-router-dom";


export default function Navbar() {

 
  

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        
      </div>
      <div>
      
          <Link to="/login" className="underline hover:text-gray-200">
            Login as Admin
          </Link>
       
      </div>
    </nav>
  );
}
