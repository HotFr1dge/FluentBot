<?php 

if (empty($_GET['plik']) OR !isset($_GET['plik'])) {
	$res = json_decode('{"error": "Błędne zapytanie! Pusta zmianna lub brak zmiennej plik!", "status":400, "powered_by":"fluentbot.pl"}');
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($res, JSON_PRETTY_PRINT);
} else {
	$filePath = $_GET['plik'];
	if (!filter_var($filePath, FILTER_VALIDATE_URL)) { 
		$res = json_decode('{"error": "Błędne zapytanie! Zły format pliku!", "status":400, "powered_by":"fluentbot.pl"}');
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($res, JSON_PRETTY_PRINT);
	} else {
		$type = get_headers($filePath, 1)["Content-Type"];
		if (!is_string($type)) {
			$res = json_decode('{"error": "Błędne zapytanie! Zły format pliku!", "status":400, "powered_by":"fluentbot.pl"}');
			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($res, JSON_PRETTY_PRINT);
		} else {
			if (strpos('text/plain', $type) == true) {
				$res = json_decode('{"error": "Błędne zapytanie! Zły format pliku!", "status":400, "powered_by":"fluentbot.pl"}');
				header('Content-Type: application/json; charset=utf-8');
				echo json_encode($res, JSON_PRETTY_PRINT);
			} else {
				$tablica = explode("\n", file_get_contents($_GET['plik']));
				$ilość_kont = count($tablica);
				$number = rand(0, $ilość_kont-1);
				if (empty(trim($tablica[$number]))) {
					$res = json_decode('{"error": "Nie znaleziono! Plik niedostępny!", "status":404, "powered_by":"fluentbot.pl"}');
					header('Content-Type: application/json; charset=utf-8');
					echo json_encode($res, JSON_PRETTY_PRINT);
				} else {
					$res = json_decode('{"random": "'.trim($tablica[$number]).'", "status":200, "powered_by":"fluentbot.pl"}');
					header('Content-Type: application/json; charset=utf-8');
					echo json_encode($res, JSON_PRETTY_PRINT);
				}
			}
		}
	}
}
?>