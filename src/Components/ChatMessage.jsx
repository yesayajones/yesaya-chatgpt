import React from 'react';

const ChatMessage = ({ user, message }) => {
	return (
		<div className='flex justify-start items-center my-4'>
			<div className='w-10 h-10 rounded-full bg-gray-400'></div>
			<div className='ml-4'>
				<div className='text-sm font-semibold'>{user}</div>
				<div className='text-sm'>{message}</div>
			</div>
		</div>
	);
};

export default ChatMessage;
