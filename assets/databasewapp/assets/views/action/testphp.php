<?php
//Set up some vars
        $url = 'http://localhost/QEDataManagementTEMP/packet/LAYOUT-2/assets/views/action/Receiver.php';

        $user     = 'someusername';
        $pw       = 'somepassword';
        $auth_key = 'YourSecretAuthKey';

        $fields = array(
            'auth' => urlencode($auth_key),
            'user' => urlencode($user),
            'pw'   => urlencode($pw),
        );

        // Init. string
        $fields_string = '';
        // URL-ify stuff
        foreach ($fields as $key => $value) {$fields_string .= $key . '=' . $value . '&';}
        rtrim($fields_string, '&');

        //open connection
        $ch = curl_init();

        //set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);

        //execute post
        $result = curl_exec($ch);

        //close connection
        curl_close($ch);


?>