import axios from "axios"
import { useEffect, useState } from "react"
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";



interface QuoteProps {
  quote: string;
  author: string;
}
function App() {
  const [quoteInfo, setQuoteInfo] = useState<QuoteProps>({
    quote: '',
    author: ''
  })
  useEffect(() => {
    getQuote();
  }, [])

  const getQuote = async () => {
    const response = await axios.get('http://api.quotable.io/random')
    setQuoteInfo({
      quote: response.data.content,
      author: response.data.author
    })
    // .then((data) => {
    //   console.log(data)
    // })
  }
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div id='quote-box' className="p-10 shadow-lg rounded-lg max-w-3xl">
          <div className="flex gap-3">
            <div className=""><FaQuoteLeft size={30}/></div>
            <div className="text-4xl font-bold" id='text'>{quoteInfo.quote}</div>
          </div>
          <div className="text-right mt-5" id='author'>- {quoteInfo.author}</div>
          <div className="flex justify-between my-5">
            <div className="flex gap-2 justify-center items-center">
              Share: <a href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quoteInfo.quote} target="_blank" id='tweet-quote'><FaSquareXTwitter size={30} /></a>
            </div>
            <button className="bg-slate-900 rounded-lg text-slate-50 px-4 py-2" id='new-quote' onClick={getQuote}>New Quote</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
