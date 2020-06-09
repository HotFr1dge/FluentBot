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

		if ($_GET['type'] == 'horizontal') {
			$filePath = $_GET['image'];
			$type = get_headers($filePath, 1)["Content-Type"];
			if ($type === 'image/png') {
				$image = imagecreatefrompng($filePath);
				imageflip ( $image, IMG_FLIP_HORIZONTAL);
				header('Content-Type: image/png');
				imagepng($image);
			} else if ($type === 'image/jpeg') {
				$image = imagecreatefromjpeg($filePath);
				imageflip ( $image, IMG_FLIP_HORIZONTAL);
				header('Content-Type: image/jpeg');
				imagejpeg($image);
			}else if ($type === 'image/gif') {
				$image = imagecreatefromgif($filePath);
				imageflip ( $image, IMG_FLIP_HORIZONTAL);
				header('Content-Type: image/gif');
				imagegif($image);
			} else if ($type === 'image/bmp') {
				$image = imagecreatefrombmp($filePath);
				imageflip ( $image, IMG_FLIP_HORIZONTAL);
				header('Content-Type: image/bmp');
				imagebmp($image);
			} else if ($type === 'image/wbmp') {
				$image = imagecreatefromwbmp($filePath);
				imageflip ( $image, IMG_FLIP_HORIZONTAL);
				header('Content-Type: image/wbmp');
				imagewbmp($image);
			} else if ($type === 'image/webp') {
				$image = imagecreatefromwebp($filePath);
				imageflip ( $image, IMG_FLIP_HORIZONTAL);
				header('Content-Type: image/webp');
				imagewebp($image);
			} else {
				$image = imagecreatefrompng('ArrowsFiles/non.png');
				header('Content-Type: image/png');
				imagepng($image);
				imagedestroy($image);
			}
		} else if ($_GET['type'] == 'vertical') {
			$filePath = $_GET['image'];
			$type = get_headers($filePath, 1)["Content-Type"];
			if ($type === 'image/png') {
				$image = imagecreatefrompng($filePath);
				imageflip ( $image, IMG_FLIP_VERTICAL);
				header('Content-Type: image/png');
				imagepng($image);
			} else if ($type === 'image/jpeg') {
				$image = imagecreatefromjpeg($filePath);
				imageflip ( $image, IMG_FLIP_VERTICAL);
				header('Content-Type: image/jpeg');
				imagejpeg($image);
			}else if ($type === 'image/gif') {
				$image = imagecreatefromgif($filePath);
				imageflip ( $image, IMG_FLIP_VERTICAL);
				header('Content-Type: image/gif');
				imagegif($image);
			} else if ($type === 'image/bmp') {
				$image = imagecreatefrombmp($filePath);
				imageflip ( $image, IMG_FLIP_VERTICAL);
				header('Content-Type: image/bmp');
				imagebmp($image);
			} else if ($type === 'image/wbmp') {
				$image = imagecreatefromwbmp($filePath);
				imageflip ( $image, IMG_FLIP_VERTICAL);
				header('Content-Type: image/wbmp');
				imagewbmp($image);
			} else if ($type === 'image/webp') {
				$image = imagecreatefromwebp($filePath);
				imageflip ( $image, IMG_FLIP_VERTICAL);
				header('Content-Type: image/webp');
				imagewebp($image);
			} else {
				$image = imagecreatefrompng('ArrowsFiles/non.png');
				header('Content-Type: image/png');
				imagepng($image);
				imagedestroy($image);
			}
		} else {
			$filePath = $_GET['image'];
			$type = get_headers($filePath, 1)["Content-Type"];
			if ($type === 'image/png') {
				$image = imagecreatefrompng($filePath);
				imageflip ( $image, IMG_FLIP_BOTH);
				header('Content-Type: image/png');
				imagepng($image);
			} else if ($type === 'image/jpeg') {
				$image = imagecreatefromjpeg($filePath);
				imageflip ( $image, IMG_FLIP_BOTH);
				header('Content-Type: image/jpeg');
				imagejpeg($image);
			}else if ($type === 'image/gif') {
				$image = imagecreatefromgif($filePath);
				imageflip ( $image, IMG_FLIP_BOTH);
				header('Content-Type: image/gif');
				imagegif($image);
			} else if ($type === 'image/bmp') {
				$image = imagecreatefrombmp($filePath);
				imageflip ( $image, IMG_FLIP_BOTH);
				header('Content-Type: image/bmp');
				imagebmp($image);
			} else if ($type === 'image/wbmp') {
				$image = imagecreatefromwbmp($filePath);
				imageflip ( $image, IMG_FLIP_BOTH);
				header('Content-Type: image/wbmp');
				imagewbmp($image);
			} else if ($type === 'image/webp') {
				$image = imagecreatefromwebp($filePath);
				imageflip ( $image, IMG_FLIP_BOTH);
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
}

?>