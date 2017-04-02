import { observable, computed, autorun } from 'mobx'
import { persist } from 'mobx-persist'
import pick from 'lodash/pick'

class Github {
  static create = () => new Github()

  static filterList = {
    all: () => true,
    selected: repo => {
      return this.a.selectedRepos.includes(repo.id)
    }
  }

  @persist @observable githubUsername = ''

  @persist @observable filter = 'all'

  @observable repos = []

  @persist('list') @observable selectedRepos = []

  @computed get filteredRepos () {
    return this.repos.filter(Github.filterList[this.filter])
  }


  toggleSelection = (repoId) => {
    var i = this.selectedRepos.indexOf(repoId);
    (i !== -1) ? this.selectedRepos.splice(i, 1) : this.selectedRepos.push(repoId)
  }

  clear = () => {
    this.selectedRepos = []
  }

  getRepos () {
    const { githubUsername } = this
    if (!githubUsername) {
      this.repos = []
      return
    }

    const url = `https://api.github.com/users/${githubUsername}/repos?per_page=1000`
    return fetch(url)
    .then(res => res.json())
    .then(data => {
      const newRepos = data.map(item => {
        let newItem
        newItem = pick(item, [ 'name', 'created_at', 'pushed_at' ])
        newItem.urls = this.getUrls(item.name)
        return newItem
      })
      this.repos = newRepos
    })
    .catch(e => this.repos = [])
  }

  getUrls = (name) => {
    const { githubUsername } = this
    return {
      githubUrl: `https://github.com/${githubUsername}/${name}`,
      buildUrl: `https://travis-ci.org/${githubUsername}/${name}`,
      buildBadgeUrl: `https://api.travis-ci.org/${githubUsername}/${name}.svg?branch=master`,
      coverageUrl: `https://coveralls.io/github/${githubUsername}/${name}`,
      coverageBadgeUrl: `https://coveralls.io/repos/github/${githubUsername}/${name}/badge.svg?branch=master`,
    }
  }
}

const github = Github.create()

autorun(() => {
  github.getRepos()
})

export default github
