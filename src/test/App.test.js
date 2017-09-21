import React from 'react';
import ReactDOM from 'react-dom';
import CreatePage from '../components/CreatePage';

it('renders without crashing CreatePage', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreatePage />, div);
});
