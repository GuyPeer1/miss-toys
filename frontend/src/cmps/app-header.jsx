import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header full">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/dash">DashBoard</NavLink> |
                <NavLink to="/toys">Shop</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav> 
            <img  className="logo-img" src={require(`../assets/img/logo.png`)} alt="toy" />

        </header>
    )
}