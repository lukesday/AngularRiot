<?php

if (isset($_REQUEST['id'])){
    
    $userID = $_REQUEST['id'];
    
    // Getting Champion Names

    $content = file_get_contents('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/?api_key=b66c38fa-0d8e-4eec-8c6d-e1aeee178df6');

    $content = json_decode($content);

    $array;

    foreach($content->data as $champ){


        $array[$champ->id] = array(
            "name" => $champ->name,
            "id" => $champ->id

            );

    }
    
    // Getting Spell Names
    
    $spellContent = file_get_contents('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/summoner-spell?api_key=b66c38fa-0d8e-4eec-8c6d-e1aeee178df6');
    
    $spellContent = json_decode($spellContent);
    
    $spellArray;
    
    foreach($spellContent->data as $spell){

        $spellArray[$spell->id] = array(
            "key" => $spell->key,
            "id" => $spell->id,
            "name" => $spell->name

            );

    }
    
    
    // Adding data to main file

    $matchContent = file_get_contents('https://euw.api.pvp.net/api/lol/euw/v2.2/matchhistory/' . urlencode($userID) .'?api_key=b66c38fa-0d8e-4eec-8c6d-e1aeee178df6' . '&beginIndex=0&endIndex=15');

    $matchContent = json_decode($matchContent);

    $x = 1;

    foreach($matchContent->matches as $match){

        $id = $match->participants[0]->championId;
        
        $spell1 = $match->participants[0]->spell1Id;
            
        $spell2 = $match->participants[0]->spell2Id;
        

        $match->participants[0]->champImage = "http://ddragon.leagueoflegends.com/cdn/5.10.1/img/champion/" . preg_replace("/[^A-Za-z0-9]/", "", $array[$id]['name']) . ".png";
        
        $match->participants[0]->spell1 = $spellArray[$spell1]['name'];
        
        $match->participants[0]->spell2 = $spellArray[$spell2]['name'];
        
        $match->participants[0]->spellImg1 = "http://ddragon.leagueoflegends.com/cdn/5.10.1/img/spell/" . $spellArray[$spell1]['key'] . ".png";
        
        $match->participants[0]->spellImg2 = "http://ddragon.leagueoflegends.com/cdn/5.10.1/img/spell/" . $spellArray[$spell2]['key'] . ".png";

    }

    echo json_encode($matchContent);
    
}else{
    
    echo "no id";
    
}

?>