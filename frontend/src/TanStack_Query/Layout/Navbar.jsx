import { NavLink } from "react-router-dom"
export const Navbar = () => {
  return (
    <>
    <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
    <a className="btn btn-ghost text-xl">RQuery</a>
    </div>
    <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/fOld">FetchTraditional</NavLink></li>
        <li><NavLink to="/rq">ReactQuery</NavLink></li>
    </ul>
    </div>
</div>
    </>
)
}
