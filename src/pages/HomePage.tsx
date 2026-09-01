import { useState } from 'react'
import ImageUploader from '../componenets/ImageUploader'
import InferenceResults from '../componenets/InferenceResults'

function HomePage() {
    const [inferenceResult, setInferenceResult] = useState(null)
    const [imageURL, setImageURL] = useState<string | null>(null)

    const handleInferenceResult = (result: any) => {
        setInferenceResult(result)
    }

    const handleImageUpload = (imageURL: string | null) => {
        setImageURL(imageURL)
    }
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Card Scanner</h1>
            <p className="mb-4">Upload an image to detect and classify cards. Currently supporting cards from Digimon TCG BT07 Deck only.</p>
            <ImageUploader onInferenceResult={handleInferenceResult} onImageUpload={handleImageUpload} />
            {inferenceResult && <InferenceResults results={inferenceResult} imageURL={imageURL} />}
        </div>
    )
}

export default HomePage