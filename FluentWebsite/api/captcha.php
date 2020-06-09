<?php

	$i = rand(1,16);

	$baza = mysqli_connect("localhost:3306","phpmyadmin","","captcha");

	if (mysqli_connect_errno()) {
		$res = json_decode('{"error": "Usługa niedostępna! Nastąpił błąd połączenia z bazą danych!", "status":503, "powered_by":"fluentbot.pl"}');
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($res, JSON_PRETTY_PRINT);
	}

	$wynik = mysqli_query($baza,"SELECT * FROM `captche` WHERE id = $i");

	while($row = mysqli_fetch_array($wynik))

	{
		$res = json_decode('{"img": "'.$row['img'].'", "odp":"'.$row['odpowiedz'].'", "status":200, "powered_by":"fluentbot.pl"}');
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($res, JSON_PRETTY_PRINT);
	}

	mysqli_close($baza);

?> 