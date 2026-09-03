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
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    results.results.forEach((result: any) => {
                        const keypoints = result.keypoints;
                        if (keypoints.length === 4) {
                            ctx.beginPath();
                            ctx.moveTo(keypoints[0]['x'], keypoints[0]['y']);
                            ctx.lineTo(keypoints[1]['x'], keypoints[1]['y']);
                            ctx.lineTo(keypoints[2]['x'], keypoints[2]['y']);
                            ctx.lineTo(keypoints[3]['x'], keypoints[3]['y']);
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
                        const padding = 2;
                        const text = `${result.classification_results[0].class_name} (${result.classification_results[0].confidence_score_classification.toFixed(2)})`;
                        ctx.font = '16px Arial';
                        const textWidth = ctx.measureText(text).width;
                        const fontSize = Math.min(40, (keypoints[1]['x'] - keypoints[0]['x'] - 2 * padding) / textWidth * 16); // Adjust font size based on bounding box width
                    
                        
                        ctx.font = `400 ${fontSize}px Arial`;
                        const metrics = ctx.measureText(text);
                        const x = keypoints[0]['x'];
                        const y = keypoints[0]['y'] + metrics.actualBoundingBoxAscent + padding;

                        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
                        ctx.fillRect(
                            x - padding,
                            y - metrics.actualBoundingBoxAscent - padding,
                            metrics.width + 2 * padding,
                            metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 2 * padding
                        );
                        ctx.fillStyle = 'blue';
                        ctx.fillText(text, x, y);
                    });
                }
            }
        }
    }, [results]);

    return (
        <div className="text-left flex flex-row gap-4">
            <canvas id="detection-canvas" className="w-full md:w-[50%]" ref={canvasRef}></canvas>
        </div>
    )
}