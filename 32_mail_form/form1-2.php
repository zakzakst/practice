<?php
  echo '<pre>';
  var_dump($_POST);
  echo '</pre>';
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>お問い合わせ</title>
</head>
<body>
  <form action="form1.php" method="POST">
    <table>
      <tr>
        <th>お名前</th>
        <td><input type="text" name="name"></td>
      </tr>
      <tr>
        <th>メールアドレス</th>
        <td><input type="text" name="email"></td>
      </tr>
      <tr>
        <th>お問い合わせの種類</th>
        <td>
          <select name="subject">
            <option value="お仕事に関するお問い合わせ">お仕事に関するお問い合わせ</option>
            <option value="その他のお問い合わせ">その他のお問い合わせ</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>お問い合わせ内容</th>
        <td><textarea name="body" cols="40" rows="10"></textarea></td>
      </tr>
      <tr>
        <td colspan="2"><input type="submit" name="submit" value="確認画面へ"></td>
      </tr>
    </table>
  </form>
</body>
</html>
