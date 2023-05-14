import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

function Models({ models, currentModel, setCurrentModel, setTemperature }) {
	const [activeModel, setActiveModel] = useState(null);

	const handleModelClick = (modelID) => {
		setActiveModel(modelID);
	};

	// Array of model descriptions
	const modelDescriptions = [
		{ id: 'whisper-1', description: 'Generate general text' },
		{ id: 'babbage', description: 'Short form text' },
		{ id: 'davinci', description: 'Long form text' },
		{ id: 'text-davinci-edit-001', description: 'Articles and Essays' },
		{
			id: 'text-similarity-babbage-001',
			description: 'Compare texts ',
		},
		{ id: 'babbage-code-search-code', description: 'Generate code' },
		{ id: 'code-davinci-edit-001', description: 'High quality code' },
		{ id: 'text-davinci-001', description: 'Human-like text' },
		{ id: 'ada', description: 'Medical texts' },
		{ id: 'babbage-code-search-text', description: 'Code completion' },
	];

	// Function to generate the top ten models
	const generateTopTenModels = () => {
		const topTenModels = models.slice(0, 10);
		return topTenModels.map((model, index) => {
			const description = modelDescriptions.find(
				(desc) => desc.id === model.id
			)?.description;
			console.log(`Model ${model.id} description: ${description}`);
			return (
				<div
					key={index}
					className={`w-[200px] h-10 pt-2 px-2 my-4 rounded-md text-start cursor-pointer ${
						activeModel === model.id
							? 'bg-[#1a371b] text-white'
							: 'bg-white hover:bg-[#224523] hover:text-orange-100'
					}`}
					onClick={() => {
						setCurrentModel(model.id);
						handleModelClick(model.id);
					}}
				>
					<span>
						<FaRobot className='robot' />
						<h5 className='text-lg font-semibold'>{description}</h5>
					</span>
				</div>
			);
		});
	};

	return (
		<aside className='w-[260px] p-[16px] bg-[#f9f8f9]'>
			<div className='text-xl font-semibold text-left my-4'>Chats</div>
			{generateTopTenModels()}
		</aside>
	);
}

export default Models;
