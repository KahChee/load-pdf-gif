import React, { Component } from 'react';
//import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
//import * as fs from 'fs';
//import Styled from 'styled-components';
import './App.css';
//import pdfFile from './media/pdf/ZB20190706-MAG-023-00.pdf';
//import pdfImage from './media/images/ZB20190706-MAG-023-00.gif';
import pdfXml from './media/intCoords.xml';

//Configurations
//const fileListingUrl = '//localhost:3000/get-file-listing';
//const fileListingUrl = '//localhost:8801/read-files-from-directory/';
const fileListingUrl = '//loadpdfgif:8802/get-file-listing.php';
//const fileListingUrl = '//qaip.sph.com.sg/load-pdf-gif/get-file-listing.php';
const mediaPath = 'static/media/';

class NavButton extends Component{
  render(){
    return(
      <nav className="w3-bar">
        <button className={"w3-button w3-white w3-hover-khaki w3-border w3-border-white w3-round " + (this.props.pageNumber === 1 ? 'w3-disabled' : '')} onClick={this.props.app.goToPrevPage}>&laquo; Previous</button>
        <button className={"w3-button w3-white w3-hover-khaki w3-border w3-border-white w3-round " + (this.props.pageNumber === this.props.numPages ? 'w3-disabled' : '')} onClick={this.props.app.goToNextPage}>Next &raquo;</button>
      </nav>
    );
  }
}

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = { numPages: null, pageNumber: 1, pageName: '', pageArr: [], intPagesArr: [], intArr: [] };
  };

  onDocumentLoadSuccess = ({numPages}) => {
    //this.setState({numPages});
  };

  goToPrevPage = () => {
    if(this.state.pageNumber > 1){
      this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
      this.setState(state => ({ pageName: mediaPath + state.pageArr[state.pageNumber - 1] }));
      let intPageName = this.state.pageArr[this.state.pageNumber - 2];
      this.setIntImg(intPageName);
    }
  };
  
  goToNextPage = () => {
    if(this.state.pageNumber < this.state.numPages){
      this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
      this.setState(state => ({ pageName: mediaPath + state.pageArr[state.pageNumber - 1] }));
      let intPageName = this.state.pageArr[this.state.pageNumber];
      this.setIntImg(intPageName);
    }
  };
  
  getFileName = (file) => {
    file = file.split('/');
    let fileName = file[file.length - 1].split('.')[0];
    return fileName;
  };

  getInt = (intPageName) => {
    return this.state.intPagesArr.filter(page => (page.children[0].textContent === intPageName));
  };

  setIntImg = (intPageName) => {
    intPageName = this.getFileName(intPageName);
    let intFilter = this.state.intPagesArr.filter(page => (page.children[0].textContent === intPageName));
    console.log(intPageName);
    console.log(intFilter);
    this.setState({ intArr: intFilter });
  };

  getIntContent = (self, fileName) => {
    /*let xhttp = new XMLHttpRequest();
    xhttp.open('GET', pdfXml, true);
    xhttp.send();*/
    /*xhttp.onreadystatechange = () => {
      if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText);
        return this.responseText;
      }
    };*/
    /*xhttp.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        let parser = new DOMParser();
        let xml = parser.parseFromString(this.responseText, 'text/xml');
        let xmlPages = xml.querySelectorAll('page');
        let xmlPagesArr = Array.from(xmlPages);
        //console.log(this.responseText);
        //console.log(xml);
        //console.log(xml.querySelectorAll('page'));
        //console.log(xml.querySelectorAll('page')[1].children[0].textContent);
        //console.log(xml.querySelectorAll('page')[1].children[1].textContent);
        //console.log(xmlPages.length);

        let intResult = xmlPagesArr.filter(page => (page.children[0].textContent === fileName));
        self.setState({ intArr: intResult });
        /*console.log(intResult);
        console.log(intResult[0]);
        console.log(intResult[0].children[1].textContent);*-/
        console.log(self.state.intArr);
        console.log(self.state.intArr[0]);
        console.log(self.state.intArr[0].children[1].textContent);
        console.log(self.state.intArr[0].children[5].textContent.match(/[a-zA-Z0-9]+.gif/g));

        /*xmlPages.forEach(function(page, index){
          console.log(page.children[0].textContent === fileName);
        });*-/
        
        return this.responseText;
      }
    };*/

    fetch(pdfXml, {})
      //.then(res => res.json())
      .then(response => response.text())
      .then(responseStr => (new DOMParser()).parseFromString(responseStr, 'text/xml'))
      .then(
        (result) => {
          console.log('fetch done:');
          console.log(result);

          let intPages = result.querySelectorAll('page');
          let intPagesArr = Array.from(intPages);
          this.setState({ intPagesArr: intPagesArr });//Store the entire interactive array

          /*let intResult = intPagesArr.filter(page => (page.children[0].textContent === fileName));
          this.setState({ intArr: intResult });*/
          /*console.log(intResult);
          console.log(intResult[0]);
          console.log(intResult[0].children[1].textContent);*/
          console.log(this.state.intPagesArr);
          console.log(this.state.intPagesArr[0]);
          console.log(this.state.intPagesArr[0].children[1].textContent);
          console.log(this.state.intPagesArr[0].children[5].textContent.match(/[a-zA-Z0-9]+.gif/g));

          /*intPages.forEach(function(page, index){
            console.log(page.children[0].textContent === fileName);
          });*/
          
          //return result;
        },
        //Note: it's important to handle errors here
        //Instead of a catch() block so that we don't swallow
        //Exceptions from actual bugs in components
        (error) => {
          console.log('fetch fail: ' + JSON.stringify(error));
        }
      );
  };

  getFileListing = () => {
    fetch(fileListingUrl, {
      method: 'GET',//POST, PUT, DELETE, etc.
      //body: JSON.stringify(data),
      mode: 'cors',
      /*headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }*/
      })
      .then(response => response.json())
      .then(
        (result) => {
          /*this.setState({
            isLoaded: true,
            items: result.items
          });*/
          console.log('fetch done:');
          console.log(result);

          this.setState({ pageArr: result });//Store the entire file array
          this.setState({ numPages: result.length });//Define the total number of pages of pdf
          this.setState(state => ({ pageName: mediaPath + state.pageArr[state.pageNumber - 1] }));//Define first page

          //Define first interactive content if any
          this.setIntImg(result[0]);
          //let intName = this.getFileName(result[0]);
          //let intFilter = this.state.intPagesArr.filter(page => (page.children[0].textContent === result[0]));
          //let intFilter = this.getInt(intName);
          //this.setState({ intArr: intFilter });
        },
        //Note: it's important to handle errors here
        //Instead of a catch() block so that we don't swallow
        //Exceptions from actual bugs in components
        (error) => {
          console.log('fetch fail: ' + JSON.stringify(error));
          /*this.setState({
            isLoaded: true,
            error
          });*/
        }
      );
  };

  componentDidMount = () => {
    //console.log(pdfFile);///static/media/ZB20190706-MAG-023-00.3ffb42d6.pdf
    this.getIntContent();
    this.getFileListing();
  };

  render(){
    const { pageNumber, numPages, pageName, intArr } = this.state;
    let intResult;
    console.log(intArr);
    console.log(Array.from(intArr));
    console.log(typeof(intArr[0]));
    console.log(intArr[0]);

    this.intImage = intArr.map((int, index) => {
      console.log(int.children);
      console.log(Array.from(int.children)[0].textContent);
      console.log(Array.from(int.children)[0]);
      //this.setState({ intResult: Array.from(int.children) });
      intResult = Array.from(int.children);
      console.log(typeof(intResult[1].textContent));

      //styled-components
      /*let test1 = '1';
      let test2 = '1';
      let Img = Styled.img`
        top: ${test1 + 'px'};
        left: ${test2 + 'px'};
      `;*/
      
      let pdfImageName = intResult[5].textContent.match(/[a-zA-Z0-9]+.gif/g);
      let pdfImage = mediaPath + pdfImageName;

      //CSS with JavaScript
      let style = {
        top: `${intResult[2].textContent + 'px'}`,
        left: `${intResult[1].textContent + 'px'}`
      };
      //return <img width={intResult[3].textContent} height={intResult[4].textContent} alt="" src={pdfImage} style={{ top: `${intResult[2].textContent + 'px'}`, left: `${intResult[1].textContent + 'px'}`}} />;
      return <img width={intResult[3].textContent} height={intResult[4].textContent} alt="" src={pdfImage} style={style} />;
    });

    return (
      <div className="main_container">
        <div className="w3-center">
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <NavButton app={this} pageNumber={pageNumber} numPages={numPages} />
        </div>

        <div className="pdf_container">
          { this.state && intArr &&
            this.intImage
          }
          <Document
            file={pageName}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={1} />
          </Document>
        </div>

        <div className="w3-center">
          {/*<nav className="w3-bar">
            <button className={"w3-button w3-white w3-hover-khaki w3-border w3-border-white w3-round " + (pageNumber === 1 ? 'w3-disabled' : '')} onClick={this.goToPrevPage}>&laquo; Previous</button>
            <button className={"w3-button w3-white w3-hover-khaki w3-border w3-border-white w3-round " + (pageNumber === numPages ? 'w3-disabled' : '')} onClick={this.goToNextPage}>Next &raquo;</button>
        </nav>*/}
          <NavButton app={this} pageNumber={pageNumber} numPages={numPages} />
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      </div>
    );
  }
}

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