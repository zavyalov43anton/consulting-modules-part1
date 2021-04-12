(function() {
    const questions = [{
        question: 'Статус собственности',
        choices: ['Собственник', 'Собственник и ГЕНдиректор', 'ГЕН директор', 'Другая должность'],
        numberSlide: '01',
        imgSrc: 'assets/app/img/additional__modules-title-bg.svg'
    }, {
        question: 'Ваш возраст',
        choices: ['До 30 лет', '31-40 лет', '41-50 лет', '51 – 55 лет', 'Более 55 лет'],
        numberSlide: '02'
    }, {
        question: 'Возраст компании',
        choices: ['Менее 3 лет', '3-5 лет', '6-10 лет', '11-15 лет', 'Более 15 лет'],
        numberSlide: '03'
    }, {
        question: 'Численность компании',
        choices: ['Менее 20 сотрудников ', '20 - 40 сотрудников ', '40-100 сотрудников ',
            '100-200 сотрудников ', 'Более 200 сотрудников '],
        numberSlide: '04'
    }, {
        question: 'Выручка в год',
        choices: ['менее 120 млн', 'менее 800 млн', 'менее 2 млрд', 'более 2 млрд'],
        numberSlide: '05'
    },{
        question: 'Сфера деятельности',
        choices: ['Автомобильная','Бытовая','Информационные технологии','Сфера развлечений','Туристическая и гостиничный бизнес',
            'Строительство и ремонт','Недвижимость','Образование','Красота и здоровье','Производство','Энергетика','Другое'],
        numberSlide: '06'
    },{
        question: 'Интересующий модуль',
        choices: ['Стратегический менеджмент','Панель управления','Система мотивации','Диагностика предприятия или Отдела продаж','Отдел продаж: настройка отдела, тренинги',
            'Развитие и оценка сотрудников (в том числе, технология DISC)',
            'Цифровой маркетинг','Антикризисное управление','Слияние, поглощение, продажа'],
        numberSlide: '07'
    }];

    let questionCounter = 0; //Tracks question number
    let selections = []; //Array containing user choices
    let quiz = $('#quiz'); //Quiz div object
    let mainAnswers = [];

    // Display initial question
    displayNext();

    $('#start').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
    });

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
        e.preventDefault();
        // Suspend click listener during fade animation
        if(quiz.is(':animated')) {
            return false;
        }
        choose();
        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Пожалуйста,выберите ответ!');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and
    // the answer selections

    function createQuestionElement(index) {
        document.getElementById("number-slide").innerHTML = questions[index].numberSlide;
        const points = document.querySelectorAll('.point');
        const deactivation = () => {
            points.forEach(item  => item.style.backgroundColor = '#565656');
        };
        deactivation();
        points[index].style.backgroundColor = '#D8BA72';
        var qElement = $('<div>', {
            id: 'question'
        });
        var question = $('<p class="question-title">').append(questions[index].question);
        qElement.append(question);
        var radioButtons = createRadios(index);
        qElement.append(radioButtons);
        if (index === 5 || index === 6) {
            document.getElementById("quiz-img").style.display = "none";
            document.getElementById("quiz-buttons").style.right = "80px";
        }
        document.getElementById("quiz-img").innerHTML = "<img src=\"assets/app/img/quiz-block-image__" + questions[index].numberSlide + ".jpg\">";
        return qElement;
    }

    function createRadios(index) {
        var radioList = $('<div class="question-content">');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<p>');
            input = '<div class="form_radio">' +
                        '<input type="radio" name="answer" id="radio-'+ i +'" value=' + i + ' />' + '<label for="radio-'+ i +'"></label>' +
                    '</div>';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();
            if(questionCounter < questions.length){
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value='+selections[questionCounter]+']').prop('checked', true);
                }
                // Controls display of 'prev' button
                if(questionCounter === 1){
                    $('#prev').show();
                    $('#start').hide();
                } else if(questionCounter === 0){
                    $('#prev').hide();
                    $('#start').hide();
                    $('#next').show();
                }
            } else {
                let scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#start').show();
                $('#prev').hide();
            }
        });
    }

    function displayScore() {
        var score = $('<p>',{id: 'block-none'});
        let indexLast = "08";
        const points = document.querySelectorAll('.point');
        const deactivation = () => {
            points.forEach(item  => item.style.backgroundColor = '#565656');
        };
        deactivation();
        document.getElementById("block-form-quiz").style.display = "flex";
        points[7].style.backgroundColor = '#D8BA72';
        document.getElementById("number-slide").innerHTML = indexLast;
        document.getElementById("prev").style.marginRight = "160px";
        let a = document.getElementById('start');
        a.addEventListener("click", () => {document.getElementById("block-form-quiz").style.display = "none"});
        for (let i = 0; i < selections.length; i++) {
            let key = parseInt(selections[i]);
            mainAnswers.push(questions[i].choices[key]);
        }
        document.getElementById('quiz-textarea').innerHTML = mainAnswers;
        return score;
    }
})();
