<?php

    include_once("./../model/conexao.php");

    $cep = $_POST['cep']; 
    $bairro = $_POST['bairro'];
    $rua = $_POST['rua']; 
    $localidade = $_POST['cidade'];
    $uf = $_POST['uf'];   
    
    $cep = str_replace(array("-",".",","),"",$cep);
    if(isset($_POST['cep'])){
    $query = "INSERT INTO cadastro_cep(cep,rua,bairro,localidade,uf) VALUES ('$cep','$rua','$bairro','$localidade','$uf')";
    $query = $con->query($query) or die($con->error);
    $response = array('0' => true);
    }
    else{
        $response = array('0' => false);
    }
    echo json_encode($response);



?>
