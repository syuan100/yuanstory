<?php
  
include '../../assets/debugging/ChromePhp.php';
ChromePhp::log('Hello console!');

$xmldoc = new DomDocument('1.0');    
$xmldoc->preserveWhiteSpace = false;
$xmldoc->formatOutput = true;

$xml = file_get_contents('./metadata.xml');
$xmldoc->loadXML($xml);
$xpath = new DOMXPath($xmldoc);

$images = $xmldoc->firstChild;

$currentConstant = (int)$xmldoc->getElementsByTagName('constant')->item(0)->nodeValue;

if (isset($_POST['data']) && is_array($_POST['data'])) {
  foreach ($_POST['data'] as $row => $data) {     

    $imageElement = $xmldoc->createElement('image');
    $nameAttribute = $xmldoc->createAttribute('name');
    $nameAttribute->value = $data['name'];
    $imageElement->appendChild($nameAttribute); 

    $idAttribute = $xmldoc->createAttribute('id');
    $idAttribute->value = $currentConstant;
    $imageElement->appendChild($idAttribute);

    $images->appendChild($imageElement);

    $dateElement = $xmldoc->createElement('date');
    $imageElement->appendChild($dateElement);
    $dateText = $xmldoc->createTextNode($data['date']);
    $dateElement->appendChild($dateText);

    $tagsElement = $xmldoc->createElement('tags');
    $tagData = explode(', ', $data['tags']);

    foreach($tagData as $tagValue) {
      $tagElement = $xmldoc->createElement('tag');
      $tagsElement->appendChild($tagElement);
      $tagText = $xmldoc->createTextNode($tagValue);
      $tagElement->appendChild($tagText);
    }

    $imageElement->appendChild($tagsElement);

    $currentConstant++;

  }

}

if (isset($_POST['delete']) && is_array($_POST['delete'])) {
  foreach ($_POST['delete'] as $row => $data) {

    $query = "//image[@name='" . (String)$data["file"] . "']";
    ChromePhp::log($xpath->query($query));

    foreach($xpath->query($query) as $node) {
      $node->parentNode->removeChild($node);
    }

    $currentConstant--;

  }

}

$xmldoc->getElementsByTagName('constant')->item(0)->nodeValue = $currentConstant;

$xmldoc->save('./metadata.xml');

?>