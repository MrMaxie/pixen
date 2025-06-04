import { Gallery as GridGallery, type Image } from 'react-grid-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useEffect, useState } from 'react';

type PicsumPhoto = {
    id: string;
    author: string;
    width: number;
    height: number;
    download_url: string;
};

type GalleryImage = Image & { original: string };

export const Gallery = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(
                    'https://picsum.photos/v2/list?page=1&limit=25',
                );
                const data: PicsumPhoto[] = await response.json();
                const imgs: GalleryImage[] = data.map(item => ({
                    src: `https://picsum.photos/id/${item.id}/300/200`,
                    original: item.download_url,
                    width: 300,
                    height: 200,
                    caption: item.author,
                }));
                setImages(imgs);
            } catch (error) {
                console.error('Failed to load images', error);
            }
        };

        fetchImages();
    }, []);

    const currentImage = images[index];
    const nextIndex = (index + 1) % images.length;
    const prevIndex = (index + images.length - 1) % images.length;
    const nextImage = images[nextIndex] || currentImage;
    const prevImage = images[prevIndex] || currentImage;

    const handleClick = (i: number) => setIndex(i);
    const handleClose = () => setIndex(-1);
    const handleMovePrev = () => setIndex(prevIndex);
    const handleMoveNext = () => setIndex(nextIndex);

    return (
        <div>
            <GridGallery
                images={images}
                onClick={handleClick}
                enableImageSelection={false}
            />
            {!!currentImage && (
                <Lightbox
                    mainSrc={currentImage.original}
                    nextSrc={nextImage.original}
                    prevSrc={prevImage.original}
                    onCloseRequest={handleClose}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                />
            )}
        </div>
    );
};
