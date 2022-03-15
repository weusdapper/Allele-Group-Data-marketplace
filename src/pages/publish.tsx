import React, { ReactElement } from 'react'
import PagePublish from '../components/pages/Publish'
import Page from '../components/templates/Page'
import { graphql, PageProps } from 'gatsby'
import OceanProvider from '../providers/Ocean'

export default function PageGatsbyPublish(props: PageProps): ReactElement {
  const content = (props.data as any).content.edges[0].node.childPublishJson
  const { title } = content

  return (
    <OceanProvider>
      <Page
        title={title}
        description="The market has been updated to V4, please use the new version to publish assets."
        uri={props.uri}
      >
        <PagePublish />
      </Page>
    </OceanProvider>
  )
}

export const contentQuery = graphql`
  query PublishPageQuery {
    content: allFile(
      filter: { relativePath: { eq: "pages/publish/index.json" } }
    ) {
      edges {
        node {
          childPublishJson {
            title
            description
            warning
          }
        }
      }
    }
  }
`
