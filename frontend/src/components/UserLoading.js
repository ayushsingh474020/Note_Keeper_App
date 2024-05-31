import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const UserLoading = () => {
  return (
    <div>
      <Stack>
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
    </Stack>
    </div>
  )
}

export default UserLoading