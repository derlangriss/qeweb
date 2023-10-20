<?php
require_once('_header.php');


/* $id=$_GET['id']; */

// $id=17832;

$sqlsort = " ORDER BY idspecimens ";

$sqlfrom = " from specimens spec
left join torder on spec.torder_idtorder=torder.idtorder
left join family on spec.family_idfamily=family.idfamily
left join genus on spec.genus_idgenus=genus.idgenus
left join species on spec.species_idspecies=species.idspecies
left join collection on spec.collection_idcollection=collection.idcollection
left join collectionmethods on collection.collectionmethods_idcollectionmethods=collectionmethods.idcollectionmethods
left join collectors on collection.collectors_idcollectors=collectors.idcollectors
left join amphurs on collection.amphurs_idamphurs=amphurs.idamphurs
left join province on amphurs.province_idprovince=province.idprovince
left join specimenimages on spec.idspecimens=specimenimages.specimens_idspecimens
";

/********************/
/* Dummy data fetch */
/********************/

$sqlwhere = " WHERE (idspecimens>17830 AND idspecimens<17930)";
//$sqlwhere = " WHERE (idspecimens>17900 AND idspecimens<17910)";

//$sqlwhere = " WHERE idspecimens=$id";

$sqlselect = " select newrecords, tempflag, idspecimens, idcollection, 
collectionstartdate,replace(to_char(collectionstartdate, 'DD-rm-YYYY'),' ','') collectionstartroman,collectionenddate,
collectionid,
split_part(collectionid,'-',1)||'-'||split_part(collectionid,'-',2)||'-'||to_char(to_number(split_part(collectionid,'-',3),'999'),'FM000') collectionidformatted,
collectionmethodsdetails,
provinceen,provinceth,amphuren,amphurth,
collectionlocality,collectionspecificlocality,collectionhabitat,
collectionlatd, collectionlatm, collectionlats, collectionlongd,
collectionlongm, collectionlongs, collectioneasting, collectionnorthing,
collectionutm, collectionmasl, tordername, familyname, subfamily, genusname,
speciesname, binomial, authority, authorityyear, determinedby, determineddate,
comments, comments1, comments2, specimenimagepath, flagshipimage, replace(collectorsen, ' and ', ' \\\& ') collectorsen, 
char_length(provinceen||amphuren||collectionlocality||collectionspecificlocality||collectionlatd||collectionlatm||collectionlats||collectionlongd||collectionlongm||collectionlongs||collectionmasl||collectionmethodsdetails||collectorsen) labelstringlen,
(split_part(collectorsen,',',1)|| ' et al.') collectorsenshort
";

/************************************************************************************************************************/
/* Note this query includes lots of data from the SECONDARY DETERMINATION label, this probably need not be fetched here */
/************************************************************************************************************************/



$sql= stripslashes($sqlselect  . $sqlfrom . $sqlwhere . $sqlsort);



$res = pg_query($sql);
//$results = array();
//$i=0;



/**********************************/
/* beware many logic fixes needed */
/**********************************/


$rjc2='';
while ($r = pg_fetch_array($res)) {
$lhead=
    '\parbox[l][10mm][t]{26mm}{\hspace{-1px}';
$labelstringlen=$r['labelstringlen'];
$idspecimens=$r['idspecimens'];
$idcollection=$r['idcollection'];
$collectionidformatted=$r['collectionidformatted'];
$provinceen=$r['provinceen'];
$amphuren=$r['amphuren'];
$collectionlocality=$r['collectionlocality'];


if ($r['collectionspecificlocality']==NULL) {$collectionspecificlocality='';} else {$collectionspecificlocality=$r['collectionspecificlocality'] . ', ';}


/********************************************************************************************************************************/
/* note I've inserted the logic below but perhaps better is for the input interface to be more specific about the info required */
/********************************************************************************************************************************/


$collectionlatd=$r['collectionlatd'];

if($r['collectionlatd']>0){$collectionhemins='N';} else {$collectionhemins='S';};
if($r['collectionlongd']>0){$collectionhemiew='E';} else {$collectionhemiew='W';};

/***************************************************************************/
/* this does NOT deal with the case near the equator or meridian correctly */
/*     it also does not deal with the separate issue of 0,0 coordinates    */
/***************************************************************************/


$collectionlatm=$r['collectionlatm'];
$collectionlats=$r['collectionlats'];
$collectionlongd=$r['collectionlongd'];
$collectionlongm=$r['collectionlongm'];
$collectionlongs=$r['collectionlongs'];
$collectionmasl=$r['collectionmasl'];
$collectionstartroman=$r['collectionstartroman'];
$collectionmethodsdetails=$r['collectionmethodsdetails'];
$collectorsen=$r['collectorsen'];





$ltail=
'\parbox[r][10mm][c]{10mm}{
\vspace{0.0mm}
\hspace{0.5mm}
  \begin{pspicture}(10mm,10mm)
   \psbarcode{' .
 $r['collectionid'] .
 '}{eclevel=H width=0.3 height=0.3}{qrcode}
 \end{pspicture}
\vspace{2mm}
}
';


/* $lbody= */
/* //'0123456789012345678901234567890123 ' .  */
/* //'0123456789012345678901234567890123 ' .  */
/* //'0123456789012345678901234567890123 ' .  */
/* //'0123456789012345678901234567890123 ' .  */
/* //'0123456789012345678901234567890123 ' .  */
/* //'0123456789012345678901234567890123 ' .  */
/* $labelstringlen .  */
/* $collectionidformatted  . '-XXX' . ', ' . */
/* $provinceen . ', ' . */
/* $amphuren . ', ' . */
/* $collectionlocality . ', ' . */
/* $collectionspecificlocality . */
/* $collectionlatd . '°' . */
/* $collectionlatm .  '$^\prime$' . */
/* $collectionlats  . '$^{\prime\prime}$' . $collectionhemins . ', ' . */
/* $collectionlongd . '°'  . */
/* $collectionlongm .  '$^\prime$' . */
/* $collectionlongs  . '$^{\prime\prime}$' . $collectionhemiew . ', ' . */
/* $collectionmasl . 'm, ' . */
/* $collectionstartroman . ', ' . */
/* $collectionmethodsdetails . ', ' . */
/*     $collectorsen . '}'; */



if ($labelstringlen<120) {
$collectorsen=$collectorsen;
}
else
    {
if(strlen($collectorsen)<40) {$collectorsen=$collectorsen;} else {$collectorsen=$r['collectorsenshort'];}
 ;}





if ($labelstringlen<120) {
$lbody=
//$labelstringlen . 
$collectionidformatted  . '-XXX' . ',\,' .
$provinceen . ', ' .
$amphuren . ', ' .
$collectionlocality  . ', ' .
$collectionspecificlocality .
$collectionlatd . '°' .
$collectionlatm .  '$^\prime$' .
$collectionlats  . '$^{\prime\prime}$' . $collectionhemins . ',\,' .
$collectionlongd . '°'  .
$collectionlongm .  '$^\prime$' .
$collectionlongs  . '$^{\prime\prime}$' . $collectionhemiew . ',\,' .
$collectionmasl . 'm, ' .
$collectionstartroman . ', ' .
$collectionmethodsdetails . ', ' .
    $collectorsen . '}';
} 
else 
{
$lbody=
//$labelstringlen . 
$collectionidformatted  . '-YYY' . ',\,' .
$provinceen . ', ' .
$amphuren . ', ' .
$collectionlocality  . ', ' .
$collectionlatd . '°' .
$collectionlatm .  '$^\prime$' .
$collectionlats  . '$^{\prime\prime}$' . $collectionhemins . ',\,' .
$collectionlongd . '°'  .
$collectionlongm .  '$^\prime$' .
$collectionlongs  . '$^{\prime\prime}$' . $collectionhemiew . ',\,' .
$collectionmasl . 'm, ' .
$collectionstartroman . ', ' .
$collectionmethodsdetails . ', ' .
    $collectorsen . '}';
}









//$rjtemp=strlen($lbody)-8-15-8-15-1;
//$lablen="[". $rjtemp ."]";





//$rjc= $lhead . $lbody . $lablen . $ltail;
$rjc= $lhead . $lbody  . $ltail;




$rjc2=$rjc2 . $rjc;

}

//$rjc= $lhead . $lbody . $lablen . $ltail;

//$idspecimens . 
//$idcollection . 


//echo strlen($rjc2);




file_put_contents('./workinglabel.dat', $rjc2);
//file_put_contents('./workinglabel1.dat', $rjc);

//file_put_contents('./workinglabel2.dat', $rjc2);


$labelfilename=time() . ".pdf";

//$labelfilename="qrworking.pdf";

$command = '/usr/bin/pdflatex --shell-escape llabelmaster.tex && /bin/mv llabelmaster.pdf ' . $labelfilename;
exec($command,$output,$return);
//echo $return;



/* needs better error handling */
/********************************/


/*************************************************************************************/
/* some of these functions, now shell, could use PHP functions to be OS independenet */
/*************************************************************************************/


$command = '/bin/rm workinglabel.dat';
exec($command,$output,$return);
//echo $return;



/************************************************************************/
/* Need code to cleanup pdf files AFTER the user has finished with them */
/************************************************************************/

echo '<a href="' . $labelfilename . '">'. $labelfilename . '</a>';



//echo phpinfo();

include ('../../footer.php');

?>
