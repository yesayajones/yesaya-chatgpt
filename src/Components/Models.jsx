import React from 'react';

function Models({ models, currentModel, setCurrentModel, setTemperature }) {
	// Function to generate the top ten models
	const generateTopTenModels = () => {
		const topTenModels = models.slice(0, 10);
		return topTenModels.map((model, index) => (
			<div
				key={index}
				className='p-[12px] border border-white rounded-[5px] text-left transition-[0.25s] hover:bg-[#1a371b] hover:text-white'
				onClick={() => setCurrentModel(model.id)}
			>
				{model.id}
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
