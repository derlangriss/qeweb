<?php
$app->get('/session', function () {
    $db                      = new DbHandler();
    $session                 = $db->getSession();
    $response["uid"]         = $session['uid'];
    $response['phone']       = $session['phone'];
    $response["firstname"]   = $session['firstname'];
    $response["lastname"]    = $session['lastname'];
    $response["email"]       = $session['email'];
    $response["avartar"]     = $session['avartar'];
    $response['us_status']   = $session['us_status'];
    $response['ua_statusid'] = $session['ua_statusid'];

    echoResponse(200, $session);
});

$app->post('/login', function () use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'), $r->customer);
    $response = array();
    $db       = new DbHandler();
    $password = $r->customer->password;
    $email    = $r->customer->email;

    $user = $db->getOneRecord("select uid,firstname,lastname,phone,password,email,created,avartar,us_status,ua_statusid from users_auth
left join users_status on users_status.us_statusid =  users_auth.ua_statusid where phone='$email' or email='$email'");
    if ($user != null) {
        if (passwordHash::check_password($user['password'], $password)) {
            $response['status']      = "success";
            $response['message']     = 'Logged in successfully.';
            $response['firstname']   = $user['firstname'];
            $response['lastname']    = $user['lastname'];
            $response['uid']         = $user['uid'];
            $response['email']       = $user['email'];
            $response['createdAt']   = $user['created'];
            $response['avartar']     = $user['avartar'];
            $response['us_status']   = $user['us_status'];
            $response['ua_statusid'] = $user['ua_statusid'];
            $response['phone']       = $user['phone'];
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid']         = $user['uid'];
            $_SESSION['phone']       = $user['phone'];
            $_SESSION['firstname']   = $user['firstname'];
            $_SESSION['lastname']    = $user['lastname'];
            $_SESSION['email']       = $user['email'];
            $_SESSION['avartar']     = $user['avartar'];
            $_SESSION['us_status']   = $user['us_status'];
            $_SESSION['ua_statusid'] = $user['ua_statusid'];

        } else {
            $response['status']  = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    } else {
        $response['status']  = "error";
        $response['message'] = 'No such user is registered';
    }
    echoResponse(200, $response);
});
$app->post('/signUp', function () use ($app) {

    $response = array();
    $r        = json_decode($app->request->getBody());

    verifyRequiredParams(array('email', 'firstname', 'lastname', 'password', 'ua_statusid', 'phone'), $r->customer);

    require_once 'passwordHash.php';
    $db          = new DbHandler();
    $phone       = $r->customer->phone;
    $firstname   = $r->customer->firstname;
    $lastname    = $r->customer->lastname;
    $email       = $r->customer->email;
    $address     = $r->customer->address;
    $password    = $r->customer->password;
    $ua_statusid = $r->customer->ua_statusid;
    $avartar     = $r->customer->avartar;

    $isUserExists = $db->getOneRecord("select 1 from users_auth where phone='$phone' or email='$email'");
    if (!$isUserExists) {

        $r->customer->password = passwordHash::hash($password);
        $table_name            = "users_auth";
        $column_names          = array('phone', 'firstname', 'lastname', 'email', 'address', 'password', 'avartar', 'ua_statusid');
        $result                = $db->insertIntoTable($r->customer, $column_names, $table_name);
        if ($result != null) {
            $response["status"]  = "success";
            $response["message"] = "User account created successfully";
            $response["uid"]     = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid']         = $response["uid"];
            $_SESSION['phone']       = $phone;
            $_SESSION['firstname']   = $firstname;
            $_SESSION['lastname']    = $lastname;
            $_SESSION['email']       = $email;
            $_SESSION['avartar']     = $avartar;
            $_SESSION['ua_statusid'] = $ua_statusid;
            $_SESSION['us_status']   = '';
            echoResponse(200, $response);
        } else {
            $response["status"]  = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }
    } else {
        $response["status"]  = "error";
        $response["message"] = "An user with the provided phone or email exists!";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function () {
    $db                  = new DbHandler();
    $session             = $db->destroySession();
    $response["status"]  = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});
