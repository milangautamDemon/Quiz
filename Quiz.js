const quizQns = document.querySelector(".quiz-qns");
const quizAnsChecker = document.querySelectorAll(".check-ans");
const submitBtn = document.querySelector(".submit-btn");
const quizWrapper = document.querySelector(".quiz-wrapper");


async function fetchQuizData(){
    const pendingData = await fetch("https://the-trivia-api.com/v2/questions");
    const quizData = await pendingData.json();

    let index = 0;
    let right = 0;
    let wrong = 0;
    const totalCount = quizData.length;


    function shuffleArray(array) {  // function for randomly distribute(suffle) array
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    const reSet = () => {
        quizAnsChecker.forEach((ans)=>{
            ans.checked = false;
        })
    }

    const endQuiz = () => {
        quizWrapper.textContent = `${right} outof ${totalCount} are correct. Thanku for Playing Quiz!!`;
    }

    const loadQns = () => {

        if (index == totalCount) {
            return endQuiz();
        }
        reSet();
        quizQns.textContent = `${index+1}. ${quizData[index].question.text}`;

        const rawAnswer = [quizData[index].correctAnswer, quizData[index].incorrectAnswers[0], quizData[index].incorrectAnswers[1], quizData[index].incorrectAnswers[2]];


        const answer = shuffleArray(rawAnswer); //ramdomly suffle

        quizAnsChecker.forEach((ans, indexNumber)=>{
            ans.nextElementSibling.innerHTML = answer[indexNumber];
        })

        // console.log(quizData)
    }
    loadQns();

    submitBtn.addEventListener("click", ()=>{
       const selectedAnswer = getAns();
       if(selectedAnswer == quizData[index].correctAnswer){
           right++;
       }else{
           wrong++;
       }
       index++;
       loadQns();
       return
    })

    const getAns = () => {
        let answer;
        quizAnsChecker.forEach((ans)=>{
            if(ans.checked){
                answer = ans.nextElementSibling.textContent; 
            }
        })
        return answer;
    }


}
fetchQuizData()

