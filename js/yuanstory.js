$(document).ready(function() {


});

var deleteSelectedPics, retrieveTagsTest, retrieveTags, sendMetadata, uploadMetadata;

deleteSelectedPics = function() {
  var $checkedBoxes, $checkedBoxesEl, checkedBoxes, fileName, i, postData, _i, _len;
  postData = {};
  $checkedBoxesEl = $('input[name="delete"]:checked');
  for (i = _i = 0, _len = $checkedBoxesEl.length; _i < _len; i = ++_i) {
    checkedBoxes = $checkedBoxesEl[i];
    $checkedBoxes = $(checkedBoxes);
    fileName = $checkedBoxes.attr('file');
    postData["delete[" + i + "][file]"] = fileName;
  }
  return $.ajax({
    type: "POST",
    url: "/server/metadata/requestHandler.php",
    data: postData,
    cache: false,
    error: function() {
      return alert("No data found.");
    },
    success: function(xml) {
      return console.log("it works");
    }
  });
};

deletePic = function(fileName) {
  var postData;
  postData = {};
  postData["delete[" + i + "][file]"] = fileName;

  return $.ajax({
    type: "POST",
    url: "/server/metadata/requestHandler.php",
    data: postData,
    cache: false,
    error: function() {
      return alert("No data found.");
    },
    success: function(xml) {
      return console.log("it works");
    }
  });
};

retrieveDate = function(fileName) {

  $.ajax({
    type: "GET",
    url: "/server/metadata/metadata.xml",
    dataType: "xml",
    success: function(xml) {
      var $currentImage, dateItem, dateText;
      dateText = "";
      $currentImage = $(xml).find("[name='" + fileName + "']");
      dateItem = $currentImage.find("date");
      dateText = $(dateItem).text();
      return  $("[file='" + fileName + "'] input[name='date']").attr('value', dateText);
    }
  });

};

retrieveTags = function(fileName) {
  $.ajax({
    type: "GET",
    url: "/server/metadata/metadata.xml",
    dataType: "xml",
    success: function(xml) {
      var $currentImage, $tag, $tagItems, $tagText, _i, _len;
      $tagText = "";
      $currentImage = $(xml).find("[name='" + fileName + "']");
      $tagItems = $currentImage.find("tag");
      for (_i = 0, _len = $tagItems.length; _i < _len; _i++) {
        tag = $tagItems[_i];
        if (_i != (_len - 1) ) {
          $tagText = $tagText + $(tag).text() + ", ";
        } else {
          $tagText = $tagText + $(tag).text();
        }
      }
      return  $("[file='" + fileName + "'] input[name='tags']").attr('value', $tagText);
    }
  });
};


sendMetadata = function(filename, filetags, filedate, index) {
  var postData;
  postData = {};
  postData["data[" + index + "][name]"] = filename;
  postData["data[" + index + "][tags]"] = filetags;
  postData["data[" + index + "][date]"] = filedate;
  return $.ajax({
    type: "POST",
    url: "/server/metadata/requestHandler.php",
    data: postData,
    cache: false,
    error: function() {
      return alert("No data found.");
    },
    success: function(xml) {
      return alert("it works");
    }
  });
};


uploadMetadataAllPics = function() {

  var $uploadEl, allUploadTemplateEls, uploadEls, uploadFileDate, uploadFileName, uploadFileTags, _i, _len;
  
  allUploadTemplateEls = $('.template-upload');

  for (i = _i = 0, _len = allUploadTemplateEls.length; _i < _len; _i++) {
    uploadEls = allUploadTemplateEls[_i];
    $uploadEl = $(uploadEls);

    uploadFileName = $uploadEl.find('.name').text();
    uploadFileTags = $uploadEl.find('input[name="tags"]').val();
    uploadFileDate = $uploadEl.find('input[name="date"]').val();
    
    sendMetadata(uploadFileName, uploadFileTags, uploadFileDate, i);

  }
  
};