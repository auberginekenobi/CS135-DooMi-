<?php

/**
 * app.php
 *
 * Duit app landing page
 *
 * PHP v5.6
 *
 * @author    Kelli Rockwell <kellirockwell@mail.com>
 * @copyright 2017 DUiT
 * @since     File available since release 0.0.3  
 */

require_once('../duit-db/db-mapper.php');

?>

<!DOCTYPE html>
<html lang='en'>
<head>
	<meta id='meta' name='viewport' content='width=device-width, initial-scale=1.0'>
	<meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
	<title>DUiT | Be Fantasktic</title>
</head>
<body>

<!-- FONTS -->
<!-- Open Sans weights 300, 400, and 700 onle -->
<link href='https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i' rel='stylesheet'>
<!-- Header fonts (Amsi) sourced in CSS -->

<!-- CSS -->
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/6.0.0/normalize.min.css'>
<link rel='stylesheet' href='css/main.css' type='text/css'>
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' type='text/css'>

<!-- JS -->
<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
<script src='js/app.js'></script>
<script src='js/main.js'></script>

<header>
	<div class='col one'>
		<i class='fa fa-cog' id='settings-btn' aria-hidden='true'></i>
	</div>
	<div class='col two'>
		<time id='time'>4:35 PM</time>
		<time id='date'>Friday, April 21</time>
	</div>
	<div class='col three'>
		<i class='fa fa-plus' id='quick-add-btn' aria-hidden='true'></i>
	</div>
</header>

<aside id='settings' class='hidden'>
	<img src='../../img/duit-check-50.png' id='logo'>
</aside>

<section id='center'>

	<aside id='change-view'>
		Side menu
	</aside>
		
	<main>
		Main box
	</main>

	<aside id='detail-view'>
		Detail view
	</aside>

</section>

<footer>
	<span>Designed and developed with <i class='fa fa-heart' aria-hidden='true'></i> by Kelli Rockwell (<a target='_blank' href='https://github.com/courier-new'>@courier-new</a>), Owen Chapman (<a target='_blank' href='https://github.com/auberginekenobi'>@auberginekenobi</a>), and Patrick Shao (<a target='_blank' href='https://github.com/patrickshao'>@patrickshao</a>). View the project on <a target='_blank' href='https://github.com/auberginekenobi/duit'>GitHub</a>.</span>
</footer>







<?php

// Testing Example

// echo '<pre>';
// var_dump($all);
// echo '</pre>';

// displayAsTable($all);

// $parameters = array('du_name' => 'pet cattypin\'s "head" if he wants it', 'du_note' => 'this is a tes\'t', 'user_id' => 'aMl3IxVzqQbZ2tcTiBsbC8A0ZfX2');
// $all = addDu($parameters);

// displayAsTable($all);

// $all = deleteDu(5);

// displayAsTable($all);

// $all = addDu($parameters);
// $all = addDu($parameters);
// $all = addDu($parameters);

// displayAsTable($all);

?>
	
	
</body>
</html>