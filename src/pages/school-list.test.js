/* eslint-disable func-names */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { SchoolList } from './school-list'
import { store } from '../app/store'

beforeEach(() => {
  render(
    <Provider store={store}>
      <SchoolList />
    </Provider>
  )
})

test('Should render table columns correctly', async () => {
  expect(screen.getByText(/School ID/i)).toBeInTheDocument()
  expect(screen.getByText(/Active \?/i)).toBeInTheDocument()
  expect(screen.getByText(/School Name/i)).toBeInTheDocument()
  expect(screen.getByText(/Institution Type/i)).toBeInTheDocument()
  expect(screen.getByText(/City/i)).toBeInTheDocument()
  expect(screen.getByText(/County/i)).toBeInTheDocument()
  expect(screen.getByText(/Actions/i)).toBeInTheDocument()
})

test('Table should have 2 switches for changing status', async () => {
  const switches = await screen.findAllByRole('switch')
  expect(switches.length).toBe(2)
})
