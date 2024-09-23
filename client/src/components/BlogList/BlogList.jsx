import React from 'react'
import BlogItem from '../BlogItem/BlogItem'
import './BlogList.css'

const BlogList = (props) => {
    const {blogList} = props

  if(blogList.length==0){
    return <h1 className='no-blogs-list'>No blogs Yet!</h1>
  }

  return (
    <ul className='blog-list'>
        {blogList.map(each=><BlogItem key={each.blogId} blogDetails={each}/>)}
    </ul>
  )
}
 
export default BlogList
