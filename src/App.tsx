import axios from "axios"
import { useEffect, useState } from "react"
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";



interface QuoteProps {
  // tag: string;
  quote: string;
  author: string;
}
function App() {
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [bgColor, setBgColor] = useState("#000000"); 
  const [quoteInfo, setQuoteInfo] = useState<QuoteProps>({
    // tag: '',
    quote: '',
    author: ''
  })
  useEffect(() => {
    getQuote();
  }, [])

  const changeColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgColor(randomColor);
  };


  const getQuote = async () => {
    setBtnLoading(true)
    const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=education', {
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY
      }
    })
    setQuoteInfo({
      // tag: response.data[0].category,
      quote: response.data[0].quote,
      author: response.data[0].author
    })
    setLoading(false)
    setBtnLoading(false)
    changeColor();
  }

  return (
    <>
      {!loading ? 
      <div className="h-screen w-screen flex flex-col justify-center items-center transition-colors duration-300" style={{backgroundColor: bgColor}}>
          <div id='quote-box' className="p-10 shadow-lg rounded-lg lg:max-w-2xl bg-slate-50 mx-5 lg:m-0" style={{color: bgColor}}>
          {/* <div className="text-xs text-slate-50 rounded-lg p-1 inline" style={{backgroundColor: bgColor}}>{quoteInfo.tag}</div> */}
          <div className="flex gap-3">
            <div className=""><FaQuoteLeft size={30}/></div>
            <div className="text-lg md:text-2xl lg:text-4xl font-medium font-serif" id='text'>{quoteInfo.quote}</div>
          </div>
          <div className="text-right mt-5" id='author'>- {quoteInfo.author}</div>
          <div className="flex justify-between my-5">
            <div className="flex gap-2 justify-center items-center">
              Share: <a href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quoteInfo.quote} target="_blank" id='tweet-quote'><FaSquareXTwitter size={30} /></a>
            </div>
            <button className={`rounded-lg text-slate-50 px-4 py-2 ${btnLoading && 'cursor-progress'}`} style={{backgroundColor: bgColor}} id='new-quote' onClick={getQuote}>{btnLoading ? 'Loading...' : 'New Quote'}</button>
          </div>
        <div className="text-slate-50 mt-5 font-light">by <a href="https:x.com/javed__ak" target="_blank">Javed</a></div>
      </div>
        </div> :
        <div className="flex justify-center items-center h-screen">Loading...</div>}
    </>
  )
}

export default App
