import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
const backendUrl = "http://localhost:1337";
//const backendUrl = "https://dune-backend-8ug0.onrender.com";

const LoginRedirect = () => {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const { providerName } = params;
	const { search } = location;
	const [text, setText] = useState("Loading...");

	useEffect(() => {
		// Successfully logged with the provider
		// Now logging with Node express by using the access_token (given by the provider) in props.location.search
		fetch(`${backendUrl}/api/auth/${providerName}/callback${search}`)
			.then((res) => {
				if (res.status !== 200) {
					throw new Error(`Couldn't login to google. Status: ${res.status}`);
				}
				return res;
			})
			.then((res) => res.json())
			.then((res) => {
				console.log("redirect res: ", res);
				// Successfully logged with google
				// Now saving the jwt to use it for future authenticated requests to Node express
				localStorage.setItem("jwt", res.jwt);
				localStorage.setItem("username", res.user.username);
				setText(
					"You have been successfully logged in. You will be redirected in a few seconds...",
				);
				setTimeout(() => navigate("/"), 3000); // Redirect to homepage after 3 sec
			})
			.catch((err) => {
				console.log(err);
				setText("An error occurred, please see the developer console.");
			});
	}, [location.search, navigate, params.providerName, providerName, search]);

	return (
		<div>
			<h1>This is Login redirect screen</h1>
			<h3>{text}</h3>
		</div>
	);
};

export default LoginRedirect;
