
const GAME_NAME_MAP: { [key: string]: string } = {
  dg7: 'dg_bt7',
  op14: 'op14',
};
export default function ClassificationResults({ results, game }: { results: any, game: string }) {
  if (!results) {
    return null;
  }

  return (
    <div className="text-left flex flex-row gap-4">
        {results.classification_results.map((clsResult: any, index: number) => (
            <div key={index} className="mb-2 items-end shrink-0">
                <p className="font-bold text-sm text-nowrap">{clsResult.class_name}: {clsResult.confidence_score_classification.toFixed(2)}</p>
                <img src={`/tcg_cards/${GAME_NAME_MAP[game]}/images/${clsResult.class_name}.jpg`} alt={`Class ${index + 1}`} className="h-40 w-auto" />
            </div>
        ))}
    </div>
  );
}