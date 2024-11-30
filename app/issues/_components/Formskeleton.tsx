import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Formskeleton = () => {
  return (
    <div>
    <Box className="max-w-xl">
      <Skeleton height={2} />
      <Skeleton height={"20rem"} />
    </Box>

    </div>
  )
}

export default Formskeleton