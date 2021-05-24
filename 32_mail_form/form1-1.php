<?php
  // $subject = 'お仕事に関するお問い合わせ';
  // $body = 'お見積の件で、連絡をしました。';

  $form = array();
  $form['subject'] = 'お仕事に関するお問い合わせ';
  $form['body'] = 'お見積の件で、連絡をしました。';
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>お問い合わせ</title>
</head>
<body>
  <!-- <h1>< ?php echo $subject ?></h1>
  <p>< ?php echo $body ?></p> -->

  <h1><?php echo $form['subject'] ?></h1>
  <p><?php echo $form['body'] ?></p>
</body>
</html>
