import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';

// from John Smilga webstie [https://course-api.com/react-tours-project]
const url = 'https://course-api.com/react-tours-project';
function App() {
	const [ loading, setLoading ] = useState(true);
	const [ tours, setTours ] = useState([]);

	const removeTour = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		setTours(newTours);
	};

	const fetchTours = async () => {
		setLoading(true);
		try {
			const res = await fetch(url);
			const data = await res.json();
			setLoading(false);
			setTours(data);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTours();
	}, []);

	return (
		<main>
			{loading && <Loading />}
			{!loading && <Tours tours={tours} removeTour={removeTour} />}
			{tours.length === 0 && (
				<main>
					<div className='title'>
						<h2>no tours left</h2>
						<button className='btn' onClick={fetchTours}>
							Refresh
						</button>
					</div>
				</main>
			)}
		</main>
	);
}

export default App;
