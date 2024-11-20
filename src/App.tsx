import axios from "axios"
import { useEffect, useState } from "react"
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";



interface QuoteProps {
  quote: string;
  author: string;
}
function App() {
  const [bgColor, setBgColor] = useState("#000000"); 
  const [quoteInfo, setQuoteInfo] = useState<QuoteProps>({
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
    const response = await axios.get('https://zenquotes.io/api/random')
    setQuoteInfo({
      quote: response.data.content,
      author: response.data.author
    })
    changeColor();
  }
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center transition-colors duration-300" style={{backgroundColor: bgColor}}>
        <div id='quote-box' className="p-10 shadow-lg rounded-lg lg:max-w-2xl bg-slate-50" style={{color: bgColor}}>
          <div className="flex gap-3">
            <div className=""><FaQuoteLeft size={30}/></div>
            <div className="text-lg lg:text-4xl font-medium" id='text'>{quoteInfo.quote}</div>
          </div>
          <div className="text-right mt-5" id='author'>- {quoteInfo.author}</div>
          <div className="flex justify-between my-5">
            <div className="flex gap-2 justify-center items-center">
              Share: <a href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quoteInfo.quote} target="_blank" id='tweet-quote'><FaSquareXTwitter size={30} /></a>
            </div>
            <button className="rounded-lg text-slate-50 px-4 py-2" style={{backgroundColor: bgColor}} id='new-quote' onClick={getQuote}>New Quote</button>
          </div>
        </div>
        <div className="text-slate-50 mt-5 font-light">by <a href="https:x.com/javed__ak">Javed</a></div>
      </div>
    </>
  )
}

export default App
