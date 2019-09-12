<?php
  //Headers
  header('Content-Type: application/json');

  if(false){
    header('p3p: CP=IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Authorization, X-Requested-With');
  }

  $dir = 'static/media';
  $fileArr = scandir($dir);//Return 'Array of Object': Array([0] => 'abc')
  //$fileArr = scandir($dir, 1);
  $fileArrNew = array();

  //Convert 'Array of Object' to 'JSON Array', e.g. ['abc', 'bcd']
  $fileArrFilter = array_filter($fileArr, function($file){
    $fileExt = pathinfo($file);
    //return (strpos($file, '.pdf') !== false);
    //return (preg_match_all('/\.pdf$/', $file));
    return ($fileExt['extension'] === 'pdf');
  });

  foreach($fileArrFilter as $key => $file){
    array_push($fileArrNew, $file);
  }

  //print_r($fileArr);
  //print_r($fileArrFilter);
  //print_r(count($fileArrFilter));
  //print_r(sizeof($fileArrFilter));
  //print json_encode($fileArrFilter);
  //print_r($fileArrNew);
  print json_encode($fileArrNew);
?>