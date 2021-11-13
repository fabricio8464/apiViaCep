<?php 

include_once('./../model/conexao.php');

$query = "SELECT * FROM cadastro_cep ORDER BY localidade ";
$query = $con->query($query) or die ($con->error); 

$response = array();

while($busca = $query->fetch_array()){
    if(is_array($busca)){
        array_push($response, $busca);
    }
}
echo json_encode($response);



?>