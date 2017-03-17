import React from 'react'
import { Flex, Box } from 'reflexbox'
import { observer, inject } from 'mobx-react'
import { Button, ButtonGroup } from 'react-bootstrap';

@inject('github')
@observer
class RepoList extends React.Component {
  render () {
    const { github } = this.props
    return (
      <Flex justify='center'>
        <Flex column style={{borderBottom: '1px solid #ddd'}}>
          {github.filteredRepos.map((repo, i) => {
            const getGithubUrl = (name) => `https://github.com/dearfrankg/${name}`
            const getBuildUrl = (name) => `https://travis-ci.org/dearfrankg/${name}`
            const getCoverageUrl = (name) => `https://coveralls.io/github/dearfrankg/${name}`
            const getBuildBadgeUrl = (name) => `https://img.shields.io/travis/dearfrankg/${name}/master.png?style=flat-square`
            const getCoverageBadgeUrl = (name) => `https://img.shields.io/coveralls/dearfrankg/${name}/master.png?style=flat-square`
            const rowStyle = {
              width: 600,
              border: '1px solid #ddd',
              borderBottom: 'none',
              backgroundColor: github.selectedRepos.includes(repo.id) ? 'lavender' : 'transparent'
            }

            return (
              <div key={i} onClick={() => github.toggleSelection(repo.id)} >
                <Flex p={1} justify='space-between' style={rowStyle}>
                  <Box px={1} style={{width: 30}}>{i}</Box>
                  <Box px={1}>
                    <a href={getGithubUrl(repo.name)} onClick={e => e.stopPropagation()}>{repo.name}</a>
                  </Box>
                  <Box px={1} flexAuto style={{ textAlign: 'right' }} >
                    <a href={getBuildUrl(repo.name)} onClick={e => e.stopPropagation()}>
                      <img src={getBuildBadgeUrl(repo.name)} alt=""/>
                    </a>
                  </Box>
                  <Box px={1} style={{width: 150, textAlign: 'right' }} >
                    <a href={getCoverageUrl(repo.name)} onClick={e => e.stopPropagation()}>
                      <img src={getCoverageBadgeUrl(repo.name)} alt=""/>
                    </a>
                  </Box>
                </Flex>
              </div>
            )
          })}
        </Flex>
      </Flex>
    )
  }
}

@inject('github')
@observer
export default class Coverage extends React.Component {
  componentWillMount () {
    const { github } = this.props
    const url = 'https://api.github.com/users/dearfrankg/repos?per_page=1000'
    return fetch(url)
    .then(res => res.json())
    .then(data => {
      github.repos = data
    })
  }

  render () {
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
          <h1>Github Build and Coverage Report</h1>

          <ButtonGroup style={{margin: 20}}>
            <Button onClick={() => github.filter = 'all'} style={allStyle}>All</Button>
            <Button onClick={() => github.filter = 'selected'} style={selectedStyle}>Selected</Button>
          </ButtonGroup>
          <Button onClick={github.clear} >Clear</Button>

        </div>
        <RepoList />
      </Flex>
    )
  }
}
