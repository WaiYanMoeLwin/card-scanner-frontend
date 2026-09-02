import { useState } from 'react'
import { getInference } from '../apis/inference'

interface ImageUploaderProps {
    onInferenceResult: (result: any) => void
    onImageUpload: (imageURL: string | null) => void
    game: string
}

export default function ImageUploader({ onInferenceResult, onImageUpload, game }: ImageUploaderProps) {
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(file)
            setPreview(URL.createObjectURL(file))
            onImageUpload(URL.createObjectURL(file))
        }
    }

    const handleUpload = async () => {
        if (!image) {
            console.log('No image selected')
            return
        }
        const formData = new FormData()
        formData.append('image', image)
        try {
            const result = await getInference(formData, game)
            console.log('Inference result:', result.data)
            onInferenceResult(result.data)
        } catch (error) {
            console.error('Error occurred while fetching inference:', error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                {preview && <img className="flex h-60 w-auto justify-self-center m-2 mb-4" src={preview} alt="Preview" />}
            </div>
            <div className="flex flex-row items-center justify-center">
                <div>
                    <label
                        htmlFor="image-upload"
                        className="p-2 m-2 border bg-gray-400 text-white rounded-md hover:cursor-pointer"
                    >
                        Choose Image
                    </label>
                    <input
                        id="image-upload"
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <button
                        className="p-2 m-2 border bg-gray-400 text-white rounded-md hover:cursor-pointer"
                        onClick={handleUpload}
                    >
                        Upload Image
                    </button>
                </div>
            </div>
            

        </div>
    )
}