import * as utility from './utility'

export async function createMilestoneRelease(owner: string, repo: string, unreleased: string, release: string): Promise<any> {
  await updateUnreleased(owner, repo, unreleased, release)
  await createUnreleased(owner, repo, unreleased)
}

async function updateUnreleased(owner: string, repo: string, unreleased: string, release: string): Promise<any> {
  const milestone = await utility.tryGetMilestone(owner, repo, unreleased)

  if (milestone != null) {
    await updateMilestone(owner, repo, unreleased, release, 'closed')
  } else {
    await createMilestone(owner, repo, release, 'closed')
  }
}

async function createUnreleased(owner: string, repo: string, title: string): Promise<any> {
  const milestone = await utility.tryGetMilestone(owner, repo, title)

  if (milestone == null) {
    await createMilestone(owner, repo, title, 'open')
  }
}

async function createMilestone(owner: string, repo: string, title: string, state: string): Promise<any> {
  const octokit = utility.getOctokit()

  await octokit.request(`POST /repos/${owner}/${repo}/milestones`, {
    title: title,
    state: state
  })
}

async function updateMilestone(owner: string, repo: string, milestoneName: string, title: string, state: string): Promise<any> {
  const octokit = utility.getOctokit()
  const milestone = await utility.getMilestone(owner, repo, milestoneName)

  await octokit.request(`PATCH /repos/${owner}/${repo}/milestones/${milestone.number}`, {
    title: title,
    state: state
  })
}
