import React, { ReactElement } from 'react'
import appConfig from '../../../../app.config'
import Alert from '../../atoms/Alert'

export default function PublishPage(): ReactElement {
  return (
    <Alert
      title="Market V4 is now available"
      text="To publish new assets please go to the market V4 "
      state="info"
      action={{
        name: 'Open market v4',
        handleAction: () => (window.location.href = appConfig.marketV4Url)
      }}
    />
  )
}
