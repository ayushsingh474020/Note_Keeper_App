import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const NoteLoading = () => {
  return (
    <div>
      <Stack>
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
    </Stack>
    </div>
  )
}

export default NoteLoading