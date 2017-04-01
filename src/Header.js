import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react'
import {Flex} from 'reflexbox'
import { Button, ButtonGroup } from 'react-bootstrap';

@inject('github')
@observer
export default class Header extends Component {
  static propTypes = {
    github: PropTypes.object.isRequired
  }

  render() {
    const { github } = this.props
    const allStyle = {
      width: 100,
      backgroundColor: github.filter === 'all' ? 'lavender' : 'transparent'
    }
    const selectedStyle = {
      width: 100,
      backgroundColor: github.filter === 'selected' ? 'lavender' : 'transparent'
    }


    return (
      <Flex justify='center' column style={{userSelect: 'none', textAlign: 'center'}}>
        <div>
          <h1 style={{paddingBottom: 30}}>Github Build and Coverage Report</h1>
        </div>
      </Flex>
    );
  }
}






