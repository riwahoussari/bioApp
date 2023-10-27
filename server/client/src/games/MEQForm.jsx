import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import '../stylesheets/form.css'
import { useEffect, useState } from "react";

function FormCard({question, answers, scores, number}) {
    return (
        <div class="question qtype-choice card" data-type="choice">

            <div class="question-description card-body card-text pb-0">
                <p><span>{number}-</span> {question}</p>
            </div>

            {answers.map((a,i) => {
                return (
                    <div class="question-body card-body">
                        <div class="mb-1 form-check custom-radio">
                            <input
                                type="radio"
                                name={`q-${number}`}
                                value={scores[i]}
                                class="form-check-input"
                                id={`q-${number}-${i}`}
                                required
                            />

                            <label class="form-check-label" for={`q-${number}-${i}`}>{a}</label>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default function MEQForm() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [display, setDisplay] = useState()
    let navigate = useNavigate()
    let userInfo = useUser()
    console.log(userInfo)
    if(userInfo.auth === true ){
        if(userInfo.user.formScore === '0'){setDisplay('form')}
        else{setDisplay('thanks')}
    }

    // const QandAs = [
    //     {
    //         question: 'What time would you wake up if you were entirely free to plan your day?',
    //         answers: ['5:00 AM__6:30 AM', '6:30 AM __7:30 AM', '7:30 AM __9:30 AM', '9:30 AM __11:00 AM', '11:00 AM __ 12:00 PM'],
    //         scores: [5, 4, 3, 2, 1]
    //     },{
    //         question: 'At what time would you go to bed if you were entirely free to plan your evening?',
    //         answers: ['8:00 PM __9:00 PM', '9:00PM  __10:00 PM', '10:00 PM __12:30 AM', '12:30 AM __1:30 AM', '1:30 AM __3:00 AM'],
    //         scores: [5,4,3,2,1]
    //     },{
    //         question: 'If there is a specific time at which you have to get up in the morning, to what extent are you dependent on being woken up by an alarm clock?',
    //         answers: ['Not all dependent', 'Slightly dependent', 'Fairly dependent', 'Very dependent'],
    //         scores: [4,3,2,1]
    //     },{
    //         question: 'Under perfect conditions, how easy do you find it getting up in the morning?',
    //         answers: ['Extremely hard', 'Hard', 'Easy', 'Extremely easy'],
    //         scores: [1,2,3,4]
    //     },{
    //         question: 'How alert do you feel during the first half hour after having woken up in the morning?',
    //         answers: ['Not alert', 'Slighty alert', 'Fairly alert', 'Very aler'],
    //         scores: [1,2,3,4]
    //     },{
    //         question: 'How is your appetite during the first half hour after having woken in the morning?',
    //         answers: ['Extremely poor', 'Poor', 'Good', 'Extremely good'],
    //         scores: [1,2,3,4]
    //     },{
    //         question: 'During the first half hour after having woken up in the morning , how tired do you feel?',
    //         answers: ['Extremely tired', 'Tired', 'Refreshed', 'Extremely refreshed'],
    //         scores: [1,2,3,4]
    //     },{
    //         question: 'When you have no commitments the next day, at what time do you go to bed compared to your usual bedtime?',
    //         answers: ['Seldom or never later', 'Less than 1 hour later', '1_2 hours later', 'More than 2 hours later'],
    //         scores: [4,3,2,1]
    //     },{
    //         question: 'You have decided to engage in some physical exercise. A friend suggested that you do this 1 hour twice a week and the best time for it is between "7:00 _8:00 AM". How do you think you would perform?',
    //         answers: ['Would be on good form', 'Would be on reasonable form', 'Would find it difficult', 'Would find it very difficult'],
    //         scores: [4,3,2,1]
    //     },{
    //         question: 'At what time in the evening do you feel tired and as a result in need of sleep?',
    //         answers: ['8:00 PM __9:00 PM', '9:00PM  __10:00 PM', '10:00 PM __1:00 AM', '1:00 AM __2:00 AM', '2:00 AM __3:00 AM'],
    //         scores: [5,4,3,2,1]
    //     },{
    //         question: 'What time do you think you would perfom at your best for a mentally exhausting 2 hours long exam?',
    //         answers: ['8:00 AM __10:00 AM', '11:00 AM __1:00PM', '3:00 PM __5:00 PM', '7:00 PM __9:00 PM'],
    //         scores: [6,4,2,0]
    //     },{
    //         question: 'If you went to bed at 11:00 PM at what level of tiredness would you be?',
    //         answers: ['Not tired', 'A bit tired', 'Tired', 'Extremely tired'],
    //         scores: [0,2,4,6]
    //     },{
    //         question: 'For some reason you went to bed several hours later than usual, but there is no need to wake up at any particular time the next morning. What event are you most likely going to experience?',
    //         answers: ['Will wake up at usual time and will not fall back asleep', 'Will wake up at usual time and will take a small nap after', 'Will wake up at usual time and fall asleep after', 'Will not wake up until later than usual'],
    //         scores: [4,3,2,1]
    //     },{
    //         question: 'One night you will have to remain awake between 4:00 _6:00 AM in order to carry out a night watch. You have no commitments the next day. Which of these alternatives suits you well',
    //         answers: ['Would not go to bed until watch was over', 'Would take a nap before and sleep after', 'Would take a good sleep before and nap after', 'Would take all the sleep before the watch'],
    //         scores: [1,2,3,4]
    //     },{
    //         question: 'You have to do 2 hours of physical hour work. You are entirely free to plan your day. Which one of these following times would you choose ',
    //         answers: ['8:00 AM __10:00 AM', '11:00 AM __1:00PM', '3:00 PM __5:00 PM', '7:00 PM __9:00 PM'],
    //         scores: [4,3,2,1]
    //     },{
    //         question: 'Yo have decided to engage in hard physical work. A friend suggests to workout at 10:00 _11:00 PM. How well do you think you would perform',
    //         answers: ['Would be on good form', 'Would be on reasonable form', 'Would find it difficult', 'Would find it very difficult'],
    //         scores: [1,2,3,4]
    //     },{
    //         question: 'Suppose that you can choose your study/work hours. Assume that you studied/worked a five hour day. Which 5 consecutive hours would you choose',
    //         answers: ['1:00 AM __ 5:00 AM', '5:00 AM __10:00 AM', '10:00 AM ___ 3:00 PM', '3:00 PM ___8:00 PM', '8:00 PM__1:00 AM'],
    //         scores: [5,4,3,2,1]
    //     },{
    //         question: 'At what time of the day do you think that you reach your "feeling best" peak?',
    //         answers: ['12:00 AM __ 4:00 AM', '4:00 AM __7:00 AM', '7:00 AM ___ 9:00 AM', '9:00 AM ___4:00 PM', '4:00 PM__10:00 PM', '10:00 PM __12:00 AM'],
    //         scores: [1,5,4,3,2,1]
    //     },{
    //         question: 'Which type of person do you think you are?',
    //         answers: ['Definitely a morning person', 'Probably a morning person', 'Probably an evening person', 'Definitely an evening person'],
    //         scores: [6,4,2,0]
    //     }
    // ]
    const QandAs = [
        {
            question: 'What time would you wake up if you were entirely free to plan your day?',
            answers: ['5:00 AM__6:30 AM', '6:30 AM __7:30 AM', '7:30 AM __9:30 AM', '9:30 AM __11:00 AM', '11:00 AM __ 12:00 PM'],
            scores: [1,2,3,4,5]
        },{
            question: 'At what time would you go to bed if you were entirely free to plan your evening?',
            answers: ['8:00 PM __9:00 PM', '9:00PM  __10:00 PM', '10:00 PM __12:30 AM', '12:30 AM __1:30 AM', '1:30 AM __3:00 AM'],
            scores: [50, 40, 30, 20, 10]
        }
    ]

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        let score = 0;
        formData.forEach((value, key)=>{
            data[key] = value;
            score += Number(value);
        })
        console.log(data)
        console.log(score)

        // upload results
        setLoading('Uploading your result...')
        setError(false)
        setSuccess(false)
        fetch('https://bioclock.onrender.com/api/formResult', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({score, data}),
            credentials: 'include'
        }).then(res => {
            if(!res.ok){
                setLoading(false)
                throw Error("couldn't upload result. Please try again")
            }
            return res.json()
        }).then(res => {
            setLoading(false)
            if(res.success){
                sessionStorage.setItem('userInfo', JSON.stringify({
                    auth: true, user: {formScore: `${score}`}
                }))
                setSuccess(true)
            }else{
                throw Error(res.message)
            }
        }).catch(err => {
            setLoading(false)
            setError(err.message)
        })
        
    }

    return (<>
        {userInfo.auth === false && navigate('../login', {replace: true})}
        <header data-bs-theme="dark">
            <div className="navbar navbar-dark bg-dark shadow-sm" style={{position: 'fixed', zIndex: '100', top: '0', width: '100%', height: '60px', justifyContent: 'center'}}>
                <div >
                <Link to="../" className="navbar-brand d-flex align-items-center m-0">
                    <strong>App Name</strong>
                </Link>
                </div>
            </div>
        </header>

        <div className='d-flex flex-column  align-items-center pt-8 bg-body-tertiary' style={{minHeight: "100vh"}}>
            {error && 
                <div id='popup'>
                <p style={{margin: '0', padding: '10px 20px'}}>{error}</p>
                <button className='btn btn-close p-3' onClick={()=>setError(false)} />
                </div>
            }
            {loading && 
                <div id='popup' className='loadingPopup'>
                <p style={{margin: '0', padding: '10px 20px'}}>{loading}</p>
                </div>
            }
            {success && 
                <div id='popup' className='successPopup'>
                <p style={{margin: '0', padding: '10px 20px'}}>Result uploaded successfully!</p>
                <button className='btn btn-close p-3' onClick={()=>setSuccess(false)} />
                </div>
            }

            <h2>MEQ Questionnaire</h2>
            {display === 'form' &&
                <form onSubmit={e=>handleSubmit(e)}>
                    {QandAs.map(({question, answers, scores}, i) => <FormCard question={question} answers={answers} scores={scores} number={i+1} />)}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            }
            {display === 'thanks' && <>
                <h3>Thank you for your submission!</h3>
                <Link to='../' className="btn btn-primary">Back Home</Link>
            </>}

        </div>
        
    </>)
}