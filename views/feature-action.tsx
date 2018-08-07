import { RootComponent, Intent, BearerState, IntentType } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  name: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Intent('SaveState', IntentType.SaveState) saveState: any
  @BearerState() attachedPullRequests: Array<any> = []

  attachPullRequest = ({ data, complete }): void => {
    this.saveState({ body: data })
      .then(() => {
        this.attachedPullRequests = [...this.attachedPullRequests, data.pullRequest]
        complete()
      })
      .catch(error => {
        throw error
      })
  }

  render() {
    return (
      <div>
        <bearer-navigator
          btnProps={ {content:"Attach Pull Requests", kind:"primary"} }
          direction="right"
          complete={this.attachPullRequest}
        >
          <bearer-navigator-auth-screen />
          <bearer-navigator-screen navigationTitle="Repositories" name="repository">
            <list-repositories />
          </bearer-navigator-screen>
          <bearer-navigator-screen
            //data will be passed to list-pull-requests as .this keyword
            renderFunc={({ data }) => <list-pull-requests {...data} />}
            name="pullRequest"
            navigationTitle={data => data.repository.full_name}
          />
        </bearer-navigator>
      </div>
    )
  }
}
