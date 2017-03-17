import { observable, computed } from 'mobx'
import { persist } from 'mobx-persist'

class Github {
  static create = () => new Github()
  static filterList = {
    all: () => true,
    selected: repo => {
      return this.a.selectedRepos.includes(repo.id)
    }
  }
  @persist @observable filter = 'all'
  @persist('list') @observable selectedRepos = []
  @observable repos = []
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
}

export default Github.create()
