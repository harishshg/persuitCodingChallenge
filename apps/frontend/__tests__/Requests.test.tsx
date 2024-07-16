import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Requests from '../views/Requests';
import axios from 'axios';

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: [] }))
}));


const mockData = [
  { id: '1', title: 'Test Title 1', author: 'Author 1', createdAt: 1625097600000, published: true, auction: false },
  { id: '2', title: 'Test Title 2', author: 'Author 2', createdAt: 1625184000000, published: false, auction: true },
];

describe('Requests Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    (axios as jest.Mock).mockResolvedValueOnce({ data: mockData });
    render(<Requests />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('main')).toBeInTheDocument());
  });

  test('renders error state when API call fails', async () => {
    (axios as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    await act(async () => {
      render(<Requests />);
    });
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent('Error!');
    });
  });

  test('renders no requests message when data is empty', async () => {
    (axios as jest.Mock).mockResolvedValueOnce({ data: [] });
    await act(async () => {
      render(<Requests />);
    });
    await waitFor(() => {
      expect(screen.getByText('No requests')).toBeInTheDocument();
    });
  });

  test('renders requests list when data is loaded', async () => {
    (axios as jest.Mock).mockResolvedValueOnce({ data: mockData });
    await act(async () => {
      render(<Requests />);
    });
    await waitFor(() => {
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getAllByTestId('card')).toHaveLength(2);
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  test('changes page when pagination is clicked', async () => {
    (axios as jest.Mock).mockResolvedValueOnce({ data: mockData });
    await act(async () => {
      render(<Requests />);
    });
    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    (axios as jest.Mock).mockResolvedValueOnce({ data: mockData });
    await act(async () => {
      userEvent.click(screen.getByText('Next'));
    });

    await waitFor(() => {
      expect(axios).toHaveBeenCalledTimes(2);
      expect(axios).toHaveBeenLastCalledWith('http://localhost:3001/requests?pageNumber=2');
    });
  });
});