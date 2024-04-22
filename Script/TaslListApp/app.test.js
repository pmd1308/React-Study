// App.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Extend Jest's expect

import App from './App';

describe('Task List App', () => {
  test('renders the task list application', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    
    expect(getByText('Task List')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter a new task')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const input = getByPlaceholderText('Enter a new task');
    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.submit(input);

    expect(getByText('Test Task')).toBeInTheDocument();
  });

  test('marks a task as completed', () => {
    const { getByText } = render(<App />);

    const task = getByText('Test Task');
    const completeButton = getByText('Complete');
    fireEvent.click(completeButton);

    expect(task).toHaveClass('completed');
  });

  test('removes a task', () => {
    const { queryByText, getByText } = render(<App />);

    const task = getByText('Test Task');
    const removeButton = getByText('Remove Task');
    fireEvent.click(removeButton);

    expect(queryByText('Test Task')).not.toBeInTheDocument();
  });

  test('displays error message when adding an empty task', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const input = getByPlaceholderText('Enter a new task');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(input);

    expect(getByText('Task description cannot be empty.')).toBeInTheDocument();
  });
});
