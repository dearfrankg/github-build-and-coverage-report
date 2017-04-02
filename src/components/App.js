import React, {Component} from 'react';
import Header from './Header'
import RepoTable from './RepoTable'
import { observer, inject } from 'mobx-react'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header  />
        <RepoTable  />
      </div>
    );
  }
}
