import React, { useState } from 'react';

function Models({ models, currentModel, setCurrentModel, setTemperature }) {
	const [activeModel, setActiveModel] = useState(null);
	const handleModelClick = (modelID) => {
		setActiveModel(modelID);
	};
	// Function to generate the top ten models
	const generateTopTenModels = () => {
		const topTenModels = models.slice(0, 10);
		return topTenModels.map((model, index) => (
			<div
				key={index}
				className={`w-[200px] h-10 pt-2 px-2 my-4 rounded-md text-start cursor-pointer ${
					activeModel === model.id
						? 'bg-[#1a371b] text-white'
						: 'bg-white hover:bg-[#1a371b]'
				}`}
				onClick={() => {
					setCurrentModel(model.id);
					handleModelClick(model.id);
				}}
			>
				<h3 className='text-lg font-semibold'>{model.id}</h3>
				<p className='text-gray-500'></p>
			</div>
		));
	};

	return (
		<aside className='w-[260px] p-[16px] bg-[#f9f8f9]'>
			<div className='text-xl font-semibold text-left my-4'>Chats</div>
			{generateTopTenModels()}
		</aside>
	);
}

export default Models;
