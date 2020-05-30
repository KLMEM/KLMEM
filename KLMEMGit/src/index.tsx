
import * as React from 'react'
import { render } from 'react-dom'
import domtoimage from 'dom-to-image-more'


import Content from './components/content'
import Form from './components/form'
import Result from './components/result'


import './styles/styles.css'


function App() {
  let contentContainerRef = React.useRef<HTMLElement | null>(null)
  let resultContainerRef = React.useRef<HTMLElement | null>(null)

  const [images, setImages] = React.useState([])
  const [activeImage, setActiveImage] = React.useState('')
  const [textTop, setTextTop] = React.useState('')
  const [textBottom, setTextBottom] = React.useState('')
  const [isMemeGenerated, setIsMemeGenerated] = React.useState(false)


  async function fetchImage() {

    const imgData = await fetch('https://api.imgflip.com/get_memes').then(res => res.json()).catch(err => console.error(err))
    const { memes } = await imgData.data


    await setImages(memes)


    await setActiveImage(memes[0].url)
  }

  function handleInputChange(event) {
    if (event.target.name === 'text-top') {
      setTextTop(event.target.value)
    } else {
      setTextBottom(event.target.value)
    }
  }

  function handleImageChange() {
    const image = images[Math.floor(Math.random() * images.length)]
    setActiveImage(image.url)
  }


  function handleMemeGeneration() {
    if (resultContainerRef.current.childNodes.length > 0) {
      resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])
    }


    domtoimage.toPng(contentContainerRef.current).then((dataUrl) => {

      const img = new Image()

      img.src = dataUrl

      resultContainerRef.current.appendChild(img)

      setIsMemeGenerated(true)
    })
  }

  function handleMemeReset() {

    resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])


    setIsMemeGenerated(false)
  }

  React.useEffect(() => {

    fetchImage()
  }, [])

  return (
    <div className="App">
      <Form
        textTop={textTop}
        textBottom={textBottom}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleMemeGeneration={handleMemeGeneration}
        handleMemeReset={handleMemeReset}
        isMemeGenerated={isMemeGenerated}
      />

      <Content
        activeImage={activeImage}
        contentContainerRef={contentContainerRef}
        textBottom={textBottom}
        textTop={textTop}
      />

      <Result resultContainerRef={resultContainerRef} />
    </div>
  )
}
const rootElement = document.getElementById('root')
render(<App />, rootElement)
