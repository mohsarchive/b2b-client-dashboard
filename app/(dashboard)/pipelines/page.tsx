import { PageHeader } from '@/components/dashboard/page-header'
import { PipelineBoard } from '@/components/dashboard/pipeline-board'

export default function PipelinesPage() {
  return (
    <>
      <PageHeader
        title="Pipelines"
        description="Track open deals through every stage from lead to close."
      />
      <PipelineBoard />
    </>
  )
}
