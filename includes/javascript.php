<!-- jQuery/UI -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

<!-- Latest compiled and minified JavaScript for Bootstrap -->
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>

<!-- Yuanstory script -->
<script src="js/yuanstory.js"></script>

<!-- JS Templates -->
<script src="js/handlebars-v1.2.0.js"></script>

<!-- Hashchange Plugin -->
<script src="js/jquery.ba-hashchange.js"></script>

<!-- Knuth Shuffle -->
<script src="js/knuth-shuffle.js"></script>

<script id="image-template" type="text/x-handlebars-template">
  <div class="image-container">
    <div class="image"><img src="/server/php/files/{{fileName}}" /></div>
    <div class="tag-container">{{{tags}}}</div>
    <div class="date">{{date}}</div>
  </div>
</script>