import ClassificationResults from './ClassificationResults';
import DetectionResults from './DetectionResults';

interface InferenceResultsProps {
    results: any;
    imageURL: string | null;
    game: string;
}

export default function InferenceResults({ results, imageURL, game }: InferenceResultsProps) {
  if (!results) {
    return null;
  }

  return (
    <div className="text-left p-4">
      <h2>Inference Results</h2>
        <p>Number of Cards Detected: {results.number_of_cards}</p>
        <h3>Detection Results:</h3>
        <DetectionResults results={results} imageURL={imageURL} />
        <h3>Classification Results:</h3>
        <div>
            {results.results.map((result: any, index: number) => (
                <div key={index}>
                    <div className="flex flex-row gap-4 overflow-x-auto">
                        <div className="shrink-0">
                            <h4 className='font-bold'>Card {index + 1}</h4>
                            <img src={`data:image/jpeg;base64,${result.warped_image_base64}`} alt={`Card ${index + 1}`} className="h-40 w-auto self-end" />
                        </div>
                        <ClassificationResults results={result} game={game} />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}