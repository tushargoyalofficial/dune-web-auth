import { useCallback, useState } from "react";

const backendUrl = "http://localhost:1337";
//const backendUrl = "https://dune-backend-8ug0.onrender.com";

const raw = JSON.stringify({
	avatar: 1,
	mobile: "+918877665544",
	gender: "Male",
	age: 33,
	firstName: "John",
	lastName: "Doe",
	address: {
		current: {
			address: "100 Daniel Lane",
			city: "Lake Konikom koreoa",
			district: "New York",
			state: "New York",
			pin: "11334",
			country: "USA",
		},
		permanent: {
			address: "100 Daniel Lane",
			city: "Lake Konikom koreoa",
			district: "New York",
			state: "New York",
			pin: "11334",
			country: "USA",
		},
	},
	job: [
		{
			jobTitle: "Tram Driver",
			jobLocation: "Kolkata",
			jobExperience: 3,
		},
		{
			jobTitle: "Truck Driver",
			jobLocation: "Delhi",
			jobExperience: 4,
		},
	],
	idProof: {
		aadhar: "222233334444",
		pan: "BAACP1245A",
		drivingLicense: "RDFEFEGYUOIIO76767GHG",
	},
});

const Profile = () => {
	const [text, setText] = useState("Loading...");

	const fetchProfile = useCallback(() => {
		fetch(`${backendUrl}/api/users/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			redirect: "follow",
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error(`Not able to fetch profile: ${res.status}`);
				}
				return res;
			})
			.then((res) => res.json())
			.then((res) => {
				console.log("profile res: ", res);
				setText("Profile fetched successfully");
			})
			.catch((err) => {
				console.log(err);
				setText("An error occurred, please see the developer console.");
			});
	}, []);

	const createProfile = useCallback(() => {
		fetch(`${backendUrl}/api/profile/createAndLink`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			body: raw,
			redirect: "follow",
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error(`Not able to create profile: ${res.status}`);
				}
				return res;
			})
			.then((res) => res.json())
			.then((res) => {
				console.log("profile creation res: ", res);
				setText("Profile created successfully");
			})
			.catch((err) => {
				console.log(err);
				setText("An error occurred, please see the developer console.");
			});
	}, []);

	return (
		<div>
			<h1>This is Login redirect screen</h1>
			<h3>{text}</h3>
			<br />
			<button onClick={fetchProfile}>Fetch Profile</button>
			<button onClick={createProfile}>Create Profile</button>
		</div>
	);
};

export default Profile;
