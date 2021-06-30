<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();
// Recepción de los datos enviados mediante POST desde el JS   

$descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';
$id_area = (isset($_POST['id_area'])) ? $_POST['id_area'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id = (isset($_POST['id'])) ? $_POST['id'] : '';
switch($opcion){
    case 1: //alta
        // print_r($_REQUEST);
        // die;
        $consulta = "INSERT INTO tipo_requerimiento (descripcion,id_area) VALUES('$descripcion','$id_area') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 

        $consulta = "SELECT id,descripcion,(SELECT a.descripcion from area as a where a.id = id_area) As area FROM tipo_requerimiento ORDER BY id DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2: //modificación
        // print_r($_REQUEST);die;
        $consulta = "UPDATE tipo_requerimiento SET descripcion='$descripcion',id_area='$id_area'";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT id, descripcion ,(SELECT a.descripcion from area as a where a.id = id_area) AS area FROM tipo_requerimiento WHERE id='$id' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3://baja
        $consulta = "DELETE FROM tipo_requerimiento WHERE id='$id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;        
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;

