import React from 'react'
import Hero from './Hero'
import NewReleases from './Booksection'
import QuoteSection from './Bookquote'
import BookCoverSlider from './Bookslider'
import Newsletter from './Newsletter'
import AboutSection from '../About'

function Home() {
  return (
    <div>
        <Hero/>
        <NewReleases/>
              <QuoteSection/>
              <BookCoverSlider/>
              <Newsletter/>
              <AboutSection/>
            
      
    </div>
  )
}


export default Home
