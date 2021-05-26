<?php
  // if (isset($_GET['name'])) {
  //   $name = htmlspecialchars($_GET['name']);
  // } else {
  //   $name = '名前がないよ';
  // }
  // if (isset($_GET['year'])) {
  //   $year = htmlspecialchars($_GET['year']);
  // } else {
  //   $year = '年齢がないよ';
  // }
  // if (isset($_GET['address'])) {
  //   $address = htmlspecialchars($_GET['year']);
  // } else {
  //   $address = '住所がないよ';
  // }

  // $name = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : '名前がないよ';
  // $year = isset($_GET['year']) ? htmlspecialchars($_GET['year']) : '年齢がないよ';
  // $address = isset($_GET['address']) ? htmlspecialchars($_GET['address']) : '住所がないよ';
  // // $gender = isset($_GET['gender']) ? htmlspecialchars($_GET['gender']) : '性別がないよ';
  // if (!isset($_GET['gender'])) {
  //   $gender = '性別がないよ';
  // } elseif ($_GET['gender'] == 'm') {
  //   $gender = '男';
  // } else {
  //   $gender = '女';
  // }

  $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '名前がないよ';
  $year = isset($_POST['year']) ? htmlspecialchars($_POST['year']) : '年齢がないよ';
  $address = isset($_POST['address']) ? htmlspecialchars($_POST['address']) : '住所がないよ';
  if (!isset($_POST['gender'])) {
    $gender = '性別がないよ';
  } elseif ($_POST['gender'] == 'm') {
    $gender = '男';
  } else {
    $gender = '女';
  }
  $text = isset($_POST['text']) ? htmlspecialchars($_POST['text']) : '本文がないよ';
?>

<h1>thanks.php</h1>
<p>お名前：
  <?php echo $name; ?>
</p>
<p>年齢：
  <?php echo $year; ?>
</p>
<p>住所：
  <?php echo $address; ?>
</p>
<p>性別：
  <?php echo $gender; ?>
</p>
<p>本文：<br>
  <?php echo nl2br($text); ?>
</p>
