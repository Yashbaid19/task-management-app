import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2">
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <h3 className="text-white m-0">📝 Task Manager</h3>
      <div>
        <Link to="/" className="btn btn-outline-light mx-1">Home</Link>
        <Link to="/tasks" className="btn btn-outline-light mx-1">Tasks</Link>
        <button className="btn btn-danger mx-1">Logout</button>
      </div>
    </div>
  </nav>
);

export default Navbar;