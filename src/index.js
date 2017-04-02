import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'mobx-react'
import { create } from 'mobx-persist'

import github from 'src/store'
import App from 'src/components/App'

create({})('github', github)

render(
  <Provider github={github} >
    <App/>
  </Provider>,
  document.querySelector('#app')
)
