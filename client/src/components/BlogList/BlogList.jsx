import React from 'react'
import BlogItem from '../BlogItem/BlogItem'
import './BlogList.css'

const BlogList = (props) => {
    const {blogList} = props
  return (
    <ul className='blog-list'>
        {blogList.map(each=><BlogItem key={each.blogId} blogDetails={each}/>)}
    </ul>
      
    
  )
}
 
export default BlogList
