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

  handleChange = (e) => {
    const { github } = this.props
    github.githubUsername = e.target.value
  }

  render() {
    const { github } = this.props
    return (
      <Flex justify='center' column style={{userSelect: 'none', textAlign: 'center'}}>
        <div>
          <h1 >Github Build and Coverage Report</h1>
          Github Username: <input 
            value={github.githubUsername}
            onChange={this.handleChange}
          /> 
          <div style={{paddingBottom: 30}}></div>
        </div>
      </Flex>
    );
  }
}






