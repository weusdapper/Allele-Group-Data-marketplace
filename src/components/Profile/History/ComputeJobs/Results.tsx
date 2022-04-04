import {
  downloadFileBrowser,
  LoggerInstance,
  Provider
} from '@oceanprotocol/lib'
import React, { ReactElement, useState } from 'react'
import Loader from '@shared/atoms/Loader'
import { ListItem } from '@shared/atoms/Lists'
import Button from '@shared/atoms/Button'
import styles from './Results.module.css'
import FormHelp from '@shared/FormInput/Help'
import content from '../../../../../content/pages/history.json'
import { useWeb3 } from '@context/Web3'

export default function Results({
  job
}: {
  job: ComputeJobMetaData
}): ReactElement {
  const providerInstance = new Provider()
  const { accountId, web3 } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const isFinished = job.dateFinished !== null

  async function getResults() {
    if (!accountId || !job) return

    try {
      setIsLoading(true)
      const jobResult = await providerInstance.getComputeResultUrl(
        'https://v4.provider.rinkeby.oceanprotocol.com/',
        web3,
        accountId,
        job.jobId,
        0
      )
      await downloadFileBrowser(jobResult)
    } catch (error) {
      LoggerInstance.error(error.message)
    } finally {
      setIsLoading(false)
      setHasFetched(true)
    }
  }

  return (
    <div className={styles.results}>
      {hasFetched ? (
        <ul>
          <ListItem>
            {/* {job.algorithmLogUrl ? (
              <a href={job.algorithmLogUrl} target="_blank" rel="noreferrer">
                View Log
              </a>
            ) : (
              'No logs found.'
            )} */}
          </ListItem>

          {/* {job.resultsUrl &&
            Array.isArray(job.resultsUrl) &&
            job.resultsUrl.map((url, i) =>
              url ? (
                <ListItem key={job.jobId}>
                  <a href={url} target="_blank" rel="noreferrer">
                    View Result {i + 1}
                  </a>
                </ListItem>
              ) : (
                <ListItem>No results found.</ListItem>
              )
            )} */}
        </ul>
      ) : (
        <Button
          style="primary"
          size="small"
          onClick={() => getResults()}
          disabled={isLoading || !isFinished}
        >
          {isLoading ? (
            <Loader />
          ) : !isFinished ? (
            'Waiting for results...'
          ) : (
            'Get Results'
          )}
        </Button>
      )}
      <FormHelp className={styles.help}>{content.compute.storage}</FormHelp>
    </div>
  )
}
