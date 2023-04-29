//Import the necessary dependencies
import { useState, useEffect } from 'react';
import Models from './Components/Models';
import './App.css';
import './normal.css';

//Setup the configuration for the OpenAI API
import { Configuration, OpenAIApi } from 'openai';

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
	// Setup API configuration using API key and organization ID.
	const configuration = new Configuration({
		organization: 'org-59LEeODrzV0RYH7nMyNJST7M',
		apiKey: apiKey,
	});
	const openai = new OpenAIApi(configuration);

	//Define state variables using useState
	//Keep track of user input
	const [input, setInput] = useState('');
	//Set current model to be text-davinci-003
	const [currentModel, setCurrentModel] = useState('text-davinci-003');
	//Keeps track of the chat history
	const [chatLog, setChatLog] = useState([
		{
			user: 'gpt',
			message: 'How can I help you my master?',
		},
	]);

	const [currentTemperature, setTemperature] = useState(0);
	const temperature = [0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
	const [models, setModels] = useState([]);

	//onload call getEngines function
	useEffect(() => {
		getEngines();
	}, []);

	//Clear chat log
	const clearChat = () =>
		setChatLog([
			{
				user: 'gpt',
				message: 'How can I help you my master?',
			},
		]);

	//getEngines function retrieves the list of available language models
	function getEngines() {
		//Use the listEngines to get the list of available engines in OpenAI API
		const response = openai
			.listEngines()
			//Update models variable using the setModels function
			.then((res) => setModels(res.data.data));
	}

	//Called when user submitts a message to the chatbot
	async function handleSubmit(e) {
		//prevent page from reloading
		e.preventDefault();
		//Add user's message to the chat log array on top of the current chat
		let newChatLog = [...chatLog, { user: 'me', message: `${input}` }];
		console.log(newChatLog);
		//Update the chat log state variable using the setChatLog function to include the new message
		await setChatLog(newChatLog);

		//Send request (with several parameters) to OpenAI API to generate response on user's input.
		//Use the createCompletion method from OpenAI API to generate response to the user's input.
		const response = await openai.createCompletion({
			//parameters
			//engine
			model: currentModel,
			//User's input
			prompt: input,
			//Number of tokens to generate in the response
			max_tokens: 100,
			//Temperature setting
			temperature: currentTemperature,
		});

		//When response is received, setInput state to empty string
		await setInput('');
		console.log(response.data);
		//update the newChatLog array with the chatbot's reponse
		newChatLog = [
			...chatLog,
			{
				user: 'gpt',
				message: response.data.choices[0].text.toString().replace('\n\n', '\n'),
			},
		];
		//update chat log state
		await setChatLog(newChatLog);
	}

	return (
		<div className='flex text-[#2b3e2d] text-center font-[500]'>
			{/* Side Bar */}
			<aside className='w-[260px] p-[16px] bg-white'>
				<div
					className='p-[12px] border border-white rounded-[5px] text-left transition-[0.25s] hover:bg-[rgba(255,255,255,0.1)]'
					onClick={clearChat}
				>
					<span className='pl-[6px] pr-[12px]'>+</span>
					New Chat
				</div>

				<div className='text-xl font-semibold text-left my-4'>Models</div>
				{/* Use select element to create dropdown menu */}
				<select
					value={currentModel}
					onChange={(e) => setCurrentModel(e.target.value)}
					className='w-[200px] h-auto p-[12px] rounded-[5px] text-left transition-[0.25s] bg-[#f9f8f9] overflow-x-hidden border'
				>
					{/* Render each language model option in the drop down menu */}
					{models.map((model, index) => (
						//
						<option key={index} value={model.id}>
							{model.id}
						</option>
					))}
				</select>
				<div className='text-start text-sm my-3 w-[200px]'>
					Controls the response engine. Davinci produces best results.
				</div>

				<div className='text-xl font-semibold text-left mt-8 mb-4'>
					Temperature
				</div>
				{/* Use select element to create dropdown menu  */}
				<select
					value={currentTemperature}
					onChange={(e) => setTemperature(e.target.value)}
					className='w-[200px] h-auto p-[12px] rounded-[5px] text-left transition-[0.25s] bg-[#f9f8f9] overflow-x-hidden border'
				>
					{/* Render each temperature option in the dropdown menu */}
					{temperature.map((temp, index) => (
						<option key={index} value={temp}>
							{temp}
						</option>
					))}
				</select>
				<div
					className='w-[200px] h-10 pt-2 px-2 bg-white bg-opacity-20 my-4 rounded-md text-start'
					onClick={() => setTemperature(0)}
				>
					0 - Logical
				</div>
				<div
					className='w-[200px] h-10 pt-2 px-2 bg-white bg-opacity-20 my-4 rounded-md text-start'
					onClick={() => setTemperature(0.5)}
				>
					0.5 - Balanced
				</div>
				<div
					className='w-[200px] h-10 pt-2 px-2 bg-white bg-opacity-20 my-4 rounded-md text-start'
					onClick={() => setTemperature(1)}
				>
					1 - Creative
				</div>
				<div className='text-start text-sm my-3 w-[200px]'>
					The temperature parameter controls the randomness of the model. 0 is
					the most logical, 1 is the most creative.
				</div>
			</aside>
			<Models
				models={models}
				currentModel={currentModel}
				setCurrentModel={setCurrentModel}
				setTemperature={setTemperature}
			/>

			{/* Chat-Box */}
			<section className='w-screen h-screen bg-[#f9f8f9] relative'>
				{/* Chat-Log */}
				<div className='text-left h-full mb-[50px] overflow-y-scroll'>
					{/* Render the chat message in the chat history */}
					{chatLog.map((message, index) => (
						<ChatMessage key={index} message={message} />
					))}
					<div className='h-24'></div>
				</div>

				<div className='px-[24px] absolute bottom-[12px] left-0 right-[12px] mx-20'>
					<form onSubmit={handleSubmit} className=''>
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className='bg-[#f9f8f9] w-11/12 rounded-[5px] border-none m-[12px] outline-none shadow-md p-[6px] h-12 px-6'
						></input>
					</form>
				</div>
			</section>
		</div>
	);
}

export default App;

const ChatMessage = ({ message }) => {
	if (message.user === 'gpt') {
		return (
			<div className='bg-[#f9f8f9]'>
				<div className='max-w-[640px] mx-auto flex p-[12px] px-[24px]'>
					{/* Avatar */}
					{/* Image of the first avatar */}
					<div className='bg-white rounded-full w-[40px] h-[40px] min-w-[40px] items-center flex align-middle justify-center'>
						<img
							src='chat-gpt-logo.jpg'
							className='w-[40px] h-[40px] rounded-full'
						/>
					</div>
					{/* message */}
					<div className='px-[40px] h-min'>{message.message}</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className=''>
				<div className='max-w-[640px] mx-auto flex p-[12px] px-[24px] '>
					{/* Avatar */}
					{/* Image of the second avatar */}
					<div className='bg-white rounded-full w-[40px] h-[40px]'>
						<img src='user.png' className='w-[40px] h-[40px] rounded-full' />
					</div>
					{/* message */}
					<div className='px-[40px]'>{message.message}</div>
				</div>
			</div>
		);
	}
};
