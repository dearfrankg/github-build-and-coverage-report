import React, {Component, PropTypes} from 'react'
import { observer, inject } from 'mobx-react'
import {Flex} from 'reflexbox'
import moment from 'moment'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import pick from 'lodash/pick'

const columns = [
  { header: 'Name', accessor: 'name',
    render: props => {
      const { name, urls: { githubUrl }} = props.row
      return <a href={githubUrl} onClick={e => e.stopPropagation()}>
        {name}
      </a>
    }
  }, 
  { header: 'Created At', accessor: 'created_at',
    render: props => moment(props.row.created_at, moment.ISO_8601).fromNow()
  }, 
  { header: 'Pushed At', accessor: 'pushed_at',
    render: props => moment(props.row.pushed_at, moment.ISO_8601).fromNow()
  }, 
  { header: 'Build', sortable: false, width: 150, style: {textAlign: 'center'},
    render: props => {
      const { buildUrl, buildBadgeUrl } = props.row.urls
      return <a href={buildUrl} onClick={e => e.stopPropagation()}>
        <img src={buildBadgeUrl} alt=""/>
      </a>
    }
  },
  { header: 'Coverage', sortable: false, width: 150, style: {textAlign: 'center'},
    render: props => {
      const { coverageUrl, coverageBadgeUrl } = props.row.urls
      return <a href={coverageUrl} onClick={e => e.stopPropagation()}>
        <img src={coverageBadgeUrl} alt=""/>
      </a>
    }
  }
]


@inject('github')
@observer
export default class RepoTable extends Component {

  state = {
    rowData: []
  }

  componentWillMount () {
    const { github } = this.props
    github.getRepos().then(data => {
      github.repos = data
      this.setState({
        rowData: github.repos.map(item => {
          let newItem = pick(item, [ 'name', 'created_at', 'pushed_at' ])
          newItem.urls = this.getUrls(item.name)
          return newItem
        })
      })
    })
  }

  getUrls = (name) => {
    return {
      githubUrl: `https://github.com/dearfrankg/${name}`,
      buildUrl: `https://travis-ci.org/dearfrankg/${name}`,
      buildBadgeUrl: `https://img.shields.io/travis/dearfrankg/${name}/master.png?style=flat-square`,
      coverageUrl: `https://coveralls.io/github/dearfrankg/${name}`,
      coverageBadgeUrl: `https://img.shields.io/coveralls/dearfrankg/${name}/master.png?style=flat-square`,
    }
  }

  render() {
    return (
      <div style={{width: '90%', margin: '0 auto'}}>
        <ReactTable
          defaultSorting={[{
            id: 'created_at',
            desc: true
          }]}
          data={this.state.rowData}
          columns={columns}
        />
      </div> 
    )
  }
}

RepoTable.propTypes = {
  
}