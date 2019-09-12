/** 1.---------- */
/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

/** 2.---------- */
import React, { Component } from 'react';
//import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import './App.css';
import file from './media/ZB20190706-MAG-023-00.pdf';
import fileImage from './media/ZB20190706-MAG-023-00.gif';
import xmlFile from './media/intCoords.xml';
 
export default class App extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
  
  getFileName = (file) => {
    file = file.split('/');
    let fileName = file[file.length - 1].split('.')[0];
    return fileName;
  };
  
  getXmlContent = () => {
    let xhttp = new XMLHttpRequest();
    /*xhttp.onreadystatechange = () => {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        return this.responseText;
      }
    };*/
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(this.responseText, 'text/xml');
        const xmlPages = xml.querySelectorAll('page');
        console.log(this.responseText);
        console.log(xml);
        console.log(xml.querySelectorAll('page'));
        console.log(xml.querySelectorAll('page')[1].children[0].textContent);
        console.log(xml.querySelectorAll('page')[1].children[1].textContent);

        //let xmlResult = xmlPages.filter(page => (page.children.));
        return this.responseText;
      }
    };
    xhttp.open('GET', xmlFile, true);
    xhttp.send();
  };

  componentDidMount = () => {
    console.log(this.getFileName(file));
    this.getXmlContent();
  };

  render() {
    const { pageNumber, numPages } = this.state;
    /*let xmlContent = await this.getFileName();
    console.log(xmlContent);*/

    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div className="pdf_container" style={{ width: 1063 }}>
          <img width={383} height={907} alt="" src={fileImage} style={{ top: 0, right: 0 }} />
          <Document
            file={file}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={1063} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

/** 3.---------- */
/*import React from 'react';
//import ReactDOM from 'react-dom';
import { Document, Page, Text, View, StyleSheet, PDFViewer  } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

/*const App = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);*

const App = () => (
  <h1>Hello World!!!</h1>
);

export default App;*/
