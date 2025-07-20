
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const handlePrev = () => {
        if (pageNumber === 1) {
            // Already at cover page
            return;
        } else if (pageNumber === 2) {
            // Go back to cover page
            setPageNumber(1);
        } else {
            // Go back 2 pages
            setPageNumber(pageNumber => pageNumber - 2);
        }
    }

    const handleNext = () => {
        if (pageNumber === 1) {
            // From cover page, go to page 2
            setPageNumber(2);
        } else if (pageNumber + 2 <= numPages) {
            // Go forward 2 pages
            setPageNumber(pageNumber => pageNumber + 2);
        } else if (pageNumber + 1 <= numPages) {
            // Go to last page
            setPageNumber(numPages);
        }
    }


    
    return (
        <div className="w-screen h-screen flex items-center justify-center" style={{ backgroundColor: '#1c2120' }}>
            <Document className='w-full' file={'/assets/pdf/portfolio.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
                <div className='flex gap-0 justify-center items-center'>
                    {pageNumber === 1 ? (
                        // First page (cover) - show alone and larger
                        <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber} width={
                            windowWidth * 0.65
                        } className='bg-slate-500' />
                    ) : (
                        // Other pages - show two side by side
                        <>
                            <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber} width={(windowWidth * 0.9) / 2} className='bg-slate-500' />
                            {pageNumber + 1 <= numPages && (
                                <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber + 1} width={(windowWidth * 0.9) / 2} className='bg-slate-500' />
                            )}
                        </>
                    )}
                </div>
                <span onClick={handlePrev} className={`${pageNumber <= 1 ? 'cursor-default': 'cursor-pointer'} fixed bg-transparent top-0 left-0 w-1/3 md:w-1/2 h-full select-none`}></span>
                <span onClick={handleNext} className={`${pageNumber + 1 >= numPages ? 'cursor-default' : 'cursor-pointer'} fixed bg-transparent top-0 right-0 w-1/3 md:w-1/2 h-full select-none`}></span>
            </Document>
            <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row items-center gap-2 z-50 bg-black/50 backdrop-blur-sm py-2 px-3 rounded-full'>
                <span onClick={handlePrev} className={`${pageNumber <= 1 ? 'cursor-default opacity-50': 'cursor-pointer hover:bg-white/20'} text-white select-none p-2 rounded-full transition-all`}><BsChevronLeft className='text-xl'/></span>
                <span className='mx-2 text-center text-xs text-white font-medium'>
                    {pageNumber === 1 ? `Cover` : `${pageNumber}-${Math.min(pageNumber + 1, numPages)}`} of {numPages}
                </span>
                <span onClick={handleNext} className={`${pageNumber + 1 >= numPages ? 'cursor-pointer hover:bg-white/20' : 'cursor-default opacity-50'} text-white select-none p-2 rounded-full transition-all`}><BsChevronRight className='text-xl'/></span>
            </div>
        </div>
    )
}

export default PDFReader