import { Flex, Text } from '@radix-ui/themes';
import React from 'react'

interface Props {
    itemsCount : number,
    currentPage: number,
    pageSize: number

}

const Pagination = ({currentPage, itemsCount, pageSize}: Props) => {
    
    const pageCount = Math.ceil(itemsCount / pageSize);
    if(pageCount <= 1) return null

  return (
    <Flex>
        <Text>Page {currentPage} of {pageCount}</Text>
    </Flex>
  )
}

export default Pagination