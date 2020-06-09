<?php

error_reporting(0);

if (!isset ($_GET['image'])) {
	$res = json_decode('{"error": "Błędne zapytanie! Brak zmiennej image!", "status":400, "powered_by":"fluentbot.pl"}');
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($res, JSON_PRETTY_PRINT);
} else {
	if (empty ($_GET['image'])) {
		$res = json_decode('{"error": "Błędne zapytanie! Pusta zmianna image!", "status":400, "powered_by":"fluentbot.pl"}');
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($res, JSON_PRETTY_PRINT);
	} else {
		if (empty ($_GET['sens'])) {
			$czulosc = 3;
		} else {
			$czulosc = $_GET['sens'];
		}
	
		$filePath = $_GET['image'];
		$type = get_headers($filePath, 1)["Content-Type"];
		if ($type === 'image/png') {
			$image = imagecreatefrompng($filePath);
			imagefilter ( $image, IMG_FILTER_PIXELATE, $czulosc);
			header('Content-Type: image/png');
			imagepng($image);
		} else if ($type === 'image/jpeg') {
			$image = imagecreatefromjpeg($filePath);
			imagefilter ( $image, IMG_FILTER_PIXELATE, $czulosc);
			header('Content-Type: image/jpeg');
			imagejpeg($image);
		} else if ($type === 'image/gif') {
			$image = imagecreatefromgif($filePath);
			imagefilter ( $image, IMG_FILTER_PIXELATE, $czulosc);
			header('Content-Type: image/gif');
			imagegif($image);
		} else if ($type === 'image/bmp') {
			$image = imagecreatefrombmp($filePath);
			imagefilter ( $image, IMG_FILTER_PIXELATE, $czulosc);
			header('Content-Type: image/bmp');
			imagebmp($image);
		} else if ($type === 'image/wbmp') {
			$image = imagecreatefromwbmp($filePath);
			imagefilter ( $image, IMG_FILTER_PIXELATE, $czulosc);
			header('Content-Type: image/wbmp');
			imagewbmp($image);
		} else if ($type === 'image/webp') {
			$image = imagecreatefromwebp($filePath);
			imagefilter ( $image, IMG_FILTER_PIXELATE, $czulosc);
			header('Content-Type: image/webp');
			imagewebp($image);
		} else {
			$image = imagecreatefrompng('ArrowsFiles/non.png');
			header('Content-Type: image/png');
			imagepng($image);
			imagedestroy($image);
		}
	}
}

?>