// import React, { useState, useEffect } from "react";
// import Loading from "./Loading";
// import Tours from "./Tours";
// import "./index.css";
// const url = "https://course-api.com/react-tours-project";

// const App = () => {
// 	const [loading, setloading] = useState(true);
// 	const [tours, setTours] = useState([]);

// 	const fetchTours = async () => {
// 		setloading(true);

// 		try {
// 			const response = await fetch(url);
// 			const tours = await response.json();
// 			setloading(false);
// 			setTours(tours);
// 		} catch (error) {
// 			setloading(false);
// 			console.log(error);
// 		}
// 	};
// 	useEffect(() => {
// 		fetchTours();	
// 	}, []);

// 	if (tours.length === 0) {
// 		return(
//     <>
// 			<main>
// 				<div className="undeline">
// 					<h2> No Tours Left</h2>
// 					<button className="btn" onClick={fetchTours}>Refresh</button>
// 				</div>
// 			</main>
// 		</>
//     )
// 	}

// 	const removeTour = (id) => {
// 		const newTours = tours.filter((tour) => tour.id !== id);
// 		setTours(newTours);
// 	};

// 	if (loading) {
// 		return (
// 			<main>
// 				<Loading />
// 			</main>
// 		);
// 	}

// 	return (
// 		<>
// 			<main>
// 				<Tours tours={tours} removeTour={removeTour} />
// 			</main>
// 		</>
// 	);
// };

// export default App;


import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import "./index.css";

// const url = "https://course-api.com/react-tours-project";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://course-api.com/react-tours-project";
const url = proxyUrl + apiUrl;

const App = () => {
	const [loading, setLoading] = useState(true);
	const [tours, setTours] = useState([]);
	const [error, setError] = useState(null);

	const fetchTours = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
				}
			});
			if (!response.ok) {
				throw new Error(`An error occurred: ${response.statusText}`);
			}
			const tours = await response.json();
			setLoading(false);
			setTours(tours);
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			fetchTours();
		}, 1000);
	}, []);

	if (loading) {
		return (
			<main>
				<Loading />
			</main>
		);
	}

	if (error) {
		return (
			<main>
				<div className="error">
					<h2>Error: {error}</h2>
					<button className="btn" onClick={fetchTours}>Try Again</button>
				</div>
			</main>
		);
	}

	if (tours.length === 0) {
		return (
			<main>
				<div className="underline">
					<h2>No Tours Left</h2>
					<button className="btn" onClick={fetchTours}>Refresh</button>
				</div>
			</main>
		);
	}

	const removeTour = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		setTours(newTours);
	};

	return (
		<main>
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	);
};

export default App;
