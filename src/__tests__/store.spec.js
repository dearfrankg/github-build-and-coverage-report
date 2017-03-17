import expect from 'expect'
import github from '../store'

describe('github store', () => {
  describe('properties', () => {
    it('should have correct properties', () => {
      const actual = {
        filter: github.filter,
        selectedRepos: github.selectedRepos.toJS(),
        repos: github.repos.toJS(),
      }
      const expected = {
        filter: 'all',
        selectedRepos: [],
        repos: []
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('filteredRepos', () => {
    describe('when filter is "all"', () => {
      it('should show all repos', () => {
        github.filter = 'all'
        github.repos = [
          {id:1, name: 'a'},
          {id:2, name: 'b'},
          {id:3, name: 'c'},
          {id:4, name: 'd'},
        ]
        const actual = github.filteredRepos.length
        const expected = 4
        expect(actual).toEqual(expected)
      })
    })

    describe('when filter is "selected"', () => {
      it('should show selected repos', () => {
        github.filter = 'selected'
        github.repos = [
          {id:1, name: 'a'},
          {id:2, name: 'b'},
          {id:3, name: 'c'},
          {id:4, name: 'd'},
        ]
        github.selectedRepos = [2,4]
        const actual = github.filteredRepos.length
        const expected = 2
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('#toggleSelection', () => {
    it('should select repo', () => {
      github.filter = 'all'
      github.repos = [
        {id:1, name: 'a'},
        {id:2, name: 'b'},
        {id:3, name: 'c'},
        {id:4, name: 'd'},
      ]
      github.selectedRepos = []
      github.toggleSelection(2)
      const actual = github.selectedRepos.length
      const expected = 1
      expect(actual).toEqual(expected)
    })

    it('should deselect repo', () => {
      github.filter = 'all'
      github.repos = [
        {id:1, name: 'a'},
        {id:2, name: 'b'},
        {id:3, name: 'c'},
        {id:4, name: 'd'},
      ]
      github.selectedRepos = [2,4]
      github.toggleSelection(2)
      const actual = github.selectedRepos.length
      const expected = 1
      expect(actual).toEqual(expected)
    })
  })

  describe('#clear', () => {
    it('should clear selected repos', () => {
      github.filter = 'all'
      github.repos = [
        {id:1, name: 'a'},
        {id:2, name: 'b'},
        {id:3, name: 'c'},
        {id:4, name: 'd'},
      ]
      github.selectedRepos = [1,2,3,4]
      github.clear()
      const actual = github.selectedRepos.length
      const expected = 0
      expect(actual).toEqual(expected)
    })
  })
})
