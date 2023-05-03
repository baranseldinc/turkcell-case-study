/* eslint-disable func-names */
/* eslint-disable no-undef */
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { ImportCSVFile } from './import-schooll-list'

test('Should have a input file for uploading', async () => {
  const { container } = render(
    <Provider store={store}>
      <ImportCSVFile />
    </Provider>
  )

  expect(container.querySelector('input[type=file]')).toBeInTheDocument()
})
