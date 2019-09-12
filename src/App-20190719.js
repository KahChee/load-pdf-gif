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
import styled from 'styled-components';
import * as fs from 'fs';
import './App.css';
import file from './media/ZB20190706-MAG-023-00.pdf';
import fileImage from './media/ZB20190706-MAG-023-00.gif';
import xmlFile from './media/intCoords.xml';
 
export default class App extends Component {
  state = { numPages: null, pageNumber: 1, xmlArr: [] };

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

  readFiles = (dirname, onFileContent, onError) => {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        //onError(err);
        return;
      }
      filenames.forEach(function(filename) {
        console.log(dirname + filename);
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
          if (err) {
            //onError(err);
            return;
          }
          //onFileContent(filename, content);
        });
      });
    });
  };
  
  getXmlContent = (self, fileName) => {
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
        const xmlPagesArr = Array.from(xmlPages);
        //console.log(this.responseText);
        //console.log(xml);
        //console.log(xml.querySelectorAll('page'));
        //console.log(xml.querySelectorAll('page')[1].children[0].textContent);
        //console.log(xml.querySelectorAll('page')[1].children[1].textContent);
        //console.log(xmlPages.length);

        let xmlResult = xmlPagesArr.filter(page => (page.children[0].textContent === fileName));
        self.setState({ xmlArr: xmlResult });
        /*console.log(xmlResult);
        console.log(xmlResult[0]);
        console.log(xmlResult[0].children[1].textContent);*/
        console.log(self.state.xmlArr);
        console.log(self.state.xmlArr[0]);
        console.log(self.state.xmlArr[0].children[1].textContent);
        console.log(self.state.xmlArr[0].children[5].textContent.match(/[a-zA-Z0-9]+.gif/g));

        /*xmlPages.forEach(function(page, index){
          console.log(page.children[0].textContent === fileName);
        });*/

        return this.responseText;
      }
    };
    xhttp.open('GET', xmlFile, true);
    xhttp.send();
  };

  componentDidMount = () => {
    console.log(this.getFileName(file));
    this.getXmlContent(this, this.getFileName(file));
    //this.readFiles('./media/');

    fetch('//localhost:3000/getfiles', {
      method: "GET", // POST, PUT, DELETE, etc.
      //body: JSON.stringify(data),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      //.then(res => res.json())
      .then(
        (result) => {
          /*this.setState({
            isLoaded: true,
            items: result.items
          });*/
          console.log('fetch done:');
          console.log((result));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('fetch fail: ' + error);
          /*this.setState({
            isLoaded: true,
            error
          });*/
        }
      );
  };

  render() {
    const { pageNumber, numPages, xmlArr } = this.state;
    let xmlResult;
    /*let xmlContent = await this.getFileName();
    console.log(xmlContent);*/
    console.log(xmlArr);
    console.log(Array.from(xmlArr));
    console.log(typeof(xmlArr[0]));
    console.log(xmlArr[0]);
    this.items = xmlArr.map((xml, index) => {
      console.log(xml.children);
      console.log(Array.from(xml.children)[0].textContent);
      console.log(Array.from(xml.children)[0]);
      //this.setState({ xmlResult: Array.from(xml.children) });
      xmlResult = Array.from(xml.children);
      console.log(typeof(xmlResult[1].textContent));
      const test1 = '1';
      const test2 = '1';
      console.log(test1);
      console.log(test2);
      let Img = styled.img`
        top: ${test1 + 'px'};
        left: ${test2 + 'px'};
      `;
      /*let style = {
        top: `${xmlResult[2].textContent + 'px'}`,
        left: `${xmlResult[1].textContent + 'px'}`
      };*/
      return <img width={xmlResult[3].textContent} height={xmlResult[4].textContent} alt="" src={fileImage} style={{ top: `${xmlResult[2].textContent + 'px'}`, left: `${xmlResult[1].textContent + 'px'}`}} />
    });

    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div className="pdf_container">
          { this.state && xmlArr &&
            this.items
          }
          <Document
            file={file}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
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
