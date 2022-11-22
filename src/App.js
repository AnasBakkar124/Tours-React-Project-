import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import "./index.css";
const url = "https://course-api.com/react-tours-project";

const App = () => {
	const [loading, setloading] = useState(true);
	const [tours, setTours] = useState([]);

	const fetchTours = async () => {
		setloading(true);

		try {
			const response = await fetch(url);
			const tours = await response.json();
			setloading(false);
			setTours(tours);
		} catch (error) {
			setloading(false);
			console.log(error);
		}
	};
	useEffect(() => {
		fetchTours();	
	}, []);

	if (tours.length === 0) {
		return(
    <>
			<main>
				<div className="undeline">
					<h2> No Tours Left</h2>
					<button className="btn" onClick={fetchTours}>Refresh</button>
				</div>
			</main>
		</>
    )
	}

	const removeTour = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		setTours(newTours);
	};

	if (loading) {
		return (
			<main>
				<Loading />
			</main>
		);
	}

	return (
		<>
			<main>
				<Tours tours={tours} removeTour={removeTour} />
			</main>
		</>
	);
};

export default App;
