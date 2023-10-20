<?php

/**************************************************************************************************************************************************************/
/* OK so this is just a simple example to illustrate one way to make a INSERT statement that is conditional on the input                                      */
/* Remember we need to have different input statements as the alternative to NULLIF. So rather than using NULLIF in the SQL to insert a NULL into latd etc we */
/* ONLY insert the fields we have data for an let the NULL be inserted by default in the DB                                       */
/**************************************************************************************************************************************************************/

/********************************************************************/
/* Here is ONE case. Imagine the variables below coming from a form */
/********************************************************************/

$id=1; //an ID that is always needed in the INSERT statement
$latd=10; //some data, in this case 10
$latm=10; //some data, in this case 10


/**************************************************************************************************************/
/* Now what is below just concatenates the parts according to the IF as expressed in the ternary operator (?) */
/* Here is one part of that clause                                                                            */
/* ($latd>0 ? ',latd' : '')                                                                                   */
/* this is similar to                                                                                         */
/*     if($latd>0)                                                                                            */
/* then echo ','latd'                                                                                         */
/* else echo ''                                                                                               */
/* We do this TEST once for the variable names and then again for the actual data                             */
/**************************************************************************************************************/




echo 'INSERT INTO table(id' .($latd>0 ? ',latd' : '').($latm>0 ? ',latm' : ''). ')
VALUES('.$id .($latd>0 ? ','. $latd : '').($latm>0 ? ','. $latm : ''). ');';


/****************************************************/
/* the result of this is:                           */
/* INSERT INTO table(id,latd,latm) VALUES(1,10,10); */
/* so here we insert some data into a table         */
/****************************************************/




echo "<br/>";



/*************************************************************************/
/* Now here is another case. It would come from ANOTHER POST from a form */
/*************************************************************************/


$id=2;
$latd=0; //note that because I don't wan't to write all the extra form etc I just use 0. In the case you are working with you will be dealing with '' or an UNSET variable

$latm=0;

echo 'INSERT INTO table(id' .($latd>0 ? ',latd' : '').($latm>0 ? ',latm' : ''). ')
VALUES('.$id .($latd>0 ? ','. $latd : '').($latm>0 ? ','. $latm : ''). ');';


/*****************************************************************************************************************************/
/* the result of the code above is     */
/* INSERT INTO table(id) VALUES(2);    */
/* so because we want the zero to be inserted as a NULL which is the default for latd/m we just insert the data that we have */
/* so we just insert the id    */
/* because there are no latd and latm being inserted the DB inserts NULL-as we want      */
/*****************************************************************************************************************************/
echo "<br/>";


if($latd>0){
$insertadd .= ",latd";
$valuesadd .= ",$latd";
}
if($latm>0){
$insertadd .= ",latm";
$valuesadd .= ",$latm";   
}

echo 'INSERT INTO table(id'.$insertadd.')
VALUES('.$id .$valuesadd.');';


?>