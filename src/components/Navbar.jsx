import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex align-items-center">
				<Link to="/">
					<img
						src="/logo.png"
						alt="Logo"
						style={{
							width: "120px",     // define el ancho deseado
							height: "auto",     // mantiene la proporción original
							objectFit: "contain",
							transition: "transform 0.3s",
							marginRight: "15px",
							cursor: "pointer",
							boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
							borderRadius: "8px",
						}}
						onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
						onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
					/>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};








// import { Link } from "react-router-dom";

// export const Navbar = () => {

// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
// 				</Link>
// 				<div className="ml-auto">
// 					<Link to="/demo">
// 						<button className="btn btn-primary">Check the Context in action</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };