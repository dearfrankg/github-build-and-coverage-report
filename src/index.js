import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'mobx-react'
import { create } from 'mobx-persist'

import github from './store'
import App from './App'

const hydrate = create({})
hydrate('github', github)
.then(() => console.log('github hydrated'))

render(
  <Provider github={github} >
    <App/>
  </Provider>,
  document.querySelector('#app')
)
