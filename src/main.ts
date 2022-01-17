import * as core from '@actions/core'
import * as utility from './utility'
import * as action from './action'

run()

async function run(): Promise<void> {
  try {
    const repository = utility.getRepository()
    const unreleased = core.getInput('unreleased', {required: true})
    const release = core.getInput('release', {required: true})

    await action.createMilestoneRelease(repository.owner, repository.repo, unreleased, release)
  } catch (error) {
    core.setFailed(error.message)
  }
}
