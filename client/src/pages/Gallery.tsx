import { Image } from '@mantine/core';
import Lightbox from 'react-image-lightbox';
import { useEffect, useRef, useState } from 'react';
import 'react-image-lightbox/style.css';
import justifiedLayout from 'justified-layout';

type ImageType = {
    id: string;
    author: string;
    width: number;
    height: number;
    downloadUrl: string;
    caption: string;
    src: string;
    original: string;
};

export const Gallery = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<ImageType[]>([]);
    const [index, setIndex] = useState(-1);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch('https://picsum.photos/v2/list?page=1&limit=25');
            const data = await response.json();
            const possibleSizes = [
                [400, 400],
                [600, 400],
                [800, 600],
                [1200, 800],
            ];

            const imgs: ImageType[] = data.map((item: {
                id: string;
                author: string;
                width: number;
                height: number;
                download_url: string;
            }) => {
                const [w, h] = possibleSizes[Math.floor(Math.random() * possibleSizes.length)];

                return {
                    id: item.id,
                    author: item.author,
                    width: w,
                    height: h,
                    downloadUrl: item.download_url,
                    caption: item.author,
                    src: `https://picsum.photos/id/${item.id}/${w}/${h}`,
                    original: item.download_url,
                };
            });
            setImages(imgs);
        };

        fetchImages();
    }, []);

    // 📏 Zmierz szerokość kontenera (responsive)
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.contentRect.width) {
                    setContainerWidth(entry.contentRect.width);
                }
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const currentImage = images[index];
    const nextIndex = (index + 1) % images.length;
    const prevIndex = (index + images.length - 1) % images.length;

    // 🧮 Oblicz layout dopiero, gdy mamy szerokość i obrazki
    const layout =
        containerWidth && images.length
            ? justifiedLayout(
                    images.map((img) => img.width / img.height), // aspect ratios
                    {
                        containerWidth,
                        targetRowHeight: 200,
                        boxSpacing: 6,
                    }
                )
            : null;

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            {layout &&
                layout.boxes.map((box, i) => (
                    <div
                        key={images[i].id}
                        onClick={() => setIndex(i)}
                        style={{
                            position: 'absolute',
                            top: box.top,
                            left: box.left,
                            width: box.width,
                            height: box.height,
                            cursor: 'pointer',
                            background: '#eee',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={images[i].src}
                            alt={images[i].caption}
                            fit="contain"
                            width="100%"
                            height="100%"
                            style={{ display: 'block' }}
                        />
                    </div>
                ))}

            {!!layout && (
                <div style={{ height: layout.containerHeight }} /> // ⬅️ kontener z wysokością
            )}

            {currentImage && (
                <Lightbox
                    mainSrc={currentImage.original}
                    nextSrc={images[nextIndex].original}
                    prevSrc={images[prevIndex].original}
                    onCloseRequest={() => setIndex(-1)}
                    onMovePrevRequest={() => setIndex(prevIndex)}
                    onMoveNextRequest={() => setIndex(nextIndex)}
                />
            )}
        </div>
    );
};
