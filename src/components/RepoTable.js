import React, {Component, PropTypes} from 'react'
import { observer, inject } from 'mobx-react'
import {Flex} from 'reflexbox'
import moment from 'moment'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

@inject('github')
@observer
export default class RepoTable extends Component {
  render() {
    const { github } = this.props
    return (
      <div style={{width: '90%', margin: '0 auto'}}>
        <ReactTable
          defaultSorting={[{ id: 'created_at', desc: true }]}
          data={github.repos}
          columns={getColumns()}
        />
      </div> 
    )
  }
}

RepoTable.propTypes = {
  github: PropTypes.object
}


function getColumns() {
  return [
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
}