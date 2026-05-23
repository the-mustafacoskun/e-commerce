import AnnouncementBar from './AnnouncementBar'
import Footer from './Footer'
import Header from './Header'

function MainLayout({children}) {
  return (
    <div className='[&>*:nth-child(even)]:bg-[#F9F9F9] [&>*:nth-child(odd)]:bg-white'>
        
        <Header/>
        <main>
        {children}
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout