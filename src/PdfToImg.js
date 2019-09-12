/*import React from 'react'
import { PDFtoIMG } from 'react-pdf-to-image';
import file from './ZB20190706-MAG-001-00.pdf';

const App = () => (
    <div>
        <PDFtoIMG file={file}>
            {({pages}) => {
                if (!pages.length) return 'Loading...';
                return pages.map((page, index)=>
                    <img alt={index} key={index} src={page}/>
                );
            }}
        </PDFtoIMG>
    </div>
);

export default App;*/