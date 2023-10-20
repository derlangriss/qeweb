<?PHP

require 'connectdb.php';
$month          = $_GET['sMonth'];
$year           = $_GET['sYear'];
$userid         = $_GET['userid'];
$boxid          = $_GET["sBoxid"];
$container_type = $_GET["sContainer_type"];
$lockboxstate   = 1;
$resultArray    = array();
if (isset($_GET['sBoxid'])) {

    if ($_GET['sBoxid'] !== '') {
        $strSQLFindUserLockBox = "SELECT * from userlockbox ";
        $strSQLFindUserLockBox .= "left join collectionresbox on collectionresbox.collbox_id = userlockbox.lockbox_boxid ";
        $strSQLFindUserLockBox .= "left join boxlockstate on boxlockstate.boxlockstate_id = userlockbox.lockbox_lockboxstate ";
        $strSQLFindUserLockBox .= "left join boxstatus on boxstatus.boxstatus_id = userlockbox.lockbox_boxstatus ";
        $strSQLFindUserLockBox .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
        $strSQLFindUserLockBox .= "WHERE lockbox_boxid ='" . $boxid . "'";
        $strSQLFindUserLockBox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
        $objQueryFindUserLockBox    = pg_query($strSQLFindUserLockBox);
        $intNumFieldFindUserLockBox = pg_num_fields($objQueryFindUserLockBox);
        $countUserLockbox           = pg_num_rows($objQueryFindUserLockBox);

        if ($countUserLockbox === 0) {

            $compareUser = 0;
            $strSQL02    = "with selectbox as (";
            $strSQL02 .= "SELECT * from collectionresbox ";
            $strSQL02 .= "WHERE collbox_id ='" . $boxid . "' ";
            $strSQL02 .= "),selectuser as (";
            $strSQL02 .= "SELECT * from users_auth ";
            $strSQL02 .= "WHERE uid = " . $userid . " ) ";
            $strSQL02 .= "SELECT (SELECT collbox_id  FROM selectbox) AS collboxid,(SELECT collboxno  FROM selectbox) AS collboxno ,  (SELECT firstname FROM selectuser ) AS firstname ";
            $objQuery02 = pg_query($strSQL02);
            $row02      = pg_fetch_array($objQuery02);
            extract($row02);

            $countspec = 0;

            $uppername       = strtoupper(substr($firstname, 0, 3));
            $boxlockstate_id = 2;
            $boxstatus_id    = 1;

            $arr = array('collbox_id' => $collboxid, 'collboxno' => $collboxno, 'boxlockstate' => $boxlockstate_id, 'username' => $uppername, 'compareUser' => $compareUser, 'boxstatus' => $boxstatus_id, 'countspec' => $countspec);
            array_push($resultArray, $arr);

        } else {

            $strSQLCountSpecimensInbox = "WITH countspecinbox as ( ";
            $strSQLCountSpecimensInbox .= "SELECT COUNT(*) AS countspec from specimens ";
            $strSQLCountSpecimensInbox .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id  ";
            $strSQLCountSpecimensInbox .= "left join container_type on container_type.container_type_id = specimens.container_type ";
            $strSQLCountSpecimensInbox .= "WHERE container_type = 1 ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND lockbox_boxid ='" . $boxid . "'";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
            $strSQLCountSpecimensInbox .= " ), countundefinedspecinbox as ( ";
            $strSQLCountSpecimensInbox .= "SELECT COUNT(*) AS countundefinedspec from specimens ";
            $strSQLCountSpecimensInbox .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id  ";
            $strSQLCountSpecimensInbox .= "left join container_type on container_type.container_type_id = specimens.container_type ";
            $strSQLCountSpecimensInbox .= "left join species on specimens.species_species_id  = species.species_id  ";
            $strSQLCountSpecimensInbox .= "left join genus on species.genus_genus_id = genus.genus_id  ";
            $strSQLCountSpecimensInbox .= "left join family on genus.family_family_id = family.family_id  ";
            $strSQLCountSpecimensInbox .= "left join torder on family.torder_torder_id = torder.torder_id  ";
            $strSQLCountSpecimensInbox .= "WHERE container_type = 1 ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND lockbox_boxid ='" . $boxid . "' ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year." ";
            $strSQLCountSpecimensInbox .= "AND torder_id = 0";
            $strSQLCountSpecimensInbox .= ") ";
            $strSQLCountSpecimensInbox .= "SELECT (SELECT countspec from countspecinbox) , (SELECT countundefinedspec from countundefinedspecinbox)";

            $objQueryCountSpecimensInbox = pg_query($strSQLCountSpecimensInbox);
            $rowCountSpecimensInbox      = pg_fetch_array($objQueryCountSpecimensInbox);
            extract($rowCountSpecimensInbox);

            $rowFindUserLockBox = pg_fetch_array($objQueryFindUserLockBox);
            extract($rowFindUserLockBox);
            $uppername = strtoupper(substr($firstname, 0, 3));

            if ($userid === $lockbox_userid) {
                $compareUser = 0;
            } else {
                $compareUser = 1;
            }

            $arr = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'boxlockstate' => $boxlockstate_id, 'username' => $uppername, 'compareUser' => $compareUser, 'boxstatus' => $boxstatus_id, 'countspec' => $countspec, 'countundefinedspec' => $countundefinedspec);
            array_push($resultArray, $arr);

        }
        pg_close($conn);
        echo json_encode($resultArray);

    }
}
