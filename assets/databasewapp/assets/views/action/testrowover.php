<table border="1">
    <thead>
    <thead>
        <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Test1 Marks</th>
            <th>Test2 Marks</th>
            <th>Total Marks</th>
            <th>Status</th>
            <th>Percentage</th>
            <th>Pass Count</th>      
            <th>Total Percentage</th>
        </tr>
    </thead>
    <tbody>

        </tr>
        <?php
        $numberOfSubjects = 3; //I used 3 subjects. You should change this to 8 for your data.
        foreach ($data as $student => $info) {
            echo "<tr><td rowspan=$numberOfSubjects />$student</td>";

            //flag to let the inner loop the tr has been drawn for the first row
            $firstRow = true;
            foreach ($info as $key => $value) {

                //we only want subject info
                if (strpos($key, "subject") === 0) {
                    if (!$firstRow) {
                        echo "<tr>";
                    } //else we already drew it

                    //its a subject so
                    echo "<td>$key</td>";
                    echo "<td>{$value['test1']}</td>";
                    echo "<td>{$value['test2']}</td>";
                    echo "<td>{$value['total']}</td>";
                    echo "<td>{$value['status']}</td>";
                    echo "<td>{$value['percentage']}</td>";

                    //only draw total for the first row
                    if ($firstRow) {
                        echo "<td rowspan=$numberOfSubjects>{$info['pass_count']}</td>";
                        echo "<td rowspan=$numberOfSubjects>{$info['gross_percentage']}</td>";
                    }
                    //close the row
                    echo "</tr>";
                    $firstRow = false;
                }
            }
        }
        ?>
    </tbody>
</table>