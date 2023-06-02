'use strict';
/**  
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("SpecManageIdentifyCtrl", ["$scope", "$uibModal", "$http", "$interval", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "ngNotify", "ServicePDF", "$aside", "toaster",
    function($scope, $uibModal, $http, $interval, $timeout, $stateParams, $state, SweetAlert, info, ngNotify, ServicePDF, $aside, toaster) {
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Message'
        };
        $scope.pop = function() {
            toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        };
        $scope.noAvatarImg = "assets/images/default-user.png";
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.messages = [{
            "from": "John Stark",
            "date": new Date(y, m, d - 1, 19, 0),
            "subject": "Reference Request - Nicole Bell",
            "email": "stark@example.com",
            "avatar": "assets/images/avatar-6.jpg",
            "starred": false,
            "sent": false,
            "spam": false,
            "read": false,
            "content": "<p>Hi Peter, <br>Thanks for the e-mail. It is always nice to hear from people, especially from you, Scott.</p> <p>I have not got any reply, a positive or negative one, from Seibido yet.<br>Let's wait and hope that it will make a BOOK.</p> <p>Have you finished your paperwork for Kaken and writing academic articles?<br>If you have some free time in the near future, I want to meet you and explain to you our next project.</p> <p>Why not drink out in Hiroshima if we are accepted?<br>We need to celebrate ourselves, don't we?<br>Let's have a small end-of-the-year party!</p> <p>Sincerely, K. Nakagawa</p>",
            "id": 50223456
        }, {
            "from": "James Patterson",
            "date": new Date(y, m, d - 1, 18, 43),
            "subject": "Position requirements",
            "email": "patterson@example.com",
            "avatar": "assets/images/avatar-9.jpg",
            "starred": true,
            "sent": false,
            "read": true,
            "spam": false,
            "content": "<p>Dear Mr. Clarks</p> <p>I am interested in the Coordinator position advertised on XYZ. My resume is enclosed for your review. Given my related experience and excellent capabilities I would appreciate your consideration for this job opening. My skills are an ideal match for this position.</p> <p> <strong>Your Requirements:</strong> </p> <ul> <li>Responsible for evening operations in Student Center and other facilities, including managing registration, solving customer problems, dealing with risk management and emergencies, enforcement of department policies.</li> <li>Assists with hiring, training, and management of staff. Coordinate statistics and inventory.</li> <li>Experience in the supervision of student staff and strong interpersonal skills are also preferred.</li> <li>Valid Minnesota driver's license with good driving record. Ability to travel to different sites required.</li> <li>Experience in collegiate programming and management.</li> </ul> <p> <strong>My Qualifications:</strong> </p> <ul> <li>Register students for courses, design and manage program software, solve customer problems, enforce department policies, and serve as a contact for students, faculty, and staff.</li> <li>Hiring, training, scheduling and management of staff, managing supply inventory, and ordering.</li> <li>Minnesota driver's license with NTSA defensive driving certification.</li> <li>Extensive experience in collegiate programming and management.</li> <li>Excellent interpersonal and communication skills.</li> </ul> <p>I appreciate your taking the time to review my credentials and experience. Again, thank you for your consideration.</p> <p>Sincerely,<br> <br> James</p>",
            "id": 50223457
        }, {
            "from": "Mary Ferguson",
            "date": new Date(y, m, d - 1, 17, 51),
            "subject": "Employer's job requirements",
            "email": "mary@example.com",
            "avatar": "assets/images/avatar-8.jpg",
            "starred": false,
            "sent": false,
            "read": true,
            "spam": false,
            "content": "<p>Dear Mr. Clarks</p> <p>In response to your advertisement in the<em> Milliken Valley Sentinel </em> for Vice President, Operations, please consider the following:</p> <p> <strong>Develop and implement strategic operational plans.</strong> <br> 15+ years aggressive food company production management experience. Planned, implemented, coordinated, and revised all production operations in plant of 250+ employees.</p> <p> <strong>Manage people, resources and processes.</strong> <br> Developed and published weekly processing and packaging schedules to meet annual corporate sales demands of up to $50 million. Met all production requirements and minimized inventory costs.</p> <p> <strong>Coach and develop direct reports.</strong> <br> Designed and presented training programs for corporate, divisional and plant management personnel. Created employee involvement program resulting in $100,000+ savings annually.</p> <p> <strong>Ensure operational service groups meet needs of external and internal customers.</strong> <br> Chaired cross-functional committee of 16 associates that developed and implemented processes, systems and procedures plant-wide. Achieved year end results of 12% increase in production, 6% reduction in direct operational costs and increased customer satisfaction rating from 85% to 93.5%.</p> <p>I welcome the opportunity to visit with you about this position. My resume has been uploaded, per your instructions. I may be reached at the number above. Thanks again for your consideration.</p> <p>Sincerely,<br> <br> Mary Ferguson</p>",
            "id": 50223458
        }, {
            "from": "Jane Fieldstone",
            "date": new Date(y, m, d - 1, 17, 38),
            "subject": "Job Offer",
            "email": "fieldstone@example.com",
            "starred": false,
            "sent": false,
            "read": true,
            "spam": false,
            "content": "<p>Dear Mr. Clarks,</p> <p>As we discussed on the phone, I am very pleased to accept the position of Marketing Manager with Smithfield Pottery. Thank you for the opportunity. I am eager to make a positive contribution to the company and to work with everyone on the Smithfield team.</p> <p>As we discussed, my starting salary will be $38,000 and health and life insurance benefits will be provided after 90 days of employment.</p> <p>I look forward to starting employment on July 1, 20XX. If there is any additional information or paperwork you need prior to then, please let me know.</p> <p>Again, thank you.</p> <p> <br> Jane Fieldstone</p>",
            "id": 50223459
        }, {
            "from": "Steven Thompson",
            "date": new Date(y, m, d - 1, 12, 2),
            "subject": "Personal invitation",
            "email": "thompson@example.com",
            "avatar": "assets/images/avatar-3.jpg",
            "starred": false,
            "sent": false,
            "spam": false,
            "content": "<p>Dear Peter,</p> <p>Good Day!</p> <p>We would like to invite you to the coming birthday party of our son Francis John Waltz Jr. as he is celebrating his first birthday. The said party will be on November 27, 2010 at Toy Kingdom just along Almond road. All kids are expected to wear their beautiful fancy dress.</p> <p>We will be delighted with your presence in this party together with your family. We will be arranging transportation for all the guests for your convenience in going to the venue of the said party promptly.</p> <p>It is a great honor for us to see you at the party and please do confirm your attendance before the party in the given number so that we will arrange the service accordingly.</p> <p>Best regards,</p> <p>Mr. and Mrs. Thompson</p>",
            "id": 50223460
        }, {
            "from": "Michael A. Faust",
            "date": new Date(y, m, d - 1, 11, 22),
            "subject": "Re: Group Meeting",
            "email": "faust@example.com",
            "starred": true,
            "sent": false,
            "read": true,
            "spam": false,
            "content": "<p>Dear Sir</p><p>It was my pleasure to be introduced to you by Mr. Elliot Carson last Tuesday. I am delighted to make your acquaintance. Mr. Carson has highly recommended you as an esteemed businessman with integrity and good reputation.</p><p>Hence, it would be my pleasure to extend an invitation to you to join our Texas Businessmen Fellowship every last Saturday of the month from 6pm to 9pm at Texas Holiday Inn. This fellowship was set up by Texan businessmen who are sincere in assisting one another in honest business dealings and to look out for one another as a brother for another.</p><p>Attendance and membership are by invitation only. We share about the business trends and strategies as well as pitfalls to avoid so that it would make our members sharper in our business acumen. Every member is free to share his business knowledge, skills and tips. We want all members to succeed as a businessman.</p><p>As you are highly recommended by Mr. Carson, one of our founders, we shall be pleased to have you join us this month. Dress code: Smart casual. There would be a dinner at the fellowship so that members can be in a relaxed environment to mingle with one another.</p><p>We look forward to your confirmation to this invitation so that the necessary preparations can be done.</p><p>Respectfully yours,</p><p>Michael A. Faust</p>",
            "id": 50223461
        }, {
            "from": "Nicole Bell",
            "date": new Date(y, m, d - 1, 10, 31),
            "subject": "Congratulations ",
            "email": "nicole@example.com",
            "avatar": "assets/images/avatar-2.jpg",
            "starred": false,
            "sent": false,
            "read": true,
            "spam": false,
            "content": "<p>Dear friend Peter,</p><p>I am feeling very happy today to congratulate you as you got promotion. I got the news two days before that you are promoted from the post of junior manager to the post of senior manager. You really deserved that promotion. You were a employee of that company since 10 years. In these 10 years you have served the company a lot. With your skills, hard work, intelligence you have contributed to the companies success. Due to all these reasons you had to get promotion.</p><p>Personally I am very happy to see you getting successful in your life. This time also it was very delightful to hear about your success. I hope god bless you and give you pink of health. I will always ask god to give you everything that you need in your life. He may bless you with lot of happiness in your future. </p><p>Give my love to your children and regards to your parents.</p><p>Your’s affectionately,</p><p>Nicole Bell.</p>",
            "id": 50223462
        }, {
            "from": "Google Geoff",
            "date": new Date(y, m, d - 1, 9, 38),
            "subject": "JobSearch information letter",
            "email": "mutating@example.com",
            "starred": false,
            "sent": false,
            "spam": true,
            "content": "<p>Dear recipient,</p><p>Avangar Technologies announces the beginning of a new unprecendented global employment campaign. reviser yeller winers butchery twenties Due to company's exploding growth Avangar is expanding business to the European region. During last employment campaign over 1500 people worldwide took part in Avangar's business and more than half of them are currently employed by the company. And now we are offering you one more opportunity to earn extra money working with Avangar Technologies. druggists blame classy gentry Aladdi</p><p>We are looking for honest, responsible, hard-working people that can dedicate 2-4 hours of their time per day and earn extra Â£300-500 weekly. All offered positions are currently part-time and give you a chance to work mainly from home.</p><p>lovelies hockey Malton meager reordered</p><p>Please visit Avangar's corporate web site (http://www.avangar.com/sta/home/0077.htm) for more details regarding these vacancies.</p>",
            "id": 50223463
        }, {
            "from": "Shane Michaels",
            "date": new Date(y, m, d - 2, 20, 32),
            "subject": "Marketing agreement between two companies",
            "email": "shane@example.com",
            "starred": false,
            "sent": false,
            "read": true,
            "spam": false,
            "content": "<p>This letter is with regards to the advertisement given in the yesterdays newspaper &amp; we feel proud to introduce ourselves as M/s ABC advertising agency. We are ready to take up your proposal of doing marketing work for your company. We will charge $10,000 for a week for this work of marketing. This price includes print material like posters, handbills, radio announcements, advertisements in local newspaper as well as on television channels &amp; also street-to-street mike announcements. Your company will give the wordings of the announcement &amp; the payment can be made after the work gets complete. Mode of payment will be through cheques &amp; payment should be made in three installments, first on agreement, second at the time when work commences &amp; lastly when the work is completed.</p><p>Yours sincerely,</p><p>Shane Michaels</p>",
            "id": 50223464
        }, {
            "from": "Kenneth Ross",
            "date": new Date(y, m, d - 2, 19, 59),
            "subject": "Sincere request to keep in touch.",
            "email": "kenneth@example.com",
            "avatar": "assets/images/avatar-5.jpg",
            "starred": false,
            "sent": false,
            "read": true,
            "spam": false,
            "content": "<p>Dear Mr. Clarks,</p><p>I was shocked to see my letter after having just left and  part away from college just a couple of weeks ago. Well it’s my style to bring back together and  hold on to our college group who seems to get separated and  simply go along their own ways. Just giving it a sincere try, who wish to live life just like those college days, to share and  support for every minute crust and  fragments happening in the life.</p><p>So without any compulsion and  without any special invitation this is a one time offer cum request cum order to keep in touch and  also to live forever as best buddies. Hoping to see you at Café da Villa on this Sunday evening to celebrate our new beginning in a grand way.</p><p>Thanking you,</p>",
            "id": 50223465
        }];
        var incomingMessages = [{
            "from": "Nicole Bell",
            "date": new Date(),
            "subject": "New Project",
            "email": "nicole@example.com",
            "avatar": "assets/images/avatar-2.jpg",
            "starred": false,
            "sent": false,
            "read": false,
            "spam": false,
            "content": "Hi there! Are you available around 2pm today? I’d like to talk to you about a new project",
            "id": 50223466
        }, {
            "from": "Steven Thompson",
            "date": new Date(),
            "subject": "Apology",
            "email": "thompson@example.com",
            "avatar": "assets/images/avatar-3.jpg",
            "starred": false,
            "sent": false,
            "read": false,
            "spam": false,
            "content": "<p>Hi Peter,</p> <p>I am very sorry for my behavior in the staff meeting this morning.</p> <p>I cut you off in the middle of your presentation, and criticized your performance in front of the staff. This was not only unprofessional, but also simply disrespectful. I let my stress about a personal matter impact my management of the office.</p>",
            "id": 50223467
        }, {
            "from": "Mary Ferguson",
            "date": new Date(),
            "subject": "Congratulations ",
            "email": "mary@example.com",
            "avatar": "assets/images/avatar-8.jpg",
            "starred": false,
            "sent": false,
            "read": false,
            "spam": false,
            "content": "<p>Dear Ms. Clarks,</p> I am a friend of Emily Little and she encouraged me to forward my resume to you. I know Emily through a local children's theater, for which I was a lighting assistant this semester. I also see her at college music performances, as I am in the orchestra.</p>",
            "id": 50223468
        }];
        $scope.scopeVariable = 1;
        var loadMessage = function() {
            $scope.messages.push(incomingMessages[$scope.scopeVariable - 1]);
            $scope.scopeVariable++;
        };
        //Put in interval, first trigger after 10 seconds
        var add = $interval(function() {
            if ($scope.scopeVariable < 4) {
                loadMessage();
            }
        }, 10000);
        $scope.stopAdd = function() {
            if (angular.isDefined(add)) {
                $interval.cancel(add);
                add = undefined;
            }
        };

        function monthstr() {
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            var d = new Date();
            var n = month[d.getMonth()];
            return n;
        }
        $('#showdate').datepicker({
            format: "yyyy/mm",
            todayHighlight: true,
            autoclose: true,
            viewMode: "months",
            minViewMode: "months"
        }).on('changeDate', function(e) {
            var currMonth = new Date(e.date).getMonth() + 1;
            var curryear = String(e.date).split(" ")[3];
            $scope.changeDateMonthEX(currMonth, curryear)
        });
        $scope.showDatePicker = function() {
            $("#showdate").datepicker('show');
        }
        $scope.changeDateMonthEX = function(month, year) {
            if (month && year !== '0') {
                $state.go('app.specimens.managespec.identify', {
                    "monthid": month,
                    "yearid": year
                })
            }
        };
        $scope.getcurbox = function(a) {
            $scope.selectedbox = a
        }
        $scope.currentStep = 1;
        // Initial Value
        $scope.form = {
            next: function(form, id) {
                $scope.toTheTop();
                if (id !== 0) {
                    form.$setPristine();
                    nextStep();
                } else {
                    var field = null,
                        firstError = null;
                    for (field in form) {
                        if (field[0] != '$') {
                            if (firstError === null && !form[field].$valid) {
                                firstError = form[field].$name;
                            }
                            if (form[field].$pristine) {
                                form[field].$dirty = true;
                            }
                        }
                    }
                    angular.element('.ng-invalid[name=' + firstError + ']').focus();
                    errorMessage();
                }
            },
            prev: function(form) {
                $scope.toTheTop();
                prevStep();
            },
            goTo: function(form, i) {
                if (parseInt($scope.currentStep) > parseInt(i)) {
                    console.log("sompong")
                    $scope.toTheTop();
                    goToStep(i);
                } else {
                    console.log("thongkhaow")
                    if (form.$valid) {
                        $scope.toTheTop();
                        goToStep(i);
                    } else errorMessage();
                }
            },
            submit: function() {},
            reset: function() {
                alert("reset");
                goToStep(1);
                this.form.reset();
            }
        };
        var nextStep = function() {
            $scope.currentStep++;
        };
        var prevStep = function() {
            $scope.currentStep--;
        };
        var goToStep = function(i) {
            $scope.currentStep = i;
        };
        var errorMessage = function(i) {
            ngNotify.set('please complete the form in this step before proceeding', {
                theme: 'pure',
                position: 'top',
                type: 'error',
                button: 'true',
                sticky: 'false',
            });
        };
        $scope.LabelWaringModel = 'label-default'
        $scope.BoxShowDetailsUser = 'NA'
        $scope.FullBoxModel = 'fa-star-o'
        $scope.BoxShowDetailsCount = 0
        $scope.BoxShowDetailsBoxno = 'NA'
        $scope.jqueryScrollbarOptions = {
            "onScroll": function(y, x) {
                if (y.scroll == y.maxScroll) {}
            }
        };
        $scope.GETAllcollboxno = "ALL"
        $scope.BoxidShowModel = 0;
        $scope.updatetype = 0
        $scope.InBoxAllShowDetails = 0
        $scope.InBoxUndefinedShowDetails = 0
        var previousWindowKeyDown = window.onkeydown;
        $scope.GetUserCurrentBox = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/GetUserCurrentBox.php',
                params: {
                    month: $stateParams.monthid,
                    year: $stateParams.yearid,
                    userid: $scope.uid
                }
            }).success(function(result) {
                if (result[0].success == 1) {
                    $scope.GETAllcollboxno = result[0].collboxno;
                    $scope.GETAllcountspecinbox = result[0].countspecinbox;
                    $scope.GETAllusername = result[0].nuser_name;
                    $scope.GETAllboxdate = result[0].checkuser_date;
                    $scope.GETAllundefinedbox = result[0].countundefinedspec;
                    /*$scope.BoxShowDetailsUser = result[0].user_name;   
                    $scope.BoxShowDetailsCount = result[0].countspecinbox;                 
                    $scope.BoxShowDetailsBoxid = result[0].collbox_id;
                    $scope.BoxShowModel = result[0].collboxno;
                    $scope.BoxShowDetailsLock = 'fa-lock';
                    $scope.LabelWaringModel = 'label-danger';*/
                    tableSpecimensBox.draw();
                }
            });
        }
        $scope.UPDATESPECDETAILS = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/GetUserCurrentBox.php',
                params: {
                    month: $stateParams.monthid,
                    year: $stateParams.yearid,
                    userid: $scope.uid
                }
            }).success(function(result) {
                if (result[0].success == 1) {
                    $scope.GETAllcollboxno = result[0].collboxno;
                    $scope.GETAllcountspecinbox = result[0].countspecinbox;
                    $scope.GETAllusername = result[0].nuser_name;
                    $scope.GETAllboxdate = result[0].checkuser_date;
                    /*$scope.BoxShowDetailsUser = result[0].user_name;   
                    $scope.BoxShowDetailsCount = result[0].countspecinbox;                 
                    $scope.BoxShowDetailsBoxid = result[0].collbox_id;
                    $scope.BoxShowModel = result[0].collboxno;
                    $scope.BoxShowDetailsLock = 'fa-lock';
                    $scope.LabelWaringModel = 'label-danger';*/
                    tableSpecimensBox.draw();
                }
            });
        }
        $scope.BoxShowModel = "SelectBox"
        $scope.specdata = {};
        $scope.savetype = 1;
        $scope.typespecimen = 0;
        $scope.numberOFrecord = 1;
        $scope.currentStep = 1;
        $scope.BoxShowcountspecinboxModel = 0;
        $scope.datareportspec = [{
            head: 'January',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'February',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'March',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'May',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'June',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'July',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'August',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'September',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'October',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'November',
            content: 'I am from Dubai',
            link: 'Apple Watch',
            status: 'In Review',
            quantity: '400',
            order: '20',
            family: '17',
            genus: '3',
            species: '1'
        }, {
            head: 'December',
            content: 'I am from Dubai',
            link: 'Apple Watch',
            status: 'In Review',
            quantity: '400',
            order: '20',
            family: '17',
            genus: '3',
            species: '1'
        }];
        var monthshow = $stateParams.monthid;
        var yearshow = $stateParams.yearid;
        var monthdis = monthshow - 1;
        var datereport = new Date(yearshow, monthdis);
        $scope.formatDateReport = function(datereport) {
            var a = datereport.getMonth();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            var mm = month[a];
            var yyyy = datereport.getFullYear();
            if (mm < 10) {
                mm = '0' + mm;
            }
            datereport = mm + ' ' + yyyy;
            return datereport
        }
        var newdateReport = $scope.formatDateReport(datereport);
        $scope.monthshow01 = newdateReport;
        $scope.countSpecimens = function(m, y, container_type, container_id) {
            $http({
                method: 'GET',
                url: 'assets/views/action/countSpecimens.php',
                params: {
                    month: m,
                    year: y,
                    tcontainer_type: container_type,
                    tcontainer_id: container_id
                }
            }).success(function(response) {
                $scope.resspecimens = response[0].resspecimens
                $scope.allspecimens = response[0].allspecimens
                $scope.undefinedspecimens = response[0].undefinedspecimens
                $scope.countregist = response[0].countregist
                $scope.countmanaged = response[0].countmanaged
                $scope.countfamily = response[0].countfamily
                $scope.InBoxAllShowDetails = response[0].specinbox
                $scope.InBoxUndefinedShowDetails = response[0].undefinedspecinbox
                $scope.BoxShowDetailsCount = response[0].specinbox
                $scope.BoxShowDetailsStatus = response[0].boxstatus
                $scope.boxstatus_id = response[0].boxstatus
                $scope.allbox = response[0].allbox
                if ($scope.BoxShowDetailsStatus == 1) {
                    $scope.FullBoxModel = 'fa-star-o'
                }
                if ($scope.BoxShowDetailsStatus == 2) {
                    $scope.FullBoxModel = 'fa-star'
                }
                if ($scope.BoxShowDetailsStatus == 3) {
                    $scope.FullBoxModel = 'fa-star-half-o'
                }
                var all = response[0].allspecimens
                var res = response[0].resspecimens
                var undefined = response[0].undefinedspecimens
                var respercent = ((all - res) / all) * 100
                var calculate = (undefined / all) * 100
                $scope.undefinedcal = calculate.toFixed(2);
                $scope.respercent = respercent.toFixed(2);;
            });
        }
        $scope.countSpecimens(monthshow, yearshow, null, null);
        $scope.selectid = function(idspec) {
            if (idspec !== undefined) {
                $scope.setTabIden(3, idspec)
                tableSpecIdList.draw();
            } else {
                errorMessage();
            }
            /*
            $http({
                method: 'GET',
                url: 'assets/views/action/countSpecimens.php',
                params: {
                    month: m,
                    year: y,
                    tcontainer_type: container_type,
                    tcontainer_id: container_id
                }
            }).success(function(response) {
                $scope.resspecimens = response[0].resspecimens
                $scope.allspecimens = response[0].allspecimens
                $scope.undefinedspecimens = response[0].undefinedspecimens
                $scope.countregist = response[0].countregist
                $scope.countmanaged = response[0].countmanaged
                $scope.countfamily = response[0].countfamily
                $scope.InBoxAllShowDetails = response[0].specinbox
                $scope.InBoxUndefinedShowDetails = response[0].undefinedspecinbox
                $scope.BoxShowDetailsCount = response[0].specinbox
                $scope.BoxShowDetailsStatus = response[0].boxstatus
                $scope.boxstatus_id = response[0].boxstatus
                if ($scope.BoxShowDetailsStatus == 1) {
                    $scope.FullBoxModel = 'fa-star-o'
                }
                if ($scope.BoxShowDetailsStatus == 2) {
                    $scope.FullBoxModel = 'fa-star'
                }
                if ($scope.BoxShowDetailsStatus == 3) {
                    $scope.FullBoxModel = 'fa-star-half-o'
                }
                var all = response[0].allspecimens
                var undefined = response[0].undefinedspecimens
                var calculate = (undefined / all) * 100
                $scope.undefinedcal = calculate.toFixed(2);
            });*/
        }
        var tableKPI = $('#tableKPI').DataTable({
            "dom": "<'row'<'col-sm-6'B><'col-sm-6'<'pull-right'p>>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row '<'col-sm-12'>>",
            "pagingType": "input",
            "buttons": [{
                text: '<i id="checkitemres" class="fa fa-square-o"></i>',
                action: function(row) {},
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                extend: '',
                text: '<i class="fa fa-eject"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function() {
                    console.log("sompong")
                    tableSpecimensBox.draw()
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }]
        });
        $scope.backstep1 = function(id) {
            if (id !== undefined) {
                $scope.setTabIden(id, '')
                $scope.specModelOrder = ''
                $scope.specModelFamily = ''
                $scope.specModelGenus = ''
                $scope.specModelSpecies = ''
                $scope.idenboxlist();
            }
        }

        function getIfNotSet(value, newValue, overwriteNull) {
            if (typeof(value) === 'undefined' && overwriteNull === true) {
                return newValue;
            } else if (value === null && overwriteNull === true) {
                return newValue;
            } else if (value === 0 && overwriteNull === true) {
                return newValue;
            } else if (value === '' && overwriteNull === true) {
                return newValue;
            } else {
                return value;
            }
        }
        $scope.openAside = function(position) {
            $aside.open({
                templateUrl: 'asideContent.html',
                placement: position,
                size: 'sm',
                backdrop: true,
                controller: function($scope, $uibModalInstance) {
                    $scope.ok = function(e) {
                        $uibModalInstance.close();
                        e.stopPropagation();
                    };
                    $scope.cancel = function(e) {
                        $uibModalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            });
        };
        var errorMessage = function(i) {
            ngNotify.set('please complete the form in this step before proceeding', {
                theme: 'pure',
                position: 'top',
                duration: 1000,
                type: 'error',
                button: true,
                sticky: false,
            });
        }
        $scope.obj = {
            value1: 1,
            value2: false
        }
        $scope.checkValue1 = function() {
            return $scope.obj.value1 === 'someothervalue';
        }
        $scope.tab = 1;
        $scope.changestyle = function(tabno) {
            return $scope.obj.value1 === tabno;
        };
        $scope.setTab = function(newTab) {
            var Boxidmodel = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            if (newTab == 1 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 2) {
                $scope.ViewsAvartarFunction();
            }
            if (newTab == 3 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 4 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 1 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 2 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 3 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 4 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            $scope.tab = newTab;
            $scope.obj.value1 = newTab;
        };
        $scope.isSet = function(tabNum) {
            return $scope.tab === tabNum;
        };
        $scope.tabiden = 1;
        $scope.setTabIden = function(idenTab, boxid) {
            if (boxid === undefined) {
                errorMessage();
            } else {
                $scope.tabiden = idenTab;
                console.log(boxid)
            }
        };
        $scope.isSetIden = function(identabNum) {
            return $scope.tabiden === identabNum;
        };

        function getIfNotSet(value, newValue, overwriteNull) {
            if (typeof(value) === 'undefined' && overwriteNull === true) {
                return newValue;
            } else if (value === null && overwriteNull === true) {
                return newValue;
            } else if (value === 0 && overwriteNull === true) {
                return newValue;
            } else if (value === '' && overwriteNull === true) {
                return newValue;
            } else {
                return value;
            }
        }
        $scope.GETcollectioncodelist = null;
        $scope.GETcollectioncode = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getcollectioncodelist.php'
        }).success(function(result) {
            $scope.GETcollectioncode = result;
        });
        $scope.GETBoxlist = null;
        $scope.GETBoxcode = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getboxcodelist.php'
        }).success(function(result) {
            $scope.GETBoxcode = result;
        });
        $scope.changeOrder = function() {
            $scope.specModelOrder = getIfNotSet($scope.specModelOrder, '', true)
            $scope.specModelFamily = {
                torder_torder_id: '',
                family_name: ''
            };
            $scope.specModelGenus = {
                family_family_id: '',
                genus_id: '',
                genus_name: '',
                sub_family: ''
            };
            $scope.specModelSpecies = {
                genus_genus_id: '',
                species_id: '',
                species_name: '',
                sub_genus: ''
            };
        };
        $scope.changeFamily = function() {
            $scope.specModelFamily = getIfNotSet($scope.specModelFamily, '', true)
            $scope.specModelGenus = {
                family_family_id: '',
                genus_id: '',
                genus_name: '',
                sub_family: ''
            };
            $scope.specModelSpecies = {
                genus_genus_id: '',
                species_id: '',
                species_name: '',
                sub_genus: ''
            };
        };
        $scope.changeGenus = function() {
            $scope.specModelGenus = getIfNotSet($scope.specModelGenus, '', true)
            $scope.specModelSpecies = {
                genus_genus_id: '',
                species_id: '',
                species_name: '',
                sub_genus: ''
            };
        };
        $scope.changeSpecies = function() {
            $scope.specModelSpecies = getIfNotSet($scope.specModelSpecies, '', true)
        };
        $scope.EditSpecimens = function(action, form) {
            var data;
            var speicmensids = dataarr;
            var a = JSON.stringify(speicmensids);
            if (action == "DELETE") {
                data = $.param({
                    taction: action,
                    speicmensids: a
                });
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your Edited data request will be recorded in database!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, save it!",
                    cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm) {
                    window.onkeydown = previousWindowKeyDown;
                    if (isConfirm) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbdelete_spec.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            SweetAlert.swal({
                                title: "Edited!",
                                text: "Your imaginary file has been Edited.",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function(isConfirm) {
                                window.onkeydown = previousWindowKeyDown;
                                dataarr = [];
                                tableSpecReportList.draw();
                                $scope.ViewsAvartarFunction();
                            });
                        })
                    } else {
                        SweetAlert.swal({
                            title: "Cancelled",
                            text: "Your imaginary file is cancelled :)",
                            type: "error",
                            confirmButtonColor: "#007AFF"
                        });
                    }
                });
            }
            if (action == "REMOVESPEC") {
                var speicmensidsfrombox = dataarrSpecbox;
                var abox = JSON.stringify(speicmensidsfrombox);
                var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                var container_type = 1;
                var report_month = getIfNotSet($stateParams.monthid, '0', true);
                var report_year = getIfNotSet($stateParams.yearid, '0', true);
                data = $.param({
                    taction: action,
                    speicmensids: abox,
                    tcontainer_id: container_id,
                    tcontainer_type: container_type,
                    treport_month: report_month,
                    treport_year: report_year
                });
                if (typeof speicmensidsfrombox !== 'undefined' && speicmensidsfrombox.length > 0) {
                    SweetAlert.swal({
                        title: "Are you sure?",
                        text: "Your Selected Specimens wil be remove from box!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, save it!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function(isConfirm) {
                        window.onkeydown = previousWindowKeyDown;
                        if (isConfirm) {
                            $http({
                                method: 'POST',
                                url: "assets/views/action/dbdelete_spec.php",
                                data: data,
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                            }).success(function(response) {
                                SweetAlert.swal({
                                    title: "Edited!",
                                    text: "Your imaginary file has been Edited.",
                                    type: "success",
                                    confirmButtonColor: "#007AFF"
                                }, function(isConfirm) {
                                    window.onkeydown = previousWindowKeyDown;
                                    dataarrSpecbox = [];
                                    tableSpecimensBox.draw();
                                    tableSpecIdList.draw(false);
                                    tableSpecimensBox.rows().deselect();
                                    $("#checkitemres").addClass('fa-square-o');
                                    $("#checkitemres").removeClass('fa-check-square-o');
                                    /*     if (response[0].lockbox_status == 1) {
                                             $scope.FullBoxModel = 'fa-star-o'
                                         }
                                         if (response[0].lockbox_status == 2) {
                                             $scope.FullBoxModel = 'fa-star'
                                         }
                                         if (response[0].lockbox_status == 3) {
                                             $scope.FullBoxModel = 'fa-star-half-o'
                                         }*/
                                    $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                });
                            })
                        } else {
                            SweetAlert.swal({
                                title: "Cancelled",
                                text: "Your imaginary file is cancelled :)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    });
                } else {
                    alert('Please Select Item');
                }
            }
            if (action == "MOVETOBOX") {
                var speicmensidsfromall = dataarr;
                var cbox = JSON.stringify(speicmensidsfromall);
                var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                var container_type = 1;
                var report_month = getIfNotSet($stateParams.monthid, '0', true);
                var report_year = getIfNotSet($stateParams.yearid, '0', true);
                data = $.param({
                    taction: action,
                    speicmensids: cbox,
                    tcontainer_id: container_id,
                    tcontainer_type: container_type,
                    treport_month: report_month,
                    treport_year: report_year
                });
                if (typeof speicmensidsfromall !== 'undefined' && speicmensidsfromall.length > 0 && container_id !== '' && $scope.boxstatus_id !== '2') {
                    SweetAlert.swal({
                        title: "Are you sure?",
                        text: "Your Selected Specimens wil be move to the box!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, save it!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function(isConfirm) {
                        if (isConfirm) {
                            $http({
                                method: 'POST',
                                url: "assets/views/action/dbdelete_spec.php",
                                data: data,
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                            }).success(function(response) {
                                SweetAlert.swal({
                                    title: "Edited!",
                                    text: "Your imaginary file has been Edited.",
                                    type: "success",
                                    confirmButtonColor: "#007AFF"
                                }, function(isConfirm) {
                                    window.onkeydown = previousWindowKeyDown;
                                    if (response[0].success == 0) {} else {
                                        dataarr = [];
                                        tableSpecReportList.draw();
                                        tableSpecimensBox.draw();
                                        $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                        console.log($scope.boxstatus_id);
                                    }
                                });
                            })
                        } else {
                            SweetAlert.swal({
                                title: "Cancelled",
                                text: "Your imaginary file is cancelled :)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    });
                } else {
                    alert('Please Select Item');
                }
            }
        }
        $.fn.dataTable.ext.buttons.deletespec = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('DELETE', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.removespec = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('REMOVESPEC', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.movetobox = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('MOVETOBOX', 'specimens_form')
            }
        };
        var dataarrSpecbox = [];
        var tableSpecimensBox = $('#TransferSpectoBoxTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "ajax": {
                "url": "assets/scripts/server_processing_sblist.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($stateParams.monthid, '0', true);
                    d.treport_year = getIfNotSet($stateParams.yearid, '0', true);
                    d.tspecbox_id = getIfNotSet($scope.BoxShowDetailsBoxid, '0', true);
                }
            },
            "createdRow": function(row, data, index) {
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "rowCallback": function(row, data) {
                var rowid = data.DT_RowId;
                var rowidres = rowid.substring(4);
                if ($.inArray(rowidres, dataarrSpecbox) !== -1) {
                    $(row).addClass('selected');
                }
            },
            "dom": "<'row'<'col-sm-6'B><'col-sm-6'<'pull-right'p>>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row '<'col-sm-12'>>",
            stateSaveCallback: function(settings, data) {
                localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
            },
            stateLoadCallback: function(settings) {
                return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
            },
            "scrollCollapse": true,
            "lengthMenu": [
                [30, 80, 100],
                ['30 rows', '80 rows', '100 rows']
            ],
            "buttons": [{
                text: '<i id="checkitemres" class="fa fa-square-o"></i>',
                action: function(row) {
                    $(row).removeClass('selected');
                    if (dataarrSpecbox.length > 0) {
                        tableSpecimensBox.rows().deselect();
                        $("#checkitemres").addClass('fa-square-o');
                        $("#checkitemres").removeClass('fa-check-square-o');
                        dataarrSpecbox = [];
                    } else {
                        tableSpecimensBox.rows().select();
                        $(row).addClass('selected');
                        var data = tableSpecimensBox.rows('.selected').select().data();
                        $("#checkitemres").removeClass('fa-square-o');
                        $("#checkitemres").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            dataarrSpecbox.push(rowidres);
                        }
                        return dataarrSpecbox;
                    }
                },
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                extend: 'removespec',
                text: '<i class="fa fa-eject"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function() {
                    console.log("sompong")
                    tableSpecimensBox.draw()
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }],
            "pagingType": "input",
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": "",
                "width": "5%"
            }, {
                "data": "0",
                "width": "19%",
                "orderable": false,
            }, {
                "data": "1",
                "width": "28%",
                "orderable": false,
            }, {
                "data": "2",
                "width": "28%",
                "orderable": false,
            }, {
                "data": "3",
                "visible": false
            }, {
                "data": "4",
                "visible": false
            }, {
                "data": "5",
            }, {
                "data": "6",
            }, {
                "data": "7",
            }, {
                "data": "8",
            }, {
                "data": "9",
            }, {
                "data": "10",
            }, {
                "data": "11",
                "width": "12%",
                "orderable": false
            }, {
                "data": "12",
            }],
            "columnDefs": [{
                "visible": false,
                "targets": 6
            }, {
                "visible": false,
                "targets": 7
            }, {
                "visible": false,
                "targets": 8
            }, {
                "visible": false,
                "targets": 9
            }, {
                "visible": false,
                "targets": 10
            }, {
                "visible": false,
                "targets": 11
            }, {
                render: function(data, type, full, meta) {
                    if (full[9] == true) {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark' + '"></i>' + '</a>';
                    } else {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark-o' + '"></i>' + '</a>';
                    }
                },
                "targets": 13,
                "width": "8%",
                "orderable": false
            }],
            "order": [
                [6, 'asc'],
                [7, 'asc'],
                [8, 'asc'],
                [9, 'asc']
            ]
        });
        $scope.PrintSpecBox = function(sreporttype) {
            /*
            var datenow = new Date();
            var name = "SpecimensBox";
            var getyear = datenow.getFullYear();
            var getdate = datenow.getDate();
            var getmonth = monthstr();
            var gethours = datenow.getHours();
            var getsecond = datenow.getSeconds();
            var getMilliseconds = datenow.getMilliseconds();
            var filename = name.concat('SpecimensBox', getyear, getmonth, getdate, gethours, getsecond, getMilliseconds);
            */
            if (sreporttype == 'SpecList') {
                var monthreport = $stateParams.monthid;
                var yeareport = $stateParams.yearid;
                var specboxid = $scope.BoxShowDetailsBoxid;
                var specboxno = $scope.BoxShowDetailsBoxno;
                var specmonth = $scope.monthshow01;
                var filename = name.concat('SpecimensBox', specmonth, specboxno);
                var value = 0;
                var containertype = 1;
                var fileName = filename + ".pdf";
                var a = document.createElement("a");
                document.body.appendChild(a);
                $timeout(function() {
                    ServicePDF.downloadSpecBox(sreporttype, monthreport, yeareport, containertype, specboxid).then(function(result) {
                        var file = new Blob([result.data], {
                            type: 'application/pdf'
                        });
                        var fileURL = window.URL.createObjectURL(file);
                        a.href = fileURL;
                        a.download = fileName;
                        a.click();
                    });
                }, 2000);
            }
            if (sreporttype == 'SpecInBox') {
                var specboxid = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                if (specboxid == '') {
                    alert('Plase Select Box');
                } else {
                    var monthreport = $stateParams.monthid;
                    var yeareport = $stateParams.yearid;
                    var specboxno = $scope.BoxShowDetailsBoxno;
                    var specmonth = $scope.monthshow01;
                    var filename = name.concat('SpecimensBox', specmonth, specboxno);
                    var value = 0;
                    var containertype = 1;
                    var fileName = filename + ".pdf";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    $timeout(function() {
                        ServicePDF.downloadSpecBox(sreporttype, monthreport, yeareport, containertype, specboxid).then(function(result) {
                            var file = new Blob([result.data], {
                                type: 'application/pdf'
                            });
                            var fileURL = window.URL.createObjectURL(file);
                            a.href = fileURL;
                            a.download = fileName;
                            a.click();
                        });
                    }, 2000);
                }
            }
        }
        $('#TransferSpectoBoxTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableSpecimensBox.row($(this).closest('tr')).data();
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, dataarrSpecbox);
            var a = data[5];
            var b = data[6];
            var c = data[7];
            var d = data[8];
            var data = $.param({
                sCode: a,
                sYear: b,
                sNumber: c,
                sSpecNumber: d
            });
            if (index === -1) {
                dataarrSpecbox.push(idres);
            } else {
                dataarrSpecbox.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                tableSpecimensBox.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        var dataarrspecid = [];
        var tableSpecIdList = $('#SpecimensIdList').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_specidlist.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($stateParams.monthid, '', true);
                    d.treport_year = getIfNotSet($stateParams.yearid, '', true);
                }
            },
            "rowCallback": function(row, data) {
                var rowid = data.DT_RowId;
                var rowidres = rowid.substring(4);
                if ($.inArray(rowidres, dataarrspecid) !== -1) {
                    $(row).addClass('selected');
                }
            },
            "dom": "<'row'<'col-sm-12'<'pull-left'>>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row '<'col-sm-12'>>",
            "stateSave": true,
            stateSaveCallback: function(settings, data) {
                localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
            },
            stateLoadCallback: function(settings) {
                return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
            },
            "scrollCollapse": true,
            "lengthMenu": [
                [20, 80, 100],
                ['20 rows', '80 rows', '100 rows']
            ],
            "buttons": [{
                extend: 'movetobox',
                text: 'Move to the Box',
                enabled: true
            }],
            "pagingType": "input",
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": "",
                "visible": false
            }, {
                "data": "0",
                "width": "56%",
                "orderable": false
            }, {
                "data": "1",
                "visible": false
            }, {
                "data": "2",
                "visible": false
            }, {
                "data": "3",
                "visible": false
            }, {
                "data": "4",
                "visible": false
            }, {
                "data": "5",
                "visible": false
            }, {
                "data": "6",
                "visible": false
            }, {
                "data": "7",
                "visible": false
            }, {
                "data": "8",
                "visible": false
            }, {
                "data": "9",
                "visible": false
            }, {
                "data": "10",
                "visible": false
            }, {
                "data": "11",
                "visible": false
            }, {
                "data": "12",
                "visible": false
            }, {
                "data": "13",
                "visible": true
            }],
            "columnDefs": [{
                render: function(data, type, full, meta) {
                    return '<a ' + 'class="single-print no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-arrow-circle-right' + '"></i>' + '</a>';
                },
                targets: 14
            }],
            "order": [
                [2, 'asc'],
                [3, 'asc'],
                [4, 'asc'],
                [5, 'asc'],
            ]
        });

        function filterColumnspecbox(i) {
            if (i == 8) {
                var ii = getIfNotSet(Number($('#col' + i + '_filterbox').val()), '', true);
            } else {
                var ii = $('#specimensid' + i + '_filterbox').val();
            }
            $('#SpecimensIdList').DataTable().column(i).search(ii).draw();
        }
        $('input.column_filterspecbox').on('keyup', function() {
            filterColumnspecbox($(this).parents('DIV').attr('data-column'));
            /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
        });
        var errorMessageNoSelectBox = function(i) {
            ngNotify.set('please select the specimensbox first', {
                theme: 'pure',
                position: 'top',
                duration: 1000,
                type: 'error',
                button: 'true'
            });
        };
        var warningMessageNoSelectBox = function(i) {
            ngNotify.set('please select the specimensbox first', {
                theme: 'pure',
                position: 'top',
                duration: 1000,
                type: 'warning',
                button: 'true'
            });
        };

        function format(d) {
            return '<form><table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' + '<tr>' + '<td>' + d['3'] + '</td>' + '</tr>' + '<tr>' + '<td>' + d['0'] + '</td>' + '</tr>' + '<tr>' + '<td>' + d['2'] + '</td>' + '</tr>' + '</table></form>';
        }

        function modalpreins(a, b) {
            var data = $.param({
                tpreinsqty: a,
                tpreinsid: b
            });
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertPreinsspecQTY.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                table.draw();
                calculatedbData.getSUMspec("PreinsMonth").success(function(datamonthsummary) {
                    $scope.ngmodelMothsum = datamonthsummary[0].totalmonth;
                });
            });
        }
        $('#SpecimensIdList tbody').on('click', '.single-print', function() {
            var tableRow = $(this).closest('tr');
            var dataspecimens = tableSpecIdList.row($(this).parents('tr')).data();
            var rowid = dataspecimens.DT_RowId;
            console.log(dataspecimens)
            var oldorderid = dataspecimens[10];
            var oldfamilyid = dataspecimens[11];
            var oldgenusid = dataspecimens[12];
            var oldspeciesid = dataspecimens[5];
            var specimensid = rowid.substring(4);
            var absolutespecid = getIfNotSet(specimensid, '0', true);
            var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '0', true);
            var container_type = 1;
            var report_month = getIfNotSet($stateParams.monthid, '0', true);
            var report_year = getIfNotSet($stateParams.yearid, '0', true);
            var userid = getIfNotSet($scope.uid, '0', true);
            var action = 'MOVETOBOX';
            var speciesid = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
            /** New Taxa Series **/
            var tspecies_name = getIfNotSet($scope.specModelSpecies.species_name, 'Unknown', true);
            var tgeuns_name = getIfNotSet($scope.specModelGenus.genus_name, 'Unknown', true);
            var tfamily_name = getIfNotSet($scope.specModelFamily.family_name, 'Unknown', true);
            var torder_name = getIfNotSet($scope.specModelOrder.torder_name, 'Unknown', true);
            var torder_id = getIfNotSet($scope.specModelOrder.torder_id, 0, true);
            var tfamily_id = getIfNotSet($scope.specModelFamily.family_id, 0, true);
            var tgenus_id = getIfNotSet($scope.specModelGenus.genus_id, 0, true);
            data = $.param({
                taction: action,
                tspecimensid: absolutespecid,
                tcontainer_id: container_id,
                tcontainer_type: container_type,
                treport_month: report_month,
                treport_year: report_year,
                tspeciesid: speciesid,
                torderid: torder_id,
                tfamilyid: tfamily_id,
                tgenusid: tgenus_id
            });
            $scope.open = function(size) {
                var modalInstance = $uibModal.open({
                    templateUrl: "assets/views/ModalSelectSpecies.html",
                    controller: function($scope, $uibModalInstance) {

                        $scope.modalTitle = "SELECT DATA";
                        $scope.modalContent = b;
                        /** Old Taxa Series **/
                        $scope.oldspecies = oldspeciesid;
                        $scope.oldspeciesname = tableSpecies;
                        $scope.oldgenusname = tableGenus;
                        $scope.oldfamilyname = tableFamily;
                        $scope.oldordername = tableOrder;
                        /** New Taxa Series **/
                        $scope.newspecies = speciesid;
                        $scope.newspeciesname = tspecies_name;
                        $scope.newgenusname = tgeuns_name;
                        $scope.newfamilyname = tfamily_name;
                        $scope.newordername = torder_name;
                        $scope.SelectData = function(a) {
                            if (a === 'oldspec') {
                                var oldspecdata = $.param({
                                    taction: action,
                                    tspecimensid: absolutespecid,
                                    tcontainer_id: container_id,
                                    tcontainer_type: container_type,
                                    treport_month: report_month,
                                    treport_year: report_year,
                                    tspeciesid: $scope.oldspecies,
                                    torderid: oldorderid,
                                    tfamilyid: oldfamilyid,
                                    tgenusid: oldgenusid
                                });
                                $http({
                                    method: 'POST',
                                    url: "assets/views/action/dbmovespectobox.php",
                                    data: oldspecdata,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                }).success(function(response) {
                                    if (response[0].success == 0) {} else {
                                        $scope.specfullid = response[0].specimens_full_number
                                        dataarr = [];
                                        /* tableSpecReportList.draw();*/
                                        if (response[0].species_id == 0) {
                                            toaster.pop('warning', 'SUCCESS', $scope.specfullid);
                                        } else {
                                            toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                        }
                                        tableSpecimensBox.draw();
                                        /*    $scope.GetUserCurrentBox();*/
                                        $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                        tableSpecIdList.draw()
                                        tableRow.fadeOut(400, "swing", function() {
                                            tableSpecIdList.row(rowid).remove().draw()
                                        });
                                    }
                                })
                            }
                            if (a === 'newspec') {
                                console.log($scope.newspeciesname)
                                console.log($scope.newgenusname)
                                console.log($scope.newfamilyname)
                                console.log($scope.newordername)
                                /*  */
                                console.log(torder_id)
                                console.log(tfamily_id)
                                console.log(tgenus_id)
                                console.log($scope.newspecies)
                                var newspecdata = $.param({
                                    taction: action,
                                    tspecimensid: absolutespecid,
                                    tcontainer_id: container_id,
                                    tcontainer_type: container_type,
                                    treport_month: report_month,
                                    treport_year: report_year,
                                    tspeciesid: $scope.newspecies,
                                    torderid: torder_id,
                                    tfamilyid: tfamily_id,
                                    tgenusid: tgenus_id
                                });
                                $http({
                                    method: 'POST',
                                    url: "assets/views/action/dbmovespectobox.php",
                                    data: newspecdata,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                }).success(function(response) {
                                    if (response[0].success == 0) {} else {
                                        $scope.specfullid = response[0].specimens_full_number
                                        if (response[0].species_id == 0) {
                                            toaster.pop('warning', 'SUCCESS', $scope.specfullid);
                                        } else {
                                            toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                        }
                                        dataarr = [];
                                        /* tableSpecReportList.draw();*/
                                        tableSpecimensBox.draw();
                                        /* $scope.GetUserCurrentBox();
                                         */
                                         $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                        tableSpecIdList.draw(false)
                                        /*tableRow.fadeOut(400, "swing", function() {
                                            tableSpecIdList.row(tableRow).remove().draw()
                                        });*/
                                    }
                                })
                            }
                            $uibModalInstance.close();
                        }
                        $scope.cancel = function() {
                            $uibModalInstance.dismiss("cancel")
                        }
                    },
                    size: size,
                    resolve: {
                        items: function() {
                            return $scope.numberofitem;
                        }
                    }
                });
                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem
                }, function() {})
            }
            if (typeof absolutespecid !== '0' && container_id !== '0' && userid !== '0') {
                if (speciesid != oldspeciesid) {
                    if (oldspeciesid == 0) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                dataarr = [];
                                /* tableSpecReportList.draw();
                                 tableSpecimensBox.draw();*/
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    } else {
                        $scope.open('md');
                        var data = tableSpecIdList.row($(this).parents('tr')).data();
                        var tableOrder = data[6];
                        var tableFamily = data[7];
                        var tableGenus = data[8];
                        var tableSpecies = data[9];
                        var b = format(data);
                        var forpreinsqty = data[1];
                        var forpreinsid = data.DT_RowId;
                    }
                } else {
                    if (speciesid === 0 && oldspeciesid === 0) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                if (response[0].species_id == 0) {
                                    toaster.pop('warning', 'SUCCESS', $scope.specfullid);
                                } else {
                                    toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                }
                                dataarr = [];
                                /*       tableSpecReportList.draw();
                                       tableSpecimensBox.draw();*/
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    } else {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                dataarr = [];
                                /* tableSpecReportList.draw();
                                 tableSpecimensBox.draw();*/
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    }
                }
                /*
                var speicmensidsfromall = dataarr;
                var cbox = JSON.stringify(speicmensidsfromall);
                $http({
                    method: 'POST',
                    url: "assets/views/action/dbmovespectobox.php",
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).success(function(response) {
                    if (response[0].success == 0) {} else {
                        $scope.specfullid = response[0].specimens_full_number
                        toaster.pop('success', 'SUCCESS', $scope.specfullid);
                        dataarr = [];
                        tableSpecReportList.draw();
                        tableSpecimensBox.draw();
                        $scope.GetUserCurrentBox();
                        $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                    }
                })*/
            } else {
                errorMessageNoSelectBox();
            }
        });
        $scope.RemoveBox = function(a) {
            var tableRow = $(this).closest('tr');
            var index = -1;
            var boxArr = eval($scope.GetBoxViewAvarList);
            for (var i = 0; i < boxArr.length; i++) {
                if (boxArr[i].lockbox_id === a) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $http({
                method: 'GET',
                url: 'assets/views/action/removespecimensbox.php',
                params: {
                    tlockbox_id: a,
                    tuserid: $scope.uid,
                    treport_year: $stateParams.yearid,
                    treport_month: $stateParams.monthid
                }
            }).success(function(result) {
                $http({
                    method: 'GET',
                    url: 'assets/views/action/removespecimensbox.php',
                    params: {
                        tlockbox_id: a,
                        tuserid: $scope.uid,
                        treport_year: $stateParams.yearid,
                        treport_month: $stateParams.monthid
                    }
                }).success(function(result) {
                    $scope.GetBoxViewAvarList.splice(index, 1);
                    $scope.idenboxlist();
                    /* $scope.ViewsAvartarFunction();*/
                    $scope.countSpecimens(monthshow, yearshow, null, null);
                });
            });
        }
        $('#SpecimensIdList tbody').on('click', 'tr', function() {
            var rowid = this.id;
            var rowidres = rowid.substring(4);
            var index = $.inArray(rowidres, dataarrspecid);
            if (index === -1) {
                dataarrspecid.push(rowidres);
            } else {
                dataarrspecid.splice(index, 1);
            }
            $(this).toggleClass('select-checkbox');
            $(this).toggleClass('selected');
        });
        var dataarr = [];
        var tableSpecReportList = $('#SpecimensReportListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_svlist.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($stateParams.monthid, '', true);
                    d.treport_year = getIfNotSet($stateParams.yearid, '', true);
                }
            },
            "createdRow": function(row, data, index) {
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "rowCallback": function(row, data) {
                var rowid = data.DT_RowId;
                var rowidres = rowid.substring(4);
                if ($.inArray(rowidres, dataarr) !== -1) {
                    $(row).addClass('selected');
                }
            },
            "dom": "<'row'<'col-sm-6'B><'col-sm-6'>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row '<'col-sm-12'<'pull-left'p>>>",
            "stateSave": true,
            stateSaveCallback: function(settings, data) {
                localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
            },
            stateLoadCallback: function(settings) {
                return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
            },
            "scrollCollapse": true,
            "lengthMenu": [
                [30, 50, 100],
                ['30 rows', '50 rows', '100 rows']
            ],
            "buttons": [{
                text: '<i id="checkitemres" class="fa fa-square-o"></i>',
                action: function(row) {
                    $(row).removeClass('selected');
                    if (dataarr.length > 0) {
                        tableSpecReportList.rows().deselect();
                        $("#checkitemres").addClass('fa-square-o');
                        $("#checkitemres").removeClass('fa-check-square-o');
                        dataarr = [];
                    } else {
                        tableSpecReportList.rows().select();
                        $(row).addClass('selected');
                        var data = tableSpecReportList.rows('.selected').select().data();
                        $("#checkitemres").removeClass('fa-square-o');
                        $("#checkitemres").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            dataarr.push(rowidres);
                        }
                        return dataarr;
                    }
                },
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                extend: '',
                text: '<i class="fa fa-repeat"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                extend: 'movetobox',
                text: '<i class="fa fa-share-square-o"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                extend: '',
                text: '<i class="fa fa-share-square"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }],
            "pagingType": "input",
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }, {
                "data": "0",
                "width": "25%"
            }, {
                "data": "1",
                "width": "16%"
            }, {
                "data": "2",
                "width": "16%"
            }, {
                "data": "3",
                "width": "16%"
            }, {
                "data": "4",
                "width": "16%"
            }, {
                "data": "5",
            }, {
                "data": "6",
            }, {
                "data": "7",
            }, {
                "data": "8",
            }, {
                "data": "9",
            }, {
                "data": "10",
            }, {
                "data": "11",
            }],
            "columnDefs": [{
                "visible": false,
                "targets": 6
            }, {
                "visible": false,
                "targets": 7
            }, {
                "visible": false,
                "targets": 8
            }, {
                "visible": false,
                "targets": 9
            }, {
                "visible": false,
                "targets": 10
            }, {
                "visible": false,
                "targets": 11
            }, {
                render: function(data, type, full, meta) {
                    if (full[9] == true) {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark' + '"></i>' + '</a>';
                    } else {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark-o' + '"></i>' + '</a>';
                    }
                },
                "targets": 12,
                "width": "6%",
                "orderable": false
            }],
            "order": [
                [1, 'asc']
            ]
        });
        $("#SpecimensReportListTbl tbody").on("click", "a.bookmark", function(event) {
            var data = tableSpecReportList.row($(this).parents('tr')).data();
            var specimensid = data.DT_RowId;
            var authenid = specimensid.substring(4);
            /**
            e_userid = uid 3 name wichai 
            authen_catagory = catagory_id 1 SPECIMENS 
            **/
            var a = 3;
            var b = authenid;
            var c = 1;
            var d = $scope.uid;
            var data = $.param({
                te_userid: a,
                tauthen_id: b,
                tauthen_catagory: c,
                te_senderid: d
            });
            $http({
                method: 'POST',
                data: data,
                url: "assets/views/action/dbinsertEvent.php",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                tableSpecReportList.draw();
            });
        });

        function filterColumnspecbox(i) {
            if (i == 8) {
                var ii = getIfNotSet(Number($('#col' + i + '_filterbox').val()), '', true);
            } else {
                var ii = $('#col' + i + '_filterbox').val();
            }
            $('#TransferSpectoBoxTbl').DataTable().column(i).search(ii).draw();
        }
        $('input.column_filterspecbox').on('keyup', function() {
            filterColumnspecbox($(this).parents('DIV').attr('data-column'));
            /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
        });
        $scope.collcode = ''
        $scope.collyear = ''
        $scope.collnumber = ''
        $scope.labelspecid = ''
        $scope.searchlabel = function(i) {
            var ii = $scope.labelspecid;
            $('#SpecimensIdList').DataTable().column(i).search(ii).draw();
        }
        $scope.searchmodel = function(i) {
            if (i == 6) {
                var ii = $scope.collcode;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 7) {
                var ii = $scope.collyear;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 8) {
                var ii = getIfNotSet(Number($scope.collnumber), '', true);
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
        }
        $scope.searchmodel(6)
        $scope.searchmodel(7)
        $scope.searchmodel(8)
        $('#SpecimensReportListTbl td').css('white-space', 'initial');
        $('.material-datatables label').addClass('form-group');
        $('#SpecimensReportListTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableSpecReportList.row($(this).closest('tr')).data();
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, dataarr);
            var a = data[5];
            var b = data[6];
            var c = data[7];
            var d = data[8];
            var data = $.param({
                sCode: a,
                sYear: b,
                sNumber: c,
                sSpecNumber: d
            });
            if (index === -1) {
                dataarr.push(idres);
            } else {
                dataarr.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                tableSpecReportList.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        $scope.specimensUpdate = function(action, form) {
            var f = $scope.updatetype;
            if (f == 0 | f == 1) {
                var tablearr = dataarr;
            }
            if (f == 2) {
                var tablearr = dataarrSpecbox;
            }
            var g = $scope.boxstatus_id
            var a = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
            var b = tablearr;
            var d = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            var e = 1;
            var c = JSON.stringify(b);
            /* e = 1 container_type is box 
               e = 2 container_type is cabinet 
            */
            var data = $.param({
                tspecimens_ids: c,
                species_id: a,
                container_id: d,
                container_type: e,
                action: action,
                actionmode: f,
                month: $stateParams.monthid,
                year: $stateParams.yearid,
            });
            $scope.toTheTop();
            if (form.$valid) {
                if (f == 0) {
                    if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined) {
                        SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your collection data will be recorded in database!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, save it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function(isConfirm) {
                            window.onkeydown = previousWindowKeyDown;
                            if (isConfirm) {
                                SweetAlert.swal({
                                    title: "SAVED!",
                                    text: "Your imaginary data has been saved.",
                                    type: "success",
                                    confirmButtonColor: "#007AFF"
                                }, function(isConfirm) {
                                    $http({
                                        method: 'POST',
                                        data: data,
                                        url: "assets/views/action/dbupdateSpecimens.php",
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                    }).success(function(response) {
                                        $scope.SpecimensTaxa = response;
                                        $scope.Ins_mode = $scope.SpecimensTaxa[0].Ins_mode;
                                        $scope.success = $scope.SpecimensTaxa[0].success;
                                        $scope.countSpecimens(monthshow, yearshow, null, null);
                                        if ($scope.Ins_mode === 'ADD') {
                                            if ($scope.savetype == 1) {
                                                $scope.resetspecform();
                                            }
                                            if ($scope.savetype == 0) {
                                                $scope.resetspecSimilar();
                                            };
                                        }
                                        if ($scope.Ins_mode === 'UPDATE') {
                                            if ($scope.savetype == 1) {
                                                $scope.UPDATEresetspecimensTaxa();
                                            }
                                            if ($scope.savetype == 0) {
                                                UPDATEresetspecimensTaxaSimilar();
                                            }
                                        }
                                        dataarr = [];
                                        dataarrSpecbox = [];
                                        tableSpecReportList.draw();
                                        tableSpecimensBox.draw();
                                    });
                                });
                            } else {
                                SweetAlert.swal({
                                    title: "Cancelled",
                                    text: "Your data is cancelled :)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                        });
                    } else {
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in texbox (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Collection number (กรุณาเลือกหมายเลขคอลเลคชัน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    }
                }
                if (f == 1) {
                    if (g == 2) {
                        SweetAlert.swal({
                            title: "ERROR",
                            text: "THIS BOX IS FULL (กล่องเต็มแล้ว)",
                            type: "error",
                            confirmButtonColor: "#007AFF"
                        });
                    } else {
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0 && e > 0) {
                            SweetAlert.swal({
                                title: "Are you sure?",
                                text: "Your collection data will be recorded in database!",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, save it!",
                                cancelButtonText: "No, cancel plx!",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            }, function(isConfirm) {
                                window.onkeydown = previousWindowKeyDown;
                                if (isConfirm) {
                                    SweetAlert.swal({
                                        title: "SAVED!",
                                        text: "Your imaginary data has been saved.",
                                        type: "success",
                                        confirmButtonColor: "#007AFF"
                                    }, function(isConfirm) {
                                        $http({
                                            method: 'POST',
                                            data: data,
                                            url: "assets/views/action/dbupdateSpecimens.php",
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded'
                                            },
                                        }).success(function(response) {
                                            $scope.SpecimensTaxa = response;
                                            $scope.Ins_mode = $scope.SpecimensTaxa[0].Ins_mode;
                                            $scope.success = $scope.SpecimensTaxa[0].success;
                                            $scope.countSpecimens(monthshow, yearshow, e, d);
                                            if ($scope.Ins_mode === 'ADD') {
                                                if ($scope.savetype == 1) {
                                                    $scope.resetspecform();
                                                }
                                                if ($scope.savetype == 0) {
                                                    $scope.resetspecSimilar();
                                                };
                                            }
                                            if ($scope.Ins_mode === 'UPDATE') {
                                                if ($scope.savetype == 1) {
                                                    $scope.UPDATEresetspecimensTaxa();
                                                }
                                                if ($scope.savetype == 0) {
                                                    UPDATEresetspecimensTaxaSimilar();
                                                }
                                            }
                                            dataarr = [];
                                            dataarrSpecbox = [];
                                            tableSpecReportList.draw();
                                            tableSpecimensBox.draw();
                                        });
                                    });
                                } else {
                                    SweetAlert.swal({
                                        title: "Cancelled",
                                        text: "Your data is cancelled :)",
                                        type: "error",
                                        confirmButtonColor: "#007AFF"
                                    });
                                }
                            });
                        } else {
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number  (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in texbox (กรุณาเลือกกล่องใส่แมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            /*
                            if (tablearr.length == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Collection number (กรุณาเลือกหมายเลขคอลเลคชัน)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if ($scope.specModelSpecies.species_id == undefined) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in texbox (กรุณากรอกข้อมูล)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }*/
                        }
                    }
                }
                if (f == 2) {
                    if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0 && e > 0) {
                        SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your collection data will be recorded in database!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, save it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function(isConfirm) {
                            window.onkeydown = previousWindowKeyDown;
                            if (isConfirm) {
                                SweetAlert.swal({
                                    title: "SAVED!",
                                    text: "Your imaginary data has been saved.",
                                    type: "success",
                                    confirmButtonColor: "#007AFF"
                                }, function(isConfirm) {
                                    $http({
                                        method: 'POST',
                                        data: data,
                                        url: "assets/views/action/dbupdateSpecimens.php",
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                    }).success(function(response) {
                                        $scope.SpecimensTaxa = response;
                                        $scope.Ins_mode = $scope.SpecimensTaxa[0].Ins_mode;
                                        $scope.success = $scope.SpecimensTaxa[0].success;
                                        $scope.countSpecimens(monthshow, yearshow, e, d);
                                        if ($scope.Ins_mode === 'ADD') {
                                            if ($scope.savetype == 1) {
                                                $scope.resetspecform();
                                            }
                                            if ($scope.savetype == 0) {
                                                $scope.resetspecSimilar();
                                            };
                                        }
                                        if ($scope.Ins_mode === 'UPDATE') {
                                            if ($scope.savetype == 1) {
                                                $scope.UPDATEresetspecimensTaxa();
                                            }
                                            if ($scope.savetype == 0) {
                                                UPDATEresetspecimensTaxaSimilar();
                                            }
                                        }
                                        dataarr = [];
                                        dataarrSpecbox = [];
                                        tableSpecReportList.draw();
                                        tableSpecimensBox.draw();
                                    });
                                });
                            } else {
                                SweetAlert.swal({
                                    title: "Cancelled",
                                    text: "Your data is cancelled :)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                        });
                    } else {
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number  (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in texbox (กรุณาเลือกกล่องใส่แมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    }
                }
            } else {
                var field = null,
                    firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }
                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                errorMessage();
            }
        }
        /*** idenspecid **/
        $scope.movespectobox = function(action, form) {
            var f = 1;
            var tablearr = dataarrspecid;
            var g = $scope.boxstatus_id
            var a = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
            var b = tablearr;
            var d = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            var e = 1;
            var c = JSON.stringify(b);
            /* e = 1 container_type is box 
               e = 2 container_type is cabinet 
            */
            var data = $.param({
                tspecimens_ids: c,
                species_id: a,
                container_id: d,
                container_type: e,
                action: action,
                actionmode: f,
                month: $stateParams.monthid,
                year: $stateParams.yearid,
            });
            $scope.toTheTop();
            if (form.$valid) {
                if (f == 0) {
                    if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined) {
                        SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your collection data will be recorded in database!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, save it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function(isConfirm) {
                            window.onkeydown = previousWindowKeyDown;
                            if (isConfirm) {
                                SweetAlert.swal({
                                    title: "SAVED!",
                                    text: "Your imaginary data has been saved.",
                                    type: "success",
                                    confirmButtonColor: "#007AFF"
                                }, function(isConfirm) {
                                    $http({
                                        method: 'POST',
                                        data: data,
                                        url: "assets/views/action/dbupdateSpecimens.php",
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                    }).success(function(response) {
                                        $scope.SpecimensTaxa = response;
                                        $scope.Ins_mode = $scope.SpecimensTaxa[0].Ins_mode;
                                        $scope.success = $scope.SpecimensTaxa[0].success;
                                        $scope.countSpecimens(monthshow, yearshow, null, null);
                                        if ($scope.Ins_mode === 'ADD') {
                                            if ($scope.savetype == 1) {
                                                $scope.resetspecform();
                                            }
                                            if ($scope.savetype == 0) {
                                                $scope.resetspecSimilar();
                                            };
                                        }
                                        if ($scope.Ins_mode === 'UPDATE') {
                                            if ($scope.savetype == 1) {
                                                $scope.UPDATEresetspecimensTaxa();
                                            }
                                            if ($scope.savetype == 0) {
                                                UPDATEresetspecimensTaxaSimilar();
                                            }
                                        }
                                        dataarr = [];
                                        dataarrSpecbox = [];
                                        tableSpecReportList.draw();
                                        tableSpecimensBox.draw();
                                    });
                                });
                            } else {
                                SweetAlert.swal({
                                    title: "Cancelled",
                                    text: "Your data is cancelled :)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                        });
                    } else {
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in texbox (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Collection number (กรุณาเลือกหมายเลขคอลเลคชัน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    }
                }
                if (f == 1) {
                    if (g == 2) {
                        SweetAlert.swal({
                            title: "ERROR",
                            text: "THIS BOX IS FULL (กล่องเต็มแล้ว)",
                            type: "error",
                            confirmButtonColor: "#007AFF"
                        });
                    } else {
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0 && e > 0) {
                            SweetAlert.swal({
                                title: "Are you sure?",
                                text: "Your collection data will be recorded in database!",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, save it!",
                                cancelButtonText: "No, cancel plx!",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            }, function(isConfirm) {
                                window.onkeydown = previousWindowKeyDown;
                                if (isConfirm) {
                                    SweetAlert.swal({
                                        title: "SAVED!",
                                        text: "Your imaginary data has been saved.",
                                        type: "success",
                                        confirmButtonColor: "#007AFF"
                                    }, function(isConfirm) {
                                        $http({
                                            method: 'POST',
                                            data: data,
                                            url: "assets/views/action/dbupdateSpecimens.php",
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded'
                                            },
                                        }).success(function(response) {
                                            $scope.SpecimensTaxa = response;
                                            $scope.Ins_mode = $scope.SpecimensTaxa[0].Ins_mode;
                                            $scope.success = $scope.SpecimensTaxa[0].success;
                                            $scope.countSpecimens(monthshow, yearshow, e, d);
                                            if ($scope.Ins_mode === 'ADD') {
                                                if ($scope.savetype == 1) {
                                                    $scope.resetspecform();
                                                }
                                                if ($scope.savetype == 0) {
                                                    $scope.resetspecSimilar();
                                                };
                                            }
                                            if ($scope.Ins_mode === 'UPDATE') {
                                                if ($scope.savetype == 1) {
                                                    $scope.UPDATEresetspecimensTaxa();
                                                }
                                                if ($scope.savetype == 0) {
                                                    UPDATEresetspecimensTaxaSimilar();
                                                }
                                            }
                                            dataarr = [];
                                            dataarrSpecbox = [];
                                            dataarrspecid = [];
                                            tableSpecIdList.draw();
                                            tableSpecReportList.draw();
                                            tableSpecimensBox.draw();
                                        });
                                    });
                                } else {
                                    SweetAlert.swal({
                                        title: "Cancelled",
                                        text: "Your data is cancelled :)",
                                        type: "error",
                                        confirmButtonColor: "#007AFF"
                                    });
                                }
                            });
                        } else {
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number  (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in texbox (กรุณาเลือกกล่องใส่แมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            /*
                            if (tablearr.length == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Collection number (กรุณาเลือกหมายเลขคอลเลคชัน)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if ($scope.specModelSpecies.species_id == undefined) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in texbox (กรุณากรอกข้อมูล)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }*/
                        }
                    }
                }
                if (f == 2) {
                    if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0 && e > 0) {
                        SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your collection data will be recorded in database!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, save it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function(isConfirm) {
                            window.onkeydown = previousWindowKeyDown;
                            if (isConfirm) {
                                SweetAlert.swal({
                                    title: "SAVED!",
                                    text: "Your imaginary data has been saved.",
                                    type: "success",
                                    confirmButtonColor: "#007AFF"
                                }, function(isConfirm) {
                                    $http({
                                        method: 'POST',
                                        data: data,
                                        url: "assets/views/action/dbupdateSpecimens.php",
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                    }).success(function(response) {
                                        $scope.SpecimensTaxa = response;
                                        $scope.Ins_mode = $scope.SpecimensTaxa[0].Ins_mode;
                                        $scope.success = $scope.SpecimensTaxa[0].success;
                                        $scope.countSpecimens(monthshow, yearshow, e, d);
                                        if ($scope.Ins_mode === 'ADD') {
                                            if ($scope.savetype == 1) {
                                                $scope.resetspecform();
                                            }
                                            if ($scope.savetype == 0) {
                                                $scope.resetspecSimilar();
                                            };
                                        }
                                        if ($scope.Ins_mode === 'UPDATE') {
                                            if ($scope.savetype == 1) {
                                                $scope.UPDATEresetspecimensTaxa();
                                            }
                                            if ($scope.savetype == 0) {
                                                UPDATEresetspecimensTaxaSimilar();
                                            }
                                        }
                                        dataarr = [];
                                        dataarrSpecbox = [];
                                        tableSpecReportList.draw();
                                        tableSpecimensBox.draw();
                                    });
                                });
                            } else {
                                SweetAlert.swal({
                                    title: "Cancelled",
                                    text: "Your data is cancelled :)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                        });
                    } else {
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number  (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in texbox (กรุณาเลือกกล่องใส่แมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    }
                }
            } else {
                var field = null,
                    firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }
                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                errorMessage();
            }
        }
        $scope.specSEARCH = function() {
            $http({
                method: 'POST',
                url: "assets/views/action/returnSpecimensNotest.php",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.test = {};
                $scope.Specdetails = response;
                $scope.test = {
                    specimens_number: $scope.Specdetails[0].specimens_number
                };
            });
        };
        $scope.GetBoxViewCurrentUser = '';
        $scope.GetBoxViewCurrentUserList = [];
        $scope.GetCurrentUseBox = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/GetViewCurrentUserList.php',
                params: {
                    userid: $scope.uid
                }
            }).success(function(result) {
                $scope.GetBoxViewCurrentUserList = result;
            });
        }
        $scope.GetCurrentUseBox();
        $scope.GetBoxView = '';
        $scope.GetBoxViewAvar = '';
        /*
        $scope.GetBoxViewAvarList = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getBoxViewlist.php',
            params: {
                month: monthshow,
                year: yearshow
            }
        }).success(function(result) {
            $scope.GetBoxViewAvarList = result;
        });*/
        $scope.ViewsAvartarFunction = function() {
            $scope.GetBoxViewAvarList = [];
            $http({
                method: 'GET',
                url: 'assets/views/action/getBoxViewlist.php',
                params: {
                    month: monthshow,
                    year: yearshow
                }
            }).success(function(result) {
                $scope.GetBoxViewAvarList = result;
            });
        }
        $scope.specModelOrder = '';
        $scope.specModelFamily = '';
        $scope.specModelGenus = '';
        $scope.specModelSpecies = '';
        $scope.onSelect = function($item, $model, $label) {}
        $scope.OrderKeyup = function(viewValue) {
            return $http.get('./assets/views/action/ReturnTaxaList.php?sOrder=' + viewValue).then(function(res) {
                return res.data;
            });
        }
        $scope.FamilyKeyup = function(viewValue) {
            var a = $scope.specModelOrder.torder_id;
            return $http.get('./assets/views/action/ReturnTaxaList.php?sFamily=' + viewValue + '&&torderid=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.GenusKeyup = function(viewValue) {
            var a = $scope.specModelFamily.family_id;
            return $http.get('./assets/views/action/ReturnTaxaList.php?sGenus=' + viewValue + '&&familyid=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.SpeciesKeyup = function(viewValue) {
            var a = $scope.specModelGenus.genus_id;
            return $http.get('./assets/views/action/ReturnTaxaList.php?sSpecies=' + viewValue + '&&genusid=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.ModelPinor = '';
        $scope.ModelLabelor = '';
        $scope.ModelIdentification = '';
        $scope.PinorKeyup = function(viewValue) {
            return $http.get('./assets/views/action/ReturnSpecific.php?sPinor=' + viewValue).then(function(res) {
                return res.data;
            });
        }
        $scope.LabelorKeyup = function(viewValue) {
            return $http.get('./assets/views/action/ReturnSpecific.php?sLabelor=' + viewValue).then(function(res) {
                return res.data;
            });
        }
        $scope.IdentificationKeyup = function(viewValue) {
            return $http.get('./assets/views/action/ReturnSpecific.php?sIdentification=' + viewValue).then(function(res) {
                return res.data;
            });
        }
        $scope.UPDATEresetspecimensTaxa = function() {
            dataarr = [];
            tableSpecReportList.rows('.selected').deselect();
            tableSpecReportList.draw();
            $scope.specModelOrder = '';
            $scope.specModelFamily = '';
            $scope.specModelGenus = '';
            $scope.specModelSpecies = '';
        }
        $scope.UPDATEresetspecimensDate = function() {
            dataarr = [];
            tableSpecReportList.rows('.selected').deselect();
            tableSpecReportList.draw();
        }
        $scope.UPDATEresetspecimensTaxaSimilar = function() {
            dataarr = [];
            tableSpecReportList.rows('.selected').deselect();
            tableSpecReportList.draw();
        }
        $scope.resetspecformBtn = function() {
            SweetAlert.swal({
                title: "Are you sure to RESET all field?",
                text: "Your data will be reset!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, reset it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Reset all filed!",
                        text: "Your data has been reset.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function(isConfirm) {
                        window.onkeydown = previousWindowKeyDown;
                        $http({
                            method: 'POST',
                            url: "assets/views/action/returnSpecimensNo.php",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            $scope.SpecimensTaxa_Form.$setPristine();
                            $scope.SpecimensTaxa_Form.$setUntouched();
                            $scope.ModelPinor = '';
                            $scope.ModelLabelor = '';
                            $scope.ModelIdentification = '';
                            $scope.specModelOrder = '';
                            $scope.specModelFamily = '';
                            $scope.specModelGenus = '';
                            $scope.specModelSpecies = '';
                            $scope.typespecimen = 0;
                            $scope.specdata.specimensid = 0;
                            $scope.numberOFrecord = 1;
                        });
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your data is not reset :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        }
        $scope.check = function() {
            var a = getIfNotSet(0, 0, true);
        }
        $scope.reset = function() {
            var data = tableSpecReportList.rows('.selected').data();
            var id = data[0].DT_RowId;
            tableSpecReportList.rows('.selected').deselect();
            var index = $.inArray(id, dataarr);
            if (index !== -1) {
                dataarr.splice(index, 1);
            }
        }
        $scope.checkalert = function() {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                window.onkeydown = previousWindowKeyDown;
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Deleted!",
                        text: "Your imaginary file has been deleted.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        };
        /** DATE PICKER **/
        var today = new Date();
        $scope.formatDate = function(today) {
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = yyyy + '/' + mm + '/' + dd;
            return today
        }
        var newdate = $scope.formatDate(today);
        $scope.specDate = {};
        $scope.specDate.specdate = newdate;
        $('#txtspecdate').datepicker({
            format: "yyyy/mm/dd",
            todayHighlight: true,
            autoclose: true
        });
        $("#txtspecdate").datepicker("setDate", new Date());
        $scope.reportModel = {};
        $scope.ReportSearch = function() {
            var a = $scope.reportModel.month;
            var b = $scope.reportModel.year;
            if (a && b !== undefined) {
                $state.go('app.form.specimens_box.specview', {
                    "monthid": a,
                    "yearid": b
                })
            } else {
                alert("กรุณาเลือกเดือนและปีของการรายงาน");
            }
        }
        $scope.ReportSearchnew = function() {
            var a = $scope.reportModel.month;
            var b = $scope.reportModel.year;
            if (a && b !== undefined) {
                $state.go('app.form.managespecimens', {
                    "monthid": a,
                    "yearid": b
                })
            } else {
                alert("กรุณาเลือกเดือนและปีของการรายงาน");
            }
        }
        $scope.ReportReset = function() {
            $scope.reportModel.month = "0";
            $scope.reportModel.year = "0";
        }
        $scope.specimensdate = function(action, form) {
            var a = $scope.specDate.specdate;
            var b = dataarr;
            var c = JSON.stringify(b);
            var data = $.param({
                tspecimens_ids: c,
                spec_date: a,
                action: action
            });
            $scope.toTheTop();
            if (dataarr.length !== 0) {
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your collection data will be recorded in database!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, save it!",
                    cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm) {
                    window.onkeydown = previousWindowKeyDown;
                    if (isConfirm) {
                        SweetAlert.swal({
                            title: "SAVED!",
                            text: "Your imaginary data has been saved.",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        }, function(isConfirm) {
                            $http({
                                method: 'POST',
                                data: data,
                                url: "assets/views/action/dbupdateSpecDate.php",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                            }).success(function(response) {
                                $scope.SpecimensDate = response;
                                $scope.Ins_mode = $scope.SpecimensDate[0].Ins_mode;
                                $scope.success = $scope.SpecimensDate[0].success;
                                if ($scope.Ins_mode === 'ADD') {
                                    if ($scope.savetype == 1) {
                                        $scope.resetspecform();
                                    }
                                    if ($scope.savetype == 0) {
                                        $scope.resetspecSimilar();
                                    };
                                }
                                if ($scope.Ins_mode === 'UPDATE') {
                                    $scope.UPDATEresetspecimensDate();
                                }
                            });
                        });
                    } else {
                        SweetAlert.swal({
                            title: "Cancelled",
                            text: "Your data is cancelled :)",
                            type: "error",
                            confirmButtonColor: "#007AFF"
                        });
                    }
                });
            } else {
                var field = null,
                    firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }
                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                errorMessage();
            }
        }
        $scope.BoxstateSelection = function BoxstateSelection(event) {
            // how to check if checkbox is selected or not
            if (event.target.checked) {
                $http({
                    method: 'GET',
                    url: 'assets/views/action/UpdateBoxStatus.php',
                    params: {
                        boxid: $scope.BoxShowidModel,
                        boxstate: 2
                    }
                }).success(function(response) {
                    $scope.BoxShowModel = response[0].collboxno;
                    $scope.BoxidShowModel = response[0].collboxid;
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/getboxcodelist.php'
                    }).success(function(result) {
                        $scope.GETBoxcode = result;
                    });
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/getBoxViewlist.php'
                    }).success(function(result) {
                        $scope.GetBoxViewAvarList = result;
                    });
                });
            } else {
                $http({
                    method: 'GET',
                    url: 'assets/views/action/UpdateBoxStatus.php',
                    params: {
                        boxid: $scope.BoxShowidModel,
                        boxstate: 1
                    }
                }).success(function(response) {
                    $scope.BoxShowModel = response[0].collboxno;
                    $scope.BoxidShowModel = response[0].collboxid;
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/getboxcodelist.php'
                    }).success(function(result) {
                        $scope.GETBoxcode = result;
                    });
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/getBoxViewlist.php'
                    }).success(function(result) {
                        $scope.GetBoxViewAvarList = result;
                    });
                });
            }
        };
        $scope.fullbox = function fullbox(event) {
            console.log($scope.boxstatus_id);
            if ($scope.BoxShowDetailsLock == 'fa-unlock-alt') {
                alert("Please Lock BOX first");
            } else {
                if ($scope.boxstatus_id == 1 | $scope.boxstatus_id == 3) {
                    SweetAlert.swal({
                        title: "Are you sure?",
                        text: "This Box is FULL?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, It's Full!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function(isConfirm) {
                        if (isConfirm) {
                            window.onkeydown = previousWindowKeyDown;
                            $http({
                                method: 'GET',
                                url: 'assets/views/action/UpdateBoxState.php',
                                params: {
                                    boxid: $scope.BoxModel,
                                    month: $stateParams.monthid,
                                    year: $stateParams.yearid,
                                    userid: $scope.uid,
                                    boxstatusid: $scope.boxstatus_id
                                }
                            }).success(function(response) {
                                if (response[0].success == 1) {
                                    SweetAlert.swal({
                                        title: "Success",
                                        text: "Your imaginary Box is FULL",
                                        type: "success",
                                        confirmButtonColor: "#007AFF"
                                    });
                                    $scope.FullBoxModel = 'fa-star'
                                    $scope.boxstatus_id = response[0].lockbox_boxstatus
                                    $scope.GetUserCurrentBox();
                                    $scope.ViewsAvartarFunction();
                                } else {
                                    SweetAlert.swal({
                                        title: "Error",
                                        text: "Access is denied",
                                        type: "error",
                                        confirmButtonColor: "#007AFF"
                                    });
                                }
                            });
                        } else {
                            SweetAlert.swal({
                                title: "Cancelled",
                                text: "Your imaginary file is cancelled :)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    });
                }
                if ($scope.boxstatus_id == 2) {
                    SweetAlert.swal({
                        title: "UPDATE BOX STATUS?",
                        text: "Do you want to empty this box?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, It's Full!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function(isConfirm) {
                        if (isConfirm) {
                            window.onkeydown = previousWindowKeyDown;
                            $http({
                                method: 'GET',
                                url: 'assets/views/action/UpdateBoxState.php',
                                params: {
                                    boxid: $scope.BoxModel,
                                    month: $stateParams.monthid,
                                    year: $stateParams.yearid,
                                    userid: $scope.uid,
                                    boxstatusid: $scope.boxstatus_id
                                }
                            }).success(function(response) {
                                if (response[0].success == 1) {
                                    SweetAlert.swal({
                                        title: "Success",
                                        text: "Your imaginary Box is EMPTY",
                                        type: "success",
                                        confirmButtonColor: "#007AFF"
                                    });
                                    $scope.FullBoxModel = 'fa-star-o'
                                    $scope.boxstatus_id = response[0].lockbox_boxstatus
                                    $scope.GetUserCurrentBox();
                                    $scope.ViewsAvartarFunction();
                                } else {
                                    SweetAlert.swal({
                                        title: "Error",
                                        text: "Access is denied",
                                        type: "error",
                                        confirmButtonColor: "#007AFF"
                                    });
                                }
                            });
                        } else {
                            SweetAlert.swal({
                                title: "Cancelled",
                                text: "Your imaginary file is cancelled :)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    });
                }
            }
        };
        $scope.takeover = function takeover(event) {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "This is USED by " + $scope.BoxShowDetailsUser,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, TakeOverr!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                window.onkeydown = previousWindowKeyDown;
                if (isConfirm) {
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/UpdateBoxLockUserUsed.php',
                        params: {
                            boxid: $scope.BoxModel,
                            month: $stateParams.monthid,
                            year: $stateParams.yearid,
                            userid: $scope.uid
                        }
                    }).success(function(response) {
                        SweetAlert.swal({
                            title: "Cancelled",
                            text: "Your imaginary file is cancelled :)",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
                        $scope.BoxShowDetailsUser = response[0].username
                        $scope.GetUserCurrentBox();
                        $scope.TakeOverSignModel = ''
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your imaginary file is cancelled :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        };
        $scope.editboxstat = function(d) {
            $http({
                method: 'GET',
                url: 'assets/views/action/getUseBox.php',
                params: {
                    sBoxid: d,
                    sContainer_type: 1
                }
            }).success(function(result) {
                $scope.GETBoxDetails = result;
                $scope.BoxShowidModel = $scope.GETBoxDetails[0].collbox_id;
                $scope.BoxShowModel = $scope.GETBoxDetails[0].collboxno;
                $scope.BoxShowStateidModel = $scope.GETBoxDetails[0].boxstatus_id;
                $scope.BoxShowcountspecinboxModel = $scope.GETBoxDetails[0].countspecinbox;
                if ($scope.GETBoxDetails[0].boxlockstate_id == 1) {
                    $scope.BoxShowModelcheck = $scope.GETBoxDetails[0].boxlockstate_id;
                } else {
                    $scope.BoxShowModelcheck = "";
                }
                if ($scope.GETBoxDetails[0].boxstatus_id == 2) {
                    $scope.BoxStateModelcheck = $scope.GETBoxDetails[0].boxstatus_id;
                } else {
                    $scope.BoxStateModelcheck = "";
                }
                $http({
                    method: 'GET',
                    url: 'assets/views/action/getBoxViewlist.php'
                }).success(function(result) {
                    $scope.GetBoxViewAvarList = result;
                });
            });
        };
        $scope.viewspecboxlist = function(boxno, boxid) {
            $scope.BoxShowDetailsBoxno = boxno
            $scope.BoxShowDetailsBoxid = boxid
            $scope.GETAllcollboxno = boxno
            $scope.setTab(1)
            tableSpecimensBox.draw();
        }
        $scope.idenboxlist = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getBoxDetails.php',
                params: {
                    month: $stateParams.monthid,
                    year: $stateParams.yearid,
                    userid: $scope.uid
                }
            }).success(function(result) {
                $scope.IdenBoxQTYtransList = [];
                $scope.IdenBoxQTYtransList = result;
            });
        }
        $scope.idenboxlist();
        $scope.moreinfo = function() {
            $scope.BoxShowDetailsBoxid = 0
            $scope.GETAllcollboxno = 'ALL'
            tableSpecimensBox.draw();
        };
        $scope.GETAllBoxcode = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getAllboxcodelist.php',
            params: {
                month: monthshow,
                year: yearshow
                /*,
                userid: $scope.uid*/
            }
        }).success(function(result) {
            $scope.GETAllBoxcode = result;
        });
        $scope.BoxShowDetailsLock = 'fa-unlock-alt'
        $scope.BoxlockSelection = function BoxlockSelection(event, id) {
            if (id !== undefined) {
                $http({
                    method: 'GET',
                    url: 'assets/views/action/UpdateBoxLockUser.php',
                    params: {
                        boxid: id,
                        month: $stateParams.monthid,
                        year: $stateParams.yearid,
                        userid: $scope.uid
                    }
                }).success(function(response) {
                    if (response[0].success == 1) {
                        $scope.idenboxlist();
                        $scope.BoxShowDetailsBoxid = response[0].collbox_id
                        $scope.GetUserCurrentBox();
                        /*
                        $scope.LabelWaringModel = 'label-danger'
                        $scope.BoxShowDetailsUser = response[0].username
                        $scope.BoxShowDetailsBoxid = response[0].collbox_id*/
                        /*
                        
                      
                        $scope.BoxShowDetailsBoxno = response[0].collboxno;
                        $scope.InBoxUndefinedShowDetails = $scope.InBoxUndefinedShowDetailshide
                        $scope.InBoxAllShowDetails = $scope.InBoxAllShowDetailshide
                        $scope.updatetype = 1;
                        $scope.setTabIden(2, response[0].collbox_id)*/
                        $scope.setTabIden(2, response[0].collbox_id)
                    }
                });
            } else {
                /*
                $scope.BoxShowDetailsLock = 'fa-unlock-alt'*/
            }
        };
        $scope.addnewbox = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/addspecimensbox.php',
                params: {
                    month: $stateParams.monthid,
                    year: $stateParams.yearid,
                    userid: $scope.uid
                }
            }).success(function(response) {
                if (response[0].success == 1) {
                    $scope.idenboxlist();
                    $scope.ViewsAvartarFunction();
                    $scope.countSpecimens(monthshow, yearshow, null, null);
                }
            });
        };
        $scope.selectbox = function(d) {
            $http({
                method: 'GET',
                url: 'assets/views/action/getViewSelectedBox.php',
                params: {
                    sBoxid: d,
                    sMonth: $stateParams.monthid,
                    sYear: $stateParams.yearid,
                    sContainer_type: 1,
                    userid: $scope.uid
                }
            }).success(function(result) {
                var BoxShowDetailstype = 1
                var BoxShowDetailsid = result[0].collbox_id;
                if (result[0].boxlockstate == 2) {
                    if (result[0].compareUser == 1) {
                        $scope.TakeOverSignModel = 'fa-flag'
                    }
                    $scope.BoxShowDetailsLock = 'fa-unlock-alt'
                    $scope.LabelWaringModel = 'label-warning'
                    $scope.BoxShowDetailsUser = 'NA'
                    $scope.TakeOverSignModel = ''
                    $scope.BoxShowDetailsBoxid = 0;
                    $scope.BoxShowDetailsBoxno = 'Non-Selected'
                    $scope.InBoxUndefinedShowDetails = 0
                    $scope.InBoxAllShowDetails = 0
                    $scope.updatetype = 0
                } else {
                    if (result[0].compareUser == 1) {
                        if (result[0].username !== '') {
                            $scope.TakeOverSignModel = 'fa-retweet'
                        }
                    } else {
                        $scope.TakeOverSignModel = ''
                    }
                    $scope.updatetype = 1
                    $scope.BoxShowDetailsBoxid = result[0].collbox_id;
                    $scope.BoxShowDetailsBoxno = result[0].collboxno;
                    $scope.BoxShowDetailsLock = 'fa-lock'
                    $scope.InBoxUndefinedShowDetails = result[0].countundefinedspec;
                    $scope.InBoxAllShowDetails = result[0].countspec;
                    $scope.InBoxUndefinedShowDetailshide = result[0].countundefinedspec;
                    $scope.InBoxAllShowDetailshide = result[0].countspec;
                    $scope.LabelWaringModel = 'label-danger'
                    if (result[0].username == '') {
                        $scope.BoxShowDetailsUser = 'NA'
                    } else {
                        $scope.BoxShowDetailsUser = result[0].username;
                    }
                }
                $scope.boxstatus_id = result[0].boxstatus;
                if (result[0].boxstatus == 3) {
                    $scope.FullBoxModel = 'fa-star-half-o'
                } else if (result[0].boxstatus == 2) {
                    $scope.FullBoxModel = 'fa-star'
                } else {
                    $scope.FullBoxModel = 'fa-star-o'
                }
                $scope.countSpecimens(monthshow, yearshow, BoxShowDetailstype, BoxShowDetailsid);
                $scope.BoxShowModel = result[0].collboxno;
                $scope.BoxShowDetailsCount = result[0].countspec;
                $scope.InBoxUndefinedShowDetailshide = result[0].countundefinedspec;
                $scope.InBoxAllShowDetailshide = result[0].countspec;
                tableSpecimensBox.draw();
                /*
                     if (result[0].boxlockstate == 2) {
                         if (result[0].compareUser == 1) {
                             $scope.TakeOverSignModel = 'fa-flag'
                         }
                         $scope.BoxShowDetailsLock = 'fa-unlock-alt'
                         $scope.LabelWaringModel = 'label-warning'
                         $scope.BoxShowDetailsUser = 'NA'
                         $scope.TakeOverSignModel = ''
                     } else {
                         if (result[0].compareUser == 1) {
                             if (result[0].username !== '') {
                                 $scope.TakeOverSignModel = 'fa-retweet'
                             }
                         } else {
                             $scope.TakeOverSignModel = ''
                         }
                         $scope.BoxShowDetailsLock = 'fa-lock'
                         $scope.LabelWaringModel = 'label-danger'
                           tableSpecimensBox.draw();
                         if (result[0].username == '') {
                             $scope.BoxShowDetailsUser = 'NA'
                         } else {
                             $scope.BoxShowDetailsUser = result[0].username;
                         }
                     }
                  
                     if (result[0].boxstatus == 3) {
                         $scope.FullBoxModel = 'fa-star-half-o'
                     } else if (result[0].boxstatus == 2) {
                         $scope.FullBoxModel = 'fa-star'
                     } else {
                         $scope.FullBoxModel = 'fa-star-o'
                     }
                     $scope.BoxShowModel = result[0].collboxno;
                     $scope.BoxShowDetailsCount = result[0].countspec;
                     $scope.BoxShowDetailsBoxid = result[0].collbox_id;*/
            });
        };
        /*$scope.GetUserCurrentBox();*/
        /*endctrl */
    }
]);
app.controller('ProductsCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.series = ['Alpha', 'Omega', 'Kappa'];
        $scope.data = [
            [656, 594, 806, 817, 568, 557, 408, 843, 642, 1202, 1322, 847],
            [282, 484, 402, 194, 864, 275, 905, 1025, 123, 1455, 650, 1651],
            [768, 368, 253, 163, 437, 678, 1239, 1345, 1898, 1766, 1603, 2116]
        ];
        $scope.colors = [{
            fillColor: 'rgba(90,135,112,0.6)',
            strokeColor: 'rgba(90,135,112,1)',
            pointColor: 'rgba(90,135,112,1)'
        }, {
            fillColor: 'rgba(127,140,141,0.6)',
            strokeColor: 'rgba(127,140,141,1)',
            pointColor: 'rgba(127,140,141,1)'
        }, {
            fillColor: 'rgba(148,116,153,0.6)',
            strokeColor: 'rgba(148,116,153,1)',
            pointColor: 'rgba(148,116,153,1)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleShowGridLines: true,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            pointDot: false,
            pointDotRadius: 2,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            tooltipXPadding: 20,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animationEasing: "easeInOutExpo"
        };
    }
]);
app.controller('SalesCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.series = ['First', 'Second'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.colors = [{
            fillColor: 'rgba(148,116,153,0.7)',
            highlightFill: 'rgba(148,116,153,1)'
        }, {
            fillColor: 'rgba(127,140,141,0.7)',
            highlightFill: 'rgba(127,140,141,1)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleBeginAtZero: true,
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleShowGridLines: true,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: false,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1
        };
    }
]);
app.controller('AcquisitionCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];
        $scope.colors = [{
            fillColor: 'rgba(148,116,153,0.7)',
            strokeColor: 'rgba(148,116,153,0)',
            highlightFill: 'rgba(148,116,153,1)',
            highlightStroke: 'rgba(148,116,153,1)'
        }];
        // Chart.js Options
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            barDatasetSpacing: 0,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleLineColor: 'transparent',
            barShowStroke: false,
            barValueSpacing: 5
        };
    }
]);
app.controller('ConversionsCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.series = ['Transactions', 'Unique Visitors'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 132, 87],
            [172, 175, 193, 194, 161, 175, 153, 190, 175, 231, 234, 250]
        ];
        $scope.colors = [{
            fillColor: 'rgba(91,155,209,0.5)',
            strokeColor: 'rgba(91,155,209,1)'
        }, {
            fillColor: 'rgba(91,155,209,0.5)',
            strokeColor: 'rgba(91,155,209,0.5)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            scaleLineWidth: 0,
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleShowGridLines: true,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.5,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            pointDot: false,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animationEasing: "easeInOutExpo"
        };
    }
]);
app.controller('BarCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]
        ];
        $scope.colors = [{
            fillColor: 'rgba(154,137,181,0.6)',
            highlightFill: 'rgba(154,137,181,0.9)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            barDatasetSpacing: 0,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleLineColor: 'transparent',
            barShowStroke: false,
            barValueSpacing: 5
        };
    }
]);
app.controller('BarCtrl2', ["$scope",
    function($scope) {
        $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]
        ];
        $scope.colors = [{
            fillColor: 'rgba(255,255,244,0.3)',
            strokeColor: 'rgba(255,255,244,0.5)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            barDatasetSpacing: 0,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleLineColor: 'transparent',
            barShowStroke: false,
            barValueSpacing: 5
        };
    }
]);
app.controller('LineCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 95, 100]
        ];
        $scope.colors = [{
            fillColor: 'rgba(0,0,0,0)',
            strokeColor: 'rgba(0,0,0,0.2)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            scaleLineWidth: 0,
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleShowGridLines: true,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            bezierCurve: false,
            bezierCurveTension: 0.2,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animationEasing: "easeInOutExpo"
        };
    }
]);
app.controller('RandomCtrl', function($scope, $interval) {
    $scope.randomUsers = 0;
    var interval = 1500;
    $scope.realtime = function() {
        var random = $interval(function() {
            $scope.randomUsers = Math.floor((Math.random() * 6) + 100);
            interval = Math.floor((Math.random() * 5000) + 1000);
            $interval.cancel(random);
            $scope.realtime();
        }, interval);
    };
    $scope.realtime();
});
app.controller('KnobCtrl1', function($scope) {
    $scope.value = 65;
    $scope.options = {
        unit: "%",
        readOnly: true,
        size: 70,
        fontSize: '11px',
        textColor: 'rgb(154,137,181)',
        trackWidth: 5,
        barWidth: 10,
        trackColor: 'rgba(154,137,181,0.6)',
        barColor: 'rgba(154,137,181,0.9)'
    };
});
app.controller('KnobCtrl2', function($scope) {
    $scope.value = 330;
    $scope.options = {
        unit: "MB",
        readOnly: true,
        size: 70,
        fontSize: '11px',
        textColor: 'rgb(154,137,181)',
        trackWidth: 5,
        barWidth: 10,
        trackColor: 'rgba(154,137,181,0.6)',
        barColor: 'rgba(154,137,181,0.9)',
        max: 1024
    };
});
app.controller('KnobCtrl3', function($scope) {
    $scope.value = 65;
    $scope.options = {
        unit: "%",
        readOnly: true,
        size: 70,
        fontSize: '11px',
        textColor: '#fff',
        trackWidth: 5,
        barWidth: 10,
        trackColor: 'rgba(255,255,255,0.4)',
        barColor: '#8773A8'
    };
});
app.controller('KnobCtrl4', function($scope) {
    $scope.value = 330;
    $scope.options = {
        unit: "MB",
        readOnly: true,
        size: 70,
        fontSize: '11px',
        textColor: '#fff',
        trackWidth: 5,
        barWidth: 10,
        trackColor: 'rgba(255,255,255,0.4)',
        barColor: '#8773A8',
        max: 1024
    };
});
app.controller('SocialCtrl1', ["$scope",
    function($scope) {
        $scope.labels = ['Facebook', 'Twitter', 'YouTube', 'Spotify'];
        $scope.data = [300, 150, 100, 80];
        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952', '#8BC33E'];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            responsive: false,
            scaleShowLabelBackdrop: true,
            scaleBackdropColor: 'rgba(255,255,255,0.75)',
            scaleBeginAtZero: true,
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            scaleShowLine: true,
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: false
        };
    }
]);
app.controller('SocialCtrl2', ["$scope",
    function($scope) {
        $scope.labels = ['Facebook', 'Twitter', 'YouTube', 'Spotify'];
        $scope.data = [180, 210, 97, 60];
        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952', '#8BC33E'];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            responsive: false,
            scaleShowLabelBackdrop: true,
            scaleBackdropColor: 'rgba(255,255,255,0.75)',
            scaleBeginAtZero: true,
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            scaleShowLine: true,
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: false
        };
    }
]);
app.controller('SocialCtrl3', ["$scope",
    function($scope) {
        $scope.labels = ['Fb', 'YT', 'Tw'];
        $scope.data = [300, 50, 100];
        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952'];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            responsive: false,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipCornerRadius: 0,
            tooltipCaretSize: 2,
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: false
        };
    }
]);
app.controller('SocialCtrl4', ["$scope",
    function($scope) {
        $scope.labels = ['Sc', 'Ad'];
        $scope.data = [200, 150];
        $scope.colors = ['#8BC33E', '#7F8C8D'];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            responsive: false,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipCornerRadius: 0,
            tooltipCaretSize: 2,
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: false
        };
    }
]);
app.controller('PerformanceCtrl1', ["$scope",
    function($scope) {
        $scope.value = 85;
        $scope.options = {
            size: 125,
            unit: "%",
            trackWidth: 10,
            barWidth: 10,
            step: 5,
            trackColor: 'rgba(52,152,219,.1)',
            barColor: 'rgba(69,204,206,.5)'
        };
    }
]);
app.controller('BudgetCtrl', ["$scope",
    function($scope) {
        $scope.dailyValue = "25";
        $scope.totalValue = "750";
        $scope.dailyOptions = {
            from: 1,
            to: 100,
            step: 1,
            dimension: " $",
            className: "clip-slider",
            css: {
                background: {
                    "background-color": "silver"
                },
                before: {
                    "background-color": "rgb(154,137,181)"
                }, // zone before default value
                after: {
                    "background-color": "rgb(154,137,181)"
                }, // zone after default value
            }
        };
        $scope.totalOptions = {
            from: 100,
            to: 1000,
            step: 1,
            dimension: " $",
            className: "clip-slider",
            css: {
                background: {
                    "background-color": "silver"
                },
                before: {
                    "background-color": "rgb(127,140,141)"
                }, // zone before default value
                after: {
                    "background-color": "rgb(127,140,141)"
                }, // zone after default value
            }
        };
    }
]);