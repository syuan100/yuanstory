<!DOCTYPE html>

<html>

<?php include './includes/header.php' ?>

<body>

  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="fixed">
          <h3>Yuanstory:Filters</h3>
          <ul class="filters">
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="image-column">
        </div>
      </div>
    </div>
  </div>

  <?php include './includes/javascript.php'; ?>

  <script>
    showFilters();

    $(window).hashchange( function() {
      filterPage();
    });

    $(window).hashchange();
  </script>

  

</body>

</html>