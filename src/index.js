import React from 'react';
import ReactDOM from 'react-dom';
import ReturnWordpress from './components/blog';
import './App.scss';

const mountNode = document.getElementById('root');

const Myelement = () => {
	return (
		<div className='container'>
			<div className='row'>
				<ReturnWordpress />
			</div>
		</div>
		);

}

ReactDOM.render(<Myelement />, mountNode);

