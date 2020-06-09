<?php

function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct){ 
    $cut = imagecreatetruecolor($src_w, $src_h);
    imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h); 
    imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h); 
    imagecopymerge($dst_im, $cut, $dst_x, $dst_y, 0, 0, $src_w, $src_h, $pct); 
}

if (!isset ($_GET['img'])) {
	$res = json_decode('{"error": "Błędne zapytanie! Brak zmiennej img!", "status":400, "powered_by":"fluentbot.pl"}');
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($res, JSON_PRETTY_PRINT);
} else {
	if (empty ($_GET['img'])) {
		$res = json_decode('{"error": "Błędne zapytanie! Pusta zmianna img!", "status":400, "powered_by":"fluentbot.pl"}');
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($res, JSON_PRETTY_PRINT);
	} else {
			$filePath = $_GET["img"];
			$type = get_headers($filePath, 1)["Content-Type"];
			if ($type === 'image/png') {
				$img2 = imagecreatefrompng($_GET["img"]);
			} else if ($type === 'image/jpeg') {
				$img2 = imagecreatefromjpeg($_GET["img"]);
			} else if ($type === 'image/gif') {
				$img2 = imagecreatefromgif($_GET["img"]);
			} else if ($type === 'image/bmp') {
				$img2 = imagecreatefrombmp($_GET["img"]);
			} else if ($type === 'image/wbmp') {
				$img2 = imagecreatefromwbmp($_GET["img"]);
			} else if ($type === 'image/webp') {
				$img2 = imagecreatefromwebp($_GET["img"]);
			} else {
				$image = imagecreatefrompng('ArrowsFiles/non.png');
				header('Content-Type: image/png');
				imagepng($image);
				imagedestroy($image);
			}

		$img1 = imagecreatefrompng('ArrowsFiles/Untitled5.png');
		$img2scale = imagescale ($img2, 220 , 220);
		

		$merged_image = imagecreatetruecolor(800, 800);
		imagealphablending($merged_image, false);
		imagesavealpha($merged_image, true);

		imagecopy($merged_image, $img1, 0, 0, 0, 0, 800, 800);
		imagecopymerge_alpha($merged_image, $img2scale, 285, 426, 0, 0, 220, 220, 100);

		header('Content-Type: image/png');
		imagepng($merged_image);
		imagedestroy($merged_image);
	}
}
	
?>