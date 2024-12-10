import React, { useState } from "react";

const backendUrl = "http://localhost:1337";
//const backendUrl = "https://dune-backend-8ug0.onrender.com";

const providersNames = [
	"discord",
	"facebook",
	"github",
	"google",
	"instagram",
	"linkedin",
	"reddit",
	"twitch",
	"twitter",
	"vk",
	"auth0",
];

const LoginButton = ({ providerName }: { providerName: string }) => (
	<a href={`${backendUrl}/api/connect/${providerName}`}>
		<button style={{ width: "150px" }}>Connect to {providerName}</button>
	</a>
);

const LogoutButton = ({
	onClick,
}: { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => (
	<button onClick={onClick}>Logout</button>
);

const Home = () => {
	const [isLogged, setIsLogged] = useState(!!localStorage.getItem("jwt"));

	const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		localStorage.removeItem("jwt");
		localStorage.removeItem("username");
		setIsLogged(false);
	};

	let buttons;

	if (isLogged) {
		buttons = <LogoutButton onClick={logout} />;
	} else {
		buttons = (
			<ul style={{ listStyleType: "none" }}>
				{providersNames.map((providerName) => (
					<li key={providerName}>
						<LoginButton providerName={providerName} />
					</li>
				))}
			</ul>
		);
	}

	let text;

	if (isLogged) {
		text = `Welcome ${localStorage.getItem("username")}, you are connected!`;
	} else {
		text = "You are not connected. Please log in.";
	}

	return (
		<div>
			<p>{text}</p>
			{buttons}
		</div>
	);
};

export default Home;
