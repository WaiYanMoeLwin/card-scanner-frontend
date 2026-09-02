import { useState } from 'react'
import ImageUploader from '../componenets/ImageUploader'
import InferenceResults from '../componenets/InferenceResults'

function HomePage() {
    const [inferenceResult, setInferenceResult] = useState(null)
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [game, setGame] = useState('dg7')

    const handleInferenceResult = (result: any) => {
        setInferenceResult(result)
    }

    const handleImageUpload = (imageURL: string | null) => {
        setImageURL(imageURL)
    }
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Card Scanner</h1>
            <p className="mb-4">Upload an image to detect and classify cards. Currently supporting cards from Digimon TCG BT07 and One Piece OP14 Deck only.</p>
            <div className="m-4">
                <label htmlFor="game-select" className="mr-2">Select Game:</label>
                <select id="game-select" value={game} onChange={(e) => setGame(e.target.value)} className="border border-gray-300 rounded p-2">
                    <option value="dg7">Digimon TCG BT07</option>
                    <option value="op14">One Piece OP14 Deck</option>
                </select>
            </div>
            <ImageUploader onInferenceResult={handleInferenceResult} onImageUpload={handleImageUpload} game={game} />
            {inferenceResult && <InferenceResults results={inferenceResult} imageURL={imageURL} game={game} />}
        </div>
    )
}

export default HomePage