$(document).ready(function() {



});

function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}

var showFilters, deleteSelectedPics, retrieveTagsTest, retrieveTags, sendMetadata, uploadMetadata, filterPage, placeImages;

showFilters = function() {
  return $.ajax({
    type: "GET",
    url: "/server/metadata/metadata.xml",
    dataType: "xml",
    success: function(xml) {
      var $tags, allTags, filterListEl, uniqueTags, tags, _i, _len, _results;
      allTags = $(xml).find("tag");

      var seen = {};
      var j = 0;
      $.each( allTags, function(i,e) {
        var txt = $(this).text();
        if (seen[txt]) {
          allTags[i] = "";
        } else {
          seen[txt] = true;
        }
      });

      uniqueTags = cleanArray(allTags);

      filterListEl = $('ul.filters');
      _results = [];
      for (_i = 0, _len = uniqueTags.length; _i < _len; _i++) {
        tags = uniqueTags[_i];
        $tags = $(tags);
        _results.push(filterListEl.append("<li><a href='/filter#" + ($tags.text()) + "'>" + ($tags.text()) + "</a></li>"));
      }
      return _results;
    }
  });
};

placeImages = function(imageDataArray, attachmentEl) {
  var $imageData, $tag, context, imageData, imageHTML, imageTemplate, source, tag, tagObject, tags, _i, _j, _len, _len1, _results;
  source = $("#image-template").html();
  imageTemplate = Handlebars.compile(source);
  imageDataArray = shuffleArray(imageDataArray);
  attachmentEl.empty();
  _results = [];
  for (_i = 0, _len = imageDataArray.length; _i < _len; _i++) {
    imageData = imageDataArray[_i];
    $imageData = $(imageData);
    tags = $imageData.find('tag');
    tagObject = "";
    for (_j = 0, _len1 = tags.length; _j < _len1; _j++) {
      tag = tags[_j];
      $tag = $(tag);
      tagObject = tagObject + "<div class='tag'>" + $tag.text() + "</div>";
    }
    context = {
      fileName: $imageData.attr('name'),
      tags: tagObject,
      date: $imageData.find('date').text()
    };
    imageHTML = imageTemplate(context);
    _results.push(attachmentEl.append(imageHTML));
  }
  return _results;
};

filterPage = function() {
  var filterTerm, imageData;
  imageData = [];
  $(".image-column").html('<br /><center>LOADING</center>');
  if (window.location.hash) {
    filterTerm = window.location.href.split("#").pop();
    return $.ajax({
      type: "GET",
      url: "/server/metadata/metadata.xml",
      dataType: "xml",
      success: function(xml) {
        var $imageByTag, $tags, matchedTags, tags, _i, _len;
        matchedTags = $(xml).find("tag").filter(function() {
          return $(this).text() === filterTerm;
        });
        for (_i = 0, _len = matchedTags.length; _i < _len; _i++) {
          tags = matchedTags[_i];
          $tags = $(tags);
          $imageByTag = $tags.parents("image");
          imageData.push($imageByTag);
        }
        return placeImages(imageData, $(".image-column"));
      }
    });
  } else {
    return $.ajax({
      type: "GET",
      url: "/server/metadata/metadata.xml",
      dataType: "xml",
      success: function(xml) {
        var $images, allImages, i, images, _i, _j, _len;
        allImages = $(xml).find("image");
        if (allImages.length >= 25) {
          for (i = _i = 0; _i < 25; i = ++_i) {
            imageData.push($(xml).find("image")[i]);
          }
        } else {
          for (_j = 0, _len = allImages.length; _j < _len; _j++) {
            images = allImages[_j];
            $images = $(images);
            imageData.push($images);
          }
        }
        return placeImages(imageData, $(".image-column"));
      }
    });
  }
};

//Uploader Functions


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
  postData["delete[0][file]"] = fileName;

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
      console.log("No data found.");
    },
    success: function(xml) {
      console.log("it works");
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