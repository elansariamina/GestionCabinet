import React from 'react';

const TitleService = ({ title }) => {
    return (
        <div className='flex items-center justify-center mx-auto max-w-screen-md bg-24b6e1 border-2 border-white rounded-2xl p-4'>
            <h1 className='text-4xl text-white'>{title}</h1>
        </div>
    );
};

export default TitleService;
