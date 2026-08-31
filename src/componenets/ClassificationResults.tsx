

export default function ClassificationResults({ results }: { results: any }) {
  if (!results) {
    return null;
  }

  return (
    <div className="text-left flex flex-row gap-4">
        {results.classification_results.map((clsResult: any, index: number) => (
            <div key={index} className="mb-2 items-end">
                <p className="font-bold text-sm text-nowrap">{clsResult.class_name}: {clsResult.confidence_score_classification.toFixed(2)}</p>
                <img src={`/tcg_card_imgs/${clsResult.class_name}.jpg`} alt={`Class ${index + 1}`} className="h-40 w-auto" />
            </div>
        ))}
    </div>
  );
}