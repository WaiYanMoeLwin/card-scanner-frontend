import { useEffect, useRef } from 'react';
export default function DetectionResults({ results, imageURL }: { results: any; imageURL: string | null }) {
    if (!results) {
        return null;
    }

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && imageURL) {
            const image = new Image();
            image.src = imageURL;
            image.onload = () => {
                canvas.width = image.width / 2;
                canvas.height = image.height / 2;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    results.results.forEach((result: any) => {
                        const keypoints = result.keypoints;
                        if (keypoints.length === 4) {
                            ctx.beginPath();
                            ctx.moveTo(keypoints[0]['x']/2, keypoints[0]['y']/2);
                            ctx.lineTo(keypoints[1]['x']/2, keypoints[1]['y']/2);
                            ctx.lineTo(keypoints[2]['x']/2, keypoints[2]['y']/2);
                            ctx.lineTo(keypoints[3]['x']/2, keypoints[3]['y']/2);
                            ctx.closePath();
                            ctx.strokeStyle = 'red';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
                            ctx.fill();
                        }
                    });
                    results.results.forEach((result: any) => {
                        const keypoints = result.keypoints;
                        const fontSize = Math.min(12, (keypoints[0]['x'] - keypoints[1]['x'])/5); // Adjust font size based on the width of the bounding box
                        const text = `${result.classification_results[0].class_name} (${result.classification_results[0].confidence_score_classification.toFixed(2)})`;
                        const metrics = ctx.measureText(text);
                        const x = keypoints[0]['x']/2;
                        const y = keypoints[0]['y']/2 - 5;
                        const padding = 2;

                        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
                        ctx.fillRect(
                            x - padding,
                            y - metrics.actualBoundingBoxAscent - padding,
                            metrics.width + 2 * padding,
                            metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 2 * padding
                        );
                        
                        ctx.font = `900 ${fontSize}px Arial`;
                        ctx.fillStyle = 'blue';
                        ctx.fillText(text, x, y);
                    });
                }
            }
        }
    }, [results]);

    return (
        <div className="text-left flex flex-row gap-4">
            <canvas id="detection-canvas" ref={canvasRef}></canvas>
        </div>
    )
}